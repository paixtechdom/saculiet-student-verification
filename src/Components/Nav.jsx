import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { Logo, LogoText, Navinfo } from "../assets/Constants"
import Cookie  from "js-cookie"
import { useContext } from "react"
import { AppContext } from "../assets/Contexts/AppContext"

export const Nav = () => {
    const navigate = useNavigate()
    const [dropdownPos, setDropDownPos ] = useState(-100)
    const { loggedIn, isAdmin, currentNav, setCurrentNav, setIsAdmin } = useContext(AppContext)

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
        if(!loggedIn){
            // navigate('/Login')
        } else{
            if(isAdmin){
                navigate('/Dashboard')
            }
            else{
                navigate('/Saculietstudents')
            }
        }
    }, [])

        return(
            <>
                {
                    isAdmin && loggedIn ?
                    <div className={`flex justify-center items-center w-full py-2 fixed top-0 z-50 bg-white shadow-lg`} style={{
                        zIndex: 400
                    }}>
                        <div className="flex justify-between xl:w-9/12 w-11/12 items-center transition-all duration-500 md:bg-none z-50">

                        <Link to={'/Dashboard'} className="flex items-end bg-white logo text-2xl" onClick={()=> setDropDownPos(-100)}>
                                <>
                                    <img src={Logo} alt="Profile Img" className="rounded-full border w-2/12"/>
                                    <small className="small h-5">Admin</small>
                                    </>
                     
                        </Link>
                            <div className="center gap-4">
                                <button className="center flex-col" onClick={() => {
                                Cookie.remove('userDetails', {path:'/'})
                                setIsAdmin(false)
                                navigate('/Login')

                                }}> <i className="text-xl bi bi-power"></i>
                                    <span className="small -mt-2">Logout</span>
                                </button>
                                <div className="md:hidden" onClick={()=> setDropDownPos(dropdownPos == 0 ? -100 : 0)}>
                                    <i className={`bi bi-${dropdownPos == 0 ? 'x-lg' : 'justify'} text-gray-900 text-2xl cursor-pointer`}></i>
                                </div>
                
                            </div>
                            <div className={`flex gap-2 absolute 
                            top-0 mt-8 top-5 pt-6 transition-all duration-1000 flex-col bg-blue w-8/12 h-screen md:h-fit md:w-full ${dropdownPos == 0 ? 'left-0' : '-left-100'}
                            md:flex-row md:flex md:relative md:p-0 md:mt-0 md:top-0 md:bg-transparent md:left-0 md:items-center text-gray-200`} style={{
                                // left: dropdownPos+'%',
                            }}>
                
                                {
                                    Navinfo.map((nav, key) => (
                                        key < Navinfo.length -1 ?
                                        <Link key={key} to={`/${nav.title}`} className={`py-3 pl-6 pr-9 flex items-center gap-3 items-center md:gap-0 md:flex-col ${currentNav == key ? 'bg-white text-gray-900 rounded-l-full px-3' : ''}`} onClick={()=> {
                                            // setCurrentNav(key)
                                            setDropDownPos(100)
                                            }}>
                                            <i className={`bi bi-${nav.icon} text-xl md:hidden`}></i>
                                            <div className='text-sm'>{nav.title}</div>
                                        </Link> : 
                                         <a key={key} href={`${nav.link}`} className={`py-3 pl-6 pr-9 flex items-center gap-3 items-center md:gap-0 md:flex-col ${currentNav == key ? 'bg-white text-gray-900 rounded-l-full px-3' : ''}`} onClick={()=> {
                                            // setCurrentNav(key)
                                            setDropDownPos(100)
                                            }}>
                                            <i className={`bi bi-${nav.icon} text-xl md:hidden`}></i>
                                            <div className='text-sm'>{nav.title}</div>
                                        </a>
                                        ))
                                    }
                                
                            </div>
                        </div>
                    </div> : ''
                }
            </>
        )
}