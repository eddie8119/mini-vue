import {ref , effect} from'./node_modules/@vue/reactivity/dist/reactivity.esm-browser.prod.js'

const a = ref(20)
let b = 0

effect(()=> {
  // 收集依賴
  b = a.value +10 //執行get操作
  console.log("b值為", b)
})

// 觸發依賴
a.value = 30 //執行set操作

// 重點: 
// 1.於effect參數fn中執行 在fn中執行響應式
// 觸發依賴 就是再調用一次fn

