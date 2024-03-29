import axios from "axios"
import Cookie from "js-cookie"
import { useContext, useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import { ParallaxRight } from "../../../saculietSchool/src/Components/Parallax"
import { AppContext } from "../assets/Contexts/AppContext"
import { LogoText } from "../assets/Constants"


export const Login = ({}) => {
    const navigate = useNavigate()
    const { isAdmin, dbLocation, loggedIn, setLoggedIn, setOrganization, setIsAdmin} = useContext(AppContext)
    
    const [ userName, setUserName ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ passwordType, setPasswordType ] = useState('password')
    const [error, setError ] = useState('')
    useEffect(() => {
        Cookie.remove('userDetails', {path:'/'})
        document.documentElement.scrollTop = 0
        setLoggedIn(false)
        setIsAdmin(false)
        setOrganization({})
        
    }, [])

    const HandleLogin = (e) => {
        e.preventDefault()
        // if(isAdmin){
            // }
            // else{
            // }
            
            // setFetchingData(true)
            axios.get(`${dbLocation}/organizations.php/${userName}/${password}/login`).then(function(res) {
                if(!res.data == false){
                    const currentTime = new Date()
                    const t = res.data.time
                    const counter = Math.floor((currentTime - new Date(t))/1000
                    )
                    const timeLeft = 3600 - counter < 1 ? 1 : 3600 - counter
                    
                    if(res.data.status == 'expired'){
                        setError('This request has expired, contact us to get another request')
                    }
                    else if(res.data.status == 'active' && timeLeft == 1){
                        axios.post(`${dbLocation}/organizations.php/expired/${res.data.id}`).then(function(res) {
                            setError('This request has expired, contact us to get another request')
                        })
                    }
                    else if(res.data.status == 'active' && timeLeft > 1){
                        navigate('/Saculietstudents')
                        setLoggedIn(true)
                        setOrganization(res.data)
                        setIsAdmin(false)
                        
                        Cookie.remove('userDetails', {path:'/'})
                        Cookie.set('userDetails', JSON.stringify(res.data), {
                            expires: 1,
                            sameSite:'strict',
                            secure: 'true',
                            path: '/'
                        })
                        
                    }
                }
                
                else{
                    axios.get(`${dbLocation}/admin.php/${userName}/${password}/login`).then(function(res) {
                        if(!res.data == false){
                            Cookie.remove('userDetails', {path:'/'})
                            Cookie.set('userDetails', JSON.stringify(res.data), {
                                expires: 1,
                                sameSite:'strict',
                                secure: 'true',
                                path: '/'
                            })
                            setIsAdmin(true)
                            setLoggedIn(true)
                            console.log(res.data)
                            navigate('/Dashboard')
                        }else{
                            setError('Incorrect Login Credentials')
                        }
                    })
                }       
            // setTimeout(() => {
                //     setFetchingData(false)
                // }, 2000);
            })
        }

        
        
        return(
            <div className="flex items-center h-screen flex flex-col">
                <a href="https://saculietdrivingschool.com">

                    <img src={LogoText} alt="logo" className="w-1/12 fixed top-0 left-0 m-3 "  onClick={() => {
                        Cookie.remove('userDetails', {path:'/'})
                        navigate('/Login')
                        setIsAdmin(false)
                        
                    }}/>
                </a>
                    <div className="text-lg h-1/5 my-9 py-9 w-10/12 text-center ">SACULIET STUDENTS' VERIFICATION</div>
                  <form className="flex justify-between w-11/12 items-center transition-all duration-500 gap-6 flex-col bg-blue-30" onSubmit={HandleLogin}>
                    <div className="w-full ">
                        <h2 className="text-3xl text-gray-700">Login</h2>
                    </div>
                    <p className="text-red-700 text-small">{error}</p>
                    <ParallaxRight clas='w-full' id='name'>
                        <div className="flex border w-full rounded-xl overflow-hidden">
                                    <i className="bi bi-person-fill bg-blue p-2 text-white opacity-90"></i>
                                    <input type="text" placeholder="Username" className="bg-transparent p-2 w-full" 
                                    value={userName}
                                    onChange={(e) => {
                                        setUserName(e.target.value)
                                    }} 
                                    required 
                                    />

                        </div>
                            
                    </ParallaxRight>
                    <ParallaxRight clas='w-full' id='email'>
                        <div className="flex border w-full rounded-xl overflow-hidden">
                                <i className="bi bi-key-fill bg-sec p-2 text-white opacity-90"></i>
                                <i className={`bi bi-eye${passwordType == 'password' ? '' : '-slash'}-fill absolute right-0 m-2 scale-110 text-gray-600`} onClick={() => {
                                    setPasswordType(passwordType == 'password' ? 'text' : 'password')
                                }}></i>
                                <input type={passwordType} placeholder='Password' className="bg-transparent p-2 w-full" 
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }} 
                                required 
                                />
                        </div>
                    </ParallaxRight>
                    <ParallaxRight clas='w-full ' id='send'>
                        {/* <div className={`flex cursor-pointer items-center bg-gray-90 bg-blue shadow-xl rounded-xl p-2 text-lg transition-all duration-500  m-auto justify-center cursor-pointer border relative overflow-hidden`}
                      >  */}
                      {/* <div className="absolute top-0 left-0 z-10 flex w-full h-full">
                        <div className="bg-blue w-full"></div>
                        <div className="bg-sec w-full"></div>
                      </div> */}
                            
                            <input type="submit" className="flex cursor-pointer items-center bg-gray-90 bg-blue shadow-xl rounded-xl p-2 text-lg transition-all duration-500  m-auto justify-center cursor-pointer w-full text-white" value={'Login'}/>

                        {/* </div> */}
                    </ParallaxRight>
                </form>
            </div>
    )
}

