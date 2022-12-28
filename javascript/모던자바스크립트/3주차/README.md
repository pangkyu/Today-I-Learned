### 정규표현식

> 정규 표현식(regular expression)은 문자 검색과 교체에 사용되는 패턴이다. 자바스크립트에서는 RegExp 객체와 문자열 메서드를 조합하여 정규표현식을 사용할 수 있다.

- 정규 표현식은 패턴과 선택적으로 사용할 수 있는 플래그로 구성된다.
- 정규식 객체를 만들 때는 두 가지 문법이 사용된다.

  1. 긴 문법
     - 긴 문법은 아래와 같이 사용한다.

  ```js
  regexp = new RegExp("pattern", "flags");
  ```

  2. 짧은 문법
     - 짧은 문법은 <code>/</code>를 사용한다.

  ```js
  regexp = /pattern/; // 플래그가 없음
  regexp = /pattern/gim; // 플래그 g, m, i 가 있음
  ```

- <code>/</code>는 자바스크립트에 정규 표현식을 생성하고 있다는 것을 알린다. 문자열에 따옴표를 쓰는 것과 동일한 역할
- 짧은 문법이든 긴 문법이든 상관없이 <code>regexp</code>는 내장 클래스 <code>RegExp</code>의 인스턴스가 된다.
- 단, 두 문법의 차이점은 <code>/.../</code>를 사용하면 문자열 템플릿 리터럴에서 <code>${...}</code>를 사용했던 것처럼 중간에 표현식을 넣을 수 없다. 슬래시를 사용한 방법은 완전히 정적이기 때문이다.
- 짧은 문법을 사용할 때는 코드를 작성하는 시점에 패턴을 알고 있을 때 사용한다. 반면 긴 문법은 상황에 따라 동적으로 생성된 문자열을 가지고 정규 표현식을 만들어야 할 때 주로 사용한다.

```js
let tag = prompt("어떤 태그를 찾고 싶은가요?", "h2");
let regexp = new RegExp(`<${tag}>`); // 프롬프트에서 'h2'라고 대답한 경우, /<h2>/와 동일한 역할을 한다.
```

##### 플래그

- 정규 표현식에는 검색에 영향을 주는 플래그를 선택적으로 붙일 수 있다.
- 자바스크립트에서는 6개의 플래그를 지원한다.
- <code>pattern:i</code> : i플래그가 붙으면 대소문자 구분없이 검색한다.
- <code>pattern:g</code> : g플래그가 붙으면 패턴과 일치하는 모든 것들을 찾는다. g가 없으면 패턴과 일치하는 첫 번째 결과만 반환된다.
- <code>pattern:m</code> : 다중 행 모드(multiline mode)를 활성화한다.(여러행 검색)
- <code>pattern:s</code> : <code>pattern:.</code>이 개행문자 <code>\n</code>도 포함하도록 dotail 모드를 활성화한다.
- <code>pattern:u</code> : 유니코드 전체를 지원한다. 이 플래그를 사용하면 서로게이트 쌍을 올바르게 처리할 수 있다.
- <code>pattern:y</code> : 문자 내 특정 위치에서 검색을 진행하는 sticky 모드를 활성화 시킨다.

##### str.match로 검색하기

- <code>str.match(regexp)</code>에는 3가지 모드가 있다.

1. 정규 표현식에 플래그 <code>pattern:g</code>가 붙으면 패턴과 일치하는 모든 것을 담은 배열을 반환

```js
let str = 'We will, we will rock you';
alert(str.match(/we/gi)); // We, we
/**
 * g : 패턴과 일치하는 모든것
 * i : 대소문자 구분 없음
 * /
```

2. 플래그 <code>pattern:g</code>가 붙지 않은 경우에는 패턴에 맞는 첫 번째 부분 문자열만 담은 배열을 반환. 해당 문자열은 배열 인덱스 0에 저장되는데, 문자열의 프로퍼티에는 상세한 추가 정보가 저장된다.

```js
let str = "We will, we will rock you";
let result = str.match(/we/i);
alert(result[0]); // We
alert(result.length); // 1
alert(result.index); // 0 (부분 문자열의 위치)
alert(result.input); // We will, we will rock you (원본문자열 )
```

- 정규 표현식을 괄호로 둘러싼 경우에는 메서드 호출 시 반환되는 배열에 0이외에도 다른 인덱스가 있을 수 있음

3. <code>pattern:g</code>의 유무와 상관없이 패턴과 일치하는 부분 문자열을 찾지 못한 경우에는 <code>null</code>이 반환된다.

```js
let matches = "JavaScript".match(/HTML/); // matches에는 null이 저장
if (!matches.length) {
  // TypeError
  //code
}
```

- <code>str.match</code> 호출 결과가 항상 배열이 되게 하려면 아래와 같이 사용한다.

```js
let matches = "JavaScript".match(/HTML/) || [];
if (!matches.legnth) {
  alert("정규 표현식과 일치하는 부분 문자열이 없다.");
}
```

##### str.replace로 치환

- <code>str.replace(regexp, replacement)</code>를 사용하면 regexp에 일치하는 부분 문자열을 replacement로 교체할 수 있다.

```js
console.log("We will, we will".replace(/we/i, "I")); // I will, we will
```

- <code>replacement</code>는 문자열인데, 문자열 안에 아래 특수문자를 넣으면 독특한 방식으로 문자열을 교체할 수 있다.

- <code>$&</code> : 패턴과 일치하는 부분 문자열
- <code>$`</code> : 문자열 일부를 일치 전에 삽입
- <code>$'</code> : 문자열 일부를 일치 후에 삽입
- <code>$n</code> : n이 1~2자리 숫자일 경우, n번째 괄호 내용을 삽입
- <code>$$</code> : $문자를 삽입

##### regexp.test로 일치 여부 확인하기
