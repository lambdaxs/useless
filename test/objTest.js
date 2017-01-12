/**
 * Created by xiaos on 17/1/10.
 */
const assert = require('assert')
const obj = require('../ObjectExt')

describe('Object',function () {
    describe('#extend',function () {
        it('extend方法',function () {
            let obj = {name:'xiaos',age:22}
            let result = obj.extend({admin:true,brith:'1994'})
            let testValue = {name:'xiaos',age:22,admin:true,brith:'1994'}
            assert.deepEqual(result,testValue)
        })
    })
    describe('#copy',function () {
        it('copy方法',function () {
            let obj = {name:'xiaos',age:22}
            let result = obj.copy()
            obj.otherKey = 'obj_key'
            result.otherKey = 'other_key'
            assert.notDeepEqual(obj,result)
        })
    })
})