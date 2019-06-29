FROM node
WORKDIR /usr/app
COPY . .
RUN npm install
RUN sed -i 's/\r$//' ./start.sh  && \  
      chmod +x ./start.sh
ENTRYPOINT ./start.sh 