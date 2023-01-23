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

프로미스 체이닝이 가능한 이유는 <code>promise.then</code>을 호출하면 promise가 반환되기 때문이다.

핸들러가 값을 반환할때는 이 값이 promise의 result가 된다. 따라서, 다음 <code>then</code>은 이 값을 이용해 호출된다.

1. 최초 프로미스 실행
2. 이후 첫번째 <code>then</code>호출
3. 2에서 반환한 값은 다음 <code>then</code>에 전달
4. 쭉 이어진다.

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

**비동기 동작은**항상 promise를 반환하도록 하는 것이 좋다

- 지금은 체인을 확장할 계획이 없더라도 나중에 체인확장이 필요한 경우 쉽게 확장할 수 있기 때문에

```js
fetch("/article/promise-chaining/user.json")
  .then((response) => response.json())
  .then((user) => fetch(`https://api.github.com/users/${users.name}`))
  .then((response) => response.json())
  .then((githubUser) =>
    new Promise(function (resovle, reject) {
      // (*)
      let img = document.createElement("img");
      img.src = githubUser.avatar_url;
      img.className = "promise-avatar-example";
      document.body.append(img);

      setTimeout(() => {
        img.remove();
        resolve(githubUser); // (**)
      }, 3000);
    }).then((githubUser) =>
      alert(`${githubUser.name}의 이미지를 성공적으로 출력했습니다`)
    )
  );
```

<code>(\*)</code>로 표시한 곳의 <code>then</code>핸들러는 <code>setTimeout</code>의 <code>resolve(githubUser)</code>를 호출했을 때 <code>(\*\*)</code>만 처리상태가 되는 <code>new Promise</code>를 반환한다. 체인의 다음 <code>then</code>은 이를 기다린다.

아래와 같이 재사용 가능한 함수로 분리할 수 있다.

```js
function loadJson(url) {
  return fetch(url).then((response) => response.json());
}

function loadGithubUser(name) {
  return fetch(`https://api.github.com/users/${name}`).then((response) =>
    response.json()
  );
}

function showAvatar(githubUser) {
  return new Promise(function (resolve, reject) {
    let img = document.createElement("img");
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  });
}

// 함수를 이용하여 다시 동일 작업 수행
loadJson("/article/promise-chaining/user.json")
  .then((user) => loadGithubUser(user.name))
  .then(showAvatar)
  .then((githubUser) => alert(`Finished showing ${githubUser.name}`));
// ...
```

### 에러 핸들링

Promise가 거부되면 제어 흐름에서 제일 가까운 rejection 으로 넘어가기때문에 쉽게 에러를 처리할 수 있다.

암시적으로 **try catch**가 존재하기 때문에 예외가 발생하면 이곳에서 예외를 잡고 이를 reject처럼 다룬다.

```js
// 위 코드와 아래코드 동일하게 작동한다.
new Promise((resolve, reject) => {
*!*
  throw new Error("에러 발생!");
*/!*
}).catch(alert); // Error: 에러 발생!

new Promise((resolve, reject) => {
*!*
  reject(new Error("에러 발생!"));
*/!*
}).catch(alert); // Error: 에러 발생!
```

##### 다시 던지기

체인 마지막의 <code>catch</code>는 <code>try catch</code>문과 유사한 역할을 한다. <code>try catch</code>에서는 에러를 분석하고 처리할 수 없는 에러라고 판단되면 에러를 다시 던질 수 있는데, <code>promise</code>에서도 유사한 일을 할 수 있음

```js
new Promise((resolve, reject) => {
  throw new Error("에러 발생!");
})
  .catch(function (error) {
    alert("에러가 잘 처리되었다. 정상적으로 실행이 이어진다.");
  })
  .then(() => alert("다음 핸들러가 실행된다. "));
```

- <code>catch</code>안에서 <code>throw</code>를 사용하면 제어 흐름이 가장 가까운 곳에 있는 에러 해들러로 넘어간다. 에러가 성공적으로 처리되면 가장 가까운 곳에 있는 <code>then</code>핸들러로 제어 흐름이 넘어가 실행이 이어진다.

```js
// 실행 순서: catch -> catch
new Promise((resolve, reject) => {

  throw new Error("에러 발생!");

}).catch(function(error) { // (*)

  if (error instanceof URIError) {
    // 에러 처리
  } else {
    alert("처리할 수 없는 에러");

*!*
    throw error; // 에러 다시 던지기
*/!*
  }

}).then(function() {
  /* 여기는 실행되지 않습니다. */
}).catch(error => { // (**)

  alert(`알 수 없는 에러가 발생함: ${error}`);
  // 반환값이 없음 => 실행이 계속됨

});
```

##### <code>catch</code>를 추가하지 못한 경우

```js
new Promise(function () {
  noSuchFunction(); // 존재하지 않는 함수를 호출하기 때문에 에러가 발생함
}).then(() => {
  // 성공상태의 프라미스를 처리하는 핸들러. 한 개 혹은 여러 개가 있을 수 있음
}); // 끝에 .catch가 없음!
```

에러가 발생하면 가장 가까운 rejection 핸들러로 넘어가는데, 위 코드에서는 예외를 처리하는 핸들러가 없기때문에 전역 에러처리가 되어버린다.

브라우저 환경에서는 이런 에러를 <code>unhandledrejection</code>이벤트로 처리할 수 있다.

```js
*!*
window.addEventListener('unhandledrejection', function(event) {
  // unhandledrejection 이벤트엔 두 개의 특수 프로퍼티가 있습니다.
  alert(event.promise); // [object Promise] - 에러를 생성하는 프라미스
  alert(event.reason); // Error: 에러 발생! - 처리하지 못한 에러 객체
});
*/!*

