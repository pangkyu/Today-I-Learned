# 프로미스

- 프로미스 클래스를 사용하기 위해서는 new 연산자를 통해 객체를 만들어야 한다.

```ts
const promise = new Promise(콜백함수);

// 타입스크립트에서의 Promise는 다음처럼 제네릭 클래스 형태로 사용해야한다.

const numPromise: Promise<number> = new Promise<number>(콜백함수);
const strPromise: Promise<string> = new Promise<string>(콜백함수);
const arrayPromise: Promise<number[]> = new Promise<number[]>(콜백함수);
```

프로미스의 콜백함수로 **resolve**와 **reject**가 있다.

타입스크립트 Promise의 콜백 함수는 다음처럼 resolve와 reject함수를 매개변수로 받는 형태이다.

```ts
new Promise<T>((resolve: (sucessValue: T) => void, reject: (any) => void) => {
  // code..
});
```

#### 1. Promise.resolve

프로미스 클래스는 resolve라는 클래스 메서드를 제공한다. 앞서 Promise.resolve는 이를 클래스 메서드로 구현한 것이다. <code>Promise.resolve(값)</code> 형태로 호출하면 항상 이 값은 then 메서드에서 얻일 수 있다.

```ts
Promise.resolve(1).then((value) => console.log(value)); // 1
Promise.resolve("hi").then((value) => console.log(value)); // hi
Promise.resolve([1, 2, 3]).then((value) => console.log(value)); // [1,2,3]
Promise.resolve({ name: "Jack", age: 32 }).then((value) => console.log(value)); // {name : 'Jack', age : 32 }
```

#### 2. Promise.reject

- Promise.reject(Error 타입 객체)를 호출하면 이 Error 타입객체는 항상 catch 메서드의 콜백 함수에서 얻을 수 있다.

```ts
Promise.reject(new Error("에러발생")).catch((err: Error) =>
  console.log("error", err.message)
); // error : 에러발생
```

#### 3. then 체인

- then에서 반환된 값은 또 다른 then메서드를 호출하여 ㄱ밧을 수신할 수 있다.
- 만약 거절당한 값인 경우 catch메서드에서 거절당한 값을 얻는다.

```ts
Promise.resolve(1)
  .then((value: number) => {
    console.log(value);
    return Promise.resolve(true);
  })
  .then((value: boolean) => {
    console.log(value); // true
    return [1, 2, 3];
  });
```
