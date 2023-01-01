function solution(price, money, count) {
  const usePrice = getUsePrice(price, count);
  const result = getResult(usePrice, money);
  return result;
}
function getUsePrice(price, count) {
  let sumPrice = 0;
  for (let i = 1; i <= count; i++) {
    sumPrice += price * i;
  }
  return sumPrice;
}
function getResult(usePrice, money) {
  let result = 0;
  result = money - usePrice;
  if (result >= 0) return 0;
  result = -result;
  return result;
}

/**
 * 최소 0.05ms ~ 0.21ms , 33.4MB ~ 33.6MB 사용
 *  15~17번째줄을 뭔가 가독성있게 바꿀 수 있을 것 같은데 그냥 -result를 리턴하기엔 가독성이 안좋아보여서 위와 같이 작성함
 *
 */
