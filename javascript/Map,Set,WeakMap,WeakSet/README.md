### 1. Map/Set

- ES2015에서 추가된 자료구조
- Map은 객체와 유사하고, Set은 배열과 유사하다

##### Map

- 1대1로 묶임(키-밸류)
- 키와 값을 객체로 줄 수 있다

```js
// 생성 방법 1
const m = new Map();
// 생성 방법 2
const m2 = new Map({ a: "2", b: "3" });
```

```js
m.set("a", "b"); // set(키,값)으로 Map속성에 추가
m.set(3, "c"); // 문자열이 아닌 값을 키로 사용할 수 있다.
m.get("a"); // 키값을 넣으면 해당 속성값이 조회된다. 'b'
```

```js
m.set({ a: "b" }, { c: "d" }); // 키-값도 객체로 받을 수 있다
{a : 'b' } !== {a : 'b'}; // true , 참조값이 다르기 때문에
// 단, 이걸 get하기 위해서는 다음과 같이 실행해야한다
const obj = { key : 'key'} // 미리 변수에 저장한 뒤 사용해야한다
m.set(obj, 123);
m.get(obj); // 123
```

- <code>m.size</code> 로 속성 개수를 조회한다.
- <code>has()</code>는 속성 값의 존재를 확인한다.
- <code>delete(key)</code>는 key로 속성을 삭제한다.
- <code>clear()</code>로 전부 제거한다.

- 반복문은 다음과 같이 사용한다

```js
for (const [k, v] of m) {
  // 반복문에 바로 넣어서 사용이 가능함
  console.log(k, v);
}

m.forEach((v, k) => {
  console.log(k, v);
});
```

##### Set

- 중복을 허용하지 않음
- 자료형이 다를 경우에는 가능

```js
const s = new Set();
s.add(1);
s.add(1);
s.add(2);
s.size; // 2, 중복을 허용하지 않기 때문에
```

- s.delete(2); // delete(요소)로 요소를 제거한다.
- s.clear(); // clear()로 전부 제거한다.
- s.has(); // has(요소)로 존재 여부를 확인한다.
- s.add(); // set에 추가한다.
- 반복문은 다음과 같이 사용한다.

```js
for (const a of s) {
  console.log(a);
}

s.forEach((a) => {
  console.log(a);
});
```

```js
const arr = [1, 2, 3, 2, 3, 5, 2];
const s2 = new Set(arr);
Array.from(s2); // 중복 제거하여 다시 배열로 출력
```

### 2. WeakMap/WeakSet

- 가비지 컬렉팅이 잘된다.

```js
const wm = new WeakMap();
let obj = {};
wm.set(obj, "123");
obj = null; // 하면 obj가 가비지 컬렉팅이 되면서 123도 같이 사라진다
```

```js
// 활용 예
/**
 * 기존 서버에서 오는 객체를 수정하고 싶지 않거나, 추가되면 헷갈리는 등 객체를 수정하려는 의도가 없는 경우에 사용한다.
 */
let user = { name: "bae", age: 26 };
wm.set(user, { married: false });
user = null; // 가비지 컬렉팅이 되면 married:false 부분도 사라진다.
```
