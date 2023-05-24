function solution(n) {
    let jump = new Array(n+1).fill(0); 
    jump[1] = 1;
    jump[2] = 2;
    for(let i = 3; i<=n; i++){
        jump[i] = (jump[i-2]+jump[i-1]) % 1234567;
    }
    return jump[n];
}