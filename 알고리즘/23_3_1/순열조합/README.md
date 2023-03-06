# JS로 조합과 순열 알고리즘 구현하기

1. 조합
   서로 다른 n개의 물건에서 **순서를 생각하지 않고** r개를 택할 때 이 조합의 수를 <code>nCr</code>과 같이 나타낸다.

```text
4C3을 구한다면 아래와 같이 나온다
이 때, 순서는 상관이 없다.
Input : [1,2,3,4]
Output : [[1,2,3],[1,2,4],[1,3,4],[2,3,4]]
```

```text
수도 코드
시작
    1을 선택(고정) -> 나머지 [2,3,4] 중 2개의 조합을 구함
    [1,2,3][1,2,4][1,3,4]
    2를 선택(고정) -> 나머지 [3,4] 중에서 2개씩 조합을 구함
    [2,3,4]
    3을 선택(고정) -> 나머지 [4] 중에서 2개씩 조합을 구함
    []
    4를 선택(고정)하고 -> 나머지 [] 중에서 2개씩 조합을 구함
    []
종료

배열의 처음부터 하나씩 고정하면서 뒤에있는 나머지 배열을 조합한다. 재귀함수를 사용하여 코드를 구현한다.

```

```js
/*
코드 구현 
재귀 종료 조건 : 하나를 선택할 때에는 모든 배열의 원소를 선택해서 리턴한다. 
forEach 문으로 배월의 모든 원소를 처음부터 끝까지 한 번씩 고정되도록 함 
고정된 값의 나머지 배열에 대해 조합을 구하도록 함. 이 때, 선택하는 개수를 하나 줄인다. 
조합을 만들어온 결과에 fixed 고정된 값을 앞에 붙여서 리턴할 배열에 spread syntax로 배열화 한 뒤 리턴 
*/

const getCombinations = function (arr, selectNumber) {
  const results = [];
  if (selectNumber === 1) return arr.map((v) => [v]); // n개 중에서 1개 선택할 때(nC1), 바로 모든 배열의 원소를 리턴, 탈출 조건
  arr.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1); // 해당하는 fixed를 제외한 나머지 뒤
    const combinations = getCombinations(rest, selectNumber - 1); // 나머지에 대해 조합을 구함
    const attached = combinations.map((v) => [fixed, ...v]);
    results.push(...attached); // 배열 spread syncax로 모두 다 push한다.
  });
  return results;
};
```

2. 순열
   순열은 순서가 중요하다. 서로 다른 n개의 물건 중에서 r개를 택하여 한 줄로 배열하는 것. <code>nPr</code>와 같이 나타낸다.

```text
Input: [1, 2, 3, 4]
Output: [
  [ 1, 2, 3 ], [ 1, 2, 4 ],
  [ 1, 3, 2 ], [ 1, 3, 4 ],
  [ 1, 4, 2 ], [ 1, 4, 3 ],
  [ 2, 1, 3 ], [ 2, 1, 4 ],
  [ 2, 3, 1 ], [ 2, 3, 4 ],
  [ 2, 4, 1 ], [ 2, 4, 3 ],
  [ 3, 1, 2 ], [ 3, 1, 4 ],
  [ 3, 2, 1 ], [ 3, 2, 4 ],
  [ 3, 4, 1 ], [ 3, 4, 2 ],
  [ 4, 1, 2 ], [ 4, 1, 3 ],
  [ 4, 2, 1 ], [ 4, 2, 3 ],
  [ 4, 3, 1 ], [ 4, 3, 2 ]
  ]
```

```text
수도코드
재귀의 종료 조건은 조합을 구하는 함수와 동일. (1개씩 선택한다고 하면 순서에 의미가 없어지기 때문에)
```

```js
const getPermutations = function (arr, selectNumber) {
  const results = [];
  if (selectNumber === 1) return arr.map((v) => [v]); // n개중에서 1개 선택할 때(nP1), 바로 모든 배열의 원소를 return. 1개 선택으로 순서 의미가 없다.

  arr.forEach((fixed, index, origin) => {
    const rest = [...origin.slice(0, index), ...origin.slice(index + 1)];
    const permutations = getPermutations(rest, selectNumber - 1); // 나머지에 대해 순열을 구함
    const attached = permutations.map((v) => [fixed, ...v]);
    results.push(...attached); // 배열 spread syntax로 모두 push
  });
  return results;
};
```
