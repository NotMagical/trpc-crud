import './app.css'
import App from './App.svelte'
import './api.ts'

const app = new App({
  target: document.getElementById('app'),
})

export default app
