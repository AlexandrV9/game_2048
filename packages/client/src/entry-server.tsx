import ReactDOM from 'react-dom/server'
import { App } from './app'

export const render = () => ReactDOM.renderToString(<App />)
