## 모던 자바스크립트 1주차

범위 : Part 1 1.1~1.6

---

### ch14 : switch

- 복수의 <code>if</code>조건문을 <code>switch</code>문으로 바꿀 수 있다.
- <code>switch</code>문을 사용한 비교법은 특정 변수를 다양한 상황에서 비교할 수 있게 해준다. 코드 자체가 비교 상황을 잘 설명한다는 장점이 있다.

##### 문법

```js
switch (x) {
  case "value1":
    break;
  case "value2":
    break;
  default:
    break;
}
```

- 변수 <code>x</code>의 값과 첫 번째 <code>case</code>문의 값 <code>'value1'</code>를 일치 비교한 후, 두 번째 <code>case</code>문의 값 <code>'value2'</code>와 비교한다.
- <code>case</code>문에서 변수 <code>x</code>의 값과 일치하는 값을 찾으면 해당 <code>case</code>문의 아래 코드가 실행된다. 이때, <code>break</code>문을 만나거나 <code>switch</code>문이 끝나면 코드의 실행은 멈춘다.
- 값과 일치하는 <code>case</code>문이 없으면, <code>default</code>문 아래의 코드가 실행된다.(<code>default</code>가 있는경우)

- 실행하려는 코드가 같으면 아래 처럼 묶을 수 있다.

```js
const a = 3;
switch (a) {
  case 4:
    alert("계산이 맞습니다");
    break;
  case 3:
  case 5:
    alert("계산이 틀리다");
    break;
  default:
    alert("계산결과가 이상하다");
}
```
