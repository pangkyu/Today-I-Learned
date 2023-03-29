# strict

1. --nolmplicitAny

- 명시적이지 않게 any타입을 사용하여 표현식과 선언을 쓰면 에러 발생
  - 타입스크립트가 추론을 실패한 경우 any가 맞으면 any라고 명시적으로 지정
  - 아무것도 쓰지 않으면 에러

2. --nolmplicitThis

- 명시적이지 않게 any 타입을 사용하여 this 표현식에 사용하면 에러 발생

```ts
function noImplicitThisTest(name: string, age: number) {
  this.name = name;
  this.age = age;
  return this;
}

console.log(noImplicitThisTest.call({ height: 60 }, "Mark", 36));
console.log(noImplicitThisTest.apply({ height: 60 }, []"Mark", 36]));
console.log(noImplicitThisTest.bind({height : 180}('Mark', 36)));

//해결
function noImplicitThisTest(this, name: string, age: number) {
  this.name = name;
  this.age = age;
  return this;
}

console.log(noImplicitThisTest.call({ height: 60 }, "Mark", 36));
console.log(noImplicitThisTest.apply({ height: 60 }, []"Mark", 36]));
console.log(noImplicitThisTest.bind({height : 180}('Mark', 36)));
/*
첫 매개변수 자리에 this를 놓고, this에 대한 타입을 어떤 것이라도 표현하지 않으면 noImplicitAny가 오류 발생

js에서는 매개변수에 this넣으면 예약 키워드이기 때문에 신택스에러가 발생(ts에서만 가능)

call/apply/bind처럼 함수 콜을 하는 용도로 사용 -> any로 명시적으로 지정하는 것은 합리적임

*/
```

3. --strictNullChecks

- strictNullChecks를 적용하지 않으면 모든 타입은 null, undefined를 가질 수 있음
- 적용한 경우, null 및 undefined 값이 모든 유형의 도메인에 속하지 않으며, 그 자신을 타입으로 갖거나 any일 경우에만 할당이 가능하다 ( undefined에 void는 할당 가능)

4. --stricPropertyInitialization

- 정의되지 않은 클래스의 속성이 생성자에서 초기화되었는지 확인
