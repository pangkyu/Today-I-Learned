## 모던 자바스크립트 1주차

범위 : Part 1 1.1~1.6

---

### ch5 : 테스트 자동화와 mocha

> 테스팅 자동화는 테스트 코드가 실제 동작에 관여하는 코드와 별개로 작성되었을 때 가능하다. 테스트 코드를 이용하면 함수를 다양한 조건에서 실행해 볼 수 있는데, 이때 실행 결과와 기대 결과를 비교할 수 있다.

- 코드를 수동으로 재실행하면서 테스트를 하면 무언가 놓치기 쉽다.

##### Behavior Driven Development(BDD)

- BDD는 테스트(test), 문서(documentation), 예시(example)를 한데 모아놓은 개념
- BDD에서는 스펙을 먼저 작성한 뒤에 구현을 시작한다. 구현이 종료된 시점에는 스펙과 코드 둘 다 확보할 수 있다.

##### 거듭제곱 함수와 명세서

- 만들어진 산출물을 BDD에서 명세서(specification)또는 짧게 줄여 스펙(spec)이라고 부른다. 명세서에는 아래와 같이 유스 케이스에 대한 자세한 설명과 테스트가 담겨있다.

```js
describe("pow", function () {
  it("주어진 숫자의 n 제곱", function () {
    assert.equal(pow(2, 3), 8);
  });
});
```

- <code>describe('title', function() {...})</code> : 구현하고자 하는 기능에 대한 설명. <code>it</code>블록을 한데 모아주는 역할도 한다.
- <code>it('유스 케이스 설명', function(){...})</code> : <code>it</code>의 첫 번째 인수에는 특정 유스 케이스에 대한 설명이 들어간다. **누구나 읽을 수 있고 이해할 수 있는 자연어**로 적는다. 두 번째 인수에는 유즈케이스 테스트 함수가 들어간다.
- <code>assert.equal(value1, value2)</code> : 기능을 제대로 구현했다면 <code>it</code>블록 내의 코드가 에러 없이 실행된다.

##### 개발 순서

1. 명세서 초안 작성. 초안에는 기본적인 테스트도 들어간다.
2. 명세서 초안을 보고 코드 작성
3. 코드가 작동하는지 확인하기 위해 테스트 프레임워크를 사용하여 명세서를 실행. 이때, 코드가 잘못 작성되었으면 에러가 출력된다. 개발자는 테스트를 모두 통과해 에러가 더는 출력되지 않을 때까지 코드를 수정한다.
4. 모든 테스트를 통과하는 코드 초안이 완성된다.
5. 명세서에 지금까지 고려하지 않았던 유스케이스 몇 가지를 추가한다. (테스트가 실패하기 시작)
6. 3번으로 돌아가 테스트를 모두 통과할 때까지 코드를 수정
7. 기능이 완성될 때까지 3~6단계를 반복

##### 스펙 실행하기

- Mocha : 핵심 테스트 프레임워크, <code>describe</code>, <code>it</code>같은 테스팅 함수와 테스트 실행 관련 주요 함수를 제공
- Chai : 다양한 assertion을 제공하는 라이브러리
- Sinon : 함수의 정보를 캐내는 데 사용되는 라이브러리, 내장 함수 등을 모방한다.

##### 코드 초안

- 오로지 테스트 통과만을 목적

```js
function pow(x, n) {
  return 8;
}
```

##### 스펙 개선하기

- 스펙에 테스트를 추가하는 방법은 2가지가 있다.

1. 기존 <code>it</code>블록에 <code>assert</code>를 하나 더 추가

```js
describe("pow", function () {
  it("주어진 숫자의 n 제곱", function () {
    assert.equal(pow(2, 3), 8);
    assert.equal(pow(3, 4), 81);
  });
});
```

2. 테스트를 하나 더 추가하기(<code>it</code>블록 하나 더 추가)

```js
describe("pow", function () {
  it("2를 세번 곱하면 8이다.", function () {
    assert.equal(pow(2, 3), 8);
  });
  it("3을 네번 곱하면 81이다.", function () {
    assert.equal(pow(3, 4), 81);
  });
});
```

- <code>assert</code>에서 에러가 발생하면 <code>it</code>블록은 즉시 종료
  - 기존 <code>it</code>블록에 <code>assert</code>를 하나 더 추가하면 첫 번째 <code>assert</code>가 실패했을 때 두 번째 <code>assert</code>의 결과를 알 수 없다.
- 두 번째 처럼 <code>it</code>블록을 추가하여 테스트를 분리 작성하는 것을 추천
- **테스트 하나에선 한 가지만 확인**

##### 코드 개선하기

- 실제 우리가 구현하려는 기능을 생각하며 작성

```js
function pow(x, n) {
  let result = 1;
  for (let i = 0; i < n; i++) {
    result *= x;
  }
  return result;
}
```

- 함수가 제대로 작동하는지 확인하기 위해 더 많은 값을 테스트

```js
describe("pow", function () {
  function makeTest(x) {
    let expected = x * x * x;
    it(`${x}를 세 번 곱하면 ${expected}입니다.`, function () {
      assert.equal(pow(x, 3), expected);
    });
  }
  for (let x = 1; x <= 5; x++) {
    makeTest(x);
  }
});
```

##### 중첩 describe

- 새로운 테스트 하위그룹(subgroup)을 정의할 때 사용된다.
- 중첩 describe를 쓰면 그룹을 만들 수 있다.

```js
describe("pow", function () {
  describe("x를 세 번 곱합니다.", function () {
    function makeTest(x) {
      let expected = x * x * x;
      it(`${x}을/를 세 번 곱하면 ${expected}입니다.`, function () {
        assert.equal(pow(x, 3), expected);
      });
    }

    for (let x = 1; x <= 5; x++) {
      makeTest(x);
    }
  });

  // describe와 it을 사용해 이 아래에 더 많은 테스트를 추가할 수 있습니다.
});
```

```js
describe("test", function () {
  before(() => alert("테스트를 시작합니다 - 테스트가 시작되기 전"));
  after(() => alert("테스트를 종료합니다 - 테스트가 종료된 후"));

  beforeEach(() => alert("단일 테스트를 시작합니다 - 각 테스트 시작 전"));
  afterEach(() => alert("단일 테스트를 종료합니다 - 각 테스트 종료 후"));

  it("test 1", () => alert(1));
  it("test 2", () => alert(2));
});
```

- <code>beforeEach/afterEach</code>와 <code>before/after</code>는 대개 초기화 용도로 사용된다. 카운터 변수를 0으로 만들거나 테스트가 바뀔 때(또는 테스트 그룹이 바뀔 때)마다 해줘야 하는 작업이 있으면 이들을 이용할 수 있다.

```js
assert.equal(value1, value2); // value1과 value2의 동등성을 확인(value1 == value2)
assert.strictEqual(value1, value2); // value1과 value2의 일치성을 확인(value1 === value2)
assert.notEqual, assert.notStrictEqual; // 비 동등성, 비 일치성을 확인
assert.isTrue(value); // value가 true인지 확인
assert.isFalse(value); // value가 false인지 확인
// 그 외 다양한 assertion이 있다.  http://chaijs.com/api/assert/
```
