// Promise.race
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

let p5 = new Promise((resove,reject)=>{
    return setTimeout(()=>{
        reject('4秒后返回该失败信息')
    },3000)
})

let p6 = new Promise((resove,reject)=>{
    return setTimeout(()=>{
        reject('5秒后返回该失败信息')
    },3000)
})

// // 当Promise所有实例都成功时
// Promise.race([p1,p2,p3]).then(res=>{
//     console.log(res);  //p1  因为p1执行resolve
// })

// 当Promise所有实例都失败时
// Promise.race([p5,p6,p4]).then(res=>{
//     console.log(res);
// }).catch(err=>{
//     console.log(err)  //3秒后返回该失败信息
// })


Promise.myRace = (promises) => {
    return new Promise((resolve, reject) => {
        for (const item of promises) {
            Promise.resolve(item).then(resolve, reject)
        }
    })
}

// 当Promise所有实例都成功时
// Promise.myRace([p1,p2,p3]).then(res=>{
//     console.log(res);  //p1  因为p1执行resolve
// })

// 当Promise所有实例都失败时
Promise.race([p5,p6,p4]).then(res=>{
    console.log(res);
}).catch(err=>{
    console.log(err)  //3秒后返回该失败信息
})