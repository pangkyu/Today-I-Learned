/**
 *
 * 못 풀 었 다 ㅠ_ㅠ
 */

//https://velog.io/@pangkyu/JS-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%ED%82%A4%ED%8C%A8%EB%93%9C-%EB%88%84%EB%A5%B4%EA%B8%B0
function solution(numbers, hand) {
  let result = [];
  let left = -1;
  let right = -1;

  function rightLogic(numbers, index) {
    result.push("R");
    right = numbers[index];
  }
  function leftLogic(numbers, index) {
    result.push("L");
    left = numbers[index];
  }

  function selectHand(numbers, index, hand) {
    if (hand === "left") {
      leftLogic(numbers, index);
    }
    if (hand === "right") {
      rightLogic(numbers, index);
    }
  }

  numbers.map(function (item, index, array) {
    if (item === 1 || item === 4 || item === 7 || item === "*") {
      leftLogic(numbers, index);
    }
    if (item === 3 || item === 6 || item === 9 || item === "#") {
      rightLogic(numbers, index);
    }
    if (item === 2 || item === 5 || item === 8 || item === 0) {
      if (item === 0) numbers[index] = 11;
      if (left === -1) left = 10;
      if (right === -1) right = 12;
      let LeftDistance = Math.abs(numbers[index] - left);
      let rightDistance = Math.abs(numbers[index] - right);
      if (LeftDistance % 3 === 0) {
        LeftDistance = LeftDistance / 3;
      }
      if (rightDistance % 3 === 0) {
        rightDistance = rightDistance / 3;
      }

      if (right + 2 == numbers[index] && right - 2 == left) {
        selectHand(numbers, index, hand);
      } else if (left + 2 == right && left - 2 == numbers[index]) {
        selectHand(numbers, index, hand);
      } else if (left + 3 === numbers[index] || left - 3 === numbers[index]) {
        leftLogic(numbers, index);
      } else if (right + 3 === numbers[index] || left - 3 === numbers[index]) {
        rightLogic(numbers, index);
      } else if (LeftDistance < rightDistance) {
        leftLogic(numbers, index);
      } else if (LeftDistance > rightDistance) {
        rightLogic(numbers, index);
      } else {
        selectHand(numbers, index, hand);
      }
    }
  });
  return result.join("");
}
