## 도서관 책이 대출되었는지 확인하는 웹서비스

## 1. Docker 사용한 설치
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

## 2. Npm 사용한 설치
```sh
$ git clone https://github.com/afrontend/dongnelibraryspa
$ cd dongnelibraryspa
$ npm install
$ npm start
```
`http://localhost:3000/` 주소에 접속하여 도서 검색

## 3. 설치 없이 바로 사용

아래 주소로 설치 없이 바로 사용할 수 있다. 현재는 무료 서버에서 동작함으로 가끔 약 15초의 로딩 시간이 걸릴 수 있다.
http://dongne.herokuapp.com/

[![동네북 웹 서비스](https://afrontend.files.wordpress.com/2016/07/dongne22.png "동네북 스크린 샷")][dls-url]

[dls-url]: http://dongne.herokuapp.com/


