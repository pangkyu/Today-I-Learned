# Promise

- ES6에서 Promise가 도입되어 사용되기 전에는 주로 콜백함수를 다른 함수의 인자로 넘겨서 비동기 처리를 코딩했었다. 하지만 콜백 지옥이라는 문제점으로 인해 여러 방법이 논의되었고 거기서 나온 해결법 중 하나가 <code>Promise</code>이다.

- Promise는 현재 당장 얻을 수는 없으나, 근 미래에 얻을 수 있는 어떤 데이터에 접근하기 위한 방법을 제공한다
- I/O나 네트워크를 통해 데이터를 얻는 경우가 대표적인데, CPU에 의해 실행되는 코드 입장에서 엄청나게 긴 지연 시간으로 여겨지기 때문에 논블로킹을 지향하는 자바스크립트에서는 비동기 처리가 필수적이다.

### 생성방법

```js
const promise = new Promise(function (resolve, reject) {
  // code(executor)
});
```

<code>new Promise</code>에 전달되는 함수는 executor(실행자, 실행함수)라고 부른다. <code>new Promise</code>가 만들어질 때 자동으로 실행되는데, 결과를 최종적으로 만들어내는 제작 코드를 포함한다.

executor의 인수 <code>resolve</code>와 <code>reject</code>는 자바스크립트에서 자체 제공하는 콜백이다. 개발자는 executor인 코드만 작성하면 된다. 대신 executor에서는 결과를 즉시 얻어가든, 늦게 얻어가든 상관없이 상황에 따라 인수로 넘겨준 콜백 중 하나를 반드시 호출해야 한다. - <code>resolve(value)</code> : 일이 성공적으로 끝난 경우 그 결과를 나타내는 <code>value</code>와 함께 호출 - <code>reject(error)</code> : 에러 발생시 에러 객체를 나타내는 <code>error</code>와 함께 호출

<code>new Promise</code>생성자가 반환하는 <code>Promise</code>객체는 다음과 같은 내부 프로퍼티를 갖는다.

- <code>state</code> : 처음엔 <code>pending</code>(보류)였다. <code>resolve</code>가 호출되면 <code>fulfilled</code>, <code>reject</code>가 호출되면 <code>rejected</code>로 변한다.
- <code>result</code> 처음엔 <code>undefined</code>이다. <code>resolve(value)</code>가 호출되면 <code>value</code>로, <code>reject(error)</code>가 호출되면 <code>error</code>로 변한다.

```js
function devide(numA, numB) {
  return new Promise((resolve, reject) => {
    if (numB === 0) reject(new Error("Unable to devide by 0"));
    else resolve(numA / numB);
  });
}
devide(8, 2)
  .then((result) => console.log("성공", result))
  .catch((error) => console.log("실패 : ", error));
// 결과 : 성공 : 4
devide(8, 0)
  .then((result) => console.log("성공:", result))
  .catch((error) => console.log("실패:", error));
/* 결과 : 실패: Error: Unable to devide by 0.
    at Promise (<anonymous>:4:20)
    at new Promise (<anonymous>)
    at devide (<anonymous>:2:12)
    at <anonymous>:1:1 */
```

- 정상적인 인자를 넘긴 경우<code>then()</code>메서드가 호출되고 비정상적 인자를 넘긴 경우 <code>catch()</code>메서드가 호출된다.

### Promise 사용 방법

REST API를 호출할 때 사용되는 브라우저 내장 함수<code>fetch()</code>가 대표적이다.

##### REST API란?

Representational State Transfer API의 줄임말로 다음과 같이 구성되어있다.

- 자원(Resource) - URI
- 행위(Verb) - Http method
- 표현(Representations)

REST API 설계 시 가장 중요한 항목은 다음 2가지로 정리할 수 있다.

1. URI는 정보의 자원을 표현해야한다.
2. 자원에 대한 행위는 HTTP Method(GET, POST, PUT, DELETE)로 표현한다.

<code>fetch()</code>는 네트워크 레이턴시때문에 바로 결과값을 얻을 수 없기 때문에 Promise를 사용 목적에 정확하게 쓸 수 있다.

```js
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => console.log("response", response))
  .catch((error) => console.log("error", error));

/* 실행결과
response: Response {type: "cors", url: "https://jsonplaceholder.typicode.com/posts/1", redirected: false, status: 200, ok: true, …}

/*
```

- 유효한 URL을 <code>fetch</code>에 넘겼기 때문에 예외가 발생하지 않았다.(유효하지 않은 URL을 넘기면 catch메서드가 호출됨 )

### Promise의 메서드 체이닝

<code>then()</code>, <code>catch()</code> 메서드는 또 다른 Promise 객체를 리턴한다. 그리고 이 Promise 객체는 인자로 넘긴 콜백 함수의 리턴값을 다시 <code>then()</code>, <code>catch()</code>메서드를 통해 접근할 수 있도록 한다.

```js
// 단순한 응답 결과가 아닌 응답 전문을 json으로 출력하고 싶은 경우에 then을 추가연결한다
fetch("http://43.201.103.199/posts/")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.log("err : ", error));
```

```js
// 포스팅을 작성한 userId 1을 가진 데이터가 필요한 경우 다음과 같이 작성할 수 있다.
// line 3 : 콜백 함수는 post 객체에서 userId 필드만 추출하여 리턴하고 있다
// line 4 : userId를 가지고 유저 상세 조회를 위한 API의 url을 만들어ㅓㅅ 리턴한다.
// line 5 : url을 가지고 fetch()함수를 호출하여 새로운 Promise를 리턴하고 있다.
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => response.json())
  .then((post) => post.userId)
  .then((userId) => "https://jsonplaceholder.typicode.com/users/" + userId)
  .then((url) => fetch(url))
  .then((response) => response.json())
  .then((user) => console.log("user:", user))
  .catch((error) => console.log("error:", error));
```

- Promise를 이용해서 계속되는 메서드 체이닝 코딩 스타일은 최근 <code>async/await</code>키워드를 사용하는 방식으로 대체되는 추세이다.

---

### 응용

##### loadScript

스크립트 로딩에 사용되는 함수이다.

```js
// 콜백 버전
function loadScript(src, callback) {
  let script = document.createElement("script");
  script.src = src;
  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`${src}를 불러오는 중 에러 발생`));

  document.head.append(script);
}
```

```js
// 프로미스 버전
function loadScript(src) {
  return new Promise(function (resolve, reject) {
    let script = document.createElement("script");
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () =>
      reject(new Error(`${src}를 불러오는 도중 에러 발생`));

    document.head.append(script);
  });
}

let promise = loadScript(
  "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js"
);
promise.then(
  (script) => alert(`${script.src}을 불러왔습니다`),
  (error) => alert(`error : ${error.message}`)
);
promise.then((script) => alert("또다른 핸들러 "));
```

Promise

- 흐름이 자연스럽다
  - <code>loadScript</code>로 스크립트를 읽고, 결과에 따라 그다음(<code>then</code>)에 무엇을 할지 코드를 작성하면 된다.
- promise에 원하는 만큼 then을 호출할 수 있다.

Callback

- <code>loadScript(script, callback)</code>를 호출할 때, 함께 호출할 <code>callback</code>함수가 준비되어 있어야 한다. <code>loadScript</code>를 호출하기 전에 호출 결과로 무엇을 할지 미리 알고있어야 한다.
- 하나의 콜백만 사용가능
