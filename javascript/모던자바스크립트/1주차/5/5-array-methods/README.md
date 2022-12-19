## 모던 자바스크립트 1주차

범위 : Part 1 1.1~1.6

---

### ch5 : array methods

##### splice

- 배열에서 요소를 하나만 지우고 싶을 때 사용

```js
let arr = ["I", "go", "home"];
delete arr[1]; // 'go'를 삭제
console.log(arr[1]); // undefined
console.log(arr.length); // 3
// delete는 키를 이용하여 상응하는 값을 지우기 때문에 길이가 짧아지지는 않음
```

```js
arr.splice(index[, deleteCount, elem1, ..., elemN])
/*
index : 조작을 가할 첫 번째 요소
deleteCount : 제거하고자 하는 요소의 개수
elem : 배열에 추가할 요소
*/
```

```js
arr.splice(1, 1); // 인덱스 1부터 요소 한개를 제거
console.log(arr); // ['I', 'home'];
```

- 요소를 지우고 다른 요소로 교체하는 것도 가능하다

```js
let arr = ["I", "study", "JS", "right", "now"];
arr.splice;
```
