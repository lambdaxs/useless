/**
 * Created by xiaos on 17/1/10.
 */


///静态方法
//无限序列的实现
const seq = function* (start,step,inc=true){
    while (1){
        yield start
        if (inc){
            start+=step
        }else {
            start-=step
        }
    }
}

//range的实现
const range = function (start, end, step = 1) {
    let rs = []
    let sub = start - end
    let inc = sub < 0
    let it = seq(start,step,inc)

    while (1){
        let value = it.next().value
        if (sub < 0){//递增序列
            if (value > end){
                break
            }
        }else {//递减序列
            if (value < end){
                break
            }
        }
        rs.push(value)
    }
    return rs
}

///实例方法
//groupBy的实现 数组分组
const groupBy = function(arr,callBack)  {
    let result = {}
    arr.forEach((value,index)=>{
        let key = callBack(value,index)
        if (!result[key]){
            result[key] = []
            result[key].push(value)
        }else {
            result[key].push(value)
        }
    })
    return result
}

//head的实现 取头
const head = function (arr) {
    return (!arr || arr.length == 0) ?null: arr[0]
}


//last的实现 取尾
const last = function (arr) {
    return (!arr ||arr.length == 0)? null: arr[arr.length - 1]
}

//tail的实现 去头
const tail = function (arr) {
    return !arr || arr.length == 0? []: arr.slice(1)
}

//init的实现 去尾
const init = function (arr) {
    return !arr || arr.length == 0? []:arr.slice(0,-1)
}

//take的实现 获取前n个元素
const take = function (arr,n) {
    return n && n>=0 ? arr.slice(0, n) : []
}

//drop的实现 丢弃前面n个元素
const drop = function (arr,n) {
    const count = arr.length
    if (n >= count) return []
    return n && n>=0 ? arr.slice(n-count): arr
}

//splitAt的实现 数组切分
const splitAt = function (arr,location) {
    let result = []
    result[0] = take(arr,location)
    result[1] = drop(arr,location)
    return result
}

//sum的实现
const sum = function (arr,callback) {
    if (arr.length == 0)return 0

    let isNumber = arr.every((v)=>{
        return typeof v == 'number'
    })
    if (isNumber){
        return arr.reduce((a,b)=>{return a+b})
    }else {
        return arr.map(obj=>{
            return callback(obj)
        }).reduce((a,b)=>{return a+b})
    }
}



module.exports = {
    groupBy,
    head,
    last,
    tail,
    init,
    take,
    drop,
    splitAt,
    sum,
    seq,
    range
}