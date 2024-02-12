# Stage 1: Build
FROM --platform=linux/amd64 node:20.9 as build

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

RUN npm run build

# Stage 2: Run
FROM --platform=linux/amd64 nginx:alpine
ENV NGINX_PORT=8888

RUN echo "user nginx; worker_processes auto;                                            \
                                                                                        \
          error_log /var/log/nginx/error.log warn; pid                                  \
          /var/run/nginx.pid;                                                           \
                                                                                        \
          events { worker_connections 1024; }                                           \
                                                                                        \
          http { include /etc/nginx/mime.types; default_type application/octet-stream;  \
                                                                                        \
          log_format  main  '\$remote_addr - \$remote_user [\$time_local] "\$request" ' \
                            '\$status \$body_bytes_sent "\$http_referer" '              \
                            '"\$http_user_agent" "\$http_x_forwarded_for"';             \
                                                                                        \
          access_log  /var/log/nginx/access.log  main;                                  \
                                                                                        \
          sendfile        on;                                                           \
          keepalive_timeout  65;                                                        \
                                                                                        \
              server {                                                                  \
              location / {                                                              \
                  root   /usr/share/nginx/html;                                         \
                  index  index.html index.htm;                                          \
                  try_files \$uri \$uri/ /index.html;                                   \
              }                                                                         \
                                                                                        \
              location ~ ^/$ {                                                          \
                  rewrite  ^.*$  /index.html  last;                                     \
              }                                                                         \
              location /assets {                                                        \
                  alias /usr/share/nginx/html/assets;                                   \
              }                                                                         \
              location ~* \.(?:png|svg)$ {                                              \
                  root /usr/share/nginx/html;                                           \
                  expires max;                                                          \
                  add_header Cache-Control \"public\";                                  \
              }                                                                         \
              listen       $NGINX_PORT;                                                 \
              server_name  localhost;                                                   \
              error_page   500 502 503 504  /50x.html;                                  \
              location = /50x.html {                                                    \
                  root   /usr/share/nginx/html;                                         \
              }                                                                         \
          }                                                                             \
        }" > /etc/nginx/nginx.conf


COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE $NGINX_PORT

ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]