## 모던 자바스크립트 1주차

범위 : Part 1 1.1~1.6

---

### ch2 : number

- 모던 자바스크립트는 숫자를 나타내는 2가지 자료형을 지원한다.
  1. 일반적인 숫자는 배정밀도 부동소수점 숫자(double precision floating point number)로 알려진 64비트 형식에 저장된다.
  2. 임의의 길이를 가진 정수는 Bigint 숫자로 나타낼 수 있다.

##### 숫자를 입력하는 다양한 방법

```js
// 직접 입력
let billion = 1000000000;

// 숫자 기호 사용
// e는 e 왼쪽의 수에 e 오른쪽에 있는 수만큼의 10의 거듭제곱을 곱하는 효과가 있다.
let billion = 1e9; // 10억, 1과 9개의 0

alert(7.3e9); // 73억 (7,300,000,000)

// 작은 숫자를 표현할 때도 큰 숫자를 표현할 때처럼 e를 사용할 수 있다.
let ms = 1e-6; // 1에서 왼쪽으로 6번 소수점 이동
```

##### 16진수, 2진수, 8진수

- 16진수는 <code>0x</code>를 사용하여 표현할 수 있다.

```js
alert(0xff); // 255
alert(0xff); // 255 (대·소문자를 가리지 않으므로 둘 다 같은 값을 나타냅니다.)
```

- 2진수와 8진수는 드물게 쓰이긴 하지만 <code> 0b , 0o</code>를 사용하여 간단히 나타낼 수 있다.

```js
let a = 0b11111111; // 255의 2진수
let b = 0o377; // 255의 8진수

alert(a == b); // true, 진법은 다르지만, a와 b는 같은 수임
```

- 이 외의 진법을 사용하려면 <code>parseInt</code>를 사용

##### toString(base)

- <code>num.toString(base)</code>메서드는 base 진법으로 num을 표현한 후, 이를 문자형으로 변환해 반환한다.

```js
let num = 255;

alert(num.toString(16)); // ff
alert(num.toString(2)); // 11111111
```

- base는 2에서 36까지 쓸 수 있는데, 기본 값은 10이다.
- base별 유스 케이스는 다음과 같다.
  - base = 16 : 16진수 색, 문자 인코딩 등을 표현할 때 사용. 0~9, A~F를 사용하여 나타냄
  - base = 2 : 비트연산 디버깅에 주로 쓰인다. 0,1
  - base = 36 : 사용할 수 있는 값 중 최대값. 0~9, A~Z를 사용하여 숫자를 표현. URL을 줄이는 것과 같이 숫자로 된 긴 식별자를 짧게 줄일 때 유용

##### 어림 수 구하기 (rounding)

- Math.floor : 소수점 첫째 자리에서 내림(버림)
- Math.ceil : 소수점 첫째 자리에서 올림
- Math.round : 소수점 첫째 자리에서 반올림
- Math.trunc : 소수부를 무시
- 소수점 <code>n-th</code>번째 수를 기준으로 어림수를 구해야 하는 상황

  - 예를 들어 <code>1.2345</code>에서 소수점 두 번째 자릿수까지만 남겨<code>1.23</code>을 만들고 싶은 경우

    1. 곱하기와 나누기

    ```js
    let num = 1.23456;
    alert(Math.floor(num * 100) / 100); // 1.23456 -> 123.456 -> 123 -> 1.23
    ```

    2. 소수점 n 번째 수까지의 어림수를 구한 후 이를 문자형으로 반환해주는 메서드 사용

    ```js
    /*
    toFixed는 round와 유사하게 반올림한다. 그러나 반환 값이 문자열이다. 소수부의 길이가 인수보다 작으면 끝에 0이 추가
    */
    let num = 112.34;
    alert(num.toFixed(1)); // '12.3'
    alert(num.toFixed(5)); // '12.34000'

    //+num.toFixed(5)처럼 단항 덧셈 연산자를 붙이거나 Number()를 호출하면 숫자형으로 변환이 가능하다.
    ```

##### 부정확한 계산

- 숫자를 저장하려면 정확히 64비트가 필요하다. 그 중 52비트는 숫자를 저장하는 데 사용되고 11비트는 소수점 위치를(정수는 0), 1비트는 부호를 저장하는 데 사용된다.
- 숫자가 너무 커지면 64비트 공간이 넘쳐서 Infinity로 처리된다.
- **정밀도 손실**을 해결하는 방법

```js
// toFixed메서드로 어림수를 만들어 해결한다.
let sum = 0.1 + 0.2;
alert(sum.toFixed(2)); // 0.30
alert(+sum.toFixed(2)); // 0.3 // 단항 더셈연산자를 사용하여 다시 숫자로 바꾼다.
```

- 어림수를 사용하지 않고 계산하면 무한 소수가 발생할 경우 대처하기 어렵다.

##### isNaN과 isFinite

- <code>Infinity</code>와 <code>-Infinity</code>
- <code>NaN</code>
- 위의 두 특수 숫자는 숫자형에 속하지만 정상적인 숫자는 아니기 때문에, 정상적인 숫자와 구분하기 위한 특별한 함수가 존재한다.
  - <code>isNaN(value)</code> : 인수를 숫자로 변환한 다음 NaN인지 테스트
    - NaN은 NaN 자기 자신을 포함하여 그 어떤 값과도 같지 않기 때문에 이 함수가 필요하다.
  - <code>isFinite(value)</code> : 인수를 숫자로 변환하고 변환한 숫자가 <code>NaN/Infinity/-Infinity</code>가 아닌 일반 숫자인 경우 true를 반환

```js
alert(isFinite("15")); // true
alert(isFinite("str")); // false, NaN이기 때문입니다.
alert(isFinite(Infinity)); // false, Infinity이기 때문입니다.
```

- isFinite는 문자열이 일반숫자인지 검증하는 데에도 사용된다.

```js
let num = +prompt("숫자를 입력하세요.", "");

// 숫자가 아닌 값을 입력하거나 Infinity, -Infinity를 입력하면 false가 출력됩니다.
alert(isFinite(num));
```

- <code>object.is</code>는 <code>===</code>처럼 값을 비교할 때 사용되는 내장 메소드
  - NaN을 대상으로 비교할 때 : <code>Object.is(NaN, NaN) === true </code>
  - <code>0</code>과<code>-0</code>이 다르게 취급되어야 할때 : <code>Object.is(0, -0) === false </code>. 숫자를 나타내는 비트가 모두 0이더라도 부호를 나타내는 비트는 다르므로 0, -0은 사실 다른 값이다.
  - 위의 두 에지 케이스를 제외하곤, Object.is(a,b)와 a === b의 결과는 같다.

##### parseInt, parseFloat

- 두 함수는 불가능 할때까지 문자열에서 숫자를 읽는다. 숫자를 읽는 도중 오류가 발생하면 이미 수집된 숫자를 반환한다.
- 읽을 수 있는 숫자가 없을 때는 NaN을 반환한다.
- 아래와 같이 사용하면 파싱도 가능하다.

```js
alert(parseInt("0xff", 16)); // 255
alert(parseInt("ff", 16)); // 255, 0x가 없어도 동작합니다.
alert(parseInt("2n9c", 36)); // 123456
```

##### 그 외 수학 함수

- Math.random() : 0과 1 사이의 난수를 반환(1은 제외)
- Math.max(a,b,...) / Math.min(a,b,...) : 인수 중 최대/최소값을 반환한다.
- Math.pow(n, power) : n을 power번 거듭제곱한 값을 반환한다.
