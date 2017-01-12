/**
 * Created by xiaos on 17/1/10.
 */
const assert = require('assert')
const {compose,pip} = require('../Func')

function addOne(data) {
    return data+1;
}

function mulTwo(data) {
    return data*2;
}

function divThree(data) {
    return data-3;
}

function toStr(data) {
    return data+'';
}

describe('Func',function () {
    describe('#compose()',function () {
        it('compose方法',function () {
            let result = compose(divThree,mulTwo,addOne)(10)
            assert.equal((10+1)*2-3,result)
        })
    })
    describe('#pip()',function () {
        it('pip方法',function () {
            let result = pip(divThree,mulTwo,addOne)(10)
            assert.equal((10-3)*2+1,result)
            let rsStr = pip(divThree,mulTwo,addOne,toStr)(10)
            assert.equal('15',rsStr)
        })
    })
})
