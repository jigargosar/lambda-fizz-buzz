const ZERO = fn=>x=>x // The Alpha and The Omega

const INCREMENT = n=>fn=>x=>fn(n(fn)(x))
const ADD       = n => m => m(INCREMENT)(n)
const MULTIPLY  = m=>n=>n(ADD(m))(ZERO)
const DECREMENT = n=>f=>x=> n(g=>h=>h(g(f)))(y=>x)(y=>y)
const SUBTRACT  = m=>n=>n(DECREMENT)(m)
const Z         = f=>(x=>f(y=>x(x)(y)))(x=>f(y=>x(x)(y))) //Z Combinator
const DIVIDE    = Z(f=>m=>n=>IF(IS_LESS_OR_EQUAL(n)(m))(x=>INCREMENT(f(SUBTRACT(m)(n))(n))(x))(ZERO))
const MOD       = Z(f=>m=>n=>IF(IS_LESS_OR_EQUAL(n)(m))(x=>f(SUBTRACT(m)(n))(n)(x))(m))

//Logic
const TRUE             = x=>y=>x
const FALSE            = x=>y=>y
const IS_ZERO          = NUMBER=>NUMBER(()=>FALSE)(TRUE)
const IF               = b=>b
const IS_LESS_OR_EQUAL = m=>n=>IS_ZERO(SUBTRACT(m)(n))

//Lists
const PAIR     = x=>y=>f=>f(x)(y)
const LEFT     = p=>p(x=>y=>x)
const RIGHT    = p=>p(x=>y=>y)
const EMPTY    = PAIR(TRUE)(TRUE)
const UNSHIFT  = l=>x=>PAIR(FALSE)(PAIR(x)(l))
const IS_EMPTY = LEFT
const FIRST    = l=>LEFT(RIGHT(l))
const REST     = l=>RIGHT(RIGHT(l))
const PUSH     = l=>x=>FOLD(l)(UNSHIFT(EMPTY)(x))(UNSHIFT)
const RANGE    = Z(f=>m=>n=>IF(IS_LESS_OR_EQUAL(m)(n))(x=>UNSHIFT(f(INCREMENT(m))(n))(m)(x))(EMPTY))
const FOLD     = Z(f=>l=>x=>g=>IF(IS_EMPTY(l))(x)(y=>g(f(REST(l))(x)(g))(FIRST(l))(y)))
const MAP      = k=>f=>FOLD(k)(EMPTY)(l=>x=>UNSHIFT(l)(f(x)))

const ONE     = INCREMENT(ZERO)
const TWO     = INCREMENT(ONE)
const THREE   = INCREMENT(TWO)
const FIVE    = ADD(TWO)(THREE)
const TEN     = MULTIPLY(FIVE)(TWO)
const FIFTEEN = MULTIPLY(FIVE)(THREE)
const HUNDRED = MULTIPLY(TEN)(TEN)

//Strings - "0123456789BFiuz"
const B         = TEN
const F         = INCREMENT(B)
const I         = INCREMENT(F)
const U         = INCREMENT(I)
const ZEE       = INCREMENT(U) // `Z` char, conflicts with our Z combinator
const FIZZ      = UNSHIFT(UNSHIFT(UNSHIFT(UNSHIFT(EMPTY)(ZEE))(ZEE))(I))(F)
const BUZZ      = UNSHIFT(UNSHIFT(UNSHIFT(UNSHIFT(EMPTY)(ZEE))(ZEE))(U))(B)
const FIZZBUZZ  = UNSHIFT(UNSHIFT(UNSHIFT(UNSHIFT(BUZZ)(ZEE))(ZEE))(I))(F)
const TO_DIGITS = Z(f=>n=>PUSH(IF(IS_LESS_OR_EQUAL(n)(DECREMENT(TEN)))(EMPTY)(x=>f(DIVIDE(n)(TEN))(x)))(MOD(n)(TEN)))


const FizzBuzz = ()=>
    MAP(RANGE(ONE)(HUNDRED))(n=>
        IF(IS_ZERO(MOD(n)(FIFTEEN)))(
            FIZZBUZZ
        )(IF(IS_ZERO(MOD(n)(THREE)))(
            FIZZ
        )(IF(IS_ZERO(MOD(n)(FIVE)))(
            BUZZ
        )(
            TO_DIGITS(n)
        ))))


// ======= HELPERS TO DECODE THE PROGRAM ========

const toInteger = NUM => NUM(n => n + 1)(0)
const toBoolean = BOOLEAN=>IF(BOOLEAN)(true)(false)
const toArray   = LIST => {
    const array = []
    while (!toBoolean(IS_EMPTY(LIST))) {
        array.push(FIRST(LIST));
        LIST = REST(LIST)
    }
    return array
}
const toChar    = CHAR=>"0123456789BFiuz"[toInteger(CHAR)]
const toString  = LIST=>toArray(LIST).map(toChar).join("")
const decode    = (encoded)=>toArray(encoded).map(toString)


console.log(decode(FizzBuzz()))