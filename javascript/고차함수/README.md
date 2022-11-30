### 고차함수

- 고차함수란, 함수를 파라미터로 전달받거나 연산의 결과로 반환해주는 메소드를 일컫는다.
- 자바스크립트는 함수형 프로그래밍이 적용된 언어이다.

---

##### .forEach()

- for문을 대체하는 고차함수
- 반복문을 추상화하여 구현된 메소드이며 내부에서 주어진 배열을 순회하면서 연산을 수행

```js
arr.forEach((item, index, thisArr) =>{

});
/**
 * item : 배열요소값, index : 배열 인덱스, thisArr : 참조한 배열
 * 리턴값 : 없음
 * /
```

```js
const numberArray = [1, 2, 3, 4, 5];
let sumNumber = 0;
numberArray.forEach((item) => {
  sumNumber += item;
});
console.log(sumNumber);
```

##### .map()

- forEach 같이 순회하면서, 콜백함수에서의 실행결과를 리턴한 값으로 이루어진 배열을 만들어 변환

```js
arr.map((currentValue, index, array) =>{

}, thisArg)
/**
 * currentValue : 현재 배열요소값, index : 배열 인덱스
 * array : 참조한 배열, thisArg : 콜백함수에서 this로 사용할 값
 * 리턴 값 : 반환 타입은 찾은 요소의 타입/ 없으면 undefined
 * /
```

```js
// 고차함수가 아닌 함수로 작성
const numberArr = [1,2,3,4,5];
const numberArr2 = [];
for( let i = 0; i < numberArr.length; i++;){
    numberArr2.push(numberArr[i] * 2);
}
console.log(numberArr2); // [2, 4, 6, 8, 10]
```

```js
const numberArr = [1, 2, 3, 4, 5];
const numberMapArr = numberArr.map((item) => {
  return item % 2 === 0 ? "even" : "odd";
});
console.log(numberMapArr); // ['odd', 'even', 'odd', 'even', 'odd']
```

화살표 함수를 사용하면 훨씬 짧게 작성이 가능

```js
const birthYear = [1975, 1997, 2002, 1995, 1985];
const ages = birthYear.map((year) => 2022 - year);
console.log(ages);
```

- forEach와 map의 차이 - 두 메서드 모두 배열을 순회하는 것은 동일 - forEach() : 각 요소를 참조한 연산이 이루어짐 - map() : 각 요소를 다른 값으로 맵핑하나 새로운 배열이 반환됨
  => forEach()는 for문을 대체하여 사용하고, map()은 연산의 결과로 새로운 배열을 생성하고자할 때 사용된다.

##### find()

- 찾고자 하는 값을 그대로 반환
- 주어진 배열을 순회하면서 콜백 함수 실행의 반환값이 true에 해당하는 첫번째 요소를 반환

```js
arr.find((element, index, array) =>{

}, thisArg);
/**
 * element : 현재 배열요소값 , index : 배열 인덱스
 * array : 참조한 배열, thisArg : 콜백함수에서 this로 사용할 값
 * 리턴값 : 반환 타입은 찾은 요소의 타입 / 없다면 undefined
 * /
```

```js
const numberArr = [1, 3, 3, 5, 7];
const objectArr = [
  { name: "Harry", age: 20 },
  { name: "Kim", age: 23 },
  { name: "Park", age: 33 },
];
console.log(
  objectArr.find((item) => {
    // {name : 'Park', age : 33}
    return item.age === 33; // 해당 조건에 부합하는 값이 있으면 반환
  })
);
console.log(numberArr.find((item) => item === 3)); // 3
// 여려개를 배열로 받고싶으면 find대신 filter 사용
```

##### findIndex()

- 배열 메소드 indexOf()의 콜백함수 버전
- 고차함수 find()의 리턴값이 인덱스인 버전

```js
arr.findIndex((element, index, array) =>{

}, thisArg)
/**
 * element : 현재 배열 요소값, index : 배열 인덱스
 * array : 참조한 배열, thisArg : 콜백함수에서 this로 사용할 값
 * 리턴 값 : 요소가 테스트를 통과하면 배열의 인덱스 / 그렇지 않으면 -1
 * /
```

```js
const objectArr = [
  { name: "Kim", age: 30 },
  { name: "Park", age: 28 },
  { name: "Bae", age: 13 },
];
console.log(
  objectArr.findIndex((item) => {
    //2
    return item.age === 13; // 해당 조건에 부합하면 item의 인덱스를 반환
  })
);
```

##### filter()

- filter()메소드는 콜백 함수에 의해 제공된 테스트를 통과한 모든 엘리먼트를 가진 새로운 배열을 만든다.

