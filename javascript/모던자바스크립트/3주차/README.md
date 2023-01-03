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
- <code>pattern:i</code> : i플래그가 붙으면 대소문자 구분없이 검색한다. Ignore case
- <code>pattern:g</code> : g플래그가 붙으면 패턴과 일치하는 모든 것들을 찾는다. g가 없으면 패턴과 일치하는 첫 번째 결과만 반환된다. Global
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

- 패턴과 일치하는 부분 문자열이 하나라도 있는경우 true, 아니면 false를 반환한다.

```js
let str = "I love JavaScript";
let regexp = /LOVE/i;
alert(regexp.test(str)); // true
```

---

#### 문자클래스

- 문자 클래스는 특정 집합에 포함된 모든 기호에 일치하는 특별한 표현이다.
- 문자 클래스에는 다음과 같은 클래스가 있다.

- <code>pattern:\d</code> : 숫자
- <code>pattern:\D</code> : 숫자가 아닌 문자
- <code>pattern:\s</code> : 스페이스, 탭, 줄 바꿈 문자
- <code>pattern:\S</code> : 스페이스, 탭, 줄바꿈문자를 제외한 모든 문자
- <code>pattern:\w</code> : 라틴문자, 숫자, 밑줄<code>\_</code>
- <code>pattern:\W</code> : 라틴문자, 숫자, 밑줄을 제외한 모든 문자
- <code>pattern:.</code> : 정규표현식 <code>'s'</code>플래그가 있으면 모든 문자, 없으면 줄바꿈을 제외한 모든 문자

```js
let str = "+7(903)-123-45-67";
let regexp = /\d/;
alert(str.match(regexp)); // 7 , 가장 먼저 만난 숫자가 7
let regexp2 = /\d/g;
console.log(str.match(regexp2)); //['7', '9', '0', '3', '1', '2', '3', '4', '5', '6', '7']
console.log(str.match(regexp).join("")); // 79035419441
```

- 정규 표현식에 일반 기호와 문자 클래스를 같이 사용할 수 있다.

```js
let str = "Is there CSS4?";
let regexp = /CSS\d/;
console.log(str.match(regexp)); // CSS4
```

- 문자 클래스를 여러개 사용할 수도 있다.

```js
console.log("I love HTML5".match(/\s\w\w\w\w\d/)); // 'HTML5'
```

##### 반대 클래스

- 모든 문자 클래스에는 반대클래스가 있다. 같은 글자로 표기하지만 대문자를 사용한다.
- 반대란 해당 문자를 제외한 모든 문자에 일치한다.
- 패턴 d,D / 패턴 s,S / 패턴 w,W

```js
let str = "+7(903)-123-45-67";
alert(str.replace(/\D/g, "")); // 숫자가 아닌 문자를 찾아 문자열에서 없애버리는 것
```

##### 점은 아무문자에나 일치

- <code>pattern : .</code>은 줄 바꿈 문자를 제외한 모든 문자와 일치하는 특별한 문자 클래스이다.

```js
alert("Z".match(/./)); // Z

let regexp = /CS.4/;
alert("CSS4".match(regexp)); // CSS4
alert("CS 4".match(regexp)); // CS 4 (공백도 문자이기때문에 출력된다)
alert("CS4".match(/CS.4/)); // null, 점과 일치하는 문자가 없기 때문에
```

##### s플래그와 점을 사용하여 모든 문자 찾기

- 기본적으로 점은 <code>\n</code>과 일치하지 않음
- <code>pattern:s</code>를 사용하면 점은 모든 문자와 일치

```js
alert("A\nB".match(/A.B/)); // null
alert("A\nB".match(/A.B/s)); // A\nB
```

##### 유니코드 : u플래그와 \p{...}클래스

- <code>pattern:u</code>플래그로 정규 표현식에서 유니코드 기능을 활성화할 수 있다.

  - 4바이트 문자를 2바이트 문자 2개로 처리하지 않고 문자 한 개로 올바르게 처리한다.
  - <code>\p{...}</code>를 이용하여 유니코드 프로퍼티를 검색에 사용할 수 있다.

- 유니코드 프로퍼티를 사용하면 특정 단어의 단어, 따옴표나 통화 단위같은 특수 문자 등을 모두 검색할 수 있다.
- 자바스크립트는 문자열에 유니코드 인코딩을 사용한다.

  - 대부분의 문자는 2바이트로 인코딩되어 있는데, 이것으로는 65,536개 까지만 표현할 수 있다. 따라서 일부 문자는 4바이트로 인코딩되어있다.

