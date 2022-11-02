import './app.css'
import {
  BrowserRouter, 
  Routes,
  Route,
} from 'react-router-dom'
import Login from './hooks/login/login'
import Home from './hooks/home/home'
import MyWrapped from './hooks/my-wrapped/my-wrapped'

export function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="my-wrapped" element={<MyWrapped />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}
