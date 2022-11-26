import { render } from 'preact'
import { App } from './app'
import {
    BrowserRouter,
} from 'react-router-dom'
import './index.css'

const root = document.getElementById('app')
render(
        <BrowserRouter basename='/'>
            <App />
        </BrowserRouter>, root)
