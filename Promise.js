/**
 * Created by xiaos on 17/1/6.
 */
const EventEmitter = require('events');

class Promise extends EventEmitter {
    then(success,failure){
        if (typeof success === 'function'){
            this.once('fulfilled',success)
        }
        if (typeof failure === 'function'){
            this.once('failed',failure)
        }
        return this
    }
}

class Deferred {

    constructor(callback){
        this.state = 'unfulfilled'
        this.promise = new Promise()
    }

    resolve(obj){
        this.state = 'fulfilled'
        this.promise.emit('fulfilled',obj)
    }

    reject(err){
        this.state = 'failed'
        this.promise.emit('failed',err)
    }

    all(promises){
        let count = promises.length
        let results = []
        promises.forEach((promise,index)=>{
            promise.then((rs)=>{
            count--
                results[index] = rs
            if (count == 0){
            this.resolve(results)
        }
    },(err)=>{
            this.reject(err)
        })
    })
        return this.promise
    }

    race(promises){
        let flag = 0
        for (let i = 0;i<promises.length;i++){
            if (flag == 0){
                promises[i].then((rs)=>{
                    if (!flag) {
                    this.resolve(rs)
                    flag = 1
                }
            },(err)=>{
                    if (!flag){
                        this.reject(err)
                        flag = 1
                    }
                })
            }else {
                break
            }
        }
        return this.promise
    }
}

//异步任务
let getData = (param)=>{
    let deferred = new Deferred()
    if (param ==='success') {
        setTimeout(()=>{
            deferred.resolve('this is a data')
    },600)
    }else {
        setTimeout(()=>{
            deferred.reject('this is a err')
    },600)
    }
    return deferred.promise
}

//异步任务
let getOtherData = ()=>{
    let def = new Deferred()
    setTimeout(()=>{
        def.resolve('this is other data')
},800)
    return def.promise
}

//异步执行 抛出错误
getData('err').then((rs)=>{
    console.log(rs)
},(err)=>{
    console.log(err)
})

//异步执行
getOtherData().then((rs)=>{
    console.log(rs)
},err=>{
    console.log(err)
})

//异步串行
getData('success').then(rs=>{
    console.log('this is getData: '+rs)
    return getOtherData()
}).then(rs=>{
    console.log('异步串行结果:'+rs)
},err=>{
    console.log('异步串行错误 :'+err)
})

//异步并行
new Deferred().all([getData('success'),getOtherData()]).then((rs)=>{
    console.log('all result is:'+rs)
},err=>{
    console.log('all err is'+err)
})

//异步并行 优先级
new Deferred().race([getData('success'),getOtherData()]).then(rs=>{
    console.log('race result is:'+rs)
},err=>{
    console.log('race err is:'+err)
})





