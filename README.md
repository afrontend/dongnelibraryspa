## 도서관 책이 대출되었는지 확인하는 웹서비스

## 1. Docker 사용 예
```sh
docker pull frontendwordpress/dongnelibraryspa
docker run -d -p 3000:3000 --name "dongne" frontendwordpress/dongnelibraryspa
docker stop dongne
docker start dongne
docker rm dongne
```

## 2. Node 사용 예
```sh
$ git clone https://github.com/afrontend/dongnelibraryspa
$ cd dongnelibraryspa
$ npm install
$ npm start
```

## 아래 주소로 접속하여 도서 검색

http://localhost:3000/

## Screenshot
[![동네북 웹 서비스](https://afrontend.files.wordpress.com/2016/07/dongne22.png "동네북 스크린 샷")][dls-url]

## 아래 주소로 접속하여 검색 가능
http://dongne.herokuapp.com/

[dl-url]: https://github.com/afrontend/dongnelibrary
[dls-url]: http://dongne.herokuapp.com/
[node-install]: https://nodejs.org/ko/


