const assert = require('assert');
const ArrayExt = require('../ArrayExt')

describe('Array静态方法',function () {
    describe('#range()',function () {
        it('range',function () {
            assert.deepEqual([0,2,4,6,8,10],ArrayExt.range(0,10,2))
            assert.deepEqual([1,2,3,4,5],ArrayExt.range(1,5))
            assert.deepEqual([-5,-4,-3,-2,-1,0,1],ArrayExt.range(-5,1))
            assert.deepEqual([5,4,3,2,1],ArrayExt.range(5,1))
            assert.deepEqual([5,3,1],ArrayExt.range(5,1,2))
            assert.deepEqual([2],ArrayExt.range(2,2))
        })
    })
})

describe('Array实例方法',function () {
    describe('#head()',function () {
        it('head方法',function () {
            assert.equal(1,ArrayExt.head([1,2,3]))
            assert.equal(1,ArrayExt.head([1]))
            assert.equal(null,ArrayExt.head([]))
        })
    })
    describe('#last()',function () {
        it('last方法',function () {
            assert.equal(3,ArrayExt.last([1,2,3,]))
            assert.equal(1,ArrayExt.last([1]))
            assert.equal(null,ArrayExt.last([]))
        })
    })
    describe('#tail()',function () {
        it('tail方法',function () {
            assert.deepEqual([2,3],ArrayExt.tail([1,2,3]))
            assert.deepEqual([2,3,4],ArrayExt.tail([1,2,3,4]))
            assert.deepEqual([2,3],ArrayExt.tail([1,2,3]))
            assert.deepEqual([2,1],ArrayExt.tail([3,2,1]))
            assert.deepEqual([],ArrayExt.tail([1]))
            assert.deepEqual([],ArrayExt.tail([]))
        })
    })
    describe('#init()',function () {
        it('init方法',function () {
            assert.deepEqual([1,2],ArrayExt.init([1,2,3]))
            assert.deepEqual([1,2,3],ArrayExt.init([1,2,3,4]))
            assert.deepEqual([],ArrayExt.init([1]))
            assert.deepEqual([],ArrayExt.init([]))
        })
    })
    describe('#drop()',function () {
        it('drop方法',function () {
            assert.deepEqual([4,5],ArrayExt.drop([1,2,3,4,5],3))
            assert.deepEqual([],ArrayExt.drop([1,2],3))
            assert.deepEqual([],ArrayExt.drop([],0))
            assert.deepEqual([1,2],ArrayExt.drop([1,2],-1))
            assert.deepEqual([1,2],ArrayExt.drop([1,2],0))
        })
    })
    describe('#take()',function () {
        it('take方法',function () {
            assert.deepEqual([1,2,3],ArrayExt.take([1,2,3,4,5],3))
            assert.deepEqual([1,2],ArrayExt.take([1,2],3))
            assert.deepEqual([],ArrayExt.take([],3))
            assert.deepEqual([],ArrayExt.take([1,2],-1))
            assert.deepEqual([],ArrayExt.take([1,2],0))
        })
    })
    describe('#groupBy()',function () {
        it('groupBy',function () {
            const result = ArrayExt.groupBy([1,2,3,4,5,6,7],(value,index)=>{
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
            assert.deepEqual([[1,2,3],[4,5]],ArrayExt.splitAt([1,2,3,4,5],3))
            assert.deepEqual([[1],[2,3]],ArrayExt.splitAt([1,2,3],1))
            assert.deepEqual([[1,2,3],[]],ArrayExt.splitAt([1,2,3],3))
            assert.deepEqual([[1,2,3],[]],ArrayExt.splitAt([1,2,3],4))
            assert.deepEqual([[],[1,2,3]],ArrayExt.splitAt([1,2,3],0))
            assert.deepEqual([[],[1,2,3]],ArrayExt.splitAt([1,2,3],-1))
        })
    })

    describe('#sum',function () {
        it('sum',function () {
            assert.equal(10,ArrayExt.sum([1,2,3,4]))
            assert.equal(11,ArrayExt.sum([1,1,2,3,4]))

            let objs = [{
                name:'xiaos',
                age:22
            },{
                name:'shen',
                age:23
            }]
            assert.equal(45,ArrayExt.sum(objs,(obj)=>{return obj.age}))
        })
    })
})