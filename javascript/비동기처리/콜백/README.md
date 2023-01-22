![image](https://user-images.githubusercontent.com/75983289/213900200-7a798162-7a2c-4bf4-9320-c15af67c2db8.png)

> 바닐라 자바스크립트를 이용하여 넘블챌린지를 진행하던 도중, API를 받아오고 이벤트를 처리하는 과정에서 비동기처리에 대해 이해가 부족하다는 생각이 들어 공부하게 되었다.

# 비동기 처리

> 자바스크립트에서 비동기 처리란 특정 코드의 연산이 끝날 때까지 코드의 실행을 멈추지 않고 다음 코드를 먼저 실행하는 것이다. 동시에 여러가지 작업을 처리할 수 있고, 기다리는 과정에서 다른 함수를 호출할 수 있다.<br/>
> 동기-비동기는 **프로세스 수행 순서 보장**에 대한 매커니즘이다.

##### 동기(Synchronous) : 작업을 동시에 수행하거나, 동시에 끝나거나, 끝나는 동시에 시작

- 호출하는 함수가 호출되는 함수의 작업 완료 후 리턴을 기다리거나, 리턴 받더라도 미완료 상태라면 작업 완료 여부를 스스로 계속 확인하며 신경쓴다.
  ![image](https://user-images.githubusercontent.com/75983289/213892152-180b43b8-c4d4-46af-aeac-17097f2777b0.png)

##### 비동기(Asynchronous) : 시작/종료가 일치하지 않으며, 끝나는 동시에 시작을 하지 않음

- 테스크 2가 테스크 1을 호출할 때 콜백함수를 함께 전달해서, 테스크 1이 작업완료되면 함께 보낸 콜백함수를 실행한다.
- 테스크 1을 호출한 후로 작업 완료 여부에는 신경쓰지 않는다.

![image](https://user-images.githubusercontent.com/75983289/213892244-bf7d5111-69c7-495b-a2e7-f9981cd6700a.png)

## 1. callback

```js
function findUser(id) {
  const user = {
    id: id,
    name: "User" + id,
    email: id + "@test.com",
  };
  return user;
}

const user = findUser(1);
console.log("user:", user);

// 콜백
function findUserAndCallback(id, cb) {
  const user = {
    id: id,
    name: "user" + id,
    email: id + "@test.com",
  };
  cb(user);
}
findUserAndCallback(1, function (user) {
  console.log("user : ", user);
  // 실행결과 :  user: {id: 1, name: "user1", email: "1@test.com"}
});
```

- 두 코드의 차이점으로는 <code>findUser</code>함수는 결과값을 리턴하고 함수 외부에서 결과값을 이용하여 작업을 수행하는데, <code>findUserAndCallback</code>함수는 결과값을 이용하는 작업까지 함수 내부에서 수행하기 때문에 결과값을 굳이 리턴하지 않아도 된다.

### 1-1. 콜백함수를 통한 비동기 처리

비동기(Asynchronous)함수는 호출부에서 실행 결과를 기다리지 않아도 되는 함수이다. non-blocking 이점을 가지고 있기 때문에 자바스크립트처럼 싱글 쓰레드 환경에서 실행되는 언어에서 광범위하게 사용된다.

#### 1-1-1. setTimeout()

<code>setTimeout()</code>은 자바스크립트의 대표적인 내장 비동기 함수이다. 2개의 매개변수를 받아올 수 있는데, 첫번째는 실행할 작업 내용을 담은 콜백 함수, 두번째는 이 콜백 함수를 수행하기 전에 기다리는 밀리초 단위 시간이다.

실제 프로젝트에서 DB, API를 통해 유저 데이터를 얻어오는 경우 레이턴시가 발생한다. <code>setTimeout()</code>을 활용하여 시뮬레이션을 해보면 다음과 같이 출력된다.

```js
function findUser(id) {
  let user;
  setTimeout(function () {
    console.log("waited 0.1 sec.");
    user = {
      id: id,
      name: "User" + id,
      email: (id = "@test.com"),
    };
  }, 100);
  return user;
}
const user = fundUser(1);
console.log("user : ", user);
/*
결과 
user : undefind 
waited 0.1 sec. 
*/
```

- <code>setTimeout()</code>이 비동기 함수 호출이기때문에 실행이 완료될때까지 기다리지 않고 다음 라인으로 넘어가는 것이다.
- 콜백 함수를 사용하면 이런 상황을 해결할 수 있다.

```js
function findUserAndCallBack(id, cb) {
  setTimeout(function () {
    console.log("waited 0.1 sec");
    const user = {
      id: id,
      name: "User" + id,
      email: id + "@test.com",
    };
    cb(user);
  }, 100);
}
findUserAndCallBack(1, function (user) {
  console.log("user:", user);
});
/*
결과
waited 0.1 sec.
user: {id: 1, name: "User1", email: "1@test.com"}
*/
```

- 이와 같이 비동기 함수를 호출할 때는 결과값을 리턴 받지 말고 결과값을 통해 처리할 로직을 콜백 함수로 넘기는 스타일로 코딩해야 원하는 결과를 얻을 수 있다.

### 1-2. Blocking / Non-blocking

> **프로세스의 유휴상태**에 대한 개념 <br/>
> 처리되어야 하는 작업이, 전체적인 작업 흐름을 막느냐 안막느냐에 대한 관점(**제어권이 누구한테 있느냐가 관심사**)

주로 IO의 읽기/쓰기에서 사용된다.

- Blocking : 자신의 작업을 진행하다가 다른 주체의 작업이 시작되면 다른 작업이 끝날 때까지 기다렸다가 자신의 작업을 시작하는 것

![image](https://user-images.githubusercontent.com/75983289/213894200-26611bab-cce2-4d32-8a76-e8854e749975.png)

- Non-blocking : 다른 주체의 작업에 관련없이 자신의 작업을 하는 것

![image](https://user-images.githubusercontent.com/75983289/213894225-aaef605b-8193-42aa-88d7-8126552c86f5.png)

#### 1-2-1. Synchronous/Asynchronous, blocking/non-blocking 조합

![image](https://user-images.githubusercontent.com/75983289/213892888-ad93573b-966e-498a-87ae-7b9a75495e0d.png)

찾아보다가 다른 [블로그](https://musma.github.io/2019/04/17/blocking-and-synchronous.html)에서 예시를 잘 들어준 것을 발견했다.

##### Blocking & Synchronous

> 나 : 대표님, 개발자 좀 더 뽑아주세요..<br/>
> 대표님 : 오케이, 잠깐만 거기 계세요! <br/>
> 나 : …?!! <br/>
> 대표님 : (채용 공고 등록.. 지원자 연락.. 면접 진행.. 연봉 협상..)<br/>
> 나 : (과정 지켜봄.. 궁금함.. 어차피 내 일 하러는 못 가고 계속 서 있음)

- 결과가 처리되어 나올때까지 기다렸다가 리턴값으로 결과를 전달한다.

##### Blocking & Asynchronous

> 나 : 대표님, 개발자 좀 더 뽑아주세요..<br/>
> 대표님 : 오케이, 잠깐만 거기 계세요!<br/>
> 나 : …?!!<br/>
> 대표님 : (채용 공고 등록.. 지원자 연락.. 면접 진행.. 연봉 협상..)<br/>
> 나 : (안 궁금함.. 지나가는 말로 여쭈었는데 붙잡혀버림.. 딴 생각.. 못 가고 계속 서 있음)

- 호출되는 함수가 바로 리턴하지 않고, 호출하는 함수는 작업 완료 여부를 신경쓰지 않는다.

##### Non-blocking & Synchronous

> 나 : 대표님, 개발자 좀 더 뽑아주세요..<br/>
> 대표님 : 알겠습니다. 가서 볼 일 보세요.<br/>
> 나 : 넵!<br/>
> 대표님 : (채용 공고 등록.. 지원자 연락.. 면접 진행.. 연봉 협상..)<br/>
> 나 : 채용하셨나요?<br/>
> 대표님 : 아직요.<br/>
> 나 : 채용하셨나요?<br/>
> 대표님 : 아직요.<br/>
> 나 : 채용하셨나요?<br/>
> 대표님 : 아직요~!!!!!!

- 결과가 없다면 바로 리턴한다. 결과가 있으면 바로 결과를 리턴한다.(결과가 생길때까지 계속 완료되었는지 확인)

##### Non-blocking & Asynchronous

> 나 : 대표님, 개발자 좀 더 뽑아주세요..<br/>
> 대표님 : 알겠습니다. 가서 볼 일 보세요.<br/>
> 나 : 넵!<br/>
> 대표님 : (채용 공고 등록.. 지원자 연락.. 면접 진행.. 연봉 협상..)<br/>
> 나 : (열일중..)<br/>
> 대표님 : 한 분 모시기로 했습니다~!<br/>
> 나 : 😍

- 작업요청을 받아서 별도의 프로세서에게 진행하게 하고, 바로 리턴한다. 결과는 별도의 작업 후 간접적으로 전달(콜백)한다.

### 1-3. 콜백지옥(Callback hell)

- 콜백지옥이란 콜백 함수를 익명 함수로 전달하는 과정에서 또 다시 콜백 안에 함수 호출이 반복되어 코드의 들여쓰기 수준이 매우 깊어지는 현상을 말한다.
- 주로 이벤트 처리/서버 통신과 같은 비동기 작업을 제어하기 위해 사용되는데, 이런 프로그래밍은 가독성이 떨어지고 코드 수정을 어렵게 한다.

```js
function fn() {
  setTimeout(() => {
    console.log("하나");
    setTimeout(() => {
      console.log("둘");
      setTimeout(() => {
        console.log("셋");
      }, 0);
    }, 0);
  }, 0);
}
fn(); // 하나, 둘, 셋
```

- 이를 해결하기 위해서는 **Promise**나 **async/await**을 사용하면된다.
