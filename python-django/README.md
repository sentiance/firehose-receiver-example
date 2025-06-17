# Firehose Receiver in Python (Django)

To run the project you need Python 3 and Django installed.

Alternately you can use the provided Docker image.
Run:
```
$ docker build --tag=firehose-receiver-django .
$ docker run -p 3001:3001 firehose-receiver-django
```

In either case a Django server listening to port 3001 should start running. The endpoint `/webhook` is ready to receive gzipped JSON POST requests.

Try the curl call from our documentation (https://docs.sentiance.com/guide/firehose#testing).
