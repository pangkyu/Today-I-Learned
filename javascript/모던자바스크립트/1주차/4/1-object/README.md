## 모던 자바스크립트 1주차

범위 : Part 1 1.1~1.6

---

### ch1 : 오브젝트

##### 객체

- 자바스크립트에는 8가지 자료형이 있다. 이 중 7개는 오직 하나의 데이터만 담을 수 있어 원시형(primitive type)이라 부른다.
- 객체형은 원시형과 다르게 다양한 데이터를 담을 수 있다. 키로 구분된 데이터 집합이나 복잡한 개체를 저장할 수 있다.
- 객체는 중괄호 <code>{...}</code>를 이용해 만들 수 있다. 중괄호안에는 키:값 쌍으로 구성된 프로퍼티를 여러 개 넣을 수 있다. <code>키</code>에는 문자형, <code>값</code>에는 모든 자료형이 허용된다. 프로퍼티 키는 프로퍼티 이름이라고도 부른다.

```js
// 빈 객체를 만드는 방법
//1.  객체 생성자 문법
let user = new Object();
//2 객체 리터럴 문법
let user = {};
```

```js
let user = {
  name: "John", // 키 : name , 값 'John'
  age: 30, // 키 : age, 값 : 30
};
```

- 점 표기법으로 프로퍼티의 값을 읽는 것도 가능하다.

```js
// 프로퍼티 값 얻기
console.log(user.name);
console.log(user.age);
```

- 프로퍼티 값에는 모든 자료형이 올 수 있다.

```js
user.isAdmin = true;
```

- <code>delete</code>연산자를 사용하면 프로퍼티를 삭제할 수 있다.

```js
delete user.age;
```

- 여러 단어를 조합하여 프로퍼티 이름을 만든 경우에는 프로퍼티 이름을 따옴표로 묶어야 한다.

```js
let user = {
  "likes birds": true,
};
```

- 마지막 프로퍼티 끝은 쉼표로 끝날 수 있다.

```js
let user = {
  name: "John",
  age: 30,
};
```

##### 대괄호 표기법

- 여러 단어를 조합하여 프로퍼티 키를 만든 경우에는 점 표기법으로 프로퍼티 값을 읽을 수 없다.

```js
user.likes birds = true; // 문법 에러 발생
```

- 키가 유효한 변수 식별자가 아닌 경우에는 점 표기법 대신 대괄호 표기법으로 동작시킬 수 있다.
  - 유효한 변수 식별자 : 공백이 없고, 숫자로 시작하지 않으며, <code>$</code>, <code>\_</code>를 제외한 특수 문자가 없어야 한다.

```js
let user = {};

// set
user["likes birds"] = true;

// get
alert(user["likes birds"]);

// delete
delete user["likes birds"];
```

- 대괄호 표기법을 사용하면 변수를 키로 사용한 것과 같이 문자열 뿐만 아니라 모든 표현식의 평가 결과를 프로퍼티 키로 사용할 수 있다.

```js
let key = "likes birds";
// user['likes birds'] = true; 와 같음
user[key] = true;
```

- 변수 <code>key</code>는 런타임에 평가되기 때문에 사용자 입력값 변경 등에 따라 값이 변경될 수 있다.

```js
let user = {
  name: "John",
  age: 30,
};
let key = prompt("사용자의 어떤 정보를 얻고 싶은가요? ", "name");
// 변수로 접근
alert(user[key]); // John(프롬프트에서 name을 입력한경우 )
```

##### 계산된 프로퍼티

- 객체를 만들 때 객체 리터럴 안의 프로퍼티 키가 대괄호로 둘러싸여 있는 경우, 이를 계산된 프로퍼티(computed property)라고 부른다.

```js
let fruit = prompt("어떤 과일을 구매하시겠습니까?", "apple");

let bag = {
*!*
  [fruit]: 5, // 변수 fruit에서 프로퍼티 이름을 동적으로 받아 옵니다.
*/!*
};

alert( bag.apple ); // fruit에 "apple"이 할당되었다면, 5가 출력됩니다.
```

- 대괄호 표기법은 프로퍼티 이름과 값의 제약을 없애주기 때문에 점 표기법보다 강력하다. 그런데 작성하기 번거롭다는 단점이 있다.
- 프로퍼티 이름이 확정된 상황이고 단순한 이름이라면 처음에는 점 표기법을 사용하다가 뭔가 복잡한 상황이 발생했을 때 대괄호 표기법으로 바꾸는 경우가 많다.

##### 단축 프로퍼티

```js
function makeUser(name, age) {
  return {
    name: name,
    age: age,
    // 등등
  };
}
let user = makeUser("John", 30);
alert(user.name); // John
```

- 이름과 값이 변수의 이름과 동일한데, 이 경우에는 프로퍼티 값 단축구문을 사용하면 코드를 짧게 줄일 수있다.

