function solution(numbers) {
  const numberArray = getNumberArray(numbers);
  return addNumberArray(numberArray);
}
function getNumberArray(numbers) {
  let array = [];
  for (let i = 0; i < 10; i++) {
    let missingNumber = checkNumber(numbers, i);
    array.push(missingNumber);
  }
  return array;
}
function checkNumber(numbers, i) {
  let check = numbers.includes(i);
  if (check === false) {
    return i;
  }
  return 0;
}

function addNumberArray(numberArray) {
  let sum = 0;
  numberArray.map((item) => {
    sum += item;
  });
  return sum;
}

/**
 * <<< 신경쓴 부분 >>>>
 * 1. 함수 분리를 하려고 노력하였음
 * 2. 고차함수 사용을 활용하고자 했음
 * 3. 변수명을 이해하기 쉽게 하도록 생각했음
 */
