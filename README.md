동네 도서관 책을 빌릴 수 있는지 확인하는 웹서비스

## 1. Docker
```sh
$ docker pull frontendwordpress/dongnelibraryspa
$ docker run -d -p 3000:3000 --name "dongne" frontendwordpress/dongnelibraryspa
```

`http://localhost:3000/` 주소에 접속하여 도서 검색

### 중지 및 시작
```sh
$ docker stop dongne
$ docker start dongne
```

## 2. Npm
```sh
$ git clone https://github.com/afrontend/dongnelibraryspa
$ cd dongnelibraryspa
$ npm install
$ npm start
```
`http://localhost:3000/` 주소에 접속하여 도서 검색

## 3. Web Service

아래 주소로 설치 없이 바로 사용할 수 있다. 현재는 무료 서버에서 동작함으로 가끔 약 10초의 로딩 시간이 걸릴 수 있다.
http://dongne.herokuapp.com/

[![동네북 웹 서비스](https://agvim.files.wordpress.com/2017/07/dongne23.png "동네북 스크린 샷")][dls-url]

[dls-url]: http://dongne.herokuapp.com/
