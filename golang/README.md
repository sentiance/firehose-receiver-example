# Firehose Receiver in Go

To run the project you need to have Go 1.12 or greater installed.

Alternately you can use the provided Docker image.
Run:
```
$ docker build --tag=firehose-receiver-go .
$ docker run -p 3001:3001 firehose-receiver-go
```

In either case a Go server listening to port 3001 should start running. The endpoint `/webhook` is ready to receive gzipped JSON POST requests.

Try the curl call from our documentation (https://docs.sentiance.com/guide/firehose#testing).
