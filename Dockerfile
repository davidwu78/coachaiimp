# build frontend static files
FROM silverwing1997/coachai_frontend AS build-stage

# set variables
ARG HOST
ARG DOMAIN
ARG PORT_MAIN
ARG PORT_SPEED

# copy files
RUN mkdir -p /output

WORKDIR /APP

COPY . .

RUN printf "REACT_APP_ALL_SET=0\n\
REACT_APP_API_URL='${HOST}:${PORT_MAIN}/api'\n\
REACT_APP_API_URL_SPEED='${HOST}:${PORT_SPEED}/api'\n\
REACT_APP_ROOT='${HOST}:${PORT_MAIN}'\n\
" > .env.production

# copy dependency
RUN cp -Rf /ENVDIR/node_modules ./

RUN cp -f /ENVDIR/yarn.lock ./

# build frontend package
RUN yarn install

RUN yarn build

#ENTRYPOINT ["/bin/bash"]

# run nginx
FROM nginx:1.15

# set variables
ARG HOST
ARG DOMAIN
ARG PORT_MAIN
ARG PORT_SPEED

ENV HOST=${HOST}
ENV DOMAIN=${DOMAIN}
ENV PORT_MAIN=${PORT_MAIN}
ENV PORT_SPEED=${PORT_SPEED}

# removing default nginx config file
RUN rm /etc/nginx/conf.d/default.conf

# copying our nginx config
#RUN cp -f /nginx.conf /etc/nginx/conf.d/

# copying production build from last stage to serve through nginx'
COPY --from=build-stage /APP/build/ /usr/share/nginx/html

EXPOSE 55000 55001

CMD ["nginx", "-g", "daemon off;"]

#ENTRYPOINT ["/bin/bash"]
