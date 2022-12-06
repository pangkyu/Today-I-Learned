## 모던 자바스크립트 1주차

범위 : Part 1 1.1~1.6

---

### ch6 : alert, prompt, confirm

##### alert

- <code>alert</code>는 사용자가 확인버튼을 누를 때까지 메시지를 보여주는 창이 계속 떠있는 함수다.
- 메시지가 있는 창을 모달창(modal window)이라고 부른다.

```js
alert("hello");
```

##### prompt

```js
result = prompt(title, [default]);
// title : 사용자에게 보여줄 문자열
// default : 입력 필드의 초기값(선택값)

//ex)
let age = prompt('나이를 입력해주세요.', 100);
alert(`당신의 나이는 ${age}세입니다.`); // 당신의 나이는 100세입니다.
```

- 함수가 실행되면 텍스트 메시지와 입력필드, 확인 및 취소 버튼이 있는 모달 창을 띄워준다.

##### confirm

```js
result = confirm(question);
// ex)
let isBoss = confirm("당신이 주인인가요?");
alert(isBoss); // 확인 버튼을 눌렀다면 true출력
```

- <code>confirm</code>함수는 매개변수로 받은 question과 확인 및 취소 버튼이 있는 모달창을 보여준다.
- 사용자가 확인버튼을 누르면 <code>true</code>, 그 외의 경우는 <code>false</code>를 반환한다.
