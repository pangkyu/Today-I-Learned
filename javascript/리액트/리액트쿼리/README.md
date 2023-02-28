# 리액트 쿼리

- <code>React Query</code>는 **data fetching, 캐싱, 동기화, 서버 쪽 데이터 업데이트** 등을 쉽게 만들어주는 리액트 라이브러리이다.
- <code>Redux</code>, <code>Recoil</code>, <code>Mobx</code>는 클라이언트 데이터를 관리하기에는 적합하나 **서베 데이터를 관리하기에는 적합하지 않다**
  - <code>Redux</code>를 활용하여 프로젝트의 전역상태를 관리를 할때 서버 데이터를 활용하려면 <code>Redux-saga</code>, <code>Redux-Thunk</code> 혹은 <code>RTK-Query</code>같은 또 다른 미들웨어를 사용해야한다.

## 리액트 쿼리의 라이프 사이클

- <code>fetching</code> : 데이터 요청 상태
- <code>fresh</code> : 데이터가 프레시한 상태 (만료되지 않은 상태)
  - 컴포넌트의 상태가 변경되더라도 데이터를 다시 요청하지 않음.
  - 새로고침하면 다시 <code>fetching</code>한다.
- <code>stale</code>("케케묵은"이라는 형용사) : 데이터가 만료된 상태
  - 데이터가 만료되었다는 것 => 한번 프론트로 데이터를 주면 그 사이에 다른 유저가 데이터를 추가,수정,삭제 등을 할 수 있기 때문에 만료되었다고 한다. (최신화가 필요한 데이터)
  - 컴포넌트가 마운트, 업데이트되면 데이터를 다시 요청
  - <code>fresh</code>에서 <code>stale</code>로 넘어가는 시간 (기본값 : 0)
- <code>inactive</code> : 사용하지 않는 상태
  - 일정 시간이 지나면 가비지 콜렉터가 캐시에서 제거한다. (기본값 : 5분)
- <code>delete</code> 가비지 콜렉터에 의해 캐시에서 제거된 상태

## React-query의 장점

- 리액트 앱 내에서 데이터 패칭, 캐싱, 동기적, 서버의 상태 업데이트를 좀 더 용이하도록 만들어준다.
- 프로젝트 구조가 기존보다 단순해져 어플리케이션의 유지 보수가 쉽고 새로운 긴으을 쉽게 구축할 수 있다.
- 리액트 쿼리는 별도의 설정 없이 바로 사용이 가능하다.
- 캐싱을 효율적으로 관리해준다.
- 같은 데이터에 대한 여러번의 요청이 있을 시 중복을 제거한다.
- 백그라운드에서 자동적으로 오래된 데이터를 업데이트해준다.
- 페이징처리, 지연 로딩 데이터와 같은 성능 최적화를 해준다.
- 서버 쪽 데이터를 가비지 컬렉션을 이용하여 자동으로 메모리를 관리한다.

## 예시 코드

```js
import axios from 'axios';
import {
    QueryClient,
    QueryClientProvider,
    useMutation,
    useQuery,
    useQueryClient,
}from 'react-query';
/*
리액트 쿼리는 내부적으로 queryClient를 사용하여
각종 상태를 저장하고, 부가 기능을 제공한다.
*/
const queryClient = new QueryClient();

function App(){
    return(
        <QueryClientProvider client = {queryClient}>
            <Menus/>
        </QueryClientProvider>

    )
}

function Menus(){
    const queryClient = useQueryClient();

    // /menu api에 get요청을 보내 서버 데이터를 가져온다.
    const { data } = useQuery('getMenu', () => {
        axios.get('/menu').then({data} => data),
    });

    // /menu api에 post 요청을 보내 서버데이터를 저장한다.
    const { mutate } = useMutation((suggest) => axios.post('/menu', {suggest}),{
        /*
        post 요청이 성공하면 위 useQuery의 데이터를 초기화한다.
        데이터가 초기화되면 useQuery는 서버의 데이터를 다시 불러온다.
        */
        onSuccess : () => queryClient.invalidateQueries('getmenu'),
    });

  return (
    <div>
      <h1> Tomorrow's Lunch Candidates! </h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}> {item.title} </li>
        ))}
      </ul>
      <button
        onClick={() =>
          mutate({
            id: Date.now(),
            title: 'Toowoomba Pasta',
          })
        }
      >
        Suggest Tomorrow's Menu
      </button>
    </div>
  );
}
```

### React query의 쿼리 요청

```js
const { data } = useQuery(
  queryKey, // (required) query 요청에 대한 응답 데이터를 캐시할 때 사용할 유니크 키
  fetchFn, // (required) query 요청을 수행하기 위한 Promise를 return 하는 함수
  options
); // (optional)  useQuery에서 사용되는 옵션 객체
```

- 리액트 쿼리는 이 유니크 키로 서버 상태를 로컬에 캐시하고 관리한다.
- 데이터를 get하기 위한 api. post, update는 <code>useMutation</code>사용
- <code>useQuery</code>는 비동기로 작동한다.
  - 한 컴포넌트에 여러 <code>useQuery</code>가 있다면 하나가 끝나고 다음 <code>useQuery</code>가 실행되는 것이 아닌 두 개의 <code>useQuery</code>가 동시에 실행된다. 단, 여러개의 비동기 쿼리가 있으면 <code>useQueries</code>가 더 좋다.
- <code>enabled</code>를 사용하면 <code>useQuery</code>를 동기적으로 사용 가능하다.

