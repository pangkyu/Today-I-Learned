function solution(name, yearning, photo) {

   const memory = name.reduce((acc,curr,idx) => {
       acc[curr] = yearning[idx];
       return acc;
   }, new Object);
    

    
    return photo.map(value => value.map(v => memory[v] ? memory[v] : 0).reduce((acc,cur) => acc + cur,0))
    
    
}