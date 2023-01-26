function solution(lottos, win_nums) {
  let result = [];
  let max = 0;
  let min = 0;
  lottos.map((item) => {
    if (win_nums.includes(item)) {
      min++;
      max++;
    }
    if (item === 0) {
      max++;
    }
  });

  result.push(distinguishResult(max));
  result.push(distinguishResult(min));
  return result;
}

function distinguishResult(number) {
  switch (number) {
    case 6:
      return 1;
    case 5:
      return 2;
    case 4:
      return 3;
    case 3:
      return 4;
    case 2:
      return 5;
    case 1:
      return 6;
    case 0:
      return 6;
    default:
      return 0;
  }
}

/**
 * 테스트 1 〉	통과 (0.07ms, 33.6MB)
테스트 2 〉	통과 (0.07ms, 33.6MB)
테스트 3 〉	통과 (0.07ms, 33.5MB)
테스트 4 〉	통과 (0.07ms, 33.4MB)
테스트 5 〉	통과 (0.08ms, 33.5MB)
테스트 6 〉	통과 (0.07ms, 33.4MB)
테스트 7 〉	통과 (0.07ms, 33.5MB)
테스트 8 〉	통과 (0.07ms, 33.5MB)
테스트 9 〉	통과 (0.08ms, 33.4MB)
테스트 10 〉	통과 (0.07ms, 33.5MB)
테스트 11 〉	통과 (0.07ms, 33.6MB)
테스트 12 〉	통과 (0.09ms, 32.1MB)
테스트 13 〉	통과 (0.07ms, 33.5MB)
테스트 14 〉	통과 (0.11ms, 33.5MB)
테스트 15 〉	통과 (0.07ms, 33.4MB)
 * 
 */
