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


const ZERO  = (fn, x) => x,
      ONE   = (fn, x) => fn(x),
      TWO   = (fn, x) => fn(fn(x)),
      THREE = (fn, x) => fn(fn(fn(x)))


// ======= TESTS ========

const log = console.log.bind(console)

// fizzBuzz(log)
const toInteger = NUMBER => NUMBER(n => n + 1, 0)

log(toInteger(ZERO))
log(toInteger(ONE))
log(toInteger(TWO))
log(toInteger(THREE))

