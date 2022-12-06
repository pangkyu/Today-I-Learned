## 모던 자바스크립트 1주차

범위 : Part 1 1.1~1.6

---

### ch5 : 자료형

- 자바스크립트는 자료의 타입은 있지만 변수에 저장되는 값의 타입은 언제든지 바꿀 수 있는 '동적 타입 언어'이다.

##### 숫자형

```js
let number = 123;
number = 12.345;
```

- 숫자형은 정수 및 부동소수점 숫자를 나타낸다.
- 일반적인 숫자 외에 <code>Infinity</code>, <code>-Infinity</code>, <code>NaN</code> 같은 특수 숫자값이 포함된다.
- <code>Infinity</code>는 무한대를 나타낸다.
  - 어느 숫자든 0으로 나누면 무한대를 얻을 수 있다.
  - <code>Infinity</code>를 직접 참조할 수 있다.

```js
alert(1 / 0);
alert(Infinity);
```

- <code>NaN</code>은 계산 중에 에러가 발생했다는 것을 나타내주는 값. 부정확하거나 정의되지 않은 수학 연산을 사용하여 계산 에러가 발생하면 <code>NaN</code>이 반환된다.

```js
alert("문자열" / 2); // NaN
alert("문자열" / 2 + 5); // NaN
```

##### BigInt

```js
// 끝에 n이 붙으면 BigInt형 자료이다.
const bigInt = 1231656486151321354849451321354894n;
```

##### 문자형

```js
const string = "hi";
const string2 = "hi";
const string3 = `hi`;
```

- 백틱으로 변수나 표현식으로 감싼후 <code>${...}</code>안에 넣어주면, 원하는 변수나 표현식을 문자열 중간에 쉽게 넣을 수 있다.

```js
const name = "seongkyu";
console.log(`hi, ${name}!`); // hi, seongkyu!
console.log(`result : ${10 + 10}`); //result : 20
```

##### boolean형

- true/false 값이 존재한다.
- 비교결과를 저장할 때도 사용된다.

```js
const nameFieldChecked = false;
const isGreater = 4 > 1;
alert(isGreater); // true
```

##### null 값

- 어느 자료형에도 속하지 않는 값
- 다른 언어와 다르게 자바스크립트에서의 <code>null</code>은 존재하지 않는 값(nothing), 비어있는 값(empty), 알 수 없는(unknown)값을 나타내는 데 사용한다.

##### undefined 값

- <code>null</code>값 처럼 자신만의 자료형을 형성한다.
- '값이 할당되지 않은 상태'를 나타낼 때 사용한다.
- 변수는 선언했으나, 값을 할당하지 않았다면 해당 변수에 <code>undefined</code>가 자동으로 할당된다.

##### 객체와 심볼

- 객체(object)형은 특수한 자료형이다.
- 객체형을 제외한 다른 자료형은 문자열이든 숫자든 한 가지만 표현할 수 있기 때문에 **원시(primitive) 자료형**이라고 한다. 반면 객체는 데이터 컬렉션이나 복잡한 개체를 표현할 수 있다.
- 심볼형은 객체의 고유 식별자를 만들 때 사용된다.

---

##### 요약

- 숫자형 : 정수, 부동 소수점 숫자 등의 숫자를 나타낼 때 사용
- bigint : 길이 제약 없이 정수를 나타낸다.
- 문자형 : 빈 문자열이나 글자들로 이루어진 문자열을 나타낼 때 사용한다.
- 불린형 : true, false를 나타낼 때 사용한다.
- null : null 값만을 위한 독립 자료형. null은 알 수 없는 값을 나타낸다.
- undefined : undefined값만을 위한 독립 자료형. 할당되지 않은 값을 나타낸다.
- 객체형 : 복잡한 데이터 구조를 표현할 때 사용한다.
- 심볼형 : 객체의 고유 식별자를 만들 때 사용한다.

##### typeof 연산자

- 인수의 자료형을 반환한다. 자료형에 따라 처리 방식을 다르게 하고 싶거나 변수의 자료형을 빠르게 알아내고자 할 때 유용하다.
- 2가지 형태의 문법을 지원한다.
  1. 연산자 : <code>typeof x</code>
  2. 함수 : <code>typeof(x)</code>
