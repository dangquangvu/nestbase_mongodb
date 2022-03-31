FROM node:12.10.0-alpine

ARG WORK_DIR=/code
RUN mkdir -p ${WORK_DIR}
COPY . ${WORK_DIR}/
WORKDIR ${WORK_DIR}

RUN apk update && apk upgrade && apk add --no-cache bash git
RUN npm install
RUN npm run build
RUN ls -l
RUN rm -fr node_modules
RUN rm -fr src
RUN npm install --production

ENTRYPOINT  ["npm", "run", "start:prod"]