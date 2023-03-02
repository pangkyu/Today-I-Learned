function solution(s){
    let stackCount = 0; 
    
//     for(let i = 0; i < s.length; i++){
//         s[i] === '(' ? stackCount++ : stackCount--;
//         if(stackCount < 0) return false;
//     }
    for(let i of s) {
        i === '(' ? stackCount++ : stackCount--;
        if(stackCount < 0) return false;
    }
    
    return stackCount === 0 ? true : false;
}

