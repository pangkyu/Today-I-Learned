## 제네릭 프로그래밍

- 제네릭 타입은 인터페이스나 클래스, 타입 별칭 , 함수 등에 사용할 수 있는 기능. 심벌의 타입을 미리 지정하지 ㅇ낳고 다양한 타입에 대응하려고 할 때 사용한다.

```ts
// 제네릭 인터페이스 구문
interface IValuabe<T> {
  value: T;
}
```

```ts
// 제네릭 함수 구문
function identity<T>(arg: T): T {
  return arg;
}

// 제네릭 타입 별칭 구문
type IValuable<T> = {
  value: T;
};

// 제네릭 클래스 구문
class Valuable<T> {
  constructor(public value: T) {}
}
```

제네릭 클래스는 자신이 가진 타입 변수 T를 인터페이스 쪽 제네릭 타입 변수로 넘길 수 있다.

```ts
// IValuable.ts
export interface IValuable<T> {
  value: T;
}

// Valuable.ts
import { IValuable } from "./IValuable";

export class Valuable<T> implements IValuable<T> {
  constructor(public value: T) {}
}
export { IValuable };
```

위에서 정의한 것들을 사용하는 제네릭 함수를 만들면 아래처럼 자신의 타입 변수 T를 제네릭 인터페이스의 타입 변수 쪽으로 넘기는 형태로 구현가능하다.

```ts
import { IValuable, Valuable } from "./Valuable";

export const printValue = <T>(o: IValuable<T>): void => console.log(o.value);
export { IValuable, Valuable };
```

위의 코드를 임포트 해와서 생성하면 아래와 같이 출력된다.

```ts
printValue(new Valuable<number>(1));
printValue(new Valuable<number[]>([1, 2, 3]));
// 타입 변수를 생략해도 스스로 추론하여 구체적인 제네릭 타입을 찾느다.
printValue(new Valuable("hello"));
```

#### 타입의 타입은 허용하지 않는다.

```ts
const create = <T>(type: T): T => new Type();
/*
create 함수의 매개변수 type은 실제로는 '타입'이다. 따라서 type 변수의 타입 주석으로 명시한 T는 '타입의 타입'이 된다. 그러나 ts는 타입의 타입을 허용하지 않는다. 
*/
```

```ts
const create = <T extends { new (): T }>(type: T): T => new Type();
// 중괄호로 new()부분을 감싸서 메서드 형태로 표현했다. 아래처럼하면 좀더 간단하게 표현할 수 있다.

const create = <T>(type: { new (...args): T }, ...args): T => new type(...args);
```
