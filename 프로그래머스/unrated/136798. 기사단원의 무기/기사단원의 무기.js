function solution(number, limit, power) {
    const nums = [];
    let result = 0; 
    
    for (let cur = 1; cur <= number; cur++) {
        let divisor = 0;
    
        for (let i = 1; i <= cur / 2; i++) {
        if (cur % i === 0) {
            divisor += 1;
        }
    }
    nums.push(divisor + 1);
  }
 
    nums.map((item) => {
        console.log(item);
        if(item > limit){
            result += power;
        }else{
            result += item;
        }
      
    });
    return result;
    
    
}