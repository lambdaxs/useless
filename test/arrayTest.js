const assert = require('assert');
const ArrayExt = require('../ArrayExt')

describe('Array静态方法',function () {
    describe('#range()',function () {
        it('range',function () {
            assert.deepEqual([0,2,4,6,8,10],Array.range(0,10,2))
            assert.deepEqual([1,2,3,4,5],Array.range(1,5))
            assert.deepEqual([-5,-4,-3,-2,-1,0,1],Array.range(-5,1))
            assert.deepEqual([5,4,3,2,1],Array.range(5,1))
            assert.deepEqual([5,3,1],Array.range(5,1,2))
            assert.deepEqual([2],Array.range(2,2))
        })
    })
})

describe('Array实例方法',function () {
    describe('#head()',function () {
        it('head方法',function () {
            assert.equal(1,[1,2,3,].head())
            assert.equal(null,[].head())
            assert.equal(null,[].head(2))
            assert.equal(null,[].head(-2))
            assert.equal(null,[].head(0))
        })
    })
    describe('#last()',function () {
        it('last方法',function () {
            assert.equal(3,[1,2,3,].last())
            assert.equal(null,[].last())
            assert.equal(null,[].last(2))
            assert.equal(null,[].last(-2))
            assert.equal(null,[].last(0))
        })
    })
    describe('#tail()',function () {
        it('tail方法',function () {
            assert.deepEqual([2,3],[1,2,3].tail())
            assert.deepEqual([2,3,4],[1,2,3,4].tail(0))
            assert.deepEqual([2,3],[1,2,3].tail(2))
            assert.deepEqual([2,3],[1,2,3].tail(-2))
        })
    })
    describe('#init()',function () {
        it('init方法',function () {
            assert.deepEqual([1,2],[1,2,3].init())
            assert.deepEqual([1,2,3],[1,2,3,4].init(0))
            assert.deepEqual([1,2],[1,2,3].init(2))
            assert.deepEqual([1,2],[1,2,3].init(-2))
        })
    })
    describe('#drop()',function () {
        it('drop方法',function () {
            assert.deepEqual([4,5],[1,2,3,4,5].drop(3))
            assert.deepEqual([],[1,2].drop(3))
            assert.deepEqual([],[].drop(0))
            assert.deepEqual([1,2],[1,2].drop(-1))
            assert.deepEqual([1,2],[1,2].drop(0))
        })
    })
    describe('#take()',function () {
        it('take方法',function () {
            assert.deepEqual([1,2,3],[1,2,3,4,5].take(3))
            assert.deepEqual([1,2],[1,2].take(3))
            assert.deepEqual([],[].take(3))
            assert.deepEqual([],[1,2].take(-1))
            assert.deepEqual([],[1,2].take(0))
        })
    })
    describe('#groupBy()',function () {
        it('groupBy',function () {
            const result = [1,2,3,4,5,6,7].groupBy((value,index)=>{
                return value < 5 ? '<5':'>=5'
            })
            const testValue = {
                '<5':[1,2,3,4],
                '>=5':[5,6,7]
            }
            assert.deepEqual(result,testValue)
        })
    })

    describe('#splitAt',function () {
        it('splitAt',function () {
            assert.deepEqual([[1,2,3],[4,5]],[1,2,3,4,5].splitAt(3))
            assert.deepEqual([[1],[2,3]],[1,2,3].splitAt(1))
            assert.deepEqual([[1,2,3],[]],[1,2,3].splitAt(3))
            assert.deepEqual([[1,2,3],[]],[1,2,3].splitAt(4))
            assert.deepEqual([[],[1,2,3]],[1,2,3].splitAt(0))
            assert.deepEqual([[],[1,2,3]],[1,2,3].splitAt(-1))
        })
    })

    describe('#sum',function () {
        it('sum',function () {
            assert.equal(10,[1,2,3,4].sum())
            assert.equal(11,[1,1,2,3,4].sum())

            let objs = [{
                name:'xiaos',
                age:22
            },{
                name:'shen',
                age:23
            }]
            assert.equal(45,objs.sum((obj)=>{return obj.age}))
        })
    })
})