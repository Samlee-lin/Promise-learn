// Promise.all
let p1 = Promise.resolve('p1')

let p2 = new Promise((resolve)=>{
    return setTimeout(() => {
        resolve('1秒后返回')
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

// // 当Promise所有实例都成功时
// Promise.all([p1,p2,p3]).then(res=>{
//     console.log(res);  //2秒后打印 [ 'p1', '1秒后返回', '2秒后返回' ]
// })

// Promise.all([p1,p2,p4]).then(res=>{
//     console.log(res)
// }).catch(err=>{
//     console.log(err);  //3秒后打印 “3秒后返回该失败信息”
// })

// 手动实现Promise.all
Promise.myAll = (promises) => { 
    let arr = [];  //收集各个promise的完成情况
    let count = 0;  //成功执行的次数
    return new Promise((resolve, reject)=>{
        promises.forEach((item,index) => {
            Promise.resolve(item).then(res=>{
                arr[index] = res;
                count += 1;
                if(count === promises.length) {
                    resolve(arr);
                }
            }, reject)
        });
    })
}

Promise.myAll([p1,p2,p3]).then(res=>{
    console.log(res);  //2秒后打印 [ 'p1', '1秒后返回', '2秒后返回' ]
}).catch(err=>{
    console.log(err);
})

Promise.myAll([p1,p2,p4]).then(res=>{
    console.log(res);
}).catch(err=>{
    console.log(err);  //3秒后打印 “3秒后返回该失败信息”
})