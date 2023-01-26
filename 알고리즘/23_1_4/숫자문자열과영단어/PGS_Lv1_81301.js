function solution(s) {
  const englishNumber = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };
  if (isNaN(s) === false) return Number(s);

  let temp = "";
  let result = "";
  for (let i = 0; i < s.length; i++) {
    if (isNaN(s[i]) === false) {
      result += s[i];
    }
    if (isNaN(s[i]) === true) {
      temp += s[i];
      if (englishNumber[temp] !== undefined) {
        result += englishNumber[temp];
        temp = "";
      }
    }
  }
  return Number(result);
}

/*
테스트 1 〉	통과 (0.07ms, 33.4MB)
테스트 2 〉	통과 (0.08ms, 33.4MB)
테스트 3 〉	통과 (0.11ms, 33.6MB)
테스트 4 〉	통과 (0.08ms, 33.5MB)
테스트 5 〉	통과 (0.23ms, 33.4MB)
테스트 6 〉	통과 (0.17ms, 33.4MB)
테스트 7 〉	통과 (0.19ms, 33.4MB)
테스트 8 〉	통과 (0.19ms, 33.5MB)
테스트 9 〉	통과 (0.33ms, 33.5MB)
테스트 10 〉통과 (0.16ms, 33.5MB)

*/
