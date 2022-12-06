## 모던 자바스크립트 1주차

범위 : Part 1 1.1~1.6

---

### ch7 : 형변환

> 함수와 연산자에 전달되는 값은 대부분 적절한 자료형으로 자동 변환된다.

##### 문자형으로 변환

- 문자형으로의 형 변환은 문자형의 값이 필요할 때 일어난다.
- <code>alert</code>메서드는 매개변수로 문자형을 받기 때문에, <code>alert(value)</code>에서 value는 문자형이어야 한다. 만약, 다른 형의 값을 전달받으면 이 값은 문자형으로 자동 변환된다.
- <code>String(value)</code> 함수를 호출하여 전달받은 값을 문자열로 변환할 수도 있다.

```js
let value = true;
alert(typeof value); // boolean

value = String(value);
alert(typeof value); //string
```

##### 숫자형으로 변환

- 숫자형으로 변환은 수학과 관련된 함수와 표현식에서 자동으로 일어난다.

```js
alert("6" / "2"); // 3, 문자열이 숫자형으로 자동변환된 후 연산 수행
```

- <code>Number(value)</code>함수를 사용하면 주어진 값을 숫자형으로 명시하여 변환할 수 있다.

```js
let string = "123";
alert(typeof string); // string

let number = Number(string); // 문자열 '123'이 숫자 123으로 변환된다.
alert(typeof number); // number
```

- 숫자형 값을 사용하여 무엇을 하려고 할 때, 그 값을 문자 기반 form을 통해 입력받는 경우에는 위와 같이 명시적 형변환이 필수이다.
- 숫자 이외의 글자가 들어가 있는 문자열을 숫자형으로 변환하려고 하면 그 결과는 <code>NaN</code>이 된다.
- 숫자형으로 변환 시 적용되는 규칙
  - <code>undefined</code> -> <code>NaN</code>
  - <code>null</code> -> <code>0</code>
  - <code>true</code> and <code>false</code> -> <code>1</code> 과 <code>0</code>
  - <code>string</code> -> 문자열의 처음과 끝 공백이 제거. 공백 제거후 남아있는 문자열이 없다면 <code>0</code>, 그렇지 않다면 문자열에서 숫자를 읽는다. 변환에 실패하면 <code>NaN</code>이 된다.

##### 불린형으로 변환

- 불린형으로 변환 시 적용되는 규칙
  - <code>0</code>, 빈 문자열, <code>null</code>, <code>undefined</code>, <code>NaN</code>과 같이 직관적으로도 비어있다고 느껴지는 값들은 <code>false</code>가 된다.
  - 그 외의 값들은 <code>true</code>로 변환

```js
alert(Boolean(" ")); // 공백 문자열도 비어있지 않는 문자열이므로 true로 변환된다.
alert(Boolean("")); // false (빈문자열)
```
