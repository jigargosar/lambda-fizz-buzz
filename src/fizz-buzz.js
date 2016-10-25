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

const ZERO  = (fn) => x => x
const INCREMENT = NUM => fn => x => fn(NUM(fn)(x))
const ADD       = NUM1 => NUM2 => NUM2(INCREMENT)(NUM1)
const MULTIPLY = m=>n=>n(ADD(m))(ZERO)


const ONE   = INCREMENT(ZERO);
const TWO   = INCREMENT(ONE);
const THREE = INCREMENT(TWO);
const FIVE  = ADD(TWO)(THREE);
const TEN  = MULTIPLY(FIVE)(TWO);


// ======= TESTS ========
const A   = require("assert"),
      log = console.log.bind(console)

const toInteger = NUM => NUM(n => n + 1)(0);


const actualNumbers = [ZERO, ONE, TWO, THREE, FIVE, TEN].map(toInteger)

A.deepEqual(actualNumbers, [0, 1, 2, 3, 5, 10])

log(actualNumbers)

// fizzBuzz(log)



