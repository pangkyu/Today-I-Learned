## 모던 자바스크립트 1주차

범위 : Part 1 1.1~1.6

---

### ch2 : object-copy

> 객체와 원시 타입의 근본적 차이 중 하나는 객체는 참조에 의해(by reference)저장되고 복사된다. 이에 반면에 원시값(문자열,숫자,불린 값)은 값 그대로 저장/할당되고 복사된다.

```js
let user = { name: "John" };
let admin = user; // 참조값을 복사한다.
```

- 변수는 2개이지만 각 변수에는 동일 객체에 대한 참조 값이 저장된다.
- 객체에 접근하거나 조작할때는 여러 변수를 사용할 수 있다.

```js
let user = { name: "John" };
let admin = user;
admin.name = "Pete";
alert(user.name); // 'Pete'
```

##### 참조에 의한 비교

- 객체 비교 시 <code>==</code>와 <code>===</code>는 동일하게 동작한다.
- **비교 시 피연산자인 두 객체가 동일한 객체인 경우 참을 반환**

```js
// 두 변수가 같은 객체를 참조할 때
let a = {};
let b = a; // 참조에 의한 복사

alert(a == b); // true, 두 변수는 같은 객체를 참조합니다.
alert(a === b); // true

// 다를 때
let a = {};
let b = {}; // 독립된 두 객체

alert(a == b); // false
```

- 대소 비교나 같은 원시값과의 비교에서는 객체가 원시형으로 변환된다.

##### 객체 복사, 병합과 Object.assign

- 기존 객체와 똑같으면서 독립적인 객체를 만들고 싶을때?
  - 새로운 객체를 만든 다음 기존 객체의 프로퍼티들을 순회하여 원시 수준까지 프로퍼티를 복사하면 된다.

```js
let user = {
  name: "John",
  age: 30,
};
let clone = {};
for (let key in user) {
  clone[key] = user[key];
}
clone.name = "Pete";
alert(user.name); // 가존 객체에는 여전히 John이 남아있다.
alert(clone.name); // 'Pete'
```

- <code>Object.assign</code>를 사용해도 된다.

```js
Object.assign(dest, [src1, src2, src3...])
/*
dest : 목표로 하는 객체
src1 ~ src N : 복사하고자 하는 객체
마지막으로 dest를 반환

*/

let user = {name : 'John'};
let permissions1 = {canView : true};
let permissions2 = {canEdit : true};

Object.assign(user, permissions1, permission2);
// user에는 { name : 'John', canView : true, canEdit : true} 가 들어간다.
// 목표객체에 동일한 이름ㅇ르 가진 프로퍼티가 있는경우에는 기존 값이 덮어씌워진다.
```

- Object.assign을 사용하면 반복문 없이도 간단하게 객체 복사가 가능하다

```js
let user = {
  name: "John",
  age: 30,
};

let clone = Object.assign({}, user);
// user에 모든 프로퍼티가 빈 배열에 복사되고 변수에 할당된다.
```

##### 중첩 객체복사

- 프로퍼티는 다른 객체에 대한 참조 값일 수 있다.

```js
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50,
  },
};
alert(user.sizes.height); // 182
```

- <code>clone.sizes = user.sizes</code>로 프로퍼티를 복사하는 것만으로는 객체를 복제할 수 없다. <code>user.sizes</code>는 객체이기 때문에 참조값이 복사된다. <code>clone.sizes = user.sizes</code>로 프로퍼티를 복사하면 <code>clone</code>과 <code>user</code>는 같은 sizes를 공유한다.
- 이 문제를 해결하기 위해서는 <code>user[key]</code>의 각 값을 검사하면서 그 값이 객체인 경우 객체의 구조도 복사하는 반복문을 사용해야한다. ==> 깊은 복사(deep cloning)
- **자바스크립트 라이브러리 <code>lodash</code>의 메서드인 <code>\_.cloneDeep(obj)</code>를 사용하면 깊은 복사를 처리할 수 있다.**
