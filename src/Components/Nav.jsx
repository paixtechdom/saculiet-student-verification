import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { Logo, LogoText, Navinfo } from "../assets/Constants"
import Cookie  from "js-cookie"
import { useContext, Suspense } from "react"
import { AppContext } from "../assets/Contexts/AppContext"

export const Nav = () => {
    const navigate = useNavigate()
    const [dropdownPos, setDropDownPos ] = useState(-100)
    const { loggedIn, isAdmin, currentNav, setCurrentNav, setIsAdmin, setShowAlert, setAlertMessage, setAlertType } = useContext(AppContext)
    const userDetails = Cookie.get('userDetails')
    useEffect(() =>{
        document.addEventListener('scroll', handleScroll)
        
    }, [])

    const handleScroll = () => {
        document.querySelectorAll('.section').forEach((parent, i) =>{
            const pos = parent.getBoundingClientRect()
            if( pos.top > -10 && pos.top < 100) {
                setCurrentNav(i)
            } 
        })
    }
    
    useEffect(() => {
        if(userDetails == undefined){
            navigate('/Login')
        } else{
            if(userDetails == '"admin"'){
                // navigate('/')
            }
            else{
                // navigate('/Saculietstudents')
            }
        }
    }, [])
    const handleLogoutClick = () => {
        setShowAlert(true)
        setAlertType('func')
        setAlertMessage(['Do you want to logout?'])
    }


        return(
            <>
                {
                    userDetails == '"admin"'?
                    <div className={`flex justify-center items-center w-full py-2 fixed top-0 z-50 bg-white shadow-lg`} style={{
                        zIndex: 400
                    }}>
                        <div className="flex justify-between xl:w-9/12 w-11/12 items-center transition-all duration-500 z-50">

                        <Link to={'/Dashboard'} className="flex items-end bg-white logo text-2xl" onClick={()=> setDropDownPos(-100)}>
                                <>
                                    <img src={Logo} alt="Profile Img" className="rounded-full border w-2/12"/>
                                    <small className="small h-5">Admin</small>
                                    </>
                     
                        </Link>
                            <div className="center gap-4 lg:gap-8">
                                <button className="center flex-col" onClick={() => {  
                                    handleLogoutClick()
                                }}> <i className="text-xl bi bi-power"></i>
                                    <span className="small -mt-2">Logout</span>
                                </button>
                                <div className="" onClick={()=> setDropDownPos(dropdownPos == 0 ? -100 : 0)}>
                                    <i className={`bi bi-${dropdownPos == 0 ? 'x-lg' : 'list text-3xl'}  text-gray-900 text-2xl cursor-pointer`}></i>
                                </div>
                
                            </div>
                            <div className={`flex absolute w-full 
                            top-0 mt-8 top-5 transition-all duration-1000  ${dropdownPos == 0 ? 'left-0' : '-left-100'} `} style={{
                                // left: dropdownPos+'%',
                            }}>
                                <div className="flex flex-col gap-2 md:gap-4 lg:gap-6
                            text-gray-200 navigation bg-blue w-full h-screen md:w-5/12 pt-5">
 
                                        {
                                            Navinfo.map((nav, key) => (
                                                key < Navinfo.length -1 ?
                                                <Link key={key} to={`/${nav.title}`} className={`py-3 pl-6 pr-9 flex items-center gap-3 items-center ${currentNav == key ? 'bg-white text-gray-900  px-3' : ''} rounded-l-full`} onClick={()=> {
                                                    // setCurrentNav(key)
                                                    setDropDownPos(100)
                                                    }}>
                                                    <i className={`bi bi-${nav.icon} text-xl`}></i>
                                                    <div className='text-sm'>{nav.title}</div>
                                                </Link> : 
                                                <a key={key} href={`${nav.link}`} className={`py-3 pl-6 pr-9 flex items-center gap-3 items-center  ${currentNav == key ? 'bg-white text-gray-900 px-3' : ''} rounded-l-full`} onClick={()=> {
                                                    // setCurrentNav(key)
                                                    setDropDownPos(100)
                                                    }}>
                                                    <i className={`bi bi-${nav.icon} text-xl`}></i>
                                                    <div className='text-sm'>{nav.title}</div>
                                                </a>
                                                ))
                                            }
                                        
                                </div>
                                <div className="flex w-3/12 md:w-9/12 h-screen bg-transparent"  onClick={()=> setDropDownPos(-100)}>
    
                                </div>
                            </div>
                        </div>
                    </div> : ''
                }
            </>
        )
}