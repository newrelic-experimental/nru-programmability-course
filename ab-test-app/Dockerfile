FROM node:lts

RUN apt-get clean all
RUN apt-get update
RUN apt update

RUN mkdir /mnt/ab-tester
WORKDIR /mnt/ab-tester

COPY ./engine/package.json ./engine/package-lock.json /mnt/ab-tester/

RUN npm ci

COPY ./engine /mnt/ab-tester/

CMD npm install -s newrelic
ENV NEW_RELIC_NO_CONFIG_FILE=true
ENV NEW_RELIC_DISTRIBUTED_TRACING_ENABLED=true
ENV NEW_RELIC_LOG=stdout

ARG NEW_RELIC_APP_NAME="AB-Tester"
ENV NEW_RELIC_APP_NAME="${NEW_RELIC_APP_NAME}"

EXPOSE 3001

ENTRYPOINT [ "node", "./server.js", "config/default/app_config.json"]
