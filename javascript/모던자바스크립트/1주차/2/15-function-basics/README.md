## 모던 자바스크립트 1주차

범위 : Part 1 1.1~1.6

---

### ch15 : function-basics

- 함수 선언방식을 사용하면 함수를 만들 수 있다.
- 함수의 주요 용도 중 하나는 중복 코드 피하기이다.

```js
function showMessage() {
  alert("안녕");
}
```

##### 지역 변수

- 함수 내에서 선언한 변수인 지역변수(local variable)는 함수 안에서만 접근할 수 있다.

```js
function showMessage() {
  let message = "안녕하세요"; // 지역 변수
  alert(message);
}
showMessage();
alert(message); // error
```

##### 외부 변수

- 함수 내부에서 함수 외부의 변수인 외부변수(outer variable)에 접근/수정할 수 있다.
- 외부 변수는 지역 변수가 없는 경우에만 사용할 수 있다.

```js
let userName = "John";

function showMessage() {
  userName = "Bob"; // (1) 외부 변수를 수정함

  let message = "Hello, " + userName;
  alert(message);
}

alert(userName); // 함수 호출 전이므로 *!*John*/!* 이 출력됨

showMessage();

alert(userName); // 함수에 의해 *!*Bob*/!* 으로 값이 바뀜
```

##### 매개 변수

- 매개변수(parameter)를 이용하면 임의의 데이터를 함수 안에 전달할 수 있다. 인자라고 부르기도 함
- 함수의 매개변수에 전달된 값을 인수(argument)라고 부르기도 한다.

```js
function showMessage(from, text) {
  alert(from + ":" + text);
}
const from = "Ann";
showMessage(from, "hello");
```

##### 기본값

- 함수 호출 시 매개변수에 인수를 전달하지 않으면 그 값은 <code>undefined</code>가 된다.

```js
function showMessage(from, text = "no text given") {
  alert(from + ":" + text);
}
showMessage("Ann"); // Ann: no text given
```

- 매개변수에 값을 전달해도 그 값이 <code>undefined</code>와 엄격히 일치한다면 기본값이 할당된다.

##### 매개변수 기본 값을 설정할 수 있는 또 다른 방법

```js
// 함수 선언 후에 매개변수 기본값을 설정하는 경우
function showMessage(text) {
  if (text === undefined) {
    text = "빈 문자열";
  }
  alert(text);
}
showMessage();

// ||를 사용하는 경우
function showMessage(text) {
  text = text || "빈 문자열";
}

// ??를 사용하는 경우
function showCount(count) {
  alert(count ?? "unknown");
}
showCount(0); // 0
showCount(); // unknown
showCount(null); // unknown
```

##### 반환 값

- 함수를 호출했을 때, 함수를 호출한 그곳에 특정 값을 반환하게 할 수 있다.

```js
function sum(a, b) {
  return a + b;
}
const result = sum(1, 2);
alert(result); // 3
```

- <code>return</code>를 만나면 함수 실행은 즉시 중단되고 함수를 호출한 곳에 값을 반환한다.

```js
// return; 만 반환하면 undefined를 반환한다.
function doNothing() {
  return;
}
alert(doNothing() === undefined); // true
```

##### 함수 이름짓기

- 함수는 어떤 동작을 수행하기 위한 코드를 모아놓은 곳
- 가능한 간결하고 명확해야 하며, 함수 이름만 보고도 어떤 기능을 하는지 힌트를 얻을 수 있어야한다.
- 대게 동사로 이름을 짓는다.
- 함수는 이름에 언급되어 있는 동작을 정확히 수행해야 하고 그 이외의 동작은 수행해서는 안된다.

  - getAge 함수는 나이를 얻어오는 동작만 수행해야 한다. (출력해주는 동작은 들어가면 안된다.)
  - createForm 함수는 form을 만들고 이를 반환하는 동작만 해야한다. (그 외 동작[추가,수정 등]은 들어가면 안된다. )

- 예외인 경우 : $(제이쿼리), \_(lodash)

##### 함수 == 주석

- 함수는 간결하고, 한 가지 기능만 수행하도록 만들어야 한다.
- 함수가 간결하면 테스트와 디버깅이 쉬워진다.
- 그리고 함수 그 자체로 주석의 역할까지 한다.

```js
function showPrimes(n) {
  nextPrime: for (let i = 2; i < n; i++) {
    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }
    alert(i); // 소수
  }
}
```

```js
function showPrimes(n) {
  for (let i = 2; i < n; i++) {
    if (!isPrime(i)) continue;

    alert(i); // a prime
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if (n % i == 0) return false;
  }
  return true;
}
```
