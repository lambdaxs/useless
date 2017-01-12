/**
 * Created by xiaos on 17/1/12.
 */
const array = require('./ArrayExt')

String.prototype.list = function () {
    return this.split('')
}

String.prototype.head = function () {
    return this.list().head()
}

String.prototype.last = function () {
    return this.list().last()
}

String.prototype.tail = function () {
    return this.list().tail().join('')
}

String.prototype.take = function (n) {
    return this.list().take(n).join('')
}

String.prototype.init = function () {
    return this.list().init().join('')
}

String.prototype.drop = function (n) {
    return this.list().drop(n).join('')
}