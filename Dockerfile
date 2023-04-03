#Baseimage
FROM node:19-alpine
#Working directory
WORKDIR /app

#Copy pacakge.json to /app
COPY package.json . 
#npm install
RUN npm install
#Copy all files 
COPY . .
#port expose
EXPOSE 3000
#run the code
CMD ["npm" , "start"]