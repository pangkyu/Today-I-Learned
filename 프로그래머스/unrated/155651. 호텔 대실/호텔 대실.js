function solution(book_time) {
    let room = []; 
    book_time.sort();
    book_time.map((item) => {
        const splitTime = item[0].split(':')
        const startTime = Number(splitTime[0]) * 60 + Number(splitTime[1]);
        const idx = room.findIndex((e) => e <= startTime);
        if(idx === -1) room.push(getNextTime(item[1]));
        else room[idx] = getNextTime(item[1]);
    })
    return room.length;
}

function getNextTime(endTime){
    const next = endTime.split(':');
    return Number(next[0]) * 60 + Number(next[1]) + 10;
}