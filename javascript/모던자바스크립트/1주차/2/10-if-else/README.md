## 모던 자바스크립트 1주차

범위 : Part 1 1.1~1.6

---

### ch10 : if-else

##### if문

- <code>if(...)</code>문은 괄호 안에 들어가는 조건을 평가하는데, 그 결과가 <code>true</code>일 시 코드 블록이 실행된다.

```js
const year = prompt("ECMAScript-2015 명세는 몇 년도에 출판되었을까요?", "");
if (year == 2015) alert("정답입니다.");
```

##### 불린형으로의 변환

- <code>0</code>, <code>""</code>, <code>null</code>, <code>undefined</code>, <code>NaN</code>은 불린형으로 변환 시 모두 <code>false</code>가 된다. 이런 값들은 'falsy'값이라고 부른다.
- 이 외의 값은 불린형으로 변환시 <code>true</code>가 되므로 'truthy'값이라고 부른다.

##### else

- <code>if</code>문에는 <code>else</code>절을 붙일 수 있다. <code>else</code>뒤에 이어지는 코드 블록은 조건이 거짓일 때 실행된다.

##### 조건부 연산자 '?'

- 조건에 따라 다른 값을 변수에 할당해줘야 할 경우

```js
let accessAllowed;
let age = prompt("나이를 입력해주세요.", "");
if (age > 18) {
  accessAllowed = true;
} else {
  accessAllowed = false;
}
alert(accessAllowed);
// ? 연산자로 더 짧고 간결하게 변형
let accessAllowed = age > 18 ? true : false;
```

##### 다중 '?'

- <code>?</code>를 여러 개 연결하여 복수 조건을 처리한다.

```js
let age = prompt("나이를 입력해주세요.", 18);
let message =
  age < 3
    ? "아기야 안녕?"
    : age < 18
    ? "안녕!"
    : age < 100
    ? "환영합니다"
    : "나이가 아주 많으시거나, 나이가 아닌 값을 입력했습니다.";
alert(message);
```

##### 부적절한 '?'

```js
const company = prompt("자바스크립트는 어떤 회사가 만들었을까요?", "");
company == "Netscape" ? alert("정답입니다") : alert("오답입니다");
```

- 개발자 입장에서는 if문을 사용할때보다 코드 길이가 짧아진다는 점때문에 사용할 수 있으나 가독성이 떨어진다.
- 물음표 연산자 <code>?</code>는 조건에 따라 반환 값을 달리하려는 목적으로 만들어졌다. 여러 분기를 만들어 처리할 때는 <code>if</code>사용
