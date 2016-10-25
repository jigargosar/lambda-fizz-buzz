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

const ZERO             = fn=>x=>x
const INCREMENT        = n=>fn=>x=>fn(n(fn)(x))
const ADD              = n => m => m(INCREMENT)(n)
const MULTIPLY         = m=>n=>n(ADD(m))(ZERO)
const DECREMENT        = n=>f=>x=> n(g=>h=>h(g(f)))(y=>x)(y=>y)
const SUBTRACT         = m=>n=>n(DECREMENT)(m)
const Z                = f=>(x=>f(y=>x(x)(y)))(x=>f(y=>x(x)(y))) //Z Combinator
const IS_LESS_OR_EQUAL = m=>n=>IS_ZERO(SUBTRACT(m)(n))
var DIVIDE             = Z(f=>m=>n=>IF(IS_LESS_OR_EQUAL(n)(m))(x=>INCREMENT(f(SUBTRACT(m)(n))(n))(x))(ZERO))
var MOD                = Z(f=>m=>n=>IF(IS_LESS_OR_EQUAL(n)(m))(x=>f(SUBTRACT(m)(n))(n)(x))(m));
//Lists
const PAIR             = x=>y=>f=>f(x)(y)
const LEFT             = p=>p(x=>y=>x)
const RIGHT            = p=>p(x=>y=>y)
const EMPTY            = PAIR(TRUE)(TRUE);
const UNSHIFT          = l=>x=>PAIR(FALSE)(PAIR(x)(l));
const IS_EMPTY         = LEFT;
const FIRST            = l=>LEFT(RIGHT(l));
const REST             = l=>RIGHT(RIGHT(l));
const PUSH             = l=>x=>FOLD(l)(UNSHIFT(EMPTY)(x))(UNSHIFT);
const RANGE            = Z(f=>m=>n=>IF(IS_LESS_OR_EQUAL(m)(n))(x=>UNSHIFT(f(INCREMENT(m))(n))(m)(x))(EMPTY));
const FOLD             = Z(f=>l=>x=>g=>IF(IS_EMPTY(l))(x)(y=>g(f(REST(l))(x)(g))(FIRST(l))(y)));
const MAP              = k=>f=>FOLD(k)(EMPTY)(l=>x=>UNSHIFT(l)(f(x)));


const ONE   = INCREMENT(ZERO);
const TWO   = INCREMENT(ONE);
const THREE = INCREMENT(TWO);
const FIVE  = ADD(TWO)(THREE);
const TEN   = MULTIPLY(FIVE)(TWO);


// ======= TESTS ========
const A   = require("assert"),
      log = console.log.bind(console)

const toInteger = NUM => NUM(n => n + 1)(0);


const actualNumbers = [ZERO, ONE, TWO, THREE, FIVE, TEN].map(toInteger)

A.deepEqual(actualNumbers, [0, 1, 2, 3, 5, 10])

log(actualNumbers)

// fizzBuzz(log)



