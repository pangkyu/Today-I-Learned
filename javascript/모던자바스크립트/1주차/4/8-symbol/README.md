## 모던 자바스크립트 1주차

범위 : Part 1 1.1~1.6

---

### ch8 : 심볼형

> 자바스크립트는 객체 프로퍼티 키로 오직 문자형과 심볼형만 허용한다.

- 심볼의 주요 유스케이스
  - 객체의 숨김 프로퍼티 : 외부 스크립트에서 우리가 숨긴 것을 볼 수 없다. 외부 스크립트나 라이브러리에 속한 객체에 새로운 프로퍼티를 추가하고 싶다면 심볼을 만들고 이를 프로퍼티 키로 사용하면 된다.
  - Symbol.\* 로 접근할 수 있다.

##### 심볼

- 심볼은 유일한 식별자(unique identifier)를 만들고 싶을 때 사용한다.

```js
let id = Symbol();

// 심볼 이름이라 불리는 설명을 붙일 수도 있다.
let id = Symbol("id");
```

- 심볼은 유일성이 보장되는 자료형이다. 설명이 동일한 심볼을 여러 개 만들어도 각 심볼 값은 다르다.
- 심볼에 붙이는 설명은 어떤 것에도 영향을 주지 않는 이름표 역할만을 한다.

```js
let id1 = Symbol("id");
let id2 = Symbol("id");
alert(id1 == id2); // false
```

- 심볼형 값은 다른 자료형으로 암시적 형 변환(자동형변환)되지 않는다.

```js
let id = Symbol("id");
alert(id); //  TypeError: Cannot convert a Symbol value to a string
```

- 심볼을 반드시 출력해야하는 상황이면 <code>.toString()</code>메소드를 사용한다.

```js
let id = Symbol("id");
alert(id.toString()); // Symbol(id)가 얼럿 창에 출력됨
```

- <code>symbol.description</code> 프로퍼티를 이용하면 설명만 보여주는 것도 가능하다.

```js
let id = Symbol("id");
alert(id.description); // id
```

##### 숨김 프로퍼티

- 심볼을 이용하면 숨김(hidden)프로퍼티를 만들 수 있다. 숨김 프로퍼티는 외부 코드에서 접근이 불가능하고 값도 덮어쓸 수 없는 프로퍼티이다.

```js
let user = {
  // 서드파티 코드에서 가져온 객체
  name: "John",
};
let id = Symbol("id");
user[id] = 1;
alert(user[id]); // 심볼을 키로 사용해 데이터에 접근할 수 있다.

/*
문자열 id를 키로 써도 되는데 Symbol('id')을 사용한 이유 ? 
user는 서드파티 코드에서 갖고 온 객체이므로 함부로 새로운 프로퍼티를 추가할 수 없다. 
그런데 심볼은 서드파티 코드에서 접근할 수 없기 때문에, 심볼을 사용하면 서드파티 코드가 모르게 user에 식별자를 부여할 수 있다.
*/
```

- 심볼은 유일성이 보장되므로 우리가 만든 식별자와 제3의 스크립트에서 만든 식별자가 이름이 같더라도 충돌하지 않는다.
- 심볼 대신 문자열 <code>'id'</code>를 사용해 식별자를 만들었다면 충돌이 발생할 가능성이 있다.

```js
let user = { name: "John" };
// 문자열 id를 사용하여 식별자를 만들었다.
user.id = "스크립트 id 값";
// 만약 제 3의 스크립트가 우리 스크립트와 동일하게 문자열 'id'를 이용하여 식별자를 만들었다면?
user.id = "제 3 스크립트 id 값 ";
// 의도치 않게 값이 덮어 쓰여서 우리가 만든 식별자가 무의미해 진다.
```

##### Symbols in a literal

- 객체 리터럴 <code>{...}</code>을 사용해 객체를 만든 경우, 대괄호를 사용하여 심볼형 키를 만들어야 한다.

```js
let id = Symbol("id");
let user = {
  name: "John",
  [id]: 123, // 'id' : 123은 안된다.
};
```

