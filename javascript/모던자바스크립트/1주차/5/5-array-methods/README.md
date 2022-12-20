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
arr.splice(0, 3, "Lets", "dance");
console.log(arr); // ['Lets', 'dance', 'right', 'now'];
```

- <code>splice</code>는 삭제된 요소로 구성된 배열을 반환한다.

```js
let arr = ["I", "study", "JS", "right", "now"];
let removed = arr.splice(0, 2);
console.log("I", "study");
```

- <code>splice</code> 메소드의 <code>deleteCount</code>를 0으로 설정하면 요소를 제거하지 않으면서 새로운 요소를 **추가**할 수 있다.

```js
let arr = ["I", "study", "JS"];
arr.splice(2, 0, "complex", "language");
console.log(arr); // 'I', 'study', 'complex', 'language', 'JS'
```

- 배열 관련 메소드에서는 음수 인덱스도 사용할 수 있음. 배열 끝에서부터 센 요소 위치를 나타낸다.

```js
let arr = [1, 2, 5];
/**
 * 인덱스 -1(배열끝 첫번째 요소) 부터
 * 0개의 요소를 삭제하고
 * 3과 4를 추가
 */
arr.splice(-1, 0, 3, 4);
console.log(arr); // 1,2,3,4,5
```

##### slice

- <code>arr.splice</code>와 유사해 보이지만 훨씬 간단

```js
arr.slice([start], [end]);
```

- <code>start</code>인덱스부터 <code>end</code>인덱스까지의 요소(end는 제외)를 복사한 새로운 배열을 반환
- <code>start<code>와</code>end</code>는 둘다 음수일 수 있다. 이때는 배열 끝에서부터의 요소 개수를 의미
- <code>arr.slice</code>는 문자열 메서드인 <code>str.slice</code>와 유사하게 동작하는데 <code>arr.slice</code>는 서브 문자열대신 서브 배열을 반환한다는 점이 다르다

```js
let arr = ["t", "e", "s", "t"];
console.log(arr.slice(1, 3)); // e,s 인덱스가 1인 요소부터 3까지 복사 (3인 요소는 제외)
console.log(arr.slice(-2)); // s,t 인덱스가 -2인 요소부터 제일 끝 요소까지를 복사
```

<code>arr.slice()</code>는 인수를 하나도 넘기지 않고 호출하여 복사본을 만들 수 있다. 이런 방식은 기존의 배열을 건드리지 않으면서 배열을 조작하여 새로운 배열을 만들고자 할 때 자주 사용된다.

##### concat

- arr.concat은 기존 배열요소를 사용하여 새로운 배열을 만들거나 기존 배열에 요소를 추가하고자 할 때 사용할 수 있다.

```js
arr.concat(arg1, arg2...);
```

- 인수에 배열이나 값이 올 수 있음(개수에 제한없음)
- 메서드를 호출하면 <code>arr</code>에 속한 모든 요소와 arg1, arg2 등에 속한 모든 요소를 한데 모은 새로운 배열이 반환된다.
- 인수 <code>argN</code>가 배열일 경우 배열의 모든 요소가 복사된다. 그렇지 않은 경우(단순값)는 인수가 그대로 복사된다.

```js
let arr = [1, 2];
arr.concat([3, 4]); // 1,2,3,4
arr.concat([3, 4], 5, 6); // 1,2,3,4,5,6
```

- <code>concat</code>메소드는 제공받은 배열의 요소를 복사하여 활용한다. 객체가 인자로 넘어오면(배열처럼 보이는 유사 배열객체여도) 객체는 분해되지 않고 통으로 복사되어 더해진다.

```js
let arrayLike = {
  0: "something",
  length: 1,
};
arr.concat(arrayLike); // 1,2,[object Object]
```

- 단, 유사 배열객체에 특수한 프로퍼티 <code>Symbol.isConcatSpreadable</code>이 있으면 <code>concat</code>은 이 객체를 배열처럼 취급한다. 따라서 객체 전체가 아닌 프로퍼티의 값이 더해진다.

```js
let arrayLike = {
  0: "something",
  1: "else",
  [Symbol.isConcatSpreadable]: true,
  length: 2, // 길이가 3이되면 3자리에 empty값이 들어감
};
arr.concat(arrayLike); // 1,2,something, else
```

##### forEach

```js
arr.forEach(function (item, index, array) {
  // code
});
```

##### 배열 탐색하기

- <code>indexOf</code>, <code>lastIndexOf</code>, <code>includes</code>
- <code>lastIndexOf</code>는 <code>indexOf</code>와 도잉ㄹ한 기능을 하는데, 검색을 끝에서부터 시작한다는 점만 다르다

```js
let arr = [1, 0, false];
console.log(arr.indexOf(0)); // 1
console.log(arr.indexOf(false)); // 2
console.log(arr.indexOf(null)); // -1
console.log(arr.includes(1)); // true
```

- 위 메소드들은 요소를 찾을 때 <code>===</code>연산자를 사용.
- <code>includes</code>는 NaN도 제대로 처리한다.

```js
const arr = [NaN];
alert(arr.indexOf(NaN)); // -1 (완전 항등 비교 === 는 NaN엔 동작하지 않으므로 0이 출력되지 않습니다.)
alert(arr.includes(NaN)); // true (NaN의 여부를 확인하였습니다.)
```

##### find와 findIndex

```js
let result = arr.find(function (item, index, array) {
  // true가 반환되면 반복이 멈추고 해당 요소를 반환
  // 조건에 해당하는 요소가 없으면 undefined 반환
});
/*
item : 함수를 호출할 요소 
index : 요소의 인덱스 
array : 배열 자기 자신 
*/
```

```js
let users = [
  { id: 1, name: "John" },
  { id: 2, name: "Pete" },
  { id: 3, name: "Mary" },
];
let user = users.find((item) => item.id == 1);
console.log(user.name); // John
```

- <code>arr.findIndex</code>는 동일한 일을 하나, 조건에 맞는 요소를 반환하는 대신 해당 요소의 인덱스를 반환한다. 조건에 맞는 요소가 없으면 -1을 반환

##### filter

- <code>find</code>메서드는 함수의 반환 값을 <code>true</code>로 만드는 단 하나의 요소를 찾는다.
- 조건을 충족하는 요소가 여러개일시 <code>arr.filter(fn)</code>를 사용한다.
- <code>filter</code>는 <code>find</code>와 문법이 유사하나, 조건에 맞는 요소 전체를 담은 배열을 반환하는 점에서 차이가 있다.

```js
let results = arr.filter(function (item, index, array) {
  // 조건을 충족하는 요소는 results에 순차적으로 더해진다.
  // 조건을 충족하는 요소가 하나도 없으면 빈 배열이 반환
});
```

```js
let users = [
  { id: 1, name: "John" },
  { id: 2, name: "Pete" },
  { id: 3, name: "Mary" },
];

