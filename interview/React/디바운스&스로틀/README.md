# 디바운스와 스로틀

### 1. 디바운스 Debounce

- 디바운스 : 어떤 내용을 입력하다 특정 시간 대기하면 마지막에 입력된 내용을 바탕으로 서버 요청을 하는 방법
- 검색창, 닉네임 중복 검사 등에서 활용이 가능하다.

```js
export function debounce(func, delay) {
  let inDebounce;
  return function (...args) {
    if (inDebounce) {
      clearTimeout(inDebounce);
    }
    inDebounce = setTimeout(() => func(...args), delay);
  };
}

const run = debounce((val) => console.log(val), 100);
run("a");
run("b");
run(2);
// 100ms이후 2
```

### 2. 스로틀 Throttle

- 디바운스 개념과 비슷하나 **입력되는** 동안에도 바로 이전에 요청한 작업을 주기적으로 실행
- 무한 스크롤 등에서 사용

```js
function throttle(func, delay) {
  let lastFunc;
  let lastRan;

  return function (...args) {
    const context = this;
    if (!lastRan) {
      func.call(context, ...args);
      lastRan = Date.now();
    } else {
      if (lastFunc) clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= delay) {
          func.call(context, ...args);
          lastRan = Date.now();
        }
      }, delay - (Date.now() - lastRan));
    }
  };
}

const checkPosition = () => {
  const offset = 500;
  const currentScrollPostition = window.pageOffset;
  const pageBottomPostition =
    document.body.offsetHeight - window.innerHeight - offset;

  if (currentScrollPostition >= pageBottomPosition) {
    console.log("다음 페이지 로딩");
  }
};
const infiniteScroll = throttle(checkPosition, 300);
window.addEventListener("scroll", infiniteScroll);
```