- 문자는 하나인데 길이가 2가 나오는 경우
- length는 4바이트 문자를 2바이트 문자 2개로 취급. 4바이트를 하나로 묶어서 취급해야 하므로 올바르지 않은 결과이다. (서로게이트 쌍)

```js
alert("😄".length); // 2
alert("𝒳".length); // 2
```

- 기본적으로는 정규표현식도 4바이트의 긴 문자를 2바이트 문자 2개로 취급한다. 문자열의 경우처럼 이런 방식은 잘못된 결과로 이어질 수 있다.
- 문자열과 다르게 정규표현식에는 이런 문제를 해결할 수 있는 <code>pattern:u</code>플래그가 있다. 이를 사용하면 유니코드 프로퍼티를 사용한 검색이 가능해진다.

- <code>pattern:\p{...}</code>를 사용하면 프로퍼티를 통해 문자를 찾을 수 있다. 이를 사용하기 위해서는 정규 표현식에 <code>pattern:u</code>플래그가 반드시 있어야 한다.

```js
let str = "A ბ ㄱ";

alert(str.match(/\p{L}/gu)); // A,ბ,ㄱ
alert(str.match(/\p{L}/g)); // null ('u' 플래그가 없어서 일치 결과 없음)
```

- 다음은 주요 문자 범주와 각각의 하위 범주 목록
- 문자(Letter) <code>L</code>
  - 소문자(lowercase)<code>Ll</code>
  - 조정(modifier)<code>Lm</code>
  - 단어의 첫글자를 대문자로(titlecase)<code>Lt</code>
  - 대문자(uppercase)<code>Lu</code>
  - 기타(other)<code>Lo</code>
- 숫자(Number) <code>N</code>
  - 10진수(decimal digit)<code>Nd</code>
  - 문자(letter number)<code>Nl</code>
  - 기타(other)<code>No</code>
- 문장 부호(Punctuation) <code>P</code>
  - 연결선(connector) <code>Pc</code>
  - 대시(dash) <code>Pd</code>
  - 처음 따옴표(initial quote) <code>Pi</code>
  - 마지막 따옴표(final quote) <code>Pf</code>
  - 열기(open) <code>Ps</code>
  - 닫기(close) <code>Pe</code>
  - 기타(other) <code>Po</code>
- 표시(Mark) <code>M</code>(강세 등)
  - 간격 결합(spacing combining) <code>Mc</code>
  - 묶음(enclosing) <code>Me</code>
  - 비공백(non-spacing) <code>Mn</code>
- 기호(Symbol) <code>S</code>
  - 통화(currency) <code>Sc</code>
  - 수정(modifier) <code>Sk</code>
  - 수학(math) <code>Sm</code>
  - 기타(other) <code>So</code>
- 구분 기호(Separator) <code>Z</code>
  - 줄(line) <code>Zl</code>
  - 단락(paragraph) <code>Zp</code>
  - 공백(space) <code>Zs</code>
- 기타(other) <code>C</code>

  - 제어(control) <code>Cc</code>
  - 형식(format) <code>Cf</code>
  - 할당되지 않음(not assigned) <code>Cn</code>
  - 사용자 지정(private use) <code>Co</code>
  - 서로게이트(surrogate) <code>Cs</code>

- 소문자를 찾을 때 <code>pattern:\p{Ll}</code>, 문장부호를 찾을 때<code>pattern:\p{P}</code>등으로 검색할 수 있다.

