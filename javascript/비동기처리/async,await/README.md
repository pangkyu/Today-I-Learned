# async await

**Promise의 여러 불편한 점**을 해결하기 위해 추가된 문법이다.

- 디버깅에서의 문제점
  - 동일한 이름의 메서드인<code>then()</code>을 연쇄적으로 호출하고 있어서 몇 번째 <code>then</code>에서 문제가 발생한건지 혼란스러울 수 있다.
- 예외처리
  - Promise를 사용하면 <code>catch()</code>메서드를 사용하여 예외처리를 하는데, 동기 코드와 비동기 코드가 섞인 경우 예외처리가 난해하거나 누락되는 경우가 생기기 쉽다.
- 들여쓰기
  - 복잡한 비동기 처리 코드를 작성하다보면 여러개의 Promise를 병렬 혹은 중첩호출하는 경우들이 발생하는데, 이럴 경우 깊은 들여쓰기가 발생할 확률이 높고 코드 가독성이 떨어지게 된다.

**async/await**을 사용하면 비동기 코드를 동기 코드처럼 보이게 작성할 수 있다.

##### 기본 문법

```js
async function 함수명() {
  await 비동기처리메서드();
}
```

비동기 처리 메서드가 꼭 **Promise** 객체를 반환해야 <code>await</code>가 의도한 대로 동작한다.

```js
async function fetchAuthorName(postId) {
  const postResponse = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  const post = await postResponse.json();
  const userId = post.userId;
  const userResponse = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  const user = await userResponse.json();
  return user.name;
}

fetchAuthorName(1).then((name) => console.log("name:", name));
```

- <code>async</code>가 함수 앞에 붙어있으며, <code>Promise</code>를 리턴하는 모든 비동기 함수 호출부 앞에 <code>await</code>이 추가된다.
- <code>await</code>을 사용하면 일반 비동기처럼 바로 다음라인으로 넘어가는 것이 아닌 결과값을 얻을 수 있을 때까지 기다린다.
- 일반 동기 코드 처리와 동일한 흐름으로 코드를 작성할 수 있어 코드 읽기가 수월하다.

##### 예외 처리

동기/비동기 구분없이 <code>try catch</code>로 일관되게 예외처리를 할 수 있다.

네트워크 통신 오류 뿐 아니라 간단한 타입 오류등의 일반 오류도 <code>catch</code>로 잡아낼 수 있으므로 사용하는 것이 좋다.

```js
async function fetchAuthorName(postId) {
  const postResponse = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  const post = await postResponse.json();
  const userId = post.userId;

  try {
    const userResponse = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    const user = await userResponse.json();
    return user.name;
  } catch (err) {
    console.log("Faile to fetch user:", err);
    return "Unknown";
  }
}

fetchAuthorName(1).then((name) => console.log("name:", name));
```
