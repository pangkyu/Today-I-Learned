function solution(s) {
    if(isNaN(s) === false) return Number(s);
    const englishNumber = {
        'zero' : 0,
        'one' : 1,
        'two' : 2,
        'three' : 3,
        'four' : 4,
        'five' : 5,
        'six' : 6,
        'seven' : 7,
        'eight' : 8,
        'nine' : 9,
    }
    let temp = '';
    let result = '';
    for(let i = 0; i < s.length; i++){
        if(isNaN(s[i]) === false){
            result += s[i];
        }
        
        if(isNaN(s[i]) === true){
            temp += s[i];
            if(englishNumber[temp] !== undefined){
                result += englishNumber[temp];
                temp = '';
            }
        }
    }
    return Number(result);
  
}