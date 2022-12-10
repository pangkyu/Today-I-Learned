## 모던 자바스크립트 1주차

범위 : Part 1 1.1~1.6

---

### ch9 : 객체를 원시형으로 변환하기

- <code>obj.toString()</code>만 사용해도 '모든 변환'을 다 다룰 수 있기 때문에 실무에서 충분한 경우가 많다. 로깅이나 디버깅 목적으로도 자주 사용된다.
- 객체-원시형 형변환은 hint를 기준으로 3종류로 구분할 수 있다.
  - string : alert같이 문자열을 필요로 하는 연산
  - number : 수학연산
  - default : 드물게 발생

##### ToPrimitive

- 특수 객체 메서드를 사용하면 숫자형이나 문자형으로의 형 변환을 원하는 대로 조절할 수 있다.

- <code>string</code> : <code>alert</code> 함수같이 문자열을 기대하는 연산을 수행할 때는(객체-문자형 변환), hint가 <code>string</code>이 된다.

```js
// 객체를 출력하려고 함
alert(obj);

// 객체를 프로퍼티 키로 사용하고 있음
anotherObj[obj] = 123;
```

- <code>number</code> : 수학연산을 적용하려 할 때 (객체-숫자형 변환), hint는 number가 된다.

```js
// 명시적 형 변환
let num = Number(obj);

// (이항 덧셈 연산을 제외한)수학연산
let n = +obj; // 단항 덧셈 연산
let delta = date1 - date2;

// 대소 비교하기
let greater = user1 > user2;
```

- <code>default</code> : 연산자가 기대하는 자료형이 확실치 않을 때, hint는 default가 된다.

```js
// 이항 덧셈 연산은 hint로 default를 사용한다.
let total = obj1 + obj2;

// obj == number 연산은 hint로 default를 사용한다.
if( user == 1 ) { ... };
```

```js
let user = {
  name: "John",
  money: 1000,
  [Symbol.toPrimitive](hint) {
    alert(`hint : ${hint}`);
    return hint == "string" ? `{name : "${this.name}'}` : this.money;
  },
};
alert(user); // hint: string -> {name: "John"}
alert(+user); // hint: number -> 1000
alert(user + 500); // hint: default -> 1500
```

- <code>user</code>는 hint에 따라 (자기 자신을 설명해주는)문자열로 변환되가도 하고 (갖고 있는 돈의 액수를 나타내는)숫자로 변환되기도 한다.
- <code>user[Symbol.toPrimitive]</code>를 사용하면 메서드 하나로 모든 종류의 형 변환을 다룰 수 있다.

##### toString과 valueOf

- 이 메소드를 사용하면 구식이나 형 변환을 직접 구현할 수 있다.
- 객체에 <code>Symbol.toPrimitive</code>가 없으면 아래 규칙에 따라 toString이나 valueOf를 호출한다.
  - hint가 'string'인 경우 : <code>toString -> valueOf</code> 순 (toString이 있으면 toString을 호출, toString이 없다면 valueOf를 호출함)
  - 그 외 : <code>valueOf -> toString </code> 순

```js
let user = { name: "John" };
alert(user); // [object Object]
alert(user.valueOf() === user); // true
```

- 아래 user는 toString과 valueOf를 조합하여 만들었다. Symbol.toPrimitive를 사용한 위쪽 예시와 동일하게 동작한다.

```js
let user = {
  name: "John",
  money: 1000,

  // hint가 "string"인 경우
  toString() {
    return `{name: "${this.name}"}`;
  },

  // hint가 "number"나 "default"인 경우
  valueOf() {
    return this.money;
  },
};

alert(user); // toString -> {name: "John"}
alert(+user); // valueOf -> 1000
alert(user + 500); // valueOf -> 1500
```

- 모든 형 변환을 한 곳에서 처리해야 하는 경우
- toString만 구현하면 된다.
- 객체에 Symbol.toPrimitive와 valueOf가 없으면 toString이 모든 형 변환을 처리한다.

```js
let user = {
  name: "John",

  toString() {
    return this.name;
  },
};

alert(user); // toString -> John
alert(user + 500); // toString -> John500
```

##### 반환 타입

- 위에서 소개한 3개의 메서드는 hint에 명시된 자료형으로의 형 변환을 보장해 주지 않는다.
- 확신할 수 있는 단 한 가지는 객체가 아닌 원시값을 반환해 준다는 것 뿐이다.
- 반면, Symbol.toPrimitive는 무조건 원시자료를 반환해야 한다. 아닐 시 에러가 발생한다.

##### 추가 형 변환

- 객체가 피연산자일 때는 다음과 같은 단계를 거쳐 형 변환이 일어난다.
  1. 객체는 원시형으로 변화된다.
  2. 변환 후 원시값이 원하는 형이 아닌 경우에는 또다시 형 변환이 일어난다.

```js
/*
1. obj * 2 에서는 객체가 원시형으로 변화되므로 toString에 의해 obj는 문자열 '2'가 된다. 
2. 곱셈 연산은 문자열을 숫자형으로 변화시키므로 '2' * 2는 2 * 2 가 된다. 
*/

let obj = {
  // 다른 메서드가 없으면 toString에서 모든 형 변환을 처리한다.
  toString() {
    return "2";
  },
};
alert(obj * 2); //4 객체가 문자열 '2'로 바뀌고 곱셉 연산 과정에서 숫자 2로 변경된다.
```

```js
// 이항 덧셈 연산에서는 같은 상황에서 문자열을 연결한다.
let obj = {
  toString() {
    return "2";
  },
};

alert(obj + 2); // 22("2" + 2), 문자열이 반환되기 때문에 문자열끼리의 병합이 일어났습니다.
```
