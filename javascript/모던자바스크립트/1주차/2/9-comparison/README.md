## 모던 자바스크립트 1주차

범위 : Part 1 1.1~1.6

---

### ch9 : 비교 연산자

##### 불린형 반환

- <code>true</code>가 반환되면, '참'을 의미한다.
- <code>false</code>가 반환되면, '거짓'을 의미한다.

```js
// 반환된 불린값을 변수에 넣어 할당할 수 있다.
const result = 5 > 4;
console.log(result); // true
```

##### 문자열 비교

- '사전'순으로 문자열을 비교한다.
- 실제 단어를 사전에 실을 때 단어를 구성하는 문자 하나하나를 비교하여 등재 순서를 정하는 것처럼 자바스크립트도 문자열을 구성하는 문자 하나하나를 비교해가며 문자열을 비교한다.

```js
console.log("Z" > "A"); // true
console.log("Glow" > "Glee"); // true
console.log("Bee" > "Be"); // true
```

- 문자열 비교 시 적용되는 알고리즘은 다음과 같다.

  1. 두 문자열의 첫 글자를 비교한다.
  2. 첫 번째 문자열의 첫 글자가 다른 문자열의 첫 글자보다 크면(작으면), 첫 번째 문자열이 두 번째 문자열보다 크다고(작다고)결론 내고 비교를 종료한다.
  3. 두 문자열의 첫 글자가 같으면 두 번째 글자를 1번과 같은 방법으로 비교한다.
  4. 글자 간 비교가 끝날 때까지 이 과정을 반복한다.
  5. 비교가 종료되었고, 문자열의 길이도 같다면 두 문자열은 동일하다고 결론을 낸다. 비교가 종료되었지만 두 문자열의 길이가 다르면 길이가 긴 문자열이 더 크다고 결론 낸다.

- 자바스크립트는 대/소문자를 따진다.

```js
console.log("a" > "A"); // true
// 자바스크립트 내부에서 사용하는 유니코드에서는 소문자가 대문자보다 더 큰 인덱스를 갖기때문에
```

##### 다른 형을 가진 값 간의 비교

- 비교하려는 값의 자료형이 다르면 자바스크립트는 값들을 숫자형으로 바꾸고 비교한다.

```js
console.log("01" == 1); // true, 문자열 '01'이 숫자 1로 변환 후 비교
console.log(false == 0); // true
```

##### 일치 연산자

- 동등 연산자(equality operator) <code>==</code>은 <code>0</code>과 <code>false</code>를 구별하지 못한다.

```js
console.log(0 == false); // true
console.log("" == false); // true
```

- 일치 연산자(strict equality operator) <code>===</code>를 사용하면 형 변환 없이 값을 비교할 수 있다.
- 피연산자 간의 형이 다를 경우 false를 반환한다.

```js
console.log(0 === false); // false, 피연산자의 형이 다르다 .
```

- 비교결과가 명확하기 때문에 에러가 발생할 확률을 줄여준다.

##### null이나 undefined와 비교하기

```js
console.log(null == undefined); // true
console.log(null === undefined); // false
```

- 산술 연산자나 기타 비교 연산자를 사용하여 <code>null</code>과 <code>undefined</code>를 비교하면 숫자형으로 변환된다.
  - <code>null</code> -> <code>0</code>
  - <code>undefined</code> -><code>NaN</code>

##### null vs 0

```js
console.log(null > 0); // false
console.log(null == 0); // false
console.log(null >= 0); // true
```

##### 비교가 불가능한 undefined

```js
console.log(undefined > 0); // false
console.log(undefined < 0); // false
console.log(undefined == 0); // false
```

- undefined가 NaN으로 변환되는데(숫자형으로의 변환), NaN이 피연산자인 경우 비교 연산자는 항상 false를 반환한다.
