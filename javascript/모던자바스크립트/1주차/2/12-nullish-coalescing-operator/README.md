## 모던 자바스크립트 1주차

범위 : Part 1 1.1~1.6

---

### ch12 : 병합연산자

> 병합연산자 <code>??</code>를 사용하면 짧은 문법으로 여러 피연산자 중 그 값이 '확정되어있는' 변수를 찾을 수 있다.

```js
// nulish 병합 연산자 ?? 없이 사용하는 경우
x = a !== null && a !== undefined ? a : b;

// 병합연산자를 사용하는 경우
x = a ?? b;
```

- <code>a ?? b</code>의 평가 결과
  - <code>a</code>가 <code>null</code>도 아니고 <code>undefined</code>도 아니면 <code>a</code>
  - 그 외의 경우는 <code>b</code>

##### ?? 와 || 차이

- <code>??</code>는 <code>||</code>와 유사해 보이지만 중요한 차이점이 있다.
  - <code>||</code>는 첫 번째 truthy값을 반환
  - <code>??</code>는 첫 번째 정의된 값을 반환

```js
height = height ?? 100;
// height에 값이 정의되지 않은 경우 height에 100이 할당된다.
```

```js
let height = 0;
alert(height || 100); // 100
alert(height ?? 100); // 0
```

- <code>height || 100 </code>은 <code>height</code>에 <code>0</code>을 할당했지만 <code>0</code>을 falsy한 값으로 취급했기 때문에 <code>null</code>이나 <code>undefined</code>를 할당한 것과 동일하게 처리한다. 따라서 <code>height || 100</code>의 평가 결과는 <code>100</code>이다.
- 그러나 <code>height ?? 100</code>의 평가 결과는 <code>height</code>가 정확히 <code>null</code>나 <code>undefined</code>일 경우에만 <code>100</code>이 된다.
- 이런 특징으로 높이처럼 0이 할당될 수 있는 변수를 사용하여 기능을 개발할때 ||보다 ??가 적합하다.

- 그러나 자바스크립트에서 규정한 안정성 관련 이슈로 인해 <code>??</code>는 <code>&&</code>나 <code>||</code>와 함께 사용하지 못한다.
- 괄호를 사용하면 제약을 피할 수 있다.

```js
let x = 1 && 2 ?? 3; // 신택스 에러
let x = (1&&2) ?? 3; // 2
```
