import {Dep , effectWatch} from'./core/index.js'
const a =  new Dep(10)
let b = 0 

effectWatch(() => {
  b = a.value +10
  // a.depend()
  console.log( b)
})

a.value = 20
// a.notice()
