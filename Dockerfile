FROM andreysenov/firebase-tools:8.9.2-alpine

USER root

RUN apk update && \
    apk upgrade && \
    apk add --no-cache \
    git