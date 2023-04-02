# type alias vs interface

## function

```ts
// type alias
type EatType = (food: string) => void;
//interface
interface IEat {
  (food: string): void;
}
```

## array

```ts
// type alias
type PersonList = string[];
// interface
interface IPersonList {
  [index: number]: string;
}
```

## intersection

```ts
interface ErrorHandling {
  success: boolean;
  error?: { message: string };
}
interface ArtistsData {
  artists: { name: string }[];
}

// type alias
type ArtistsResponseType = ArtistsDATA & ErrorHandling;

//interface
interface IArtistsResponse extends ArtistsData, ErrorHandling {}

let art: ArtistsResponseType;
let iar: IArtistsResponse;
```

## union types

```ts
interface Bird {
  fly(): void;
  layEggs(): void;
}
interface Fish {
  swim(): void;
  layEggs(): void;
}
type PetType = Bird | Fish;

// 유니온으로 선언된거는 상속할 수 없음 => 하나의 인터페이스를 하나의 클래스로 표현하기 어려워서
interface IPet extends PetType {} // err
class Pet implements PetType {} // err
```

## Delaration Merging - interface

- html 엘리먼트를 확장할 때 유용
- 별도의 서드파티에서 사용할 때 사용

```ts
interface MergingInterface {
  a: string;
}
interface MergingInterface {
  b: string;
}
let mi: MergingInterface;
// mi. 을찍어서 a와 b 둘 다 값을 쓸 수 있음 (머징되어서)
```

## Delaration Merging - type alias

```ts
type MergingType = {
  a: string;
};
type MergingType = {
  b: string;
};
// type alias 에서는 사용 불가
```
