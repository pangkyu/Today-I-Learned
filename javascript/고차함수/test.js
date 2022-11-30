// const numberArr = [1, 3, 3, 5, 7];
// const objectArr = [
//   { name: "Harry", age: 20 },
//   { name: "Kim", age: 23 },
//   { name: "Park", age: 33 },
// ];
// console.log(
//   objectArr.find((item) => {
//     // {name : 'Park', age : 33}
//     return item.age === 33; // 해당 조건에 부합하는 값이 있으면 반환
//   })
// );
// console.log(numberArr.find((item) => item === 3));
// console.log(numberArr.filter((item) => item === 3));

const persons = [
  { name: "curry", age: 30 },
  { name: "James", age: 15 },
  { name: "Thomas", age: 50 },
  { name: "Jimmy", age: 28 },
];
const fullAge = persons.filter((person) => person.age >= 22);
console.log(fullAge);
