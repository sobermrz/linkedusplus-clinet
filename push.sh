npm run build
docker build -f Dockerfile -t andrewhu2013/linkedusplus-client:mi2 .
docker push andrewhu2013/linkedusplus-client:mi2


#docker run -p 80:80 andrewhu2013/linkedusplus-client


#docker run -p 80:80 andrewhu2013/linkedusplus-client:npm

#docker build -f Dockerfile -t andrewhu2013/linkedusplus-client:node .
#docker push andrewhu2013/linkedusplus-client:node
