/**
 * Created by xiaos on 17/1/10.
 */
Object.prototype.extend = function (otherObj) {
    let obj = {}
    for (let j of Object.keys(this)){
        if (this.hasOwnProperty(j)){
            obj[j] = this[j]
        }
    }

    for(let prop of Object.keys(otherObj)) {
        if (otherObj.hasOwnProperty(prop)){
            obj[prop] = otherObj[prop]
        }
    }

    return obj
}

Object.prototype.copy = function () {
    return {}.extend(this)
}