package main

//Copyright 2019 Sentiance NV
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.

import (
    "compress/gzip"
    "encoding/json"
    "io"
    "log"
    "net/http"
    "strings"
)

func main() {
    http.HandleFunc("/webhook", basicAuth(webhookHandler))
    http.HandleFunc("/webhook/", basicAuth(webhookAppHandler))

    log.Println("Server listening on 3001")
    log.Fatal(http.ListenAndServe(":3001", nil))
}

func webhookHandler(w http.ResponseWriter, r *http.Request) {
    body, err := readBody(r)
    if err != nil {
        http.Error(w, "Bad request", http.StatusBadRequest)
        return
    }

    log.Println("Received webhook message")
    doSomething(body)
    w.WriteHeader(http.StatusOK)
}

func webhookAppHandler(w http.ResponseWriter, r *http.Request) {
    appID := strings.TrimPrefix(r.URL.Path, "/webhook/")
    body, err := readBody(r)
    if err != nil {
        http.Error(w, "Bad request", http.StatusBadRequest)
        return
    }

    log.Printf("Received webhook message from %s", appID)
    log.Println(string(body))
    w.WriteHeader(http.StatusOK)
}

func readBody(r *http.Request) ([]byte, error) {
    var reader io.ReadCloser
    var err error

    if r.Header.Get("Content-Encoding") == "gzip" {
        reader, err = gzip.NewReader(r.Body)
        if err != nil {
            return nil, err
        }
        defer reader.Close()
    } else {
        reader = r.Body
    }
    defer r.Body.Close()

    return io.ReadAll(reader)
}

func basicAuth(next http.HandlerFunc) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        user, pass, ok := r.BasicAuth()
        if !ok || user != "sentiance" || pass != "securepassword" {
            w.Header().Set("WWW-Authenticate", `Basic realm="Restricted"`)
            http.Error(w, "Unauthorized", http.StatusUnauthorized)
            return
        }
        next.ServeHTTP(w, r)
    }
}

func doSomething(body []byte) {
    var events struct {
        Data []struct {
            Meta struct {
                MessageType      string `json:"message_type"`
                MessageTimestamp string `json:"message_timestamp"`
            } `json:"meta"`
            Data interface{} `json:"data"`
        } `json:"data"`
    }
    if err := json.Unmarshal(body, &events); err != nil {
        log.Println("Failed to parse JSON:", err)
        return
    }

    for _, event := range events.Data {
        log.Printf("Received event of type %s at %s", event.Meta.MessageType, event.Meta.MessageTimestamp)
        log.Printf("%v", event.Data)
    }
}
