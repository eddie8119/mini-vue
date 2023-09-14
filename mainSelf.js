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


// //reactive
// const user = reactive({
//   age:10
// }) 
// let nextAge = 0

// effectWatch(() => {
//   nextAge = user.age + 1
//   console.log(nextAge)
// })

// user.age++

// const context = reactive({
//   count:0
// }) 

// window.context = context

// effectWatch(() => {
//   // // ui邏輯
//   document.querySelector("#app").textContent = ""
//   const element = document.createElement("div")
//   const text = document.createTextNode("nihao")
//   const text1 = document.createTextNode(context.count)
//   element.append(text)
//   element.append(text1)
//   document.querySelector("#app").append(element)
// })

// 改成更像vue組件
const App = {
  //template -> render
  render(context){
    effectWatch(() => {  //收集依賴
      // ui邏輯
      document.querySelector("#app").textContent = ""
      const element = document.createElement("div")
      const text = document.createTextNode("nihao")
      const text1 = document.createTextNode(context.count) //收集依賴
      element.append(text)
      element.append(text1)
      document.querySelector("#app").append(element)
    })
  },

  // 處理數據
  setup(){
    const obj = reactive({
      count:0
    }) 
    window.obj = obj
    return {
      obj
    }
  }
}

App.render(App.setup())