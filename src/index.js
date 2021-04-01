import { add } from './utils/calculations.js'
import loadBunny from './components/bunny.js'

const app = new PIXI.Application()

console.log(add(1, 2))

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view)

// Load Components
loadBunny(app)
