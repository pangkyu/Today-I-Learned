## 모던 자바스크립트 1주차

범위 : Part 1 1.1~1.6

---

### ch6 : contructor-new

##### new 연산자와 생성자 함수

- 객체 리터럴 <code>{...}</code>을 사용하면 객체를 쉽게 만들 수 있다.
- 그러다보면 유사한 객체를 여러 개 만들어야 할 때가 생기는데 => <code>new</code>연산자와 생성자 함수를 사용하면 유사한 객체 여러 개를 쉽게 만들 수 있다.

##### 생성자함수

- constructor function은 두 개의 관례를 따른다.
  1. 함수 이름의 첫 글자는 대문자로 시작한다
  2. 반드시 <code>new</code>연산자를 붙여 실행한다.

```js
function User(name) {
  this.name = name;
  this.isAdmin = false;
}
let user = new User("보라");
alert(user.name); // 보라
alert(user.isAdmin); // false
/*
1. 빈 객체를 만들어 this에 할당한다. 
2. 함수 본문을 실행한다. this에 새로운 프로퍼티를 추가하여 this를 수정한다. 
3. this를 반환한다. 
*/
```

- 객체 리터럴 문법으로 일일이 객체를 만든느 방법보다 훨씬 간단하고 읽기 쉽게 객체를 만들 수 있다.
- 생성자의 의의 : 재사용할 수 있는 객체 생성 코드를 구현

##### new.target과 생성자 함수

- <code>new.target</code>프로퍼티를 사용하여 함수가 <code>new</code>와 함께 호출되었는지 아닌지 알 수 있다.
- 일반적인 방법으로 함수 호출했다면 <code>new.target</code>은 <code>undefined</code>를 반환한다.
- 반면, <code>new</code>와 함께 호출한 경우에는 <code>new.target</code>은 함수 자체를 반환해준다.

```js
function User() {
  alert(new.target);
}
User(); // undefined
new User(); // function User{...}
```

- 함수 본문에서 <code>new.target</code>을 사용하면 해당 함수가 <code>new</code>와 함께 호출되었는지(in constructor mode) 아닌지(in regular mode)를 확인할 수 있다.

```js
function User(name) {
  if (!new.target) {
    // new 없이 호출해도
    return new User(name); // new를 붙여줍니다
  }
  this.name = name;
}
let bora = User("보라"); // new User를 쓴 것처럼 바꿔준다.
alert(bora.name); // 보라
```

- <code>new</code>를 생략해서 객체를 만드는 것은 정말 필요한 경우에만 사용하고 남발하지 않는 것이 좋다.

##### 생성자와 리턴문

- 생성자 함수에는 보통 <code>return</code>문이 없다. 반환해야 할 것은 모두 <code>this</code>에 저장되고, <code>this</code>는 자동으로 반환되기 때문에 반환문을 명시적으로 써 줄 필요가 없다.
- 만약 리턴문이 있다면?
  - 객체를 <code>return</code>한다면 this 대신 객체가 반환된다.
  - 원시형을 <code>return</code>한다면 return문이 무시된다.
- return뒤에 객체가 오면 생성자 함수는 해당 객체를 반환해주고, 이 외의 경우는 <code>this</code>가 반환된다.

```js
function BigUser() {
  this.name = "원숭이";
  return { name: "고릴라" }; // <- this가 아닌 새로운 객체를 반환
}
alert(new BigUser().name); // 고릴라
```

```js
function SmallUser() {
  this.name = "원숭이";
  return; // <- this를 반환
}
alert(new SmallUser().name); // 원숭이
```

##### 생성자 내 메서드

- 생성자 함수를 사용하면 매개변수를 이용해 객체 내부를 자유롭게 구성할 수 있다.
- 메서드를 더해주는 것도 가능하다.

```js
function User(name) {
  this.name = name;
  this.sayHi = function () {
    alert("제 이름은" + this.name + "입니다.");
  };
}
let bora = new User("이보라");
bora.sayHi();
```
