# Firehose Receiver in Java

To run the project you need to have Java and Maven installed.

Alternately you can use the provided Docker image.
Run:
```
$ docker build --tag=firehose-receiver-java .
$ docker run -p 3001:3001 firehose-receiver-java
```

In either case a Java server listening to port 3001 should start running. The endpoint `/webhook` is ready to receive gzipped JSON POST requests.

Try the curl call from our documentation (https://docs.sentiance.com/guide/firehose#testing).
