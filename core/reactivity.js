export class Dep {
  constructor(val) {
    this._val = val
    this.effect = new Set()  //創建池子 蒐集依賴 並保證數據是唯一的
   }

  get value(){
    this.depend()
    return this._val
  }

  set value(val){
    this._val = val
    this.notice()
  }

  // 收集依賴
  depend(){
    // fn() 為了調用這塊函數
    if (currentEffect) {
      this.effect.push(currentEffect) //依賴來自effect 的函數
      console.log(this.effect)
    }  
  }

  // 觸發依賴
  notice(){
    this.effect.forEach( effect => {
      effect() //再調用一次fn
    })
  }
}

let currentEffect = null

export function effectWatch(fn){
  currentEffect = fn
  fn() //調用函數 觸發depend()
  currentEffect = null

}

