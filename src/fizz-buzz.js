function fizzBuzz(print) {
    for (let i = 1; i <= 100; i++) {
        if (i % 15 === 0) {
            print("FizzBuzz");
        } else if (i % 3 === 0) {
            print("Fizz");
        } else if (i % 5 === 0) {
            print("Buzz");
        } else
            print(i);
    }

}


const INCREMENT = (NUM) => fn => x => fn(NUM(fn)(x))
const ADD       = NUM1 => NUM2 => NUM2(INCREMENT)(NUM1)

const ZERO  = (fn) => x => x,
      ONE   = INCREMENT(ZERO),
      TWO   = INCREMENT(ONE),
      THREE = INCREMENT(TWO),
      FIVE  = ADD(TWO)(THREE)


// ======= TESTS ========
const A   = require("assert"),
      log = console.log.bind(console)

const toInteger = NUM => NUM(n => n + 1)(0);


const actualNumbers = [ZERO, ONE, TWO, THREE, FIVE].map(toInteger)

A.deepEqual(actualNumbers, [0, 1, 2, 3, 5])

log(actualNumbers)

// fizzBuzz(log)



