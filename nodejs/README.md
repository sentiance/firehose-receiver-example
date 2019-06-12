# Firehose Receiver in NodeJS

To run the project you need to have NodeJS 8.xx or greater installed. You can get pre-built binaries from https://nodejs.org/en/download/ or use nvm (https://github.com/nvm-sh/nvm).

Alternately you can use the provided Docker image.
Run:
```
$ docker build --tag=firehose-receiver-nodejs .
$ docker run -p 3001:3001 firehose-receiver-nodejs
```

In either case a Node server listening to port 3001 should start running. The endpoint `/webhook` is ready to receive gzipped JSON POST requests.

Try the curl call from our documentation (https://docs.sentiance.com/guide/firehose#testing).
