/**
 * Created by xiaos on 17/1/6.
 */
//浅复制
let clone = (value) => {
    let obj = {}
    for (let attr in value) {
        if (value.hasOwnProperty(attr)){
            obj[attr] = value[attr]
        }
    }
    return obj
}

let a = {
    name:'xiaos',
    age:22
}

let b = clone(a)
b.name = 'shen'


console.log(a)
console.log(b)