## 모던 자바스크립트 1주차

범위 : Part 1 1.1~1.6

---

### ch3 : string

- UTF-16 형식을 따른다.
- 텍스트 형식의 데이터는 길이에 상관없이 문자열로 저장된다.

#### 따옴표

- 작은따옴표(''), 큰 따옴표(""), 백틱(``)으로 감쌀 수 있다.
- 백틱은 표현식 <code>${...}</code>로 감쌀 수 있다. (템플릿 리터럴)
- 백틱을 사용하면 문자열을 여러 줄에 걸쳐 작성할 수 있다.
- 템플릿 함수에서도 사용된다. <code>func`string`</code>같이 첫 번째 백틱 바로 앞에 함수 이름(func)을 써주면 이 함수는 백틱 안의 문자열 조각이나 표현식 평가 결과를 인수로 받아 자동으로 호출된다.(tagged template)
  - 태그드 템플릿을 사용하면 사용자 지정 템플릿에 맞는 문자열을 쉽게 만들 수 있다.

#### 특수기호

- <code>\n</code> : 줄바꿈
- <code>\r</code> : 캐리지 리턴. 윈도우에서는 캐리지 리턴과 줄 바꿈 특수 문자를 조합하여 바꾼다.
- <code>\', \"</code> : 따옴표
- <code>\\</code> : 역슬래시
- <code>\t</code> : 탭
- <code>\b, \f, \v</code> : 각각 백스페이스, 폼 피드, 세로 탭을 나타낸다.
- <code>\xXX</code> : 16진수 유니코드<code>XX</code>로 표현한 유니코드 글자.
- <code>\uXXXX</code> : UTF-16 인코딩 규칙을 사용하는 16진수 코드 <code>XXXX</code>로 표현한 유니코드 <code>XXXX</code>는 반드시 4개의 16진수로 구성되어야 한다.
- <code>\u{X...XXXXXX}</code>(한 개에서 여섯개 사이의 16진수 글자 ) : UTF-32로 표현한 유니코드.
- 모든 특수문자는 역슬래시로 시작한다.

#### 문자열의 길이

- <code>length</code> 프로퍼티에는 문자열의 길이가 저장
  - 함수가 아니고, 숫자가 저장되는 프로퍼티다.

#### 특정 글자에 접근

- 접근하려는 위치에 글자가 없는경우 <code>[]</code>는 undefined, <code>charAt</code>는 빈 문자열을 반환

```js
let str = `Hello`;
alert(str[0]); // H
alert(str.charAt(0)); // H
alert(str[str.length - 1]); // o
```

- <code>for..of</code>를 사용하면 문자열을 구성하는 글자를 대상으로 반복 작업을 할 수 있다.

```js
for (let char of "Hello") {
  alert(char); // H,e,l,l,o (char는 순차적으로 H, e, l, l, o가 됩니다.)
}
```

#### 문자열의 불변성

- 문자열은 수정할 수 없다.
- 완전히 새로운 문자열을 만든 다음, 기존 문자열을 할당해야한다.

```js
let str = "Hi";

str = "h" + str[1]; // 문자열 전체를 교체함

alert(str); // hi
```

#### 대/소문자 변경

```js
alert("Interface".toUpperCase()); // INTERFACE
alert("Interface".toLowerCase()); // interface
alert("Interface"[0].toLowerCase()); // 'i'
```

#### 부분 문자열 찾기

1. str.indexOf(substr, pos) 메서드 사용
   - str의 pos에서부터 시작하여 부분 문자열 substr이 어디에 위치하는지를 찾아준다.
   - 위치를 찾으면 위치를 반환하고 그렇지 않으면 -1을 반환한다.
   - pos는 선택 옵션이다.

```js
// 활용
let str = "As sly as a fox, as strong as an ox";
let target = "as";

let pos = -1;
while ((pos = str.indexOf(target, pos + 1)) != -1) {
  alert(`위치: ${pos}`);
}
```

- 주의점 : 부분 문자열 여부를 검사하려면 -1과 비교해야한다.
  - if문에서는 0을 false로 간주하기 때문에

```js
let str = "Widget with id";

if (str.indexOf("Widget")) {
  alert("찾았다!"); // 의도한 대로 동작하지 않습니다.
}

if (str.indexOf("Widget") != -1) {
  alert("찾았다!"); // 의도한 대로 동작합니다.
}
```

#### 비트 NOT 연산자를 사용한 기법

- 비트 NOT 연산자는 피연산자를 32비트 정수로 바꾼 후 (소수부는 모두 버려짐) 모든 비트를 반전한다.

```JS
alert( ~2 ); // -3, -(2+1)과 같음
alert( ~1 ); // -2, -(1+1)과 같음
alert( ~0 ); // -1, -(0+1)과 같음
alert( ~-1 ); // 0, -(-1+1)과 같음
```

- 위에서 ~n을 0으로 만드는 경우는 n == -1일때가 유일하다.
- 오래된 자바스크립트에서 보이며, 모던 자바스크립트에서는 <code>includes</code>메소드를 사용한다.

```js
let str = "Widget";

if (~str.indexOf("Widget")) {
  alert("찾았다!"); // 의도한 대로 동작합니다.
}
```

#### includes, startsWith, endsWith

- incldues : 부분 문자열의 위치 정보는 필요하지 않고 포함 여부만 알고 싶을 때 적합한 메서드이다.

