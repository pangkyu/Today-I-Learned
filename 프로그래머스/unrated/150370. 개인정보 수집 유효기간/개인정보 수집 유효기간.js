function solution(today, terms, privacies) {
    const answer = []; 
    const [year, month, day] = today.split('.');
    const expire = new Date(today);
    const termType = {};
    
    terms.map((item) => {
        const [type, term] = item.split(' ');
        termType[type] = Number(term);    
    })
    
    privacies.map((item, index) => {
        const [date, type] = item.split(' ');
        const chDate = new Date(date);
        
        chDate.setMonth(chDate.getMonth() + termType[type]);
        
        if(chDate <= expire) answer.push(index + 1 );
    })
    
    return answer
    
}