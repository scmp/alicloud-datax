FROM alpine:latest

COPY src/install.sh /tmp/

RUN /tmp/install.sh

WORKDIR /app/
COPY app/package.json /app/

ARG NPM_CONFIG_REGISTRY
ENV NPM_CONFIG_REGISTRY=$NPM_CONFIG_REGISTRY
RUN npm install
COPY app/. /app/
