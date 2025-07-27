
import './App.css'
import {BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import  OnclickNews from './pages/OnclickNews';
import Differentcatigory from './pages/differentcatigory';
import Localnewspage from './pages/Localnewspage';


function App() {

  return (
    <>
     <Router>
      <Routes>
      <Route path='/' element={<Home/>}  />
      <Route path='/detail' element={<OnclickNews/>}/>
      <Route path='/local' element={<Localnewspage/>}/>
      <Route path='/:category' element={<Differentcatigory/>}/>
   

      </Routes>
      
     </Router>
    
    </>
  )
}

export default App
