### this

- this는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수이다.
- this를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메소드를 참조할 수 있다.
- 함수를 호출하면 인자와 this가 암묵적으로 함수 내부에 전달된다.
- this는 코드 어디서든 참조할 수 있다.
- 함수 내부에서 인자를 지역 변수처럼 사용할 수 있는 것과 같이, this도 지역 변수처럼 사용할 수 있다.
- 종류 : 기본 바인딩, 임시적 바인딩, 명시적 바인딩, new 바인딩, 화살표 함수(es6)
- 우선순위 : new 바인딩 > 명시적 바인딩 > 암시적 바인딩 > 기본 바인딩

---

1. 기본 바인딩(Default binding)
   - 기본 바인딩이 적용된 경우 this는 전역객체에 바인딩된다.
   - 브라우저 환경인 경우, window / 노드JS환경인 경우, global
   - 하지만, 엄격모드인 경우에는 기본바인딩 대상에서 전역객체 제외된다.

```js
// 1
function foo() {
  const a = 10;
  console.log(this.a);
}
foo(); // undefined

// 2
window.a = 10;
function foo() {
  console.log(this.a);
}
foo(); // 10
```

2. 암시적 바인딩(Implicit binding)
   - 함수가 객체의 프로퍼티로 접근해서 실행한다.

```js
// 1
function hello(){
    console.log(this.name);
}
const obj = {
    name : 'chris',
    hello : hello,
}
obj.hello() // 'chirs'

// 2
function hello(){
    console.log(this.name);
}
const obj = {
    name : 'chris',
    hello : hello,
}
helloFn = obj.hello
name = 'global context!'
helloFn(); // global context!

// 3
const foo = {
    a : 20,
    bar : function(){
        console.log(this.a);
    }
}
foo.bar(); // 20
/**
 *  setTimeout(foo.bar, 1); ==> undefined
 *  setTimeout 함수안 콜백은 bar라는 함수의 레퍼런스 부분, foo의 콘텍스트를 갖고있지 않음
 * /
```

3. 명시적 바인딩(Explicit binding)
   - 자바스크립트의 모든 function은 call(), apply(), bind()라는 프로토타입 메소드를 가지고 있다.
   - 이 3가지 메서드 중 하나를 호출함으로 this 바인딩을 코드에서 명시하는 것. 이때 this는 내가 명시한 객체에 바인딩된다.
   - call() : 매개변수의 목록 , apply() : 배열을 받음
   - bind() : call, apply와 다르게 함수를 실행하지 않음 / 새로운 함수를 만들어 리턴을 해준다.

```js
// 1
function add(a, b) {
  return a + b;
}
app.call(null, 1, 2); // 3
app.apply(null, [1, 2]); // 3

// 2
const obj = { name: "Tom" };
const say = function (city) {
  console.log(`hello, my name is ${this.name}, I live in ${city}`);
};
say("seoul"); // hello, my name is , I live in seoul
say.call(obj, "seoul"); // hello, my name is Tom, I live in seoul
say.apply(obj, ["seoul"]); //  hello, my name is Tom, I live in seoul

// 4  call을 사용하면 함수를 실행하고 함수의 첫 번째 인자로 전달하는 값에 this를 바인딩
function logName(a, b, c) {
  console.log(this.name); // seongkyu
  console.log(a + b + c); // 6
}
const person = {
  name: "seongkyu",
};
logName.call(person, 1, 2, 3);

// 5 apply를 사용하면 함수를 실행하고 함수의 첫 번째 인자로 전달하는 값에 this를 바인딩
// call과의 차이점은 인자를 배열로 전달(인자로 배열 자체를 전달하는 것이 아닌 배열의 요소들이 값으로 전달된다. )
logName.apply(person, [1, 2, 3]);

//6 bind 함수 첫 번째 인자에 this를 바인딩한다는 점은 같으나, 함수를 실행하지않고 새로운 함수를 반환한다. (반환된 새로운 함수를 실행해야 원본함수가 실행됨)
function logAge(a, b, c) {
  // 적절한 파라미터가 들어오지 않으면 실행하지 않음
  console.log(this.age);
  console.log(this.name);
  console.log(a); // 1
  console.log(b); // 2
  console.log(c); // 3
  console.log(a + b + c);
}
const person = {
  age: 31,
  name: "seong",
};
const myAge = logAge.bind(person, 1); // myAge를 실행시키면 person에 해당하는 값들이 바인딩 됨. 2번째 인자에 있는 1이 a의 위치
myAge(2, 3); // 2가 logAge의 b 파라미터로, 3이 logAge의 c파라미터로 들어간다.
```

