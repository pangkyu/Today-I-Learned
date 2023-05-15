### 함수 조합 (Function composition)

- 작은 기능을 구현한 함수를 여러번 조합하여 더 의미있는 함수로 만들어 내는 프로그램 설계 기법

```ts
// 모두 애리티가 1인 함수
export const f = <T>(x: T): string => `f(${x})`;
export const g = <T>(x: T): string => `g(${x})`;
export const h = <T>(x: T): string => `h(${x})`;

y = h(g(f(x)));
```

#### compose 함수

가변 인수 스타일로 함수들의 배열을 입력받는다. 그 다음 함수를 조합하여 매개변수 x를 입력받는 1차 함수를 반환한다.

```ts
// compose.ts
export const compose =
  <T, R>(...functions: readonly Function[]): Function =>
  (x: T): ((T) => R) => {
    const deepCopiedFunctions = [...functions];
    return deepCopiedFunctions
      .reverse()
      .reduce((value, func) => func(value), x);
  };
```

compose 함수를 사용하여 에리티가 1인 f,g,h 함수를 조합

```ts
// compose-test.ts
import { f, g, h } from "./f-g-h";
import { compose } from "./compose";

const composedFGH = compose(h, g, f);
console.log(composedFGH("x"));
```

```ts
// compose-test2.ts
import { compose } from "./compose";

const inc = (x: number): number => x + 1;
const composed = compose(inc, inc, inc);
console.log(composed(1)); // 4
```

#### pipe 함수

compose와 동작 원리는 같지만 조합하는 함수들의 순서만 다르다.

```ts
export const pipe =
  <T>(...functions: readonly Function[]): Function =>
  (x: T): T => {
    return functions.reduce((value, func) => func(value), x);
  };
```

```ts
// pipe-test.ts
import { f, g, h } from "./f-g-h";
import { pipe } from "./pipe";

const piped = pipe(f, g, h);
console.log(piped("x")); // h(g(f(x)))
```

pipe와 compose 함수 분석

pipe함수는 pipe(f), pipe(f,g), pipe(f,g,h)처럼 가변 인수 방식으로 동작하므로 매개변수를 다음과 같이 설정한다

```ts
export const pipe = (...functions)
```

- 단, 위와 같이 가변인수로 정하게 되면 타입을 설정하기 어렵다.
- 이들을 모두 포함할 수 있는 제네릭 타입을 적용하기 어렵기 때문에, 자바스크립트 타입 Function들의 배열인 Function[]으로 설정한다.

```ts
export const pipe = (...functions: Function[]):Function
```

함수 몸통을 구현해야하는데, [f,g,h]가 있다고 가정할 때, h(g(f(x)))형태의 함수를 만들어야 한다.

```ts
export const pipe =
  <T>(...functions: Function[]): Function =>
  (x: T) =>
  (T) => {
    // functions의 현재 내용 [f,g,h]
  };
```

- reduce를 활용하여 해결 !

```ts
export const pipe =
  <T>(...functions: Function[]): Function =>
  (x: T) =>
  (T) => {
    return functions.reduce((value, func) => func(value), x);
  };
```

##### compose함수와 pipe 함수는 매개변수 방향이 반대 !!

=> pipe(f,g,h) == compose(h,g,f)

#### 부분함수와 함수 조합

```ts
// 고차함수의 부분함수는 함수 조합에 사용될 수 있다.
import { pipe } from "./pipe";

const add = (x) => (y) => x + y;
const inc = add(1);

const add3 = pipe(inc, add(2));
console.log(add3(1)); // 4
```
