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
