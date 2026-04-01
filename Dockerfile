FROM cgr.dev/chainguard/nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf
COPY . /usr/share/nginx/html

EXPOSE 8080

CMD ["-g", "daemon off;"]
