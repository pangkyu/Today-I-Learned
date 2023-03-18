# 커스텀 훅

> 학습목표 : 중복되는 훅스를 커스텀 훅을 통해 중복을 줄여보자

반복되는 기능, 찍어내는 부분을 함수화
useState, useEffect를 반복 => 커스텀 훅

```js
const rootElement = document.getElementById("root");

function useLocalStorage(itemName, value = "") {
  const [state, setState] = React.useState(() => {
    return window.localStorage.getItem(itemName) || value;
  });
  React.useEffect(() => {
    window.localStorage.setItem(itemName, state);
  }, [state]);

  return [state, setState];
}

const App = () => {
  const [keyword, setKeyword] = useLocalStorage("keyword");
  const [result, setResult] = useLocalStorage("result");
  const [typing, setTyping] = useLocalStorage("typing", false);

  function handleChange(event) {
    setKeyword(event.target.value);
    setTyping(true);
  }

  function handleClick() {
    setTyping(false);
    setResult(`we find results of ${keyword}`);
  }
};
```

- useLocalStorage(itemName, value = "")

  - 파라미터가 한개만 오면 value의 디폴트값 ''이 설정됨
  - 따라서, keyword, result는 value가 ''
  - 클릭 이벤트가 발생하면 typing이 false로 변경되고 입력중일때는 true가 설정된다.
  - 리턴값이 [state, setState]로 오기 때문에 커스텀 훅으로 사용이 가능 => useLocalStorage('keyword'); => keyword라는 키로 로컬스토리지에 아이템이 저장된다.

- React.useEffect()
  - 의존성 배열에 의해 state값이 변경될 때마다 setItem이 호출된다.
