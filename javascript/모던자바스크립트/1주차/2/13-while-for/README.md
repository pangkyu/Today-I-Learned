## 모던 자바스크립트 1주차

범위 : Part 1 1.1~1.6

---

### ch13 : while과 for 반복문

##### while

```js
// condition이 참인 동안 code가 계속 돌아간다.
while (condition) {
  // code
}
```

- 조건이 계속 truthy하다면 무한 반복이 된다.

##### do-while

```js
do {
  // code
} while (condition);
```

- code가 먼저 실행되고, 조건을 확인하여 truthy인 동안 반복이 된다.(최소 1번은 실행된다.)

##### for

```js
for (begin; condition; step) {
  // code
}
/*
begin : 반복문에 진입할 때 단 한번 실행된다. (ex : i = 0;)
condition : 반복마다 해당 조건을 확인. false이면 반복문을 멈춘다. (ex : i < 3;)
code : condition이 truthy일 동안 계속 실행된다. 
step : 각 반복문의 코드가 실행된 이후에 실행된다. 
*/
```

##### 구성 요소 생략하기

- for 반복문이 시작될 때 아무것도 할 필요가 없으면 <code>begin</code>부분을 생략하는 것이 가능하다.

```js
let i = 0;
for (; i < 3; i++) {
  alert(i);
}

// step 부분도 생략이 가능하다.
for (; i < 3; ) {
  alert(i++);
}

// 모든 구성요소를 생략할 수도 있다.
for (;;) {
  // 끊임없이 본문 실행
}
```

##### 반복문 빠져나오기

- 반복문의 조건이 falsy가 되면 반복문은 종료된다.
- <code>break</code>문을 사용하면 언제든 원하는 때에 빠져나올 수 있다.

```js
let sum = 0;
while (true) {
  let value = +prompt("숫자를 입력하세요.", "");
  if (!value) break;
  sum += value;
}
alert("합계:" + sum);
```

- 사용자가 아무것도 입력하지 않거나 prompt창에 있는 cancel버튼을 누르면 활성화 된다.
- 반복문의 시작지점이나 끝 지점에서 조건을 확인하는 것이 아닌 본문 가운데 혹은 본문 여러곳에서 조건을 확인해야 하는 경우에 '무한 반복문 + break'조합을 사용하면 좋다.

##### 다음 반복으로 넘어가기 (continue)

- <code>continue</code>는 전체 반복문을 멈추지 않는다. 대신 현재 실행중인 이터레이션을 멈추고 반복문이 다음 이터레이션을 강제로 실행하도록한다.
- <code>continue</code>는 현재 반복을 종료시키고 다음 반복으로 넘어가고 싶을 때 사용한다.

```js
for (let i = 0; i < 10; i++) {
  if (i % 2 == 0) continue; // 조건이 참이면 남아있는 본문은 실행x
  alert(i); // 1, 3, 5, 7, 9가 차례대로 출력
}

// 위에 있는 예시와 같은 동작을 하지만, 중첩레벨이 하나 늘어난다.
for (let i = 0; i < 10; i++) {
  if (i % 2) {
    alert(i);
  }
}
```

- 삼항 연산자에서는 continue를 사용할 수 없다.

```js
(i > 5) ? alert(i) : continue; // 문법 에러 발생
```

##### break/continue와 레이블

- 여러 개의 중첩 반복문을 한 번에 빠져나와야 하는 경우

```js
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    let input = prompt(`(${i}, ${j}의 값`, "");
    // 여기에서 멈춰서 아래쪽의 완료를 출력하려면 ?
  }
}
alert("완료");
```

- 레이블(label)을 사용하면 빠져나올 수 있다.

```js
labelName: for(...){
    // code
}
```

- 반복문 안에서 break<labelName>문을 사용하면 레이블에 해당하는 반복문을 빠져나올 수 있다.

```js
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    let input = prompt(`${i}, ${j}의 값`, "");
    if (!input) break outer;
    // code
  }
}
alert("완료");
```

- <code> break outer</code>는 <code>outer</code>라는 레이블이 붙은 반복문을 찾고, 해당 반복문을 빠져나오게 한다.

```js
// 별도의 줄에 쓰는 것도 가능하다.
outer: for (let i = 0; i < 3; i++) {
  // code
}
```
