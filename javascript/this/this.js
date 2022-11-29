// //test 1

// function logAge(a, b, c) {
//   // 원본 함수
//   console.log(this.age);
//   console.log(this.name);
//   console.log(a);
//   console.log(b);
//   console.log(c);
//   console.log(a + b + c);
// }

// const person = {
//   age: 31,
//   name: "seong",
// };

// const myAge = logAge.bind(person, 12); // 새로운 함수

// myAge(5, 3);
// // 31
// // 6

// class Man {
//   constructor(name) {
//     this.name = name;
//   }
//   hello() {
//     console.log("hello " + this.name);
//   }
// }
// const john = new Man("john");
// john.hello();

const cat = {
  name: "meow",
  foo1: function () {
    const foo2 = () => {
      console.log(this.name);
    };
    foo2();
  },
};
cat.foo1();
