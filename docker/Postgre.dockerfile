FROM postgres:10

ENV POSTGRES_USER elements
ENV POSTGRES_PASSWORD elements
ENV POSTGRES_DB elements
#ENV PGDATA=/var/nway/postgres/data/

#ADD "https://www.random.org/cgi-bin/randbyte?nbytes=10&format=h" skipcache
#COPY init.sql /docker-entrypoint-initdb.d/

EXPOSE 5432