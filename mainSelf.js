import {Dep, effectWatch, reactive} from'./core/index.js'

// const a =  new Dep(10)
// let b = 0 


// effectWatch(() => {
//   b = a.value +10
//   // a.depend()
//   console.log(b)
// })

// a.value = 20
// // a.notice()


reactive
const user = reactive({
  age:10
}) 
let nextAge = 0

effectWatch(() => {
  nextAge = user.age + 1
  console.log(nextAge)
})

user.age++