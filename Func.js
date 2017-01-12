//compose的实现
const compose = function() {
    const funcs = arguments
    return function() {
        let args = arguments
        for (let i = funcs.length - 1;i >=0 ;i--){
            args = [funcs[i].apply(this,args)]
        }
        return args[0]
    }
}

//pip的实现
const pip = function() {
    const funcs = arguments
    return function () {
        let args = arguments
        for (let i = 0;i < funcs.length;i++){
            args = [funcs[i].apply(this,args)]
        }
        return args[0]
    }
}

module.exports = {
    compose,
    pip
}

