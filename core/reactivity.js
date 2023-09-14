export class Dep {
  constructor(val) {
    this._val = val
    this.effects = new Set()  //創建池子 蒐集依賴 並保證數據是唯一的
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
      this.effects.add(currentEffect) //依賴來自effect 的函數
      console.log(this.effects)
    }  
  }

  // 觸發依賴
  notice(){
    this.effects.forEach( effect => {
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

// 如何存取dep

const targetsMap = new Map()
export function reactive(raw){
  return new Proxy(raw, {
    get(target, key) {
      console.log("target, key", target, key)
      let dep = getDep(target, key)

      dep.depend()
      return Reflect.get(target, key) //內部自行運作     
    },
    set(target, key, value) {
      let dep = getDep(target, key)
      const result = Reflect.set(target, key, value)
      dep.notice()
      return result      
    }
  })
}
//封裝
function getDep(raw, key){
  let depsMap = targetsMap.get(raw) //獲取對應的depsMap
  if(!depsMap){
    depsMap = new Map()
    targetsMap.set(raw, depsMap)        
  }

  let dep = depsMap.get(key)
  if(!dep){
    dep = new Dep() //不用參數 在get()已獲得
    depsMap.set(key, dep)
  }
  return dep //記得返出
}

