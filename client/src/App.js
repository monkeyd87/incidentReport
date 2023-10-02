import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState,useEffect,createContext} from 'react'
import { NavBar } from './components/NavBar';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, createHashRouter,Navigate  } from 'react-router-dom';
import { Default } from './pages/Default';
import { ClassroomPage } from './pages/ClassroomPage';
import { Login } from './pages/Loginpage';
import { SignUP, signUp } from './pages/signupPage';
import { Dashboard } from './pages/Dashboard';
import {Home} from './pages/Home'
import { StudentPage } from './pages/StudentPage';
import { ReportsPage } from './pages/ReportPage';


 


function App() {

  const [user,setUser] = useState({})

  const myContext = createContext()
 
  const router = createBrowserRouter(createRoutesFromElements(
   
      <Route path="/" element={<Default/>}>
        <Route path='/' element={<Navigate to='home'/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/login'element={<Login/>}/>
        <Route path='/signup'element={<SignUP/>}/>
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/student/:id' element={<StudentPage/>} />
        <Route path="reports" element={<ReportsPage/>}/>
        <Route path='/classroom/:class_id' element={<ClassroomPage name={'denis'}/>} />
      </Route>
  ))
  
  return (
  //  <RouterProvider router={router}  context={myContext}/>
  <>
  <myContext.Provider value={[user,setUser]}>
      <NavBar/>
      <Route>
        <Route path='/' element={<Navigate to='home'/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/login'element={<Login/>}/>
        <Route path='/signup'element={<SignUP/>}/>
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/student/:id' element={<StudentPage/>} />
        <Route path="reports" element={<ReportsPage/>}/>
        <Route path='/classroom/:class_id' element={<ClassroomPage name={'denis'}/>} />
    </Route>
  </myContext.Provider>

  </>
  );
}

export default App;
