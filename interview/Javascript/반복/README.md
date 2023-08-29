## 반복문 차이점

### forEach와 map의 차이점?

- 공통점 : 배열의 내부 값을 순회하며 원하는 결과값을 도출하는 메소드
- `break`문 사용이 불가능

- 차이점
  - map() : 기존 배열의 값이 바뀌는 것이 아닌 새로운 배열을 만든다. (반환값이 있다.)
  - forEach() : 기존의 배열값을 변경한다.( 반환값이 없다. )

+++ `reduce`

- `reduce` 인자로 총 4개를 받을 수 있음 (이전값, 현재값, index, 배열)

```js
let arr = [1, 2, 3, 4, 5];
let a = arr.reduce(function (preValue, currnetValue) {
  return preValue + currentValue;
});
console.log(a); // 15
```
