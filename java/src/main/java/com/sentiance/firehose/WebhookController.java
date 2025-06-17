package com.sentiance.firehose;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.zip.GZIPInputStream;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WebhookController {

    @PostMapping("/webhook")
    @ResponseStatus(HttpStatus.OK)
    public void webhook(@RequestBody byte[] body,
                        @RequestHeader(value = "Content-Encoding", required = false) String enc) throws IOException {
        byte[] data = handleEncoding(body, enc);
        System.out.println("Received webhook message");
        doSomething(data);
    }

    @PostMapping("/webhook/{appId}")
    @ResponseStatus(HttpStatus.OK)
    public void webhookApp(@RequestBody byte[] body,
                           @PathVariable String appId,
                           @RequestHeader(value = "Content-Encoding", required = false) String enc) throws IOException {
        byte[] data = handleEncoding(body, enc);
        System.out.println("Received webhook message from " + appId);
        System.out.println(new String(data));
    }

    private byte[] handleEncoding(byte[] body, String enc) throws IOException {
        if ("gzip".equalsIgnoreCase(enc)) {
            try (GZIPInputStream gz = new GZIPInputStream(new ByteArrayInputStream(body))) {
                ByteArrayOutputStream out = new ByteArrayOutputStream();
                byte[] buf = new byte[1024];
                int n;
                while ((n = gz.read(buf)) > 0) {
                    out.write(buf, 0, n);
                }
                return out.toByteArray();
            }
        }
        return body;
    }

    private void doSomething(byte[] json) {
        System.out.println(new String(json));
    }
}
