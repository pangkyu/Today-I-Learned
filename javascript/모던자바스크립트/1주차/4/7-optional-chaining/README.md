## 모던 자바스크립트 1주차

범위 : Part 1 1.1~1.6

---

### ch7 : 옵셔널 체이닝

> 옵셔널 체이닝 <code>?.</code>을 이용하면 프로퍼티가 없는 중첩 객체를 에러 없이 안전하게 접근할 수 있다.

##### 옵셔널 체이닝이 필요한 이유

```js
// 사용자 중 몇 명이 주소정보를 가지고 있지 않을 때, 주소정보에 접근하면 에러가 발생할 수 있다.
let user = {}; // 주소 정보가 없는 사용자
alert(user.address.street); //  TypeError: Cannot read property 'street' of undefined
```

```js
// 자바스크립트를 사용하여 페이지에 존재하지 않는 요소에 접근하여 정보를 가져오려할 때 문제가 발생
let html = document.querySelector(".my-element").innerHTML; // 쿼리셀렉터 호출 결과가 null인 경우 에러가 발생한다
```

- 명세서에 <code>?.</code>이 추가되기 전에는 문제해결을 위해 <code>&&</code>연산자를 사용했다.
- AND연산자를 사용하면 코드가 길어진다는 단점이 있다.

```js
let user = {};
alert(user && user.address && user.address.street); // undefined, 에러가 발생하지 않음
```

##### 옵셔널 체이닝의 등장

- <code>?.</code>은 <code>?.</code>'앞'의 평가대상이 undefined나 null이면 평가를 멈추고 <code>undefined</code>를 반환한다.

```js
let user = {}; // 주소 정보가 없는 사용자
alert(user?.address?.street); // undefined, 에러가 발생하지 않음
```

```js
let user = null;
alert(user?.address); // undefined
alert(user?.address.street); // undefined
/*
user가 null이나 undefined가 아니고 실제 값이 존재하는 경우에는 반드시 user.address 프로퍼티는 있어야 한다. 그렇지 않으면 user?.address.street의 두 번째 점 연산자에서 에러 발생한다. 
*/
```

- 옵셔널 체이닝은 선언이 완료된 변수를 대상으로만 동작한다.
- <code>?.</code>는 왼쪽 평가대상에 값이 없으면 즉시 평가를 멈춘다. (단락 평가)

```js
// ?.()와 ?.[]
// ?.은 함수나 대괄호와 함께 동작하는 특별한 문법 구조체이다.
let user1 = {
  admin() {
    alert("관리자 계정이다.");
  },
};
let user2 = {};
user1.admin?.(); // 관리자 계정이다
user2.admin?.();
```

- <code>.</code>대신 대괄호를 사용해 객체 프로퍼티에 접근하는 경우에는 <code>?.[]</code>를 사용할 수도 있다.

```js
let user1 = {
  firstName: "Violet",
};
let user2 = null;
let key = "firstName";

alert(user1?.[key]); // Violet
alert(user2?.[key]); // undefined
alert(user1?.[key]?.something?.not?.existing); // undefined
```

- <code>?.</code>은 delete와 조합하여 사용할 수 있다.

```js
delete user?.name; // user가 존재하면 user.name을 삭제한다.
```

- <code>?.</code>은 읽기/삭제는 할 수 있지만 쓰기에는 사용할 수 없다.
- <code>?.</code>은 할당 연산자 왼쪽에서 사용할 수 없다.

```js
user?.name = 'Violet'; // SyntaxError: Invalid left-hand side in assignment
// 에러가 발생하는 이유 : undefined = 'Violet'이 되기 때문
```

```md
1. `obj?.prop` -- `obj`가 존재하면 `obj.prop`을 반환하고, 그렇지 않으면 `undefined`를 반환함
2. `obj?.[prop]` -- `obj`가 존재하면 `obj[prop]`을 반환하고, 그렇지 않으면 `undefined`를 반환함
3. `obj?.method()` -- `obj`가 존재하면 `obj.method()`를 호출하고, 그렇지 않으면 `undefined`를 반환함
```