- 참고할 수 있는 문서
  - [문자별 프로퍼티 목록](https://unicode.org/cldr/utility/character.jsp)
  - [프로퍼티별 문자목록](https://unicode.org/cldr/utility/list-unicodeset.jsp)
  - [프로퍼티별 줄임말](https://www.unicode.org/Public/UCD/latest/ucd/PropertyValueAliases.txt)
  - [텍스트 형식으로 정리된 유니코드 문자와 각 문자의 모든 프로퍼티](https://www.unicode.org/Public/UCD/latest/ucd/)

##### 앵커 : 문자열의 시작 ^과 끝 $

- 캐럿(caret) 기호 <code>pattern:^</code>와 달러기호 <code>pattern:$</code>는 정규식에서 앵커라는 뜻을 지닌다.
- 캐럿기호는 텍스트의 시작, 달러기호는 텍스트의 끝을 나타낸다.

```js
// ^Mary ==> 문자열이 Mary로 시작하는지 검사
// snow$ ==> 문자열이 snow로 끝나는지 검사
let str = "Mary and a little lamb";
alert(/snow$/.test(str)); // true
```

- <code>pattern:^...$</code>는 문자열이 패턴과 완전히 일치하는지 확인할 때 자주 사용된다. 사용자 입력 내용이 올바른 형식으로 되어있는지 확인할 때가 대표적인 예
- 문자열 전체가 이 형식에 일치해야 한다. 형식에서 벗어난 문자가 있거나 문자가 더 많으면 false를 출력한다.

```js
let goodInput = "12:34";
let badInput = "12:345";
let regexp = /^\d\d:\d\d$/;
alert(regexp.test(goodInput)); // true
alert(regexp.test(badInput)); // false
```

##### m플래그

- <code>pattern:m</code>플래그를 사용하면 여러 행 모드(multiline mode)를 활성화할 수 있음
- 여러 행 모드는 <code>pattern:^</code>, <code>pattern:$</code>의 작동방식에만 영향을 준다.
- 전체 문자열의 처음/끝 뿐만아니라 각 행의 시작/끝에도 대응한다.

```js
let str = `1st place: Winnie
2nd place: Piglet
3rd place: Eeyore`;
alert(str.match(/^\d/gm)); // 1, 2, 3
alert(str.match(/^\d/g)); // 1 , m플래그가 없으면 맨 앞 숫자만 검색된다.

let str = `Winnie: 1
Piglet: 2
Eeyore: 3`;

alert(str.match(/\d$/gm)); // 1,2,3
```

- 줄 바꿈을 찾을 때 <code>pattern:^</code>, <code>pattern:$</code>뿐만아니라 <code>\n</code>도 사용할 수 있다.

```js
let str = `Winnie: 1
Piglet: 2
Eeyore: 3`;

alert(str.match(/\d\n/gm)); // 1,2
/*
3뒤에는 줄바뀜문자가 없어서 미출력됨. 
*/
```

##### 정규식에서 쓰이는 메서드

1. exec
   - 대응되는 문자열을 찾는 RegExp 메서드
   - 대응되는 문자열을 찾으면 정보를 갖고있는 배열을 반환, 찾지 못하면 null 을 반환
2. test
   - 대응되는 문자열이 있는지 검사하는 RegExp 메서드
   - 대응되는 문자열을 찾으면 true, 아니면 false를 반환
3. match

   - 대응되는 문자열을 찾는 String 메서드
   - 대응되는 문자열을 찾으면 갖고있는 배열을 반환, 찾지 못하면 null을 반환

4. search
   - 대응되는 문자열이 있는 검사하는 String 메서드
   - 대응된 부분의 인덱스를 반환, 찾지 못하면 -1을 반환
5. replace
   - 대응되는 문자열을 찾아 다른 문자열로 치환하는 String 메서드
6. split
   - 정규식 혹은 문자열로 대상 문자열로 나누어 배열로 반환하는 String 메서드

##### 정규식 검색 기준 패턴

- | : OR. <code>a|b</code>식으로 사용
- [] : 괄호안의 문자들중 하나. or 처리 묶음
  - <code>/[abc]/</code> : a or b or c 를 포함하는
  - <code>[다-바]</code> : 다 or 라 or 마 or 바
- [^문자] : 괄호안의 문자를 제외한 것
  - <code>[^lgen]</code> 'l' 'g' 'E' 'n' 4개 문자를 제외
- ^문자열 : 특정 문자열로 시작
  - <code>/^www/</code>
- 문자열$ : 특정 문자열로 끝남
  - <code>/com$/</code>

##### 정규표현식 수량 패턴

- 어떠한 패턴이 얼만큼 등장하는지

- <code>\*</code> : 0개 이상 나타나는 문자
  - <code>a\*b</code> : a가 앞에 있을 수도 있고, 여러개 있을 수도 있고 b도 뒤에 있을 수도 있고, 여러 개 있을 수도 있음. 'aab','ab' 모두 가능하다
- <code>+</code> : 1개 이상 나타나는 문자
  - <code>a+b</code> : a가 한개이상, b도 한개 이상 있어야한다. 'ab', 'aabb', 'abb' ..
- <code>?</code> : 없거나 1개인 경우
  - <code>a?b</code> : a가 없거나 1개, b가 없거나 1개. 'b', 'ab'..
- <code>{m,n}</code> : m회 이상 n회 이하 나타나는 문자
  - <code>[els]{1,3}</code> : e or l or s 가 1개 이상 3개 이하

##### 이스케이프

- 정규표현식 패턴이 아닌 문자로 사용하고 싶을때는 앞에 <code>\</code>를 앞에 붙인다.

https://blog.hexabrain.net/205