4. new를 통한 바인딩
   - new를 통해 생성하게되면 this는 새로 생성된 객체를 가르키게 된다.
   - 1. 새로운 객체 생성
   - 2. 새로 생성된 객체의 [[Prototype]]이 연결된다.
   - 3. 새로 생성된 객체는 해당 함수 호출 시 this로 바인딩된다.(new바인딩)
   - 4. 함수가 자신의 또 다른 객체를 반환하지 않는 한, new와 함께 호출된 함수는 자동으로 새로 생성된 객체를 반환한다.

```js
class Man {
  constructor(name) {
    this.name = name;
  }
  hello() {
    console.log("hello " + this.name);
  }
}
const john = new Man("john"); // new 키워드를 붙이지 않을 경우, this가 해당 객체로 바인딩 되지 않기 때문에 Window 객체를 건드리는 일이 발생할 수 있음
john.hello();
```

5. 화살표 함수(Arrow function)
   - ECMAScript 6에서 새로 추가된 함수를 축약해서 사용할 수 있는 문법.
   - 무조건 익명함수로만 사용할 수 있음 / 메소드나 생성자 함수로 사용할 수 없음
   - this를 외부 스코프에서 정적으로 바인딩된 문맥(정적 컨텍스트, Lexical context)을 갖는다는 특징을 가지고 있다.
   - 화살표 함수의 랙시컬 바인딩은 절대 오버라이드 할 수 없음
   - lexical binding : 화살표 함수를 정의한 시점의 코드 문맥에서 상위 환경과 동일한 this를 가리킨다.

```js
const cat = {
  name: "meow",
  foo1: function () {
    const foo2 = function () {
      console.log(this.name); // undefined
    };
    foo2();
  },
};
cat.foo1();
/**
 * cat.foo1() 메소드 호출 시 내부 함수 foo2 실행
 * 함수가 호출됐으므로 foo2 내부의 this는 지정되지 않아서 전역 객체를 가리킴
 * 전역객체에는 name 속성이 없으므로 undefined
 * /
```

```js
const cat = {
  name: "meow",
  foo1: function () {
    const foo2 = () => {
      console.log(this.name); // meow
    };
    foo2();
  },
};

cat.foo1();
```

- 화살표 함수에는 this가 아예 없음
- 자바스크립트에서는 어떤 식별자(변수)를 찾을 때 현재 환경에서 그 변수가 없으면 바로 상위 환경을 검색. 점점 상위 환경으로 타고 올라가다 변수를 찾거나 가장 상위 환경에 도달하면 그만두게 된다. 화살표 함수에서의 this 바인딩도 이와 유사하다.

---

- 화살표 함수를 쓰면 안되는 경우

1. 메소드

```js
const cat = {
    name : 'meow';
    callName : () => console.log(this.name); // undefined
}
cat.callName();
/**
 * 위와 같은 경우의 callName 메소드의 this는 자신을 호출한 객체 cat이 아닌 함수 선언 시점의 상위 스코프인 전역객체를 기리킨다.
 * /
```

2. 생성자 함수

```js
const Foo = () => {};
const foo = new Foo(); // TypeError
// 화살표 함수를 생성자함수로 사용하면 에러가 발생한다.
```

3. addEventListener()의 콜백함수

```js
const button = document.getElementById('myButton');

button.addEvenetListener('click', () => {
    console.log(this); // Window
    this.innerHTML = 'clicked';
});
button.addEvenetListener('click', function(){
    console.log(this); // button 엘리먼트
    this.innerHTML = 'clicked';
});
/**
 * addEventListener의 콜백함수에선느 this에 해당 이벤트 리스너가 호출된 엘리먼트가 바인딩되록 정의되어 있음
 * 화살표 함수를 사용하면 기존 바인딩 값이 사라지고 상위 스코프가 바인딩 된다.
 * /
```
