FROM nginx
COPY devops/default.conf /etc/nginx/conf.d/default.conf
COPY build /usr/share/nginx/html
