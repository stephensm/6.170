// Marissa Stephens 6.170 Project 0 

// Problem 1
function inc(x) {
    return x+=1;              // the function returns x+1
}

// Problem 2
var counter=(function(){			// closure!
	var count=0;					// keep the count within the class
	return function() {
		return count+=1;			// returns incremented count	     
	};
})();

// Problem 3
function Inc(){
	return function(x){return inc(x)};  // returns a new incrementer function
}

// Problem 4
function Counter(){
	var myCount=0;
	return function(){return myCount+=1;}; // returns a new counter function
}

// Problem 5
function CounterFrom(z){
	return function(){return z+=1;}; // returns a counter function starting at z
}

// helper function for problems 6 and 9
function helperArrayMaker(n,func){
	if(n>0){
		// return the first n-1 terms of the array concated with the evaluated nth term.
		return helperArrayMaker(n-1,func).concat([func(n-1)]); 
	} else{
		return []; // return empty array
	}
}


// Problem 6
function makeArray(n,v){
	// makes an array of length n, all of element v
	return helperArrayMaker(n, function(n){return v}); 
}

// helper function for problems 7 & 9
function careful (n){
	if(typeof n !== 'number'){ // Catch bad size types
		throw {name: 'BadSize', message: 'Size is not a number'};

	} else if(n<0){ // Catch negative sized arrays
		throw {name: 'BadSize', message: 'Negative size'};
	} else return true;
}

// Problem 7
function carefulMakeArray(n,v){
	if(careful(n)){		// checks for bad types
		return makeArray(n,v); // makes array
	}
}

// Problem 8
function incArray(n){
	return carefulMakeArray(n,Inc()); // returns an careful array of inc functions
}

// Problem 9
function counterFromArray(n){
	if(careful(n)){		// checks for bad types
		return helperArrayMaker(n, CounterFrom); // returns an array of CounterFrom functions
	}
}

// Test functions for the sub problems. These are kinda crappy and don't use jasmine...
// All of the console logs should be true. 
function Tests(){
	// Problem 1
	console.log(inc(1)===2);
	console.log(inc(-1)===0);
	
	// Problem 2
	console.log(counter()===1);
	console.log(counter()===2);
	
	// Problem 3
	console.log((Inc()===Inc())===false);
	console.log(Inc()(1)===2);
	
	// Problem 4
	console.log((Counter()===Counter())===false);
	var c1=Counter();
	var c2=Counter();
	console.log(c1()===1);
	console.log(c2()===1);
	console.log(c2()===2);
	console.log(c1()===2);
	
	// Problem 5
	console.log((CounterFrom(2)===CounterFrom(2))===false);
	var c1=CounterFrom(2);
	var c2=CounterFrom(3);
	console.log(c1()===3);
	console.log(c2()===4);
	console.log(c2()===5);
	console.log(c1()===4);
	
	// Problem 6
	console.log(makeArray(3,1).length===3);
	console.log(makeArray(0,1).length===0);
	
	// Problem 7
	console.log(carefulMakeArray(3,1).length===3);
	
	try {
		carefulMakeArray(-3,1)
	} catch(e) {
		console.log(e.name==='BadSize');
		console.log(e.message==='Negative size');
	}
	
	try {
		carefulMakeArray('hi',1)
	} catch(e) {
		console.log(e.name==='BadSize');
		console.log(e.message==='Size is not a number');
	}
	
	// Problem 8
	var funcs=incArray(2);
	console.log(funcs[0](0)===1);
	console.log(funcs[1](0)===1);
	console.log(funcs[1](2)===3);
	console.log(funcs[0](3)===4);
	try {
		incArray(-31)
	} catch(e) {
		console.log(e.name==='BadSize');
		console.log(e.message==='Negative size');
	}
	
	try {
		incArray('hi',1)
	} catch(e) {
		console.log(e.name==='BadSize');
		console.log(e.message==='Size is not a number');
	}
	
	// Problem 9
	var counters=counterFromArray(3);
	console.log(counters[0]()===1);
	console.log(counters[1]()===2);
	console.log(counters[2]()===3);
	
	try {
		var badCountersSize=counterFromArray('hi');
	} catch(e) {
		console.log(e.name==='BadSize');
		console.log(e.message==='Size is not a number');
	}
		try {
		var badCountersSize=counterFromArray(-3);
	} catch(e) {
		console.log(e.name==='BadSize');
		console.log(e.message==='Negative size');
	}
}
