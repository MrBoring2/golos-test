const listeners = {}

export default {
  $on(event, callback) {
    if (!listeners[event]) {
      listeners[event] = []
    }
    listeners[event].push(callback)
  },
  
  $emit(event, ...args) {
    if (listeners[event]) {
      listeners[event].forEach(cb => cb(...args))
    }
  },
  
  $off(event) {
    delete listeners[event]
  }
}