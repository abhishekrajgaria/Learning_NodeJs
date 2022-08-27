function identity(x) {
  return x;
}

function funky(o) {
  o = null;
}

let x = [];
funky(x);
console.log(x);

function add(first, second) {
  return first + second;
}

function sub(first, second) {
  return first - second;
}

function mul(first, second) {
  return first * second;
}

console.log("Add", add(3, 4));
console.log("Sub", sub(3, 4));
console.log("Mul", mul(3, 4));

function identityf(x) {
  return function () {
    return x;
  };
}
console.log("Direct Identityf", identityf(3));
let three = identityf(3);
console.log("three function", three());

//Ask addf(3)(4) // 7
function addf(arg1) {
  return function (arg2) {
    return arg1 + arg2;
  };
}

console.log("Addf", addf(3)(4));

// Ask var add3 = curry(add, 3),  add3(4) // 7
function curry(func, first) {
  return function (second) {
    return func(first, second);
  };
}
let add3 = curry(add, 3);
console.log("CurryAdd", add3(4));
console.log("CurryMul", curry(mul, 3)(4));

//Ask var sub3 = curryr(sub,3), sub3(11) // 8
function curryr(func, second) {
  return function (first) {
    return func(first, second);
  };
}
console.log("CurryrSub", curryr(sub, 3)(11));
console.log("CurryrSub", curryr(sub, 3)(3));

//Ask var addf = liftf(add), addf(3)(4) // 7
function liftf(func) {
  return function (first) {
    return function (second) {
      return func(first, second);
    };
  };
}

console.log("LiftfAdd", liftf(add)(3)(4));
console.log("LiftfMul", liftf(mul)(5)(6));

// Also use curry
function liftfc(func) {
  return function (first) {
    return curry(func, first);
  };
}
console.log("LiftfcAdd", liftfc(add)(3)(4));

// Increment function inc(5) // 6, inc(inc(6)) //8
let inc = curry(add, 1);
console.log("IncCurry", inc(5));

inc = addf(1);
console.log("IncAddf", inc(5));

// inc curry3, inc liftf

// Ask var double = twice(add), double(11) // 22
function twice(func) {
  return function (one) {
    return func(one, one);
  };
}
let double = twice(add);
console.log("TwiceAdd", double(11));
console.log("TwiceMul", twice(mul)(11));

// Ask var bus = reverse(sub) bus(3,2)// -1
function reverse(func) {
  return function (first, second) {
    return func(second, first);
  };
}
console.log("ReverseSub", reverse(sub)(3, 2));

// Ask above reverse with deserialization ...args

function reverseArgs(func) {
  return function (...args) {
    return func(...args.reverse());
  };
}
console.log("ReverseArgsSub", reverse(sub)(3, 2));


//Ask composeu(double,square)(5) // 100
function composeu(func1, func2){
	return function(arg1){
		return func2(func1(arg1));
	}
}
let square = twice(mul);
console.log("Composeu",composeu(double,square)(5));

//Ask composeb(add,mul)(2,3,7) // 35
function composeb(func1,func2){
	return function(arg1, arg2, arg3){
		return func2(func1(arg1,arg2),arg3);
	}
}
console.log("Composeb",composeb(add,mul)(2,3,7));

// Ask var add_ltd = limit(add,1), add_ltd(3,4) //7 add_ltd(3,5) // undefined

function limit(func, arg1){
	return function(first, second){
		if(arg1>=1){
			arg1--;
			return func(first,second);
			
		}
		return undefined;
	}
}

let add_ltd = limit(add,1);
console.log("Limit",add_ltd(3,4));
console.log("Limit",add_ltd(3,5));
console.log("Limit",add_ltd(3, 5));
