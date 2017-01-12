/**
 * Created by xiaos on 17/1/6.
 */

const _ = require('lodash')

let addFourNumbers = function(a, b, c) {return a + b + c }


const curry = function (fn) {
    const args = [].slice.call(arguments, 1)
    return function() {
        const newArgs = args.concat([].slice.call(arguments))
        return fn.apply(null, newArgs)
    }
}

let curryAdd = _.curry(addFourNumbers)

console.log(curryAdd(1)(2)(3))

