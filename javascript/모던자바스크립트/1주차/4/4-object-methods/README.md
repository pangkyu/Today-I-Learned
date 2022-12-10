## 모던 자바스크립트 1주차

범위 : Part 1 1.1~1.6

---

### ch4 : object methods

##### 메서드와 this

- 객체는 사용자(user), 주문(order) 등과 같이 실제 존재하는 개체를 표한하고자 할 때 생성한다.
- 자바스크립트에서는 객체의 프로퍼티에 함수를 할당해 객체에게 행동할 수 있는 능력을 준다.

```js
let user = {
  name: "John",
  age: 30,
};
```

##### 메서드 만들기

```js
let user = {
  name: "John",
  age: 30,
};
user.sayHi = function () {
  alert("하이");
};
user.sayHi(); // 하이
```

- 객체 프로퍼티에 할당된 함수를 메서드라고 부른다.
- 객체를 사용하여 개체를 표현하는 방식을 객체 지향 프로그래밍(object-oriented programming, OOP)이라고 부른다.

```js
// 함수 선언
function sayHi() {
  alert("하이");
}
// 선언된 함수를 메서드로 등록
user.sayHi = sayHi;
user.sayHi(); // 하이
```

##### 메서드 단축 구문

```js
// 아래 두 객체는 동일하게 동작
user = {
  sayHi: function () {
    alert("hi");
  },
};

// 단축구문
user = {
  sayHi() {
    alert("hi");
  },
};
```

- function을 생략해도 메서드 정의할 수 있다.

##### 메서드와 this

- 메서드는 객체에 저장된 정보에 접근할 수 있어야 제 역할을 할 수 있다.
- 대부분의 메서드가 객체 프로퍼티의 ㄱ밧을 활용한다.
- 메서드 내부에서 <code>this</code> 키워드를 사용하면 객체에 접근할 수 있다.

```js
let user = {
  name: "John",
  age: 30,
  sayHi() {
    alert(this.name); // this는 현재객체를 나타냄
  },
};
user.sayHi(); // John
```

- <code>this</code>를 사용하지 않고 외부 변술르 참조해도 객체접근이 가능하다.

```js
let user = {
  name: "John",
  age: 30,
  sayHi() {
    alert(user.name);
  },
};
// 하지만 외부 변수를 사용하여 참조할 경우에 예상치 못한 에러가 발생할 수 있다.
// user를 복사하여 다른 변수에 할당하고 user를 다른 값으로 덮어쓰면 sayHi()는 다른 값을 참조한다.
```

##### 자유로운 this

- 자바스크립트의 <code>this</code>는 모든 함수에서 사용할 수 있다.
- <code>this</code>값은 런타임에 결정된다.(컨텍스트에 따라 달라짐)

```js
let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert(this.name);
}
// 별개의 객체에서 동일한 함수를 사용
user.f = sayHi;
admin.f = sayHi;

// this는 점 앞의 객체를 참조하기 때문에 this값이 다름
user.f(); // John
admin.f(); // Admin
admin["f"](); // Admin (점과 대괄호는 동일하게 동작)
```

- [this 문법정리](https://velog.io/@pangkyu/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-this)