// 앞쪽 사용자 두 명을 반환합니다.
let someUsers = users.filter((item) => item.id < 3);

alert(someUsers.length); // 2
```

##### 배열을 변형하는 메서드

- map : 배열 요소 전체를 대상으로 함수를 호출하고, 호출 결과를 배열로 반환한다.

```js
let results = arr.map(function (item, index, array) {
  // 요소 대신 새로운 값을 반환
});
```

```js
let lengths = ["bilbo", "gandalf"].map((item) => item.length);
alert(lengths); // 5,7
```

- sort(fn) : 배열의 요소를 정렬. 배열 자체가 변경된다.

```js
let arr = [1, 2, 15];
arr.sort(); // 1,15,2
```

- 요소는 문자열로 취급되기때문에 15가 더 작은값으로 취급된다.

```js
function compare(a, b) {
  if (a > b) return 1; // 첫 번째 값이 두 번째 값보다 큰 경우
  if (a == b) return 0; // 두 값이 같은 경우
  if (a < b) return -1; //  첫 번째 값이 두 번째 값보다 작은 경우
}
arr.sort(compare);
```

- 화살표 함수를 사용하면 더 깔끔하게 작성이 가능하다.

```js
arr.sort((a, b) => a - b);
```

- <code>localeCompare</code>를 사용하면 유니코드를 기준으로 글자를 비교한다.

```js
let countries = ["Österreich", "Andorra", "Vietnam"];
console.log(countries.sort((a, b) => a.localeCompare(b))); // Andorra,Österreich,Vietnam
```

##### reverse

- 요소의 역순으로 정렬시켜주는 메서드

```js
let arr = [1, 2, 3, 4, 5];
arr.reverse(); // 5,4,3,2,1
```

##### split

```js
let names = "Bilbo, Gandalf, Nazgul";
let arr = names.split(", ");
for (let name of arr) {
  alert(`${name}에게 보내는 메시지`);
}
// 두 번재 인수는 숫자를 받을 수 있다. 배열의 길이를 제한해주므로 길이를 넘어서는 요소를 무시할 수 있다.
let arr = "Bilbo, Gandalf, Nazgul, Saruman".split(", ", 2);

alert(arr); // Bilbo, Gandalf
```

```js
let str = "test";
alert(str.split("")); // t,e,s,t
```

##### join

- <code>split</code>과 반대 역할

```js
let arr = ["Bilbo", "Gandalf", "Nazgul"];

let str = arr.join(";"); // 배열 요소 모두를 ;를 사용해 하나의 문자열로 합칩니다.

alert(str); // Bilbo;Gandalf;Nazgul
```

##### reduce

- <code>forEach</code>, <code>for</code>, <code>for..of</code>를 사용하면 배열 내 요소를 대상으로 반복 작업을 할 수 있다.
- <code>arr.reduce</code>와 <code>arr.reduceRight</code>도 이런 메서드와 유사한 작업을 한다. 배열을 기반으로 값 하나를 도출할 때 사용된다.

```js
let value = arr.reduce(
  function (accumulator, item, index, array) {
    //...
  },
  [initial]
);
/*
accumulator : 이전 함수 호출의 결과 
initial은 함수 최초 호출 시 사용되는 초기값을 나타냄(옵션)
item : 현재 배열 요소 
index : 요소의 위치 
array : 배열 
*/
```

```js
let arr = [1, 2, 3, 4, 5];
let result = arr.reduce((sum, current) => sum + current, 0);
console.log(result); // 15
```

- 초기 값이 없이 사용을 할때는 값에 대해 신경을 많이써야한다. 배열이 비어있는 상태면 reduce호출 시 에러가 발생하기 때문

##### Array.isArray로 배열 여부 알아내기

- 자바스크립트에서 배열은 독립된 자료형으로 취급되지 않고 객체형에 속한다.

```js
console.log(typeof {}); // object
console.log(typeof []); // object
```

- <code>value</code>가 배열이면 true, 아니면 false 를 반환
