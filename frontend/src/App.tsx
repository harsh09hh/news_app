
import './App.css'
import {BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import  OnclickNews from './pages/OnclickNews';
import Differentcatigory from './pages/differentcatigory';
import Localnewspage from './pages/Localnewspage';
import { SigninForm } from './pages/auth/SigninForm';
import { SignUpForm } from './pages/auth/signUpForm';
import ProtectedRoute from './components/ProtectedRoute';
import OnclicknewsGuardian from './pages/onclickNews.Guardian';
function App() {

  return (
    <>
     <Router>
      <Routes>
        <Route element={<ProtectedRoute/>}> 
      <Route path='/' element={<Home/>}  />
      <Route path='/detail' element={<OnclickNews/>}/>
      <Route path='/local' element={<Localnewspage/>}/>
      <Route path='/:category' element={<Differentcatigory/>}/>
       <Route path='/guardian/politics' element={< OnclicknewsGuardian/>}/>
      
        </Route > 
      <Route path='/sign-in' element={<SigninForm/>} />
      <Route path='/sign-up' element={<SignUpForm/>} />
      </Routes>
      
     </Router>
    
    </>
  )
}

export default App
