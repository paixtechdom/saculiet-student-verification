import { useState, useEffect } from 'react'
import { CircleLoader, GridLoader, DotLoader, ClimbingBoxLoader } from 'react-spinners';
// import './assets/Styles/index.css';
// import './assets/Styles/Animation.css';
import { createBrowserRouter, RouterProvider, Outlet, Link, useNavigate } from 'react-router-dom';
import { Dashboard } from './Pages/Admin/Dashboard';
import { HelmetProvider } from 'react-helmet-async';
import { AppContext } from './assets/Contexts/AppContext'
// // import { Home } from './Pages/Home/Home';
import { Nav } from './Components/Nav';
import { Footer } from './Components/Footer';
import { Login } from './Pages/Login';
import { StudentSearch } from './Pages/General/StudentSearch';
import { Requests } from './Pages/Admin/Organizations/Requests';
import { Students } from './Pages/Admin/Students/Students';
import { AStudent } from './Pages/Admin/Students/AStudent';
import { Alert } from './Components/Alert';
import { Settings } from './Pages/Settings/Settings';
import Cookie from 'js-cookie';
import { SendEmail } from './Pages/SendEmail';
import { ARequest } from './Pages/Admin/Organizations/ARequest';
// // import { Loading } from './Components/Loading';

const Layout = () =>{
  const url = document.baseURI

  const [ currentNav, setCurrentNav ] = useState(0)
  const [ isLoading, setIsLoading ] = useState(true)
  const [ isAdmin, setIsAdmin ] = useState(false)
  // const [ loggedIn, setLoggedIn ] = useState(false)
  const [ loggedIn, setLoggedIn ] = useState(false)
  const [ clickedSearch, setClickedSearch ] = useState(true)
  const [ request, setRequest ] = useState({})
  const [ showAlert, setShowAlert ] = useState(false)
  const [ alertType, setAlertType ] = useState('')
  const [ alertMessage, setAlertMessage ] = useState([])
  // const  dbLocation = 'https://saculietdrivingschool.com/saculietAPI'
  const  dbLocation = 'http://localhost:80/saculietAPI'
  
  
  
  
  useEffect(() => {
    const cookie = Cookie.get('userDetails')
    if(cookie !== undefined){
      const userDetails = JSON.parse(cookie)
      setRequest(userDetails.userName === 'admin' ? {} : userDetails)
      setIsAdmin(userDetails.userName === 'admin' ? true : false)
      setLoggedIn(true)

      // console.log(loggedIn ? 'in' : 'no tin')
    }


  }, [])


  return(
    <div className='app overflow-hidden'>
      <HelmetProvider>
        <AppContext.Provider value={{currentNav, setCurrentNav, loggedIn, setLoggedIn, clickedSearch, setClickedSearch, dbLocation, request, setRequest, setIsAdmin, isAdmin, showAlert, setShowAlert, setAlertType, alertType, setAlertMessage, alertMessage}}> 
        <Nav/>  
            <>
              <Outlet />
              <Footer />
            </>
        
          <Alert /> 
          </AppContext.Provider>
      </HelmetProvider>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children:[
      {
        path: '/',
        element: <Dashboard /> 
      },
      {
        path: '/Dashboard',
        element: <Dashboard /> 
      },
      {
        path: '/Settings',
        element: <Settings /> 
      },
      {
        path: '/Requests',
        element: <Requests /> 
      },
      {
        path: '/Requests/:id',
        element: <ARequest /> 
      },
      {
        path: '/Students',
        element: <Students /> 
      },
      {
        path: '/Students/:id',
        element: <AStudent /> 
      },
      {
        path: '/Login',
        element: <Login /> 
      },
      {
        path: '/SendEmail',
        element: <SendEmail /> 
      },
      {
        path: '/Saculietstudents',
        element: <StudentSearch /> 
      },
      {
        path: '/*',
        element: <div className='pt-9 m-9 '>Page not found <Link className='mt-9 text-black' to='/'>go to home page</Link></div>
      }
    ]
  }
])

function App() {
  return (
    <div className='App'>
      <RouterProvider router={router} /> 
    </div>
  );

}


export default App;

