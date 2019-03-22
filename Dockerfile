FROM python:3.6-stretch

ENV LANG C.UTF-8

RUN mkdir /django 

RUN apt-get -y update
RUN apt-get install -y python3 python python3-dev python-pip python-dev python-psycopg2 postgresql-client python3-pip vim 

ADD requirements.txt /django/requirements.txt
RUN pip install -r /django/requirements.txt

RUN apt-get -y update && apt-get -y autoremove
WORKDIR /django

EXPOSE 8000