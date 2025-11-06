
import {Routes, Route} from 'react-router'
import { HomePage } from './Pages/HomePage'
import { CheckoutPage } from './Pages/CheckoutPage'
import './App.css'

function App() {


  return (
    <Routes>
       <Route index element={<HomePage/>}/>
       <Route path='checkout' element={<div><CheckoutPage/></div>}/>
    </Routes>
   
  )
}

export default App
