## 모던 자바스크립트 1주차

범위 : Part 1 1.1~1.6

---

### ch11 : 논리연산자

> 자바스크립트에는 3종류의 논리연산자 <code>||</code>(OR), <code>&&</code>(AND), <code>!</code>(NOT)이 있다.

##### <code>||</code> (OR)

```js
result = a || b;
```

- OR 연산자는 불린 값을 조작하는 데 쓰인다. 인수 중 하나라도 <code>true</code>이면 <code>true</code>을 반환하고 아니면 <code>false</code>를 반환한다.

##### 첫 번째 truthy를 찾는 OR 연산자

- 자바스크립트에서만 제공하는 논리연산자 OR의 '추가'기능

```js
// OR 연산자와 피연산자가 여러 개인 경우
result = value1 || value2 || value3;
```

- 가장 왼쪽 피연산자부터 시작하여 오른쪽으로 나아가며 피연산자를 평가한다.
- 각 피연산자를 불린형으로 변환한다. 변환 후 그 값이 <code>true</code>면 연산을 멈추고 해당 피연산자의 변환 전 원래 값을 반환한다.
- 피연산자 모두를 평가한 경우(모든 피연산자가 <code>false</code>로 평가되는 경우)에는 마지막 피연산자를 반환한다.
- <code>||</code>연산자를 여러 개 체이닝하면 첫 번째 truthy를 반환한다.

```js
alert(1 || 0); // 1 (1은 truthy)
alert(null || 1); // 1 (1은 truthy)
alert(undefined || null || 0); // 0(모두 falsy므로, 마지막 값을 반환한다. )
```

```js
// 변수 또는 표현식으로 구성된 목록에서 첫 번째 truthy 얻기

const firstName = "";
const lastName = "";
const nickName = "바이올렛";
alert(firstName || lastName || nickName || "익명"); // 바이올렛 , 만약 모든 변수가 falsy면 '익명'이 출력되었을 것
```

##### &&(AND)

```js
result = a && b;
```

- 두 피연산자가 모두 참일 때 <code>true</code>를 반환한다. 그 외의 경우에는 <code>false</code>를 반환한다.
- OR연산자와 마찬가지로 AND연산자의 피연산자도 타입에 제약이 없다.

##### 첫 번째 falsy를 찾는 AND 연산자 &&

- AND연산자는 아래와 같은 순서로 동작

  - 가장 왼쪽 피연산자부터 시작하여 오른쪽으로 나아가며 피연산자를 평가한다.
  - 각 피연산자는 불린형으로 변환된다. 변환 후 값이 <code>false</code>이면 평가를 멈추고 해당 피연산자의 변환 전 원래 값을 반환한다.
  - 피연산자 모두가 평가되는 경우(모든 피연산자가 <code>true</code>로 평가되는 경우)에는 마지막 피연산자가 반환된다.

- OR연산자의 알고리즘과 유사하지만, AND연산자가 첫번째 falsy를 반환하는 반면, OR은 첫 번째 truthy를 반환한다.

##### !(NOT)

- 논리 연산자 NOT은 느낌표 <code>!</code>를 써서 만들 수 있다.

```js
result = !value;
```

- NOT 연산자는 인수를 하나만 받고, 다음 순서대로 연산을 수행한다.
  - 피연산자를 불린형으로 변환한다.
  - 위에서 변환된 값의 역을 반환한다.

```js
alert(!true); // false
```

- NOT을 두개 연달아 사용하면 값을 불린형으로 변환할 수 있다.

```JS
alert(!!'non-empty string'); // true
alert(!!null); // false
```