new Promise(function() {
  throw new Error("에러 발생!");
}); // 에러를 처리할 수 있는 .catch 핸들러가 없음
```

### Promise API

<code>Promise</code>클래스에 있는 정적 메서드를 살펴보자.

1. Promise.all
   - 복수의 URL에 동시 요청을 보내고, 다운로드가 모두 완료된 후에 콘텐츠를 처리할 때 사용가능
   - Promise.all은 요소 전체가 Promise인 배열을 받고 새로운 promise를 반환한다.
   - Promise.all에 전달되는 promise중 하나라도 거부되면 에러가 발생한다.

```JS
let promise = Promise.all([...promises...])
```

```js
Promise.all([
  new Promise((resolve) => setTimeout(() => resolve(1), 3000)), // 1
  new Promise((resolve) => setTimeout(() => resolve(2), 2000)), // 2
  new Promise((resolve) => setTimeout(() => resolve(3), 1000)), // 3
]).then(alert); // 프라미스 전체가 처리되면 1, 2, 3이 반환됩니다. 각 프라미스는 배열을 구성하는 요소가 됩니다.
```

- 배열의 요소 순서는 Promise 순서와 상응한다.(처리 결과가 언제 이행되는 것에 상관없음)

```js
let urls = [
  "https://api.github.com/users/iliakan",
  "https://api.github.com/users/Violet-Bora-Lee",
  "https://api.github.com/users/jeresig",
];

// fetch를 사용해 url을 프라미스로 매핑합니다.
let requests = urls.map((url) => fetch(url));

// Promise.all은 모든 작업이 이행될 때까지 기다립니다.
Promise.all(requests).then((responses) =>
  responses.forEach((response) => alert(`${response.url}: ${response.status}`))
);
```

```js
let names = ["iliakan", "Violet-Bora-Lee", "jeresig"];

let requests = names.map((name) =>
  fetch(`https://api.github.com/users/${name}`)
);

Promise.all(requests)
  .then((responses) => {
    // 모든 응답이 성공적으로 이행되었습니다.
    for (let response of responses) {
      alert(`${response.url}: ${response.status}`); // 모든 url의 응답코드가 200입니다.
    }

    return responses;
  })
  // 응답 메시지가 담긴 배열을 response.json()로 매핑해, 내용을 읽습니다.
  .then((responses) => Promise.all(responses.map((r) => r.json())))
  // JSON 형태의 응답 메시지는 파싱 되어 배열 'users'에 저장됩니다.
  .then((users) => users.forEach((user) => alert(user.name)));
```

- 이렇게 코드를 작성하면 id 기준으로 장바구니 목록을 불러올때와 같은 로직에 사용할 수 있음

2. Promise.allSettled

<code>Promise.allSetteld()</code>메서드는 주어진 모든 프로미스를 이행하거나 거부한 뒤, 각 프로미스에 대한 결과를 나타내는 객체 배열을 반환한다.

일반적으로 서로의 성공 여부에 관련 없는 여러 비동기 작업을 수행해야 하거나, 항상 각 프로미스의 실행 결과를 알고 싶을 때 사용한다.

```js
Promise.allSetteld(iterable);
// 멤버가 모두 Promise인, 배열과같은 이터러블 객체이다.
```

```js
Promise.allSettled([
  Promise.resolve(33),
  new Promise((resolve) => setTimeout(() => resolve(66), 0)),
  99,
  Promise.reject(new Error("an error")),
]).then((values) => console.log(values));

// [
//   {status: "fulfilled", value: 33},
//   {status: "fulfilled", value: 66},
//   {status: "fulfilled", value: 99},
//   {status: "rejected",  reason: Error: an error}
// ]
```

성공/실패에 관계없이 일단 배열에 결과값을 담아준다.

3. Promise.race()

가장 먼저 완료된 것의 결과값으로 그대로 이행하거나 거부한다. - 전달받은 이터러블이 비어있는 경우, 반환한 프로미스는 영원히 대기 상태이다. - 프로미스가 아닌 값이나 이미 완료된 프로미스가 포함되어 있는 경우, Promise.race는 전달받은 이터러블에서 처음으로 등장하는 값을 결과값으로 이행한다.

```js
Promise.race(iterable);
```

```js
var p1 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve("하나"), 500);
});
var p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve("둘"), 100);
});

Promise.race([p1, p2]).then(function (value) {
  console.log(value); // "둘"
  // 둘 다 이행하지만 p2가 더 빠르므로
});

var p3 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve("셋"), 100);
});
var p4 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error("넷")), 500);
});

Promise.race([p3, p4]).then(
  function (value) {
    console.log(value); // "셋"
    // p3이 더 빠르므로 이행함
  },
  function (reason) {
    // 실행되지 않음
  }
);

var p5 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve("다섯"), 500);
});
var p6 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error("여섯")), 100);
});

Promise.race([p5, p6]).then(
  function (value) {
    // 실행되지 않음
  },
  function (error) {
    console.log(error.message); // "여섯"
    // p6이 더 빠르므로 거부함
  }
);
```

4. Promise.any

```js
Promise.any(iterable);
```

Promise가 먼저 거부되더라도 이행할 첫 번째 Promise로 이행한다.

- 여러 데이터(ex : 이미지)를 가져오고 사용가능한 첫 데이터를 표시할 때 사용할 수 있다.

```js
const pErr = new Promise((resolve, reject) => {
  reject("Always fails");
});

const pSlow = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, "Done eventually");
});

const pFast = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "Done quick");
});

Promise.any([pErr, pSlow, pFast]).then((value) => {
  console.log(value);
  // pFast fulfills first
});
// Logs:
// Done quick
```

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