##### 심볼은 for in에서 배제된다

- 키가 심볼인 프로퍼티는 <code>for in</code>반복문에서 배제된다.

```js
let id = Symbol("id");
let user = {
  name: "John",
  age: 30,
  [id]: 123,
};
for (let key in user) alert(key); // name과 age만 출력되고, 심볼은 출력되지 않는다.
alert(" 직접 접근한 값 : " + user[id]); // 심볼로 직접 접근하면 잘 작동한다.
```

- <code>Object.keys(user)</code>에서도 키가 심볼인 프로퍼티는 배제된다. '심볼형 프로퍼티 숨기기'라 불리는 원칙 덕분에 외부 스크립트나 라이브러리는 심볼형 키를 가진 프로퍼티에 접근하지 못한다.
- <code>Object.assign</code>은 키가 심볼인 프로퍼티를 배제하지 않고 객체 내 모든 프로퍼티를 복사한다.
- 객체를 복사하거나 병합할 때, <code>id</code>같은 심볼을 포함한 프로퍼티 전부를 사용하도록 하기 위해 설게되었음

```js
let id = Symbol("id");
let user = {
  [id]: 123,
};
let clone = Object.assign({}, user);
alert(clone[id]); // 123
```

##### 전역 심볼

- 심볼은 이름이 같더라도 모두 별개로 취급된다.
- 이름이 같은 심볼이 같은 개체를 가리키길 원하는 경우도 가끔 있다.
- 전역 심볼 레지스트리 안에 심볼을 만들고 해당 심볼에 접근하면 이름이 같은 경우 항상 동일한 심볼을 반환한다.
- 레지스트리 안에 있는 심볼을 읽거나, 새로운 심볼을 생성하려면 <code>Symbol.for(key)</code>를 사용해야 한다.
- 이 메소드를 호출하면 이름이 <code>key</code>인 심볼을 반환한다. 조건에 맞는 심볼이 레지스트리 안에 없으면 새로운 심볼 <code>Symbol(key)</code>을 만들고 레지스트리 안에 저장한다.

```js
// 전역 레지스트리에서 심볼을 읽는다.
let id = Symbol.for("id"); // 심볼이 존재하지 않으면 새로운 심볼을 만든다.

// 동일한 이름을 이용해 심볼을 다시 읽는다.
let idAgain = Symbol.for("id");

// 두 심볼은 같다.
alert(id === idAgain); // true
```

##### Symbol.keyFor

- <code>Symbol.keyFor(sym)</code>를 사용하면 이름을 얻을 수 있다.
- 전역 심볼 레지스트리를 뒤져서 해당 심볼의 이름을 얻어낸다.
- 검색 범위가 전역 심볼 레지스트리이기 때문에 전역 심볼이 아닌 심볼에는 사용할 수 없다.
- 전역 심볼이 아닌 인자가 넘어오면 <code>Symbol.keyFor</code>는 <code>undefined</code>를 반환한다.

```js
// 이름을 이용하여 심볼을 찾는다.
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// 심볼을 이용하여 이름을 얻는다.
alert(Symbol.keyFor(sym)); //name
alert(Symbol.keyFor(sym2)); //id
```

- 일반 심볼에서 이름을 얻고싶으면 <code>description</code>프로퍼티를 사용한다.

```js
let globalSymbol = Symbol.for("name");
let localSymbol = Symbol("name");

alert(Symbol.keyFor(globalSymbol)); // name, 전역 심볼
alert(Symbol.keyFor(localSymbol)); // undefined, 전역 심볼이 아님

alert(localSymbol.description); // name
```

##### 시스템 심볼

- 시스템 심볼은 자바스크립트 내부에서 사용되는 심볼이다. 시스템 심볼을 활용하면 객체를 미세 조정할 수 있다.
  - Symbol.hasInstance
  - Symbol.isConcatSpreadable
  - Symbol.iterator
  - Symbol.toPrimitive
  - 등등