```js
arr.filter((element, index, array)=>{

}, thisArg)
/**
 * element : 현재 배열요소값, index : 배열 인덱스
 * array : 참조한 배열, thisArg : 콜백함수에서 this로 사용할 값
 * 리턴 값 : 테스트를 통과한 요소로 이루어진 새로운 배열 / 어떤 요소도 테스트를 통과하지 못했으면 빈 배열을 반환한다.
 * /
```

```js
const persons = [
  { name: "curry", age: 30 },
  { name: "James", age: 15 },
  { name: "Thomas", age: 50 },
  { name: "Jimmy", age: 28 },
];
const fullAge = persons.filter(person => person.age >= 22);
console.log(fullAge);
/**
 * [
  { name: 'curry', age: 30 },
  { name: 'Thomas', age: 50 },
  { name: 'Jimmy', age: 28 }
]
/
```

##### reduce()

- 콜백 함수의 실행된 반환값(initialValue)을 전달 받아 연산의 결과값이 반환
- 사실상 forEach, map, filter 기능을 reduce로 모두 구현해서 사용할 수 있음

```js
arr.reduce((accumulator, currentValue, index, array ) =>{

}, initialValue);
/**
 * accumulator : 누산기, 순회하면서 계속 더해서 합쳐지는 값
 * currentValue : 현재 값
 * index : 배열 인덱스
 * array : 참조한 배열
 * initialValue : 콜백 최초 호출에서 acc 누산기에 제공하는 값, 초기값을 제공하지 않으면 배열의 첫 번째 요소를 사용, 빈 배열에서 초기값 없이 호출하면 에러
 * 리턴값 : 누적 계산의 결과값
 * /
```

- initialValue 값이 없는 경우
  - accumulator : 배열의 첫번째 값
  - currentValue : 배열의 두번째 값
- initialValue 값이 있는 경우
  - accumulator : initialValue가 지정한 값
  - currentValue : 배열의 첫번째 값

```js
const arr = [5, 7, 1, 8, 4];
const sum = arr.reduce(function (accumulator, currentValue) {
  return accumulator + currentValue;
}, 10);
console.log(sum); // 35
/*
initialValue가 10으로 잡혀있기 때문에 accumulator는 10 current는 배열 첫번째 값부터 시작한다. 
*/
```

##### sort()

- 배열 정렬
- 단, 복사본이 만들어지는 것이 아닌 원 배열이 정렬된다.
- 콜백 함수를 통해 배열의 원소를 어느 기준으로 정렬할 건지 지정해야함

```js
arr.sort(function(a,b) {

}, thisArg);
/**
 * compareFunction : 정렬 순서를 정의 하는 함수. 이 값이 생략되있으면 배열의 element를 문자열로 취급하여 유니코드 값 순서대로 정렬한다.
 * 리턴값 : sorting 된 값
 * /
```

##### some()

- 배열 메소드인 include()의 콜백함수 버전
- include는 값이 있냐에 따른 boolean이면, some은 함수 로직에 따른 boolean
- 배열의 요소들을 주어진 함수(조건)을 통과하는데 한개라도 통과되면 true, 아니면 false를 출력
- 빈 배열로 함수(조건)을 통과하면 무조건 false를 출력

```js
arr.some((currentValue, index, array) =>{

}, thisArg);
/**
 * currentValue : 현재 배열요소값, index : 배열 인덱스
 * array : 참조한 배열, thisArg : 콜백함수에서 this로 사용할 값
 * 리턴 값 : callback이 어떤 배열 요소라도 대해 참인 값을 반환하는 경우에는 true, 그 외엔 false
 * /
```

```js
const array = [1, 3, 5];
const result = array.some((currentValue) => {
  return currentValue % 2 === 0;
});
console.log(result); // false
// 하나라도 조건에 부합하면 true가 나온다
```

##### every()

- some()의 반대 버전
- 배열안의 모든 요소가 주어진 함수(조건)을 모두 통과하면 true, 한 요소라도 통과하지 못하면 false를 출력
- 빈 배열을 함수에 적용시키면 무조건 true를 반환

```js
arr.every((currentValue, index, array ) =>{

}, thisArg);
/**
 * currentValue : 현재 배열요소값
 * index : 배열 인덱스, array : 참조한 배열
 * thisArg : 콜백함수에서 this로 사용할 값
 * 리턴 값 : callback이 모든 배열 요소에 대해 참인 값을 반환하는 경우 true, 그 외엔 false
 * /
```

```js
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const result = array.every((currentValue) => {
  return currentValue < 60;
});
console.log(result); // true
// array중 하나라도 60보다 큰 값이 나오면 false가 출력된다.
```