```js
function makeUser(name, age) {
  return {
    name,
    age,
    // 등등
  };
}
let user = makeUser("John", 30);
alert(user.name); // John
```

- 한 객체에서 일반 프로퍼티와 단축 프로퍼티를 함께 사용하는 것도 가능하다.

##### 프로퍼티 이름의 제약사항

- 변수 이름(키)에는 예약어를 사용하면 안되지만, 객체 프로퍼티에는 이런 제약이 없다.

```js
let obj = {
  for: 1,
  let: 2,
  return: 3,
};
console.log(obj.for + obj.let + obj.return); // 6
```

- 문자형이나 심볼형에 속하지 않은 값은 문자열로 자동 형변환된다.

```js
let obj = {
  0: "test", // "0" : "test"와 동일하다.
};
// 숫자 0은 문자열 "0"으로 변환되기 때문에 밑의 코드는 같은 프로퍼티에 접근한다.
alert(obj["0"]); // test
alert(obj[0]); // test
```

- 객체 프로퍼티 키에 쓸 수 있는 문자열에 제약이 없지만, <code>** proto**</code>는 제외

```js
let obj = {};
obj.__proto__ = 5; // 숫자를 할당
alert(obj.__proto__); // [object object] - 숫자를 할당했지만 값은 객체가 되어버렸다.
```

##### 'in'연산자로 프로퍼티 존재 여부 확인하기

- 자바스크립트의 중요한 특징 중 하나 : 존재하지 않는 프로퍼티에 접근하려 해도 에러가 발생하지 않고 <code>undefined</code>를 반환한다.

```js
// 이런 특징을 응용하면 프로퍼티 존재 여부를 쉽게 확인할 수 있다.
let user = {};
alert(user.noSuchProperty === undefined); // true는 존재하지 않음을 의미
```

```js
// 위와같은 방법을 사용할 수 있지만,
// 연산자 in을 사용하면 프로퍼티 존재여부 확인 가능하다.
"key" in object;

let user = { name: "John", age: 30 };
alert("age" in user); // user.age가 존재하므로 true 출력
alert("blabla" in user); // 존재하지 않으므로 false 출력
```

- <code>in</code> 왼쪽에는 반드시 프로퍼티 이름이 와야한다. 프로퍼티 이름은 보통 따옴표로 감싼 문자열이다.
- 따옴표를 생략하면 엉뚱한 변수가 조사대상이 된다.

```js
let user = { age: 30 };
let key = "age";
alert(key in user); // true, 변수 key에 저장된 값 'age'를 사용해 프로퍼티 존재여부를 확인한다.
```

- 대부분의 경우, 일치 연산자를 사용하여 프로퍼티 존재 여부를 알아내는 방법이 잘 동작하나, 가끔 실패하는 경우가 있다.

```js
let obj = {
  test: undefined,
};
alert(obj.test); // 값이 undefined이므로, 얼럿 창에는 undefined가 출력된다. 그러나 프로퍼티 test는 존재한다.
alert("test" in obj); // in을 사용하면 프로퍼티 유무를 제대로 확인할 수 있다. (true)
```

##### for in 반복문

- <code>for .. in </code>반복문을 사용하면 객체의 모든 키를 순회할 수있다.

```js
for (key in object) {
  // 각 프로퍼티 키를 이용하여 본문을 실행한다.
}
```

```js
let user = {
  name: "John",
  age: 30,
  isAdmin: true,
};

for (let key in user) {
  // 키
  alert(key); // name, age, isAdmin
  // 키에 해당하는 값
  alert(user[key]); // John, 30, true
}
```

- 반복 변수명은 자유롭게 정할 수 있다.
- <code>for in</code>반복문에서도 <code>for(;;)</code>문 처럼 반복 변수를 선언<code>let key</code>했다

##### 객체 정렬 방식

- 객체는 특별한 방식으로 정렬된다. 정수 프로퍼티는 자동으로 정렬되고, 그 외 프로퍼티는 객체에 추가한 순서 그대로 정렬된다.

```js
let codes = {
  49: "독일",
  41: "스위스",
  44: "영국",
  1: "미국",
};
for (let code in codes) {
  alert(code); // 1, 41, 44, 49
}
```

- 정수 프로퍼티 : 변형 없이 정수에서 왔다갔다 할 수 있는 문자열

```js
// 키가 정수가 아닌 경우에는 작성된 순서대로 프로퍼티가 나열도니다.
let user = {
  name: "John",
  surname: "Smith",
};
user.age = 25;
for (let prop in user) {
  alert(prop); // name, surname, age
}
```

- 자바스크립트에는 일반 객체 이외에도 다양한 종류가 있다.
  - Array : 정렬된 데이터 컬렉션을 저장할 때 쓰임
  - Date : 날짜와 시간 정보를 저장할 때 쓰임
  - Error : 에러 정보를 저장할 때 쓰임
  - etc
