import axios from "axios"
import { useContext, useEffect, useRef, useState } from "react"
import { ClipLoader, SyncLoader } from "react-spinners"
import { AppContext } from "../../assets/Contexts/AppContext"
import { SearchResult } from "./SearchResult"
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import Cookie from "js-cookie"
import { useNavigate } from "react-router"
import { LogoText, requestTime } from "../../assets/Constants"
import { Removespaces } from "../../assets/Functions/Func"

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
    const [ fetchingData, setFetchingData ]  = useState(false)
    const navigate = useNavigate()
    const { request, setRequest, dbLocation, setIsLoggedIn, setShowAlert, setAlertType, setAlertMessage,setIsAdmin } = useContext(AppContext)
    
    const [ countDown, setCountDown ]  = useState(0)
    const searchResult = useRef()
    
    const id = request.id
    
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
                setCountDown(requestTime - counter < 1 ? 1 : requestTime - counter)
            }
        }
        useEffect(() => {
            if(countDown == 1 && request.status == 'active'){
                axios.post(`${dbLocation}/requests.php/expired/${id}`).then(function(res) {
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
    const informStudent = (email, heading, organization, time) => {
        axios.post(`${dbLocation}/informStudent.php/` ,{
            email: email,
            heading: heading,
            organization: organization,
            time: time,
          }, {
            headers: {
                'Content-Type': 'application/json',
            },
          })
          .then(response => console.log(response.data))
          .catch(error => console.error('Error:', error));
          
          
        }

        const HandleSearch = (e) => {
            e.preventDefault()
            setIsSearching(true)
            let num = regNo.replaceAll('/', '-')
            axios.get(`${dbLocation}/students.php/${firstName}/${num}/${lastName}`).then(function(res) {
                if(!res.data == false){
                    setError('')
                    setStudent(res.data)
                    console.log(res.data)
                    let email = res.data.email
                    let organization = request.name.replaceAll('_', ' ')
                    let time = new Date()
                    let heading = `Hello ${firstName} ${lastName},`
                    informStudent(email, heading, organization, time)
                    const no = res.data.registrationNumber
                    axios.get(`${dbLocation}/certificates.php/${no}`).then(function(res){
                        axios.get(`${dbLocation}/images.php/${num}`).then(function(resp) {
                            setImages(resp.data)                        
                            setIsSearching(false)
                            setShowResult(true)
                            SetCertificate(res.data.fileName)
                            let e = searchResult.current
                            e.scrollIntoView({
                                block: 'start'
                            })
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
                <div className="center mt-9 pt-9 w-full">
                    <a href="https://saculietdrivingschool.com" className="md:w-1/12 fixed top-0 left-0 m-3">

                    <img src={LogoText} alt="logo" className="w-2/12 md:w-5/12 lg:w-7/12"  onClick={() => {
                        Cookie.remove('userDetails', {path:'/'})
                        navigate('/Login')
                        setIsAdmin(false)
                        
                    }}/>
                </a>
                    <div className="w-11/12 flex-col md:mt-9 center">
                        <h3 className="text-center text-2xl">Verify Our Students' Certificate</h3>
                        <div className="text-sm flex flex-col gap-3 mt-6 w-11/12 lg:w-9/12 xl:w-7/12">

                        <p className=""> <span className="text-gray-700">Name of Organization: </span> 
                             {request.name.replaceAll('_', ' ')}
                            </p>
                        <p className=""> 
                        <span className="text-gray-800">
                        Time of Request Approval: 
                        </span> {formatTime(request.time)}
                        </p>

                        <p className="">
                        <span className="text-gray-800">
                            Time Left: 
                        </span> {formatCountdown(countDown)}
                        </p>
                        </div>


                        <form action="" className="flex justify-between w-11/12 items-center transition-all duration-500 gap-6 flex-col bg-blue-30 lg:w-9/12 xl:w-7/12 p-4 py-8 rounded-xl shadow-lg my-9" onSubmit={HandleSearch}>
                            <label htmlFor="" className="">Enter Student's Details</label>
                            {
                                error.length > 1 ?
                                <p className="text-sm text-red-700">{error}</p> : ''
                            }
                            <div className="flex w-full  border-bottom-primary overflow-hidden bg-gray-50 shadow-lg">
                                <i className="bi bi-person-fill bg-sec text-gray-200 p-2"></i>
                                <input type="text" placeholder="Student's First Name" className="p-2 text-sm outline-none w-full"
                                value={firstName}
                                onChange={(e) => setFirstName(Removespaces(e.target.value))}
                                required/>
                            </div>
                            <div className="flex w-full border-bottom-primary overflow-hidden bg-gray-50 shadow-lg">
                                <i className="bi bi-person-fill bg-blue text-gray-200 p-2"></i>
                                <input type="text" placeholder="Student's Last Name" className="p-2 text-sm outline-none w-full"
                                value={lastName}
                                onChange={(e) => setLastName(Removespaces(e.target.value))}
                                required/>
                            </div>
                            <div className="flex w-full  border-bottom-primary overflow-hidden bg-gray-50 shadow-lg">
                                <i className="bi bi-hash bg-sec text-gray-200 p-2"></i>
                                <input type="text" placeholder="Enter Registration Number" className="p-2 text-sm outline-none w-full"  
                                value={regNo}
                                onChange={(e) => setRegNo(Removespaces(e.target.value))}
                                required/>
                            </div>
                            <button className="bg-blue w-full p-3 text-gray-100 rounded-lg flex justify-center items-center gap-3 text-sm">
                                {
                                    isSearching ?
                                    <ClipLoader color={'rgb(225, 225, 225)'} size={15} loading={true} speedMultiplier={0.5}/> :
                                    <i className="bi bi-cloud-download-fill"></i>
                                }
                                {
                                    isSearching ? 'FETCHING...' : 'FETCH STUDENT'
                                }
                            </button>
                        </form>
                        {
                            showResult ?
                            <a href="searchresult" ref={searchResult} className="w-11/12 lg:w-9/12 xl:w-7/12">
                                <SearchResult student={student} certificate={certificate} images={images}/> 

                            </a>
                            : ''
                        }
                    </div>
                </div>
            }
        
        </>
    )
}