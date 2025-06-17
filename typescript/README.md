# Firehose Receiver in TypeScript

To run the project you need to have NodeJS 8.xx or greater installed together with `ts-node`.

Alternately you can use the provided Docker image.
Run:
```
$ docker build --tag=firehose-receiver-typescript .
$ docker run -p 3001:3001 firehose-receiver-typescript
```

In either case a Node server listening to port 3001 should start running. The endpoint `/webhook` is ready to receive gzipped JSON POST requests.

Try the curl call from our documentation (https://docs.sentiance.com/guide/firehose#testing).