```js
const { status, data, error, isFetching, isPreviousData } = useQuery(
  ["projects", page],
  () => fetchProjects(page),
  { keepPreviousData: true, staleTime: 5000 }
);

// 예외처리는 reject 대신 무조건 throw Error 처리
const { error } = useQuery(["todos", todoId], async () => {
  if (somethingGoesWrong) {
    throw new Error("err");
  }
  return data;
});
```

- unique key : 한번 fresh가 되었다면 계속 추적이 가능하다. 주로 배열을 사용하고, 배열 요소로 쿼리의 이름을 나타내는 문자열과 프로미스를 리턴하는 함수의 인자로 쓰이는 값을 넣음
- useQuery 반환값 : 객체, 요청의 상태를 나타내는 몇가지 프로퍼티, 요청의 결과나 에러값을 갖는 프로퍼티도 포함
  - error, data, isFetching => 런타임간 무조건 요청이 1회 이상 발생했으면 값이 존재한다.
- 쿼리 요청 함수의 상태를 표현하는 상태값은 4가지. status 프로퍼티에서는 문자열로, 상태 이름 앞에 is를 붙여 불리언값으로 해당 상태인지 아닌지 평가 가능하다.
  - <code>idle</code> : 쿼리 data가 하나도 없고 비었을 때, {enabled : false} 상태로 쿼리가 호출되었을 때 이 상태로 시작됨
  - <code>loading</code> : 로딩 중일 때
  - <code>error</code> : 에러 발생했을 때
  - <code>success</code> : 요청 성공했을 때
- 주요 쿼리 옵션
  - <code>enabled</code> : True로 설정하면 자동으로 쿼리의 요청 함수가 호출되는 일이 없다.
  - <code>keepPreviousData</code> : success와 loading 사이 널뛰기 방지
  - <code>placeholderData</code> : mock 데이터 설정도 가능. 그러나 캐싱이 안된다.
  - <code>initialData</code> : 초기값 설정
  - 쿼리에 여러가지 옵션 설정을 해서 원하는대로 데이터를 관리할 수 있음

## useQuery 동기적으로 실행

- <code>enabled</code>옵션을 사용하면 useQuery를 동기적으로 사용 가능하다.
- useQuery의 3번재 인자로 옵션값이 들어가는데, 그 옵션의 enabled에 값을 넣으면 값이 true일때 useQuery를 실행

```js
const { data: todoList, error, isFetching } = useQuery("todos", fetchTodoList);
const {
  data: nextTodo,
  error,
  isFetching,
} = useQuery("nextTodos", fetchNextTodoList, {
  enabled: !!todoList, // true일 때 fetchNextTodoList 실행
});
```

## useQueries

- useQuery를 비동기로 여러개 실행하는 경우 변수를 다 기억해야하고, 3개 변수에 대한 로딩, 성공, 실패처리를 모두 해야한다.

```js
const usersQuery = useQuery("users", fetchUsers);
const teamsQuery = useQuery("teams", fetchTeams);
const projectsQuery = useQuery("projects", fetchProjects);
```

```js
// useQuery를 하나로 묶을 수 있는데, 하나의 배열에 각 쿼리에 대한 상태 값이 객체로 들어온다.
// 아래 예시는 롤 룬과, 스펠을 받아오는 예시입니다.
const result = useQueries([
  {
    queryKey: ["getRune", riot.version],
    queryFn: () => api.getRunInfo(riot.version),
  },
  {
    queryKey: ["getSpell", riot.version],
    queryFn: () => api.getSpellInfo(riot.version),
  },
]);

useEffect(() => {
  console.log(result); // [{rune 정보, data: [], isSucces: true ...}, {spell 정보, data: [], isSucces: true ...}]
  const loadingFinishAll = result.some((result) => result.isLoading);
  console.log(loadingFinishAll); // loadingFinishAll이 false이면 최종 완료
}, [result]);
```

## useMutation

- 값을 바꿀때 사용하는 api.

```js
import { useState, useContext, useEffect } from "react";
import loginApi from "api";
import { useMutation } from "react-query";

const Index = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useMutation(loginApi, {
    onMutation: (variable) => {
      console.log("onMutate", variable);
      // variable : { loginId : 'xxx', password : 'xxx' }
    },
    onError: (error, variable, context) => {
      //error
    },
    onSuccess: (data, variables, context) => {
      console.log("success", data, variables, context);
    },
    onSettled: () => {
      console.log("end");
    },
  });

  const handleSubmit = () => {
    loginMutation.mutate({ loginId: id, password });
  };

  return (
    <div>
      {loginMutation.isSuccess ? "success" : "pending"}
      {loginMutation.isError ? "error" : "pending"}
      <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>로그인</button>
    </div>
  );
};

export default Index;
```

- react-query의 장점은 update 후에 get함수를 간단히 재실행할 수 있는 것이다.
- mutation함수가 성공하면, unique key로 맵핑된 get함수를 <code>invalidateQueries</code>에 넣어주면 된다.

```js
const mutation = useMutation(postTodo, {
  onSuccess: () => {
    // postTodo가 성공하면 todos로 맵핑된 useQuery api함수를 실행한다.
    queryClient.invalidateQueries("todos");
  },
});
```

---

### 참고자료

- [카카오페이 프론트엔드 개발자들이 리액트 쿼리를 선택한 이유](https://tech.kakaopay.com/post/react-query-1/)
- [My구독의 react query 전환기](https://tech.kakao.com/2022/06/13/react-query/)
- [기억보다 기록을](https://kyounghwan01.github.io/blog/React/react-query/basic/#%E1%84%89%E1%85%A1%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A1%E1%84%82%E1%85%B3%E1%86%AB-%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%B2)
- [강디너의 개발 일지](https://kdinner.tistory.com/113)
