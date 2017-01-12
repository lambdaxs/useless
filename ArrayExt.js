/**
 * Created by xiaos on 17/1/10.
 */


///静态方法
//无限序列的实现
Array.seq = function* (start,step,inc=true){
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
Array.range = function (start, end, step = 1) {
    let rs = []
    let sub = start - end
    let inc = sub < 0
    let it = Array.seq(start,step,inc)

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
Array.prototype.groupBy = function(callBack)  {
    let result = {}
    this.forEach((value,index)=>{
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
Array.prototype.head = function () {
    return (!this || this.length == 0) ?null: this[0]
}


//last的实现 取尾
Array.prototype.last = function () {
    return (!this ||this.length == 0)? null: this[this.length - 1]
}

//tail的实现 去头
Array.prototype.tail = function () {
    return !this || this.length == 0? []: this.slice(1)
}

//init的实现 去尾
Array.prototype.init = function () {
    return !this || this.length == 0? []:this.slice(0,-1)
}

//take的实现 获取前n个元素
Array.prototype.take = function (n) {
    return n && n>=0 ? this.slice(0, n) : []
}

//drop的实现 丢弃前面n个元素
Array.prototype.drop = function (n) {
    const count = this.length
    if (n >= count) return []
    return n && n>=0 ? this.slice(n-count): this
}

//splitAt的实现 数组切分
Array.prototype.splitAt = function (location) {
    let result = []
    result[0] = this.take(location)
    result[1] = this.drop(location)
    return result
}

//sum的实现
Array.prototype.sum = function (callback) {
    if (this.length == 0)return 0

    let isNumber = this.every((v)=>{
        return typeof v == 'number'
    })
    if (isNumber){
        return this.reduce((a,b)=>{return a+b})
    }else {
        return this.map(obj=>{
            return callback(obj)
        }).reduce((a,b)=>{return a+b})
    }
}
