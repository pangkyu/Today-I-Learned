function solution(lottos, win_nums) {
    let result = [];
    let max = 0;
    let min = 0; 
    lottos.map((item) => {  
        if(win_nums.includes(item)){
            min++;
            max++;
        }
        if(item === 0){
             max++;
        }
    })

    result.push(distinguishResult(max));
    result.push(distinguishResult(min));
    return result;
}

function distinguishResult(number){
    switch(number){
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