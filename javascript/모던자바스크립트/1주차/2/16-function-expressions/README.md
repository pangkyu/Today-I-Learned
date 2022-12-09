## 모던 자바스크립트 1주차

범위 : Part 1 1.1~1.6

---

### ch16 : function-expressions

- 함수 선언 방식 외에 함수 표현식을 사용하여 함수를 만들 수 있다.

```js
const sayHi = function () {
  alert("hi");
};
```

- 함수를 생성하고 변수에 값을 할당하는 것처럼 함수가 변수에 할당되어있다.
- 함수가 어떤 방식으로 만들어졌는지에 관계없이 함수는 값이고, 따라서 변수에 할당 가능하다.

```js
function sayHi() {
  alert("hi");
}
const func = sayHi; // (1)
func(); // hi
sayHi(); // hi
```

- (1)에서 sayHi를 func에 복사하였는데, 괄호가 없어 sayHi 함수 그 자체를 복사했으며, 만약 괄호가 있었다면 함수호출결과가 func에 저장되었을 것이다.

##### 콜백 함수

```js
// 함수는 반드시 question을 해야하고, 사용자의 답변에 따라 yes()나 no()를 호출한다.
function ask(question, yes, no) {
  if (confirm(question)) yes();
  else no();
}
function showOk() {
  alert("동의");
}
function showCancel() {
  alert("취소");
}
// 사용법 : 함수 showOk와 showCancel이 ask 함수의 인수로 전달
ask("동의하시나요?", showOk, showCancel);
```

- 함수를 함수의 인수로 전달하고, 필요하다면 인수로 전달한 그 함수를 나중에 호출(called back)하는 것이 콜백 함수의 개념

##### 함수 표현식 vs 함수 선언문

1. 문법의 차이
   - 함수 선언문 : 함수는 주요 코드 흐름 중간에 독자적인 구문 형태로 존재
   - 함수 표현식 : 함수는 표현식이나 구문 구성 내부에 생성된다.

```js
// 함수 선언문
function sum(a, b) {
  return a + b;
}

// 함수 표현식
let sum = function (a, b) {
  return a + b;
};
```

2. 자바스크립트 엔진이 언제 함수를 생성하는 지
   - 함수 선언문 : 함수 선언문이 정의되기 전에도 호출할 수 있다.
   - 함수 표현식 : 실제 실행 흐름이 해당 함수에 도달했을 때 함수를 생성
   - 전역 함수 선언문은 스크립트 어디에 있든지 어디에서든 사용할 수 있다.

```js
sayHi("john");
function sayHi(name) {
  alert(`hi, ${name}`);
}
```

- sayHi는 스크립트 실행 준비단계에서 생성되므로, 스크립트 내 어디섣느 접근할 수 있다.

```js
sayHi("john"); // error
const sayHi = function (name) {
  alert(`hi, ${name}`);
};
```

- 함수 표현식은 실행 흐름이 표현식에 도착해야 만들어진다.

3. 스코프
   - 엄격 모드에서 함수 선언문이 코드 블록 내에 위치하면 해당 함수는 블록 내 어디섣느 접근 가능하다. 그러나 블록 밖에서는 함수에 접근하지 못한다.

```js
// 함수 선언문을 사용하면 의도대로 코드가 동작하지 않음
let age = prompt("나이를 알려주세요.", 18);

// 조건에 따라 함수를 선언함
if (age < 18) {
  function welcome() {
    alert("안녕!");
  }
} else {
  function welcome() {
    alert("안녕하세요!");
  }
}

// 함수를 나중에 호출합니다.
welcome(); // Error: welcome is not defined
```

```js
let age = prompt("나이를 알려주세요.", 18);

let welcome;

if (age < 18) {
  welcome = function () {
    alert("안녕!");
  };
} else {
  welcome = function () {
    alert("안녕하세요!");
  };
}

welcome(); // 제대로 동작합니다.
```
