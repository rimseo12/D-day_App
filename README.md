![header](https://capsule-render.vercel.app/api?type=wave&color=auto&height=200&section=header&text=D-day%20&fontSize=60)

![badge](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=MongoDB&logoColor=white)
![badge](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white)
![badge](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white)
![badge](https://img.shields.io/badge/React%20Router-CA4245?style=flat-square&logo=React%20Router&logoColor=white)

## 프로젝트 설명

D-day는 상품을 등록하여 물건/음식 유통기한 알림 서비스입니다.
- 상품 리스트를 조회 할 수 있다.
- 상품 리스트를 상품명으로 검색 할 수 있다.
- 상품을 등록할 수 있다.
- 상품을 수정 및 삭제 할 수 있다.
- 삭제한 상품을 조회 할 수 있다.
- 상품을 영구 삭제 및 복구를 할 수 있다.
- 상품의 유효기간이 지난 경우, 1일 남았을 경우 알림을 받을 수 있다.

## 컴포넌트 구조

핵심 컴포넌트 관계도를 정의했습니다.

- /pages/home/components/Home.js
- /pages/home/components/shared/
  - ProductList.js
  - SearchInput.js
  - ModalLayout.js
- /pages/menu/
  - LeftMenu.js
- /pages/sub/components/TrashList.js

## 실행 방법

```sh
exp-tracker\api> node app.js
exp-tracker\client> npm start
```

## 주요 흐름

핵심 흐름과 그에 따라 기술적으로 구현 한 것들을 나열했습니다.

| Step | Technical Steps |
| ------ | ------ |
| 상단메뉴의 "홈" 클릭 | 상품 리스트 GET API 호출 |
| 상품 등록 클릭 | 상품 등록 POST API호출 |
| 이미지 업로드 | 상품 이미지 등록 POST API 호출 |
| 상품 수정 클릭 | 상품명, 유효기간, 이미지 수정 POST 호출 |
| 상품 삭제 클릭 | 상품 삭제 PUT API 호출 |
| 상품 영구 삭제 클릭 | 휴지통에 있는 상품 전체 삭제 및 선택 삭제 DELETE API 호출 |
| 휴지통에서 메인 리스트로 돌려놓기 | 선택된 상품을 메인 리스트로 이동 PUT API 호출 |


구현하면서 새로 알게 된 지식 및 설치 순서를 정리했습니다.<br/>
https://www.notion.so/bf460cbd7bb9487498dfe78c79e07d8c
