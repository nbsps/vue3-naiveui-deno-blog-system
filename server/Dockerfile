FROM denoland/deno:1.15.3

EXPOSE 16666

WORKDIR /usr/app

COPY ./deps.ts .

RUN deno cache --unstable deps.ts

COPY . .

RUN deno cache --unstable server.ts

CMD [ "run", "--unstable", "--allow-net", "--allow-write", "--allow-read", "--allow-env", "server.ts" ]
