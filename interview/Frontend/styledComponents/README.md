# styled-components

- styled-component는 리액트 컴포넌트 시스템의 스타일을 지정하기 위해 CSS를 어떻게 향상시킬 수 있는지 궁금해한 결과이다.

스타일 구성 요소는 다음과 같이 제공한다.

1. Automatic critical CSS
   - 스타일 구성요소는 페이지에 렌더링되는 구성 요소를 추적하고 해당 스타일만 주입하여 다른 것은 자동으로 적용되지 않음. 코드 분할과 결합하여 사용하면 최소한의 필요 코드만 로드할 수 있다.
2. No class name bugs
   - 스타일에 대한 고유 클래스 이름을 생성하여 중복 혹은 철자 오류에 대해 걱정할 필요가 없다.
3. Easier deletion of CSS
   - styled-components를 사용하면 몯느 스타일링이 특정 구성 요소에 연결되어 있어 이를 명확하게 알 수 있다. 구성 요소가 사용되지 않고 삭제되면 모든 스타일도 함께 삭제된다.
4. Simple dynamic styling
   - 수십 개의 클래스를 수동으로 관리할 필요 없이 소품이나 전역 테마를 기반으로 스타일을 조정할 수 있다.
5. Painless maintenance
   - 구성 요소에 영향을 주는 스타일을 찾기 위해 여러 파일을 검색할 필요가 없다.
6. Automatic vendor prefixing
   - css를 표준에 맞게 작성하고 스타일 구성 요소가 나머지를 처리하도록 한다.

사용 예시는 아래와 같다.

```js
// 선언한 변수를 컴포넌트를 사용하듯이 감싸주면 된다.
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #bf4f74;
`;

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

render(
  <Wrapper>
    <Title>Hello World!</Title>
  </Wrapper>
);
```

props에 따른 css를 관리할 수 있다.

```js
const Button = styled.button<{ $primary?: boolean; }>`
  background: ${props => props.$primary ? "#BF4F74" : "white"};
  color: ${props => props.$primary ? "white" : "#BF4F74"};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #BF4F74;
  border-radius: 3px;
`;

render(
  <div>
    <Button>Normal</Button>
    <Button $primary>Primary</Button> // 해당 부분에서 primary값을 전달하여  css를 적용해준다.
  </div>
);
```

상속은 `styled()`생성자에 래핑하여 사용한다.

```js
const Button = styled.button`
  color: #bf4f74;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #bf4f74;
  border-radius: 3px;
`;

const TomatoButton = styled(Button)`
  color: tomato;
  border-color: tomato;
`;

render(
  <div>
    <Button>Normal Button</Button>
    <TomatoButton>Tomato Button</TomatoButton>
  </div>
);
```

타입스크립트에서는 다음과 같이 설정하여 사용한다.

```ts
// styled.d.ts
import 'styled-components'

declare module 'styled-components'{
    export interface DefaultTheme{
        borderRadius : string;
        colors : {
            main:string;
            secondary : string;
        }
    }
}

//my-theme.ts
import {DefaultTheme} from 'styled-components'

const myTheme : DefaultTheme ={
    borderRadius : '5px'
    colors : {
        main:'cyan'
        secondary : 'magenta'
    }
}
export {myTheme}
```
