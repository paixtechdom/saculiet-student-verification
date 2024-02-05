import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { ClipLoader, SyncLoader } from "react-spinners"
import { AppContext } from "../../assets/Contexts/AppContext"
import { SearchResult } from "./SearchResult"
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import Cookie from "js-cookie"
import { useNavigate } from "react-router"
import { LogoText } from "../../assets/Constants"

export const StudentSearch = () => {
    const [ isSearching, setIsSearching ] = useState(false)
    const [ showResult, setShowResult ] = useState(false)
    const [ firstName, setFirstName ] = useState('')
    const [ lastName, setLastName ] = useState('')
    const [ regNo, setRegNo ] = useState('')
    const [ error, setError ] = useState('')
    const [ certificate, SetCertificate ] = useState('')
    const [ images, setImages ] = useState([])
    const [ student, setStudent ] = useState({})
    const navigate = useNavigate()
    const [ fetchingData, setFetchingData ]  = useState(false)
    const { organization, setOrganization, dbLocation, setIsLoggedIn, setShowAlert, setAlertType, setAlertMessage,setIsAdmin } = useContext(AppContext)

    const [ countDown, setCountDown ]  = useState(0)
    
    
    const id = organization.id
    
    useEffect(() => {
        document.documentElement.scrollTop = 0

        setFetchingData(true)
        count()
        const cookie = Cookie.get('userDetails')
        if(cookie == undefined){
            navigate('/Login')
        }
        setTimeout(() => {
            setFetchingData(false)
        }, 2000);
        const interval = setInterval(() => {
            setCountDown(prev => 
                Math.max(0, prev - 1))
            }, 1000)
            
            return () => clearInterval(interval)
        }, [])
        
        
        const count  = () => {
            const currentTime = new Date()
            const cookie = Cookie.get('userDetails')
            if(cookie !== undefined){
                const t = JSON.parse(Cookie.get('userDetails')).time
                
                const counter = (Math.floor((currentTime - new Date(t)))/1000
                )
                setCountDown(3600 - counter < 1 ? 1 : 3600 - counter)
            }
        }
        useEffect(() => {
            if(countDown == 1 && organization.status == 'active'){
                axios.post(`${dbLocation}/organizations.php/expired/${id}`).then(function(res) {
                    setShowAlert(true)
                    setAlertType('expired')
                    setAlertMessage(['Session has expired!','Request for another session to keep using this service'])
                    navigate('/Login') 
                    Cookie.remove('userDetails', {path:'/'})
                    setIsLoggedIn(false)                   
                })
                // console.log('is < 1')
            }
        }, [countDown])
        
        
        
        const formatCountdown = (time) =>{
            let hours = Math.floor(time/3600) % 24
            let minutes = (Math.floor(time/60) % 60)
            let seconds = Math.floor(time % 60)
            if(minutes < 10) minutes = '0' + minutes
            if(seconds < 10) seconds = '0' + seconds
            return hours + ' : ' + minutes + ' : ' + seconds
        }
        
        const formatTime = (time) => {
            return new
            Date(time).toLocaleString('en-US', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
            })
    }
    
    const HandleSearch = (e) => {
        e.preventDefault()
        setIsSearching(true)
        
        axios.get(`${dbLocation}/students.php/${firstName}/${regNo}/${lastName}`).then(function(res) {
            if(!res.data == false){
                setError('')
                setStudent(res.data)
                console.log(res.data)
                const no = res.data.registrationNumber
                axios.get(`${dbLocation}/certificates.php/${no}`).then(function(res){
                    axios.get(`${dbLocation}/images.php/${regNo}`).then(function(resp) {
                        setImages(resp.data)                        
                        setIsSearching(false)
                        setShowResult(true)
                        SetCertificate(res.data.fileName)
                        document.documentElement.scrollTop = 550
                    })

                })

            }
            else{
                setError('Incorrect Student Details')
                setIsSearching(false)
                setShowResult(false)
                setStudent({})
            }
        })

    }
    return(
        <>
            {
                fetchingData ? 
                <div className="center flex flex-col py-9 h-screen center">
                    <SyncLoader color={'rgb(3, 3, 78)'} size={15} loading={true} speedMultiplier={0.8}/>
                    <SyncLoader color={'rgb(219, 20, 20)'} size={15} loading={true} speedMultiplier={0.8}/>
                </div> 
                : 
                <div className="center mt-9 pt-9 full">
                    <a href="https://saculietdrivingschool.com">

                    <img src={LogoText} alt="logo" className="w-1/12 fixed top-0 left-0 m-3 "  onClick={() => {
                        Cookie.remove('userDetails', {path:'/'})
                        navigate('/Login')
                        setIsAdmin(false)
                        
                    }}/>
                </a>
                    <div className="w-11/12 flex-col md:mt-9">
                        <h3 className="text-center text-2xl">Verify Our Students' Certificate</h3>
                        <div className="text-sm flex flex-col gap-3 mt-4">

                        <p className=""> <span className="text-gray-700">Name of Organization:
                            </span> {organization.name}
                            </p>
                        <p className=""> 
                        <span className="text-gray-800">
                        Time of Request Approval: 
                        </span> {formatTime(organization.time)}
                        </p>

                        <p className="">
                        <span className="text-gray-800">
                            Time Left: 
                        </span> {formatCountdown(countDown)}
                        </p>
                        </div>


                        <form action="" className="center flex-col my-9 gap-6 border border-gray-50 shadow-xl p-5 rounded-xl" onSubmit={HandleSearch}>
                            <label htmlFor="" className="">Enter Student's Details</label>
                            {
                                error.length > 1 ?
                                <p className="text-sm text-red-700">{error}</p> : ''
                            }
                            <div className="flex w-full rounded-xl overflow-hidden border border-gray-50 shadow-lg">
                                <i className="bi bi-person-fill bg-blue text-gray-200 p-2"></i>
                                <input type="text" placeholder="Student's First Name" className="p-2 text-sm outline-none w-full"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required/>
                            </div>
                            <div className="flex w-full rounded-xl overflow-hidden border border-gray-50 shadow-lg">
                                <i className="bi bi-hash bg-blue text-gray-200 p-2"></i>
                                <input type="text" placeholder="Student's Last Name" className="p-2 text-sm outline-none w-full"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required/>
                            </div>
                            <div className="flex w-full rounded-xl overflow-hidden border border-gray-50 shadow-lg">
                                <i className="bi bi-pen-fill bg-sec text-gray-200 p-2"></i>
                                <input type="text" placeholder="Enter Registration Number" className="p-2 text-sm outline-none w-full"  
                                value={regNo}
                                onChange={(e) => setRegNo(e.target.value)}
                                required/>
                            </div>
                            <button className="bg-blue w-full p-3 text-gray-100 rounded-full flex justify-center items-center gap-3 text-sm">
                                {
                                    isSearching ?
                                    <ClipLoader color={'rgb(225, 225, 225)'} size={15} loading={true} speedMultiplier={0.5}/> :
                                    <i className="bi bi-search"></i>
                                }
                                {
                                    isSearching ? 'SEARCHING...' : 'SEARCH'
                                }
                            </button>
                        </form>
                        {
                            showResult ?
                            <SearchResult student={student} certificate={certificate} images={images}/> : ''
                        }
                    </div>
                </div>
            }
        
        </>
    )
}