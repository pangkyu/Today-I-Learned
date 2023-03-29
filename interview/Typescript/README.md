# ts

### ts의 타입 시스템

- 타입을 명시적으로 지정할 수 있다.
- 명시적으로 지정하지 않을시, 컴파일러가 자동으로 타입을 추론한다.

#### 함수 사용법에 대한 오해를 야기하는 js

nan을 의도한 것이 아니라면 사용자의 입력에 따라 타입이 바뀐다.

```js
const test = (props) => {
  return props * 3;
};
test(10); // 30
test("plus"); // NaN
```

```ts
const test = (props) => {
  // 타입을 명시하지 않은 경우기 때문에 props는 any로 추론된다.
  return props * 3; // 리턴타입은 number로 추론된다.
};
// props가 any이기 때문에 아래 두 개는 에러가 발생하지 않음
test(10); // 30
test("plus") + 5; // NaN
```

```ts
function f7(a: { name: string; age: number }): string {
  return `이름 ${a.name}, 나이 ${a.age}`;
}
f7({ name: "mark", age: 10 });
```

> 여러 옵션들이 존재하여 ts를 사용하는 것이 코드를 작성하는 입장에서 편하다

### 나만의 타입 만들기

1. interface
2. type alias
3. class

```ts
interface PersonInterface {
  name: string;
  age: number;
}
type PersonInterface = {
  name: string;
  age: number;
};
function test(a: PersonInterface): string {
  return ` code.. `;
}
```

### structural type system - 구조가 같으면 같은 타입 ( js, ocaml 에서 사용된다 )

```ts
interface IPerson {
  name: string;
  age: number;
  speak(): string;
}
type PersonType = {
  name: string;
  age: number;
  speak(): string;
};
let personInterface: Iperson = {} as any;
let personType: PersonType = {} as any;

personInterface = personType;
personType = personInterface;
```

### nominal type system - 구조가 같아도 이름이 다르면 다른 타입 (c++, java에서 사용된다. )

```ts
// ts에서 아래와 같이 활용이 가능하다. 자주사용하는 방식은 아니다.
type PersonID = string & { readonly brand: unique symbol };
function PersonId(id: string): PersonID {
  return id as PersonID;
}
function getPersonById(id: PersonID) {}
getPersonById(PersonId("id-aaaaaa"));
getPersonById("id-aaaa"); // ts err  , 넣으려면 PersonId로 치환해서 넣어야 한다.
```

> 타입스크립트 4.7부터 공변과 반변을 out, in 키워드로 명시할 수 있다.

- 함수가 아닌 타입은 공변한다.
  - <code>type WithID<T> = T & { id : number}</code>
- 제공한 타입을 반환하는 함수 타입 역시 공변한다.
  - <code>type Picker<T> = (arr : unknown[]) => T</code>
- 제공한 타입을 매개변수로 사용하는 함수 타입은 반변한다.
  - <code>type NumberParser<T> = (v : T) => number</code>
- 제공한 타입을 매개변수로 사용하고 반환형으로도 사용하는 함수 타입은 하나의 타입에 대해 공변하는 동시에 반변할 수는 없으므로 무공변타입이다. => 즉 기존의 타입관계를 유지하지 않음
  - <code>type Finder<T> = (arr:T[]) => T</code>

=> 넓은 값은 더 넓은 곳에 적용할 수 있으니 공변, 넓은 값을 필요로 하는 함수는 더 좁은 경우에만 사용할 수 있으니 반변

```ts
// 1. 같거나 서브 타입인 경우 할당이 가능 => 공변

// 원시형
let sub: string = '';
let sup: string | number = sub;

// 오브젝트 - 각각의 프로퍼티가 대응하는 프로퍼티와 같거나 서브타입이어야 함
let sub : { a : string; b : number } = { a : '', b:1}
let sup : {P a: string | number; b : number } = sub;

// 배열 - 오브젝트와 마찬가지
let sub : Array<{a:string; b : number}> = [{a : '', b: 1}];
let sup : Array<{a:string|number; b : number}> = sub;

```

```ts
// 2. 함수의 매개변수 타입만 같거나 슈퍼타입인 경우, 할당이 가능하다 => 반변
class Person {}
class Developer extends person {
  coding() {}
}
class StartupDeveloper extends Developer {
  burning() {}
}
function tellme(f: (d: Developer) => Developer) {}

tellme(function dToD(d: Developer): Developer {
  return new Developer();
});

tellme(function pToD(d: Person): Developer {
  return new Developer();
});
tellme(function sToD(d: StartupDeveloper): Developer {
  return new Developer();
});
```

### type alias 와 interface 구분

목적가치가 분명 -> interface , 그렇지 않고 대상을 가리키거나 별명으로서 존재하면 -> type alias