```js
alert("Widget with id".includes("Widget")); // true
alert("Hello".includes("Bye")); // false

// indexOf처럼 두 번째 인수를 넘기면 해당 위치부터 부분 문자열을 검색한다.
alert("Widget".includes("id")); // true
alert("Widget".includes("id", 3)); // false, 세 번째 위치 이후엔 "id"가 없습니다.
```

- startsWith, endsWith는 문자열이 특정 문자열로 시작하는지, 특정 문자열로 끝나는지 여부를 확인할 수 있다.

```js
alert("Widget".startsWith("Wid")); // true, "Widget"은 "Wid"로 시작합니다.
alert("Widget".endsWith("get")); // true, "Widget"은 "get"으로 끝납니다.
```

#### 부분 문자열 추출하기

- <code>str.slice(start, [, end])</code> : 문자열의 start부터 end까지(end는 미포함)를 반환. start와 end는 음수가 될 수 있다. 음수를 넘기면 문자열 끝에서부터 카운팅을 시작한다.
- <code>str.substring(start, [, end])</code> : start와 end사이에 있는 문자열을 반환. 음수 인수를 허용하지 않음. 음수는 `0`으로 처리된다. start가 end보다 커도 괜찮다.
- <code>str.substr(start, [, length])</code> : start에서부터 시작하여 length 개의 글자를 반환한다. 끝 위치 대신에 길이를 기준으로 문자열을 추출한다. 첫 번째 인수가 음수면 뒤에서부터 개수를 센다.

```js
let str = "stringify";
alert(str.slice(0, 5)); // 'strin', 0번째부터 5번째 위치까지(5번째 위치의 글자는 포함하지 않음)
alert(str.slice(0, 1)); // 's', 0번째부터 1번째 위치까지(1번째 위치의 자는 포함하지 않음)
alert(str.slice(2)); // ringify, 2번째부터 끝까지
alert(str.slice(-4, -1)); // gif

alert(str.substring(2, 6)); // "ring"
alert(str.substring(6, 2)); // "ring"
```

#### 문자열 비교하기

1. 소문자는 대문자보다 항상 크다.
2. 발음 구별기호(diacritical mark)가 붙은 문자는 알파벳 순서 기준을 따르지 않는다.

```js
alert("Österreich" > "Zealand"); // true (Österreich는 오스트리아를 독일어로 표기한 것임 - 옮긴이)
```

- 코드로 글자를 얻거나 글자에서 연관 코드를 알아낼 수 있는 메서드
  - <code>str.codePointAt(pos)</code> : pos에 위치한 글자의 코드를 반환
  - <code>String.fromCodePoint(code)</code> : 숫자 형식의 code에 대응하는 글자를 만들어준다.

```js
alert("z".codePointAt(0)); // 122
alert("Z".codePointAt(0)); // 90

alert(String.fromCodePoint(90)); // Z
```

#### 문자열 제대로 비교하기

- str.localeCompare(str2)를 호출하면 ECMA-402에서 정의한 규칙을 토대로 반환값을 준다.
  - str == str2 : 0을 반환
  - str > str2 : 양수를 반환
  - str < str2 : 음수를 반환
- <code>localeCompare</code>에는 선택 인수 2개를 더 전달할 수 있다. 기준이 되는 언어를 지정(지정하지 않으면 호스트 환경언어)

#### 서로게이트 쌍

- 자주사용되는 글자들은 모두 2바이트 코드를 가진다.
- 하지만 현존하는 기호를 모두 표현하기에는 충분하지 않음
- 사용 빈도가 낮은 기호는 서로게이트 쌍(surogate pair)이라 불리는 2바이트 글자들의 쌍을 사용하여 인코딩한다.
- 서로게이트 쌍을 사용해 인코딩한 기호의 길이는 2이다.

```js
alert("𝒳".length); // 2, 수학에서 쓰이는 대문자 X(그리스 문자 카이 - 옮긴이)
alert("😂".length); // 2, 웃으면서 눈물 흘리는 얼굴을 나타내는 이모티콘
alert("𩷶".length); // 2, 사용 빈도가 낮은 중국어(상형문자)
```

- <code>String.fromCodePoint</code>, <code>str.codePointAt</code>은 서로게이트 쌍을 제대로 처리할 수 있는 몇 안되는 메소드 이다.
- 서로게이트 쌍을 구성하는 글자들은 붙어있을 때만 의미가 있다.

#### 발음 구별 기호와 유니코드 정규화

- 여러 언어에서 베이스가 되는 글자 위나 아래에 발음 구별 기호라 불리는 기호를 붙여 글자를 만든다.
- 필요한 기호의 유니코드 문자를 붙이면 된다.
- 단, 눈으로 봤을 때는 같으나 유니코드 조합이 다른 경우가 생긴다.

```js
let s1 = "S\u0307\u0323"; // Ṩ, S + 윗 점 + 아랫 점
let s2 = "S\u0323\u0307"; // Ṩ, S + 아랫 점 + 윗 점

alert(`s1: ${s1}, s2: ${s2}`);

alert(s1 == s2); // 눈으로 보기엔 같은 글자이지만 동등 비교 시 false가 반환됩니다.
```

- 이런 문제를 해결하기 위해 유니코드 정규화라 불리는 알고리즘을 사용하여 각 문자열을 동일한 형태로 정규화해아한다. --> <code>str.normalize()</code>

```js
alert("S\u0307\u0323".normalize() == "S\u0323\u0307".normalize()); // true
```

#### 그 외 메소드

- str.trim() : 문자열 앞/끝의 공백문자를 제거
- str.repeat(n) : 문자열을 n번 반복
