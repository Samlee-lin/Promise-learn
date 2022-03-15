// Promise.any
let p1 = Promise.reject('p1')

let p2 = new Promise((resolve,reject)=>{
    return setTimeout(() => {
        reject('1秒后返回')
    }, 1000);
})

let p3 = new Promise((resolve)=>{
    return setTimeout(() => {
        resolve('2秒后返回')
    }, 2000);
})

let p4 = new Promise((resove,reject)=>{
    return setTimeout(()=>{
        reject('3秒后返回该失败信息')
    },3000)
})

// Promise.any([p1,p2,p3,p4]).then(res=>{
//     console.log(res);  //2秒后返回
// }).catch(err=>{
//     console.log(err)
// })
// 手动实现Promise.any
Promise.myAny = (promises) => {
    let rejectArr = [];
    let count = 0;
    return new Promise((resolve, reject) => {
        promises.forEach((item,index) => {
            Promise.resolve(item).then(resolve,err=>{
                rejectArr[index] = err;
                count += 1;
                if(count === promises.length) {
                    reject(rejectArr)
                }
            })
        });
    })
}

Promise.myAny([p1,p2,p3,p4]).then(res=>{
    console.log(res);  //2秒后返回
}).catch(err=>{
    console.log(err)
})