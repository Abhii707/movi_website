FROM nginx


WORKDIR /MYFIRSTPROJECT


COPY . /MYFIRSTPROJECT/
#RUN nginx install

CMD [ "nginx" , "index.html"]

EXPOSE 80
