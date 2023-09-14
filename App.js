import {effectWatch, reactive} from'./core/index.js'

export default {
    //template -> render
    render(context){
    // effectWatch(() => {  //收集依賴
      // ui邏輯      
      const element = document.createElement("div")
      const text = document.createTextNode("nihao")
      const text1 = document.createTextNode(context.obj.count) //收集依賴
      element.append(text)
      element.append(text1)
      return element      
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
// 改成更像vue組件
