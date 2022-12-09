## 모던 자바스크립트 1주차

범위 : Part 1 1.1~1.6

---

### ch17 : arrow-functions-basics

##### 화살표 함수

```js
const sum = (a, b) => a + b;
const sayHi = () => alert("하이");
const double = (n) => n * 2;
```

##### 본문이 여러 줄인 화살표 함수

- 평가해야할 표현식이나 구문이 여러 개인 경우 중괄호 안에 코드를 넣어주어야한다.
- <code>return</code>지시자를 사용하여 명시적으로 결과값 반환한다.
