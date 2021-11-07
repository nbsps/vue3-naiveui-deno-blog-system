FROM denoland/deno:1.15.3

EXPOSE 16666

RUN deno install -qAf --unstable https://deno.land/x/denon/denon.ts

WORKDIR /usr/app

COPY ./deps.ts .

RUN deno cache --unstable deps.ts

COPY . .

RUN deno cache --unstable server.ts

ENTRYPOINT [ "/usr/local/bin/denon" ]

CMD [ "run", "--unstable", "--allow-net", "--allow-write", "--allow-read", "--allow-env", "server.ts" ]
