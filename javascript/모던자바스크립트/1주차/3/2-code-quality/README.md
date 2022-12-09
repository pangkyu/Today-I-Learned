## 모던 자바스크립트 1주차

범위 : Part 1 1.1~1.6

---

### ch2 : 코딩 스타일

> 개발자는 가능한 간결하고 읽기 쉬운 코드를 작성해야한다.

##### 중괄호

- 대부분의 자바스크립트 프로젝트에서 여는 중괄호는 이집션(Egyptian)스타일을 따라 새로운 줄이 나니 상응하는 키워드와 같은 줄에 작성.
- 여는 중괄호 앞에는 공백이 하나 있어야한다.

```js
if (condition) {
  // code
}
```

- 코드가 짧다면 중괄호 없이 한 줄에 쓰는 방법도 괜찮다.

```js
if (n < 0) console.log('n은 0보다 작다);
```

##### 가로 길이

- 코드의 가로 길이가 길어진다면 여러 줄로 나누어 작성하는 게 좋다.
- 최대 가로 길이는 팀원들과 합의. 대개 80~120자로 제한한다.

```js
// 백틱(`)을 사용하면 문자열을 여러 줄로 쉽게 나눌 수 있습니다.
let str = `
  ECMA International's TC39 is a group of JavaScript developers,
  implementers, academics, and more, collaborating with the community
  to maintain and evolve the definition of JavaScript.
`;

if (id === 123 && moonPhase === "Waning Gibbous" && zodiacSign === "Libra") {
  letTheSorceryBegin();
}
```

##### 들여쓰기

1. 가로 들여쓰기 : 스페이스 두 개 혹은 네 개를 사용해 만듦
   - 혹은 탭 키를 이용하여 만들 수 있다.
   - 탭 대신 스페이스를 이용했을 때의 장점 중 하나는 들여쓰기 정도를 좀 더 유연하게 변경할 수 있다.

```js
show(parameters,
     aligned,
     one,
     after,
     another){
    //...
}
```

2. 세로 들여쓰기 : 논리 블록 사이에 넣어 코드를 분리해주는 새 줄
   - 함수 하나에 논리 블록 여러개가 들어갈 수 있다.
   - 변수 선언, 반복문, 리턴문 사이에 세로 들여쓰기를 해주는 빈 줄을 넣어 코드를 분리

```js
function pow(x, n) {
  let result = 1;
  //
  for (let i = 0; i < n; i++) {
    result *= x;
  }
  //
  return result;
}
```

##### 세미콜론

- 모든 구문의 끝에는 세미콜론을 써주는 것이 좋다.

##### 중첩 레벨

- 가능한 너무 깊은 중첩문은 지양하자
- 반복문을 사용할 때 중첩문의 깊이가 깊어지면 <code>continue</code> 지시자를 쓰는 것이 좋은 대안이 될 수 있다.

```js
for (let i = 0; i < 10; i++) {
  if (cond) {
    //...
  }
}

for (let i = 0; i < 10; i++) {
  if (!cond) continue;
}
```

##### 함수의 위치

- '헬퍼'함수 여러 개를 만들어 사용하고 있다면 아래 처럼 코드 구졸르 정돈할 수 있다.

1. 헬퍼 함수를 사용하는 코드 위에서 헬퍼 함수를 모아 선언

```js
function createElement() {
  //...
}

function setHandler(elem) {
  //...
}

function walkAround() {
  //...
}

let elem = createElement();
setHandler(elem);
walkAround();
```

2. 코드를 먼저, 함수는 그 다음에

```js
let elem = createElement();
setHandler(elem);
walkAround();

function createElement() {
  //...
}

function setHandler(elem) {
  //...
}

function walkAround() {
  //...
}
```

3. 혼합 : 코드 바로 위에서 필요한 헬퍼 함수 그때마다 선언하기

- 대개 두번째 방법으로 코드를 정돈하는 것을 선호
  - 사람들이 코드가 무엇을 하는지를 생각하며 코드를 읽기때문에 코드가 먼저나오는 것이 자연스럽기 때문

##### 스타일 가이드

- 코드를 어떻게 작성할지에 대한 전반적인 규칙을 담은 문서
- 팀원 전체가 동일한 스타일 가이드로 코드 작성을 하면, 누가 코드를 작성했나에 관계없이 동일한 스타일의 코드를 만들 수 있다.
- 구글 자바스크립트 스타일 가이드, 에어비앤비 자바스크립트 스타일 가이드 등등

##### Linter

- 이 도구를 사용하면 내가 작성한 코드가 스타일 가이드를 준수하고 있는지 자동으로 확인하고, 스타일 개선과 관련된 제안을 받을 수 있다.
- JSLint, ESLint 등등
