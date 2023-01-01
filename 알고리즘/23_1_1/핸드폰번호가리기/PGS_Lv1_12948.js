function solution(phone_number) {
  return phone_number.replace(/\d(?=\d{4})/g, "*");
}

/**
 * 정규식으로 풀면되겠다고 생각했는데.. 생각보다 익숙하지 않아서 오래걸렸다
 * 정규표현식 많이 써보면서 익숙해지자 !
 *
 */
