# 면접준비

## frontend

1. RestFul API

- REST(REpresentational State Transfeer) : 전반적인 웹 어플리케이션에서 상호작용하는데 사용되는 웹 아키텍쳐 모델. 자원을 주고받는 웹 상에서의 통신 체계에 있어 범용적인 스타일을 규정한 아키텍쳐이다.
- 자원을 이름으로 구분하여 해당 자원의 상태를 주고받는 모든 것
  - 자원(resource) : 문서, db, 이미지 등 웹에서 사용되는 모든 자료
- API는 Application Programming Interface의 약자로 기존에 있는 응용 프로그램을 통해 데이터를 제공받거나 기능을 사용하고자 할 때 사용하는 인터페이스 및 규격을 말한다.
- URI(Uniform Resource Identifier) : 리소스에 접근할 수 있는 유일한 식별자를 의미한다. uri를 수신하는 기기는 해당 uri에 맞게 데이터를 반환
- API가 RESTful로 간주되기 위한 기준
  - 클라이언트, 서버 및 리소스로 구성되었으며 요청이 http를 통해 관리되는 클라이언트-서버 아키텍쳐
  - stateless 클라이언트-서버 커뮤니케이션
    - stateless : 단일 요청에 대해 하나의 응답(like 자동판매기)
    - stateful : 이전 트랜잭션의 컨텍스트에 따라 수행되며, 현재 트랜잭션이 이전 트랜잭션에서 발생한 상황에 영향을 받음. 사용자에게 받은 요청을 처리할 때마다 같은 서버를 사용. 컨택스트와 내역이 저장되므로 중단되었을 시, 그 곳부터 다시 시작할 수 있다. (like 대화, 온라인 뱅킹 )
- 종류
  - <code>GET</code> : 요청받은 URI의 정보를 검색하여 응답
  - <code>POST</code> : 요청된 자원을 생성
  - <code>DELETE</code> : 요청된 자원을 삭제할 것을 요청
  - <code>PUT</code> : 요청된 자원을(전체를) 수정
  - <code>PATCH</code> : 요청된 자원(일부를) 수정
    - PUT&PATCH 차이점 : PUT의 경우 멱등(아무리 수행되도 같은 요청을 수행), PATCH는 멱등성을 보장할 수 없다.
  - <code>HEAD</code> : GET 방식과 동일, 하지만 응답에 BODY가 존재하지 않고, 응답코드와 HEAD만 응답
  - <code>CONNECT</code> : 동적을오 터널모드를 교환, 프록시 기능을 요청시 사용
    - 터널모드 : IP의 내용과 헤더 모두 보호
  - <code>TRACE</code> : 원격지 서버에 루프백 메세지를 호출하기 위해 테스트용으로 사용
  - <code>OPTIONS</code> : 웹서버에서 지원되는 메서드의 종류를 확인할 경우 사용

2. 브라우저의 렌더링 원리 (네이버, 구글을 주소창에 입력했을 때 어떻게 되나요?)

- 1. HTML을 파싱 후, DOM트리 구축
- 2. CSS를 파싱 후 , CSSOM트리 구축
- 3. 자바스크립트 실행(HTML 중간에 스크립트가 있으면 HTML파싱이 중단됨)
- 4. DOM과 CSSOM을 조합하여 렌더트리를 구축
- 5. 뷰포트를 기반으로 렌더트리의 각 노드가 가지는 정학환 위치와 크기를 계산(Layout 단계)
- 6. 계산한 위치/크기를 기반으로 화면에 그린다.(paint 단계 )

## javascript

1. 호이스팅(hoisting)

- 함수 안에 있는 선언들을 모두 끌어올려서 해당 함수 유효 범위의 최상단에 선언하는 것
- 실제로 코드가 끌어올려지는 것은 아니고, parser가 내부적으로 끌어올려서 처리하는 것
- 실 메모리에는 변화가 없다
- 호이스팅 대상
  - <code>var</code>변수선언과 <code>함수 선언문</code>에서만 호이스팅이 일어난다.
    - var 변수/함수의 선언만 끌어올려짐(할당은 끌어올려지지 않음)
    - let/const 변수 선언과 함수표현식은 호이스팅이 발생하지 않음
- 호이스팅의 우선순위
  - 변수선언이 함수 선언보다 위로 끌어올려진다.

```js
var myName = "hi";
function myName() {
  console.log("yuddomack");
}
function yourName() {
  console.log("everyone");
}
var yourName = "bye";
console.log(typeof myName);
console.log(typeof yourName);
// --- 호이스팅 결과
var myName;
var yourName;
function myName() {
  console.log("yuddomack");
}
function yourName() {
  console.log("everyone");
}
myName = "hi";
yourName = "bye";
console.log(typeof myName); // string
console.log(typeof yourName); // string
```

- 코드 가독성과 유지보수를 위해 호이스팅이 일어나지 않도록 한다.
  - let/const 사용
  - 함수/변수를 가급적 코드 상단부에서 선언하면, 호이스팅으로 인한 스코프 꼬임 현상 방지

## react
