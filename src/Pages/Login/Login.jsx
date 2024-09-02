import axios from "axios"
import Cookie from "js-cookie"
import { useContext, useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { ParallaxRight } from "../../../../saculietSchool/src/Components/Parallax"
import { AppContext } from "../../assets/Contexts/AppContext"
import { LogoText, requestTime } from "../../assets/Constants"
import { ClipLoader } from "react-spinners"
import { Removespaces } from "../../assets/Functions/Func"
import { GetCredentials } from "./GetCredentials"
import { FormLabel } from "../../Components/FormLabel"


export const Login = ({}) => {
    const navigate = useNavigate()
    const { isAdmin, dbLocation, loggedIn, setLoggedIn, setRequest, setIsAdmin} = useContext(AppContext)
    const passwordRef = useRef()
    const [ userName, setUserName ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ passwordType, setPasswordType ] = useState('password')
    const [error, setError ] = useState('')
    const [loading, setLoading ] = useState(false)
    const [ authState, setAuthState ] = useState(0)
    const [ showForgotPassword, setShowForgotPassword ] = useState(false)

    useEffect(() => {
        Cookie.remove('userDetails', {path:'/'})
        document.documentElement.scrollTop = 0
        setLoggedIn(false)
        setIsAdmin(false)
        setRequest({})
        
    }, [])

    const HandleLogin = (e) => {
        e.preventDefault()
        setLoading(true)
            axios.get(`${dbLocation}/requests.php/${userName}/${password}/login`).then(function(res) {
                if(!res.data == false){
                    const currentTime = new Date()
                    const t = res.data.time
                    const counter = Math.floor((currentTime - new Date(t))/1000
                    )
                    const timeLeft = requestTime - counter < 1 ? 1 : requestTime - counter
                    
                    if(res.data.status == 'expired'){
                        setError('This request has expired, contact us to get another request')
                    }
                    else if(res.data.status == 'active' && timeLeft == 1){
                        axios.post(`${dbLocation}/requests.php/expired/${res.data.id}`).then(function(res) {
                            setError('This request has expired, contact us to get another request')
                        })
                    }
                    else if(res.data.status == 'active' && timeLeft > 1){
                        navigate('/Saculietstudents')
                        setLoggedIn(true)
                        setRequest(res.data)
                        setIsAdmin(false)
                        
                        Cookie.remove('userDetails', {path:'/'})
                        Cookie.set('userDetails', JSON.stringify(res.data), {
                            expires: 1,
                            // sameSite:'None',
                            path: '/'
                        })
                        
                    }
                }
                
                else{
                    axios.get(`${dbLocation}/admin.php/${userName}/${password}/login`).then(function(res) {
                        if(res.data == 'admin'){
                            Cookie.remove('userDetails', {path:'/'})
                            
                            Cookie.set('userDetails', JSON.stringify(res.data), {
                                expires: 1,
                                // sameSite:'None',
                                path: '/'
                            })
                            setIsAdmin(true)
                            setLoggedIn(true)
                            navigate('/Dashboard')

                        }else{
                            if(res.data == 'Incorrect Password'){
                                setShowForgotPassword(true)
                            }
                            setError('Incorrect Username or Password')
                        }
                    })
                }       
                setLoading(false)
            })
        }

        
        
        return(
            <div className="flex items-center h-screen flex-col">
                <a href="https://saculietdrivingschool.com" className="md:w-1/12 fixed top-0 left-0 md:top-9 md:left-9 m-3">

                    <img src={LogoText} alt="logo" className="w-2/12 md:w-5/12 lg:w-7/12"  onClick={() => {
                        Cookie.remove('userDetails', {path:'/'})
                        navigate('/Login')
                        setIsAdmin(false)
                        
                    }}/>
                </a>
                    <div className="text-2xl h-1/5 my-9 py-9 w-10/12 text-center font-bold text-blue ">SACULIET STUDENTS' VERIFICATION</div>
                    {
                        authState == 0 ?
                        <form className="flex justify-between w-11/12 items-center transition-all duration-500 gap-6 flex-col bg-blue-30 lg:w-9/12 xl:w-7/12 border p-7  md:p-9 py-8 rounded-xl shadow-lg" onSubmit={HandleLogin}>
                            <div className="w-full ">
                                <h2 className="text-2xl text-gray-900 font-bold">Login</h2>
                            </div>
                            <p className="text-red-700 text-small">{error}</p>
                            <ParallaxRight clas='w-full' id='name'>
                                {/* <FormLabel text={'Username'} icon={'person-fill'}/>  */}
                                <div className="flex border-bottom-primary  w-full  overflow-hidden bg-gray-50">
                                            <i className="bi bi-person-fill bg-blue p-2 text-white opacity-90"></i>
                                            <input type="text" placeholder="Username" className="bg-transparent p-2 px-4 w-full outline-none" 
                                            value={userName}
                                            onChange={(e) => {
                                                setUserName(Removespaces(e.target.value))
                                            }} 
                                            required 
                                            />

                                </div>
                                    
                            </ParallaxRight>
                            <ParallaxRight clas='w-full' id='password'>
                                {/* <FormLabel text={'Password'} icon={'key-fill'}/>  */}
                                <div className="flex relative w-full bg-gray-50 overflow-hidden  border-bottom-primary">
                                        <i className="bi bi-key-fill bg-blue p-2 text-white opacity-90"></i>

                                        <i className={`bi bi-eye${passwordType == 'password' ? '' : '-slash'}-fill absolute right-0 p-2 bg-gray-300 roundd-r-xl`} onClick={() => {
                                            passwordRef.current.focus()
                                            setPasswordType(passwordType == 'password' ? 'text' : 'password')
                                        }}></i>

                                        <input type={passwordType} placeholder='Password' className="bg-transparent p-2 px-4 w-full outline-none bg-gray-50 " 
                                        value={password}
                                        ref={passwordRef}
                                        onChange={(e) => {
                                            setPassword(Removespaces(e.target.value))
                                        }} 
                                        required 
                                        />
                                </div>
                            </ParallaxRight>
                            {
                                showForgotPassword ?
                                <p className="w-full flex justify-end text-sm text-red-900 underline cursor-pointer" onClick={() => {
                                    setAuthState(1)
                                    setUserName('')
                                    setPassword('')
                                    setError('')
                                    showForgotPassword(false)
                                }}>Forgot Password?</p> : ''
                            }
                            <ParallaxRight clas='w-full ' id='send'>
                                    {
                                        loading ? 
                                        <>
                                            <button className="flex items-center bg-gray-90 bg-blue shadow-xl rounded-lg p-3 text-sm transition-all duration-500  m-auto justify-center cursor-pointer md:w-[300px] text-white gap-3"> 
                                            <ClipLoader loading={true} color="white" size={20}/> 
                                            PLEASE WAIT...
                                            </button>
                                        </>
                                    :
                                        <input type="submit" className="flex cursor-pointer items-center bg-gray-90 bg-blue shadow-xl rounded-lg p-3 text-sm transition-all duration-500  m-auto justify-center w-full md:w-[200px] text-white" value={'LOGIN'}/>
                                    }

                                {/* </div> */}
                            </ParallaxRight>
                        </form> : 
                        authState == 1 ? 
                        <GetCredentials setAuthState={setAuthState}/>
                        : ''
                    }
            </div>
    )
}

