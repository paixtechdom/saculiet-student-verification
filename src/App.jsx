import { useState, useEffect, Suspense } from 'react'
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
import { Login } from './Pages/Login/Login';
import { StudentSearch } from './Pages/General/StudentSearch';
import { Requests } from './Pages/Admin/Organizations/Requests';
import { Students } from './Pages/Admin/Students/Students';
import { AStudent } from './Pages/Admin/Students/AStudent';
import { Alert } from './Components/Alert';
import { Settings } from './Pages/Settings/Settings';
import Cookie from 'js-cookie';
import { SendEmail } from './Pages/SendEmail';
import { ARequest } from './Pages/Admin/Organizations/ARequest';
import { Organizations } from './Pages/Admin/Organizations/Organizations';
import { AOrganization } from './Pages/Admin/Organizations/AOrganization';
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
  const [ searchInput, setSearchInput ] = useState('')
  const [ alertMessage, setAlertMessage ] = useState([])
  // const  dbLocation = '/saculietAPI'
  const  dbLocation = 'https://saculietdrivingschool.com/saculietAPI'
  // const  dbLocation = 'http://localhost:80/saculietAPI'
  
  
  
  
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
        <AppContext.Provider value={{currentNav, setCurrentNav, loggedIn, setLoggedIn, clickedSearch, setClickedSearch, dbLocation, request, setRequest, setIsAdmin, isAdmin, showAlert, setShowAlert, setAlertType, alertType, setAlertMessage, alertMessage, searchInput, setSearchInput}}> 
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
        element: <Suspense><Settings /> </Suspense> 
      },
      {
        path: '/Requests',
        element: <Suspense><Requests /> </Suspense>
      },
      {
        path: '/Requests/:userName',
        element: <Suspense><ARequest /> </Suspense>
      },
      {
        path: '/Students',
        element: <Suspense><Students /> </Suspense>
      },
      {
        path: '/Students/:id',
        element: <Suspense><AStudent /></Suspense>
      },
      {
        path: '/Organizations',
        element: <Suspense><Organizations /> </Suspense>
      },
      {
        path: '/AOrganization/:id',
        element: <Suspense><AOrganization /> </Suspense>
      },
      {
        path: '/Login',
        element: <Suspense><Login /> </Suspense>
      },
      {
        path: '/Saculietstudents',
        element: <Suspense><StudentSearch /> </Suspense>
      },
      {
        path: '/*',
        element: 
        <div className='my-9 w-full bg-gray-200 flex flex-col items-center justify-center h-96'>
          <i className="bi bi-exclamation-circle-fill text-5xl text-blue mb-3"></i>
          <p className="text-xl">
            Page not found 
          </p>

          <Link className='mt-9 text-white bg-blue p-3 text-sm px-8 rounded-xl ' to='/'>HOME PAGE</Link>
        </div>
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

