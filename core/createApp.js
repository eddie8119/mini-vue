import { effectWatch } from './reactivity.js'

export function createApp(rootComponent) {
  return { //導出app對象
    mount(rootContainer) {
      const setupResult = rootComponent.setup()
      
      //render -> effectWatch
      //effectWatch -> render
      effectWatch(() => {
        rootContainer.textContent = ""
        const element = rootComponent.render(setupResult)
        rootContainer.append(element)
      })      
    }
  }
}