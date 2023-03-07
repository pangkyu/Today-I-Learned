<div align = 'center'>

![](https://velog.velcdn.com/images/pangkyu/post/74a04277-83b5-4383-9f10-1e332125d4ce/image.png)

</div>

# 클로저

> 재귀에 대해 공부하던 중, 클로저라는 용어에 대해 듣게되었는데 이해가 제대로 되지 않았다. 클로저를 제대로 이해해야 공부가 좀 진행될 것이라고 생각해서 찾아보고 학습하기로 했다.

- 클로저는 함수와 함수가 선언된 어휘적 환경의 조합이다. 클로저를 이해하려면 Lexical scoping를 먼저 이해해야한다.

```js
// Lexical scoping
function init() {
  var name = "Mozilla"; // name은 init에 의해 생성된 지역변수이다.
  function displayName() {
    // displayName()은 내부 함수이며, 클로저이다.
    alert(name); // 부모함수에서 선언된 변수를 사용한다.
  }
  displayName();
}
init();
```

- <code>init()</code>은 지역 변수 <code>name</code>과 함수 <code>displayName()</code>을 생성한다. <code>displayName()</code>은 <code>init()</code>안에 정의된 내부 함수이고, <code>init()</code>함수 본문에서만 사용할 수 있다. 단, <code>displayName()</code>내부에는 자신만의 지역 변수가 없다.
- 하지만, 함수 내부에서 외부 함수의 변수에 접근할 수 있기 때문에 부모함수인 <code>init()</code>에서 선언된 변수 <code>name</code>에 접근할 수 있다.
- 만약 자신만의 <code>name</code>변수가 있었다면?? => <code>name</code>대신 <code>this.name</code>을 사용
- 중첩된 함수는 외부 범위에서 선언한 변수에도 접근할 수 있다는 점을 알 수 있다.

```js
// 클로저 예시 2
function makeAdder(x) {
  var y = 1;
  return function (z) {
    y = 100;
    return x + y + z;
  };
}
var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2)); // 107 ( x : 5 , y : 100, z : 2)
console.log(add10(2)); // 112 ( x : 10 , y : 100, z : 2)
```

- 만약 변수 add5를 리턴한다고 하면 다음과 같이 출력된다

```js
//리턴 결과
function(z) {
    y = 100;
    return x + y + z;
}
// 따라서 add5(2)를 콘솔 찍으면 2가 z값에 들어가는 것이다.
// 이는 클로저가 리턴된 후에도 외부함수의 변수들에 접근 가능하다는 것을 보여주고, 클로저에 단순히 값 형태로 전달되는 것이 아니라는 것을 의미한다.
```

#### <code>let</code>과 <code>const</code>를 사용한 범위 지정

- <code>var</code>로 선언한 변수는 함수 내부 또는 외부에서 선언되었는지에 따라 함수 스코프 또는 전역 스코프를 갖는다. 이때, 중괄호로 표시도니 블록이 스코프를 생성하지 않는 점이 혼란을 일으킬 수 있다.

```js
if (Math.random() > 0.5) {
  var x = 1;
} else {
  var x = 2;
}
console.log(x);
/*
C, JAVA같이 블록이 스코프를 생성하는 언어의 경우. console.log라인은 어떤 블록 스코프에도 포함되지 않기 때문에 에러가 발생한다. 하지만 블록은 var로 선언한 변수에 대해 스코프를 생성하지 않기 때문에 var 명령문은 전역 변수를 생성한다. 
*/
```

```js
//ES6에서 자바스크립트는 블록 스코프 변수를 생성할 수 있도록 let, const를 도입했다.
if (Math.random() > 0.5) {
  const x = 1;
} else {
  const x = 2;
}
console.log(x); // 참조 에러 : x가 정의되지 않음
```

## 실용적인 클로저

- 클로저는 어떤 데이터(어휘적 환경)와 그 데이터를 조작하는 함수를 연관시켜주기 때문에 유용하다. 이것은 객체가 아떤 데이터와(그 객체의 속성)하나 혹은 그 이상의 메소드들을 연관시키는 점에서 객체지향 프로그래밍과 같은 맥락에 있다.
- 프론트엔드 자바스크립트에서 많은 코드가 이벤트 기반에 있다.

```css
// 페이지 글자 크기를 조정하는 예시 코드
body {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 12px;
}

h1 {
  font-size: 1.5em;
}

h2 {
  font-size: 1.2em;
}
```

```js
function makeSizer(size) {
  return function () {
    document.body.style.fontSize = size + "px";
  };
}

var size12 = makeSizer(12);
var size14 = makeSizer(14);
var size16 = makeSizer(16);

document.getElementById("size-12").onclick = size12;
document.getElementById("size-14").onclick = size14;
document.getElementById("size-16").onclick = size16;
```

```html
<a href="#" id="size-12">12</a>
<a href="#" id="size-14">14</a>
<a href="#" id="size-16">16</a>
```

- 위에 있는 코드처럼 클로저를 이용하여 body태그의 글자크기를 조절할 수 있다.

---

## 참고자료

- [MDN 클로저](https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures)
