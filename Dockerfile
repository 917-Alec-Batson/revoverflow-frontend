FROM nginx
COPY devops/default.conf /etc/nginx/conf.d/default.conf
RUN chmod -R +r /usr/share/nginx/html
COPY build /usr/share/nginx/html
