import axios from "axios"
import { useContext, useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router"
import { AppContext } from "../../../assets/Contexts/AppContext"
import { ClipLoader, SyncLoader } from 'react-spinners'
import Cookie from "js-cookie"


export const ARequest = () => {
    const id = useParams()
    const userDetails = Cookie.get('userDetails')
    const [ request, setRequest ] = useState({})
    const [ fetchingData, setFetchingData ]  = useState(false)
    const [ searching, setSearching ]  = useState(false)
    const [ student, setStudent ]  = useState({})
    const [ selectedStudent, setSelectedStudent ]  = useState({})
    const [ countDown, setCountDown ]  = useState(0)
    const [ searchInput, setSearchInput ]  = useState('')
    const [ matchingRecords, setMatchingRecords ]  = useState([])
    const currentTime = new Date()
    
    const { setCurrentNav, dbLocation, setShowAlert, setAlertMessage, setAlertType, loggedIn } = useContext(AppContext)
    useEffect(() => {
        if(userDetails == undefined){
            nav('/Login')
        }   
        document.documentElement.scrollTop = 0

        setCurrentNav(1)
        setFetchingData(true)
        const nId = id.id
        Fetchrequest(nId)
        const interval = setInterval(() => {
            setCountDown(prev => 
                Math.max(0, prev - 1))
            }, 1000)
            
            return () => clearInterval(interval)
        }, [])
        
        useEffect(() => {
            if(countDown == 1 && request.status == 'active'){
                axios.post(`${dbLocation}/requests.php/expired/${id.id}`).then(function(res) {
                    Fetchrequest(id.id)
                })
                console.log('is = 1')
            }
        }, [countDown])

        const count  = (t) => {
            const currentTime = new Date()
            const counter = Math.floor((currentTime - new Date(t))/1000
            )
            setCountDown(7200 - counter < 1 ? 1 : 7200 - counter)
        }
        
        
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
    
    const Fetchrequest = (nId) => {
        setFetchingData(true)
        axios.get(`${dbLocation}/requests.php/${nId}`).then(function(res) {
            setRequest(res.data)
            count(res.data.time)
            axios.get(`${dbLocation}/students.php/${res.data.firstName}/${res.data.lastName}`).then((res) => {
                setFetchingData(false)
                if(res.data != false){
                    setStudent(res.data)
                    setSelectedStudent(res.data)
                }
            })
            // setTimeout(() => {
            // }, 2000);
        })
            
    }
    const HandleSearch = (e) => {
        setSearching(true)
        if(e == ''){
            setMatchingRecords([])
            setSearching(false)
        }else{

            axios.get(`${dbLocation}/students.php/${e.toUpperCase()}/search`).then((res) => {
            setSearching(false)
            if(res.data != false){
                setMatchingRecords(res.data)
                console.log(res.data)
            }
        })
    }

    }

    const GrantRequest = (id) => {
            const characters = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuioplkjhgfdsazxcvbnm1234567890-_={}[]\/?><.,:;!@#$%&*()'
            const randomCharacters = Array.from({ length : 12}, () => characters.charAt( Math.floor(Math.random() * characters.length)));
            const pass = (request.name[0]+request.name[1]+randomCharacters)
            const password = pass.replaceAll(',', '')
            setFetchingData(true)
            axios.post(`${dbLocation}/requests.php/active/${id}/${password}`).then(function(res) {

                let email = request.email
                let pass = password
                let organization = request.name
                let userName = request.userName
                let time = request.time
                let subject = 'Saculiet Student Verification Request Granted'
                let registrationNumber = student.registrationNumber


                informOrganization(email, userName, pass, subject, organization, time, registrationNumber)
                setShowAlert(true)
                setAlertType('success')
                setAlertMessage(['Request granted!', 'An email will be sent to the organization'])

            Fetchrequest(id)
        })
    }
    
    const informOrganization = (email, userName, pass, subject, organization, time, registrationNumber) => {
        axios.post(`${dbLocation}/informOrganization.php/` ,{
            email: email,
            userName: userName,
            password: pass,
            subject: subject,
            organization: organization,
            time: time,
            registrationNumber: registrationNumber
          }, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then(response => console.log(response.data))
            .catch(error => console.error('Error:', error));
    
          
      }

    return(
        <>
        {
            fetchingData ?
            <div className="center flex flex-col py-9 h-screen ">
            <SyncLoader color={'rgb(3, 3, 78)'} size={15} loading={true} speedMultiplier={0.8}/>
            <SyncLoader color={'rgb(219, 20, 20)'} size={15} loading={true} speedMultiplier={0.8}/>
            </div> 
            :
            <div className="center my-9 py-9">
                <div className="flex justify- flex-col w-11/12 gap-8 min-h-screen">

                    <div className="flex flex-col justify-between">
                        <div className={`text-sm bg-gray-50 flex justify-between items-center p-2 rounded-lg  md:p-3 ${request.status}`}>
                            <p className="px-2">Status: {request.status?.toUpperCase()}</p>
                            {
                                request.status == 'pending' ?
                                <button className="flex border border-green-400 text-green-400 gap-3 p-1 m-1">
                                    {/* <i className="bi bi-check"></i> */}
                                    <p onClick={() => GrantRequest(request.id)}>Grant request</p>
                                </button> 
                                : ''
                            }
                        </div>
                        <h1 className="text-sm text-gray-700 p-1">
                            {
                                request.status == 'pending' ? 'Time of Request' : 
                                request.status == 'active' ? 'Time of Request' : 
                                request.status == 'expired' ?  'Date Expired' :
                                request.status == 'cancelled' ? 'Date of Request' : '' 
                            }: 
                            <span className="text-gray-900 mx-3">
                                {formatTime(request.time)}
                                </span>
                            
                        </h1>
                        {
                            request.status == 'active' ? 
                            <>
                            <h1 className="text-sm text-gray-700 p-1">
                                Time Left: 
                                <span className="text-gray-900 mx-3">
                                    {formatCountdown(countDown)}
                                </span>
                                
                            </h1>
                            </>
                             : ''

                        }
                    </div>

                    <div className="flex flex-col">
                        <h3 className="text-sm bg-gray-50 flex rounded overflow-hidden">
                            <i className="bi bi-people-fill mr-3 bg-gray-900 text-gray-200 p-1 px-2"></i>
                            <p className="p-1 text-gray-700">
                                Name Of Organization
                            </p>
                        </h3>
                        <h1 className="text-sm p-1 border rounded p-2 mt-2">{request?.name?.replaceAll('_', ' ')}</h1>
                    </div>

                    <div className="flex flex-col">
                    <h3 className="text-sm bg-gray-50 flex rounded overflow-hidden">
                            <i className="bi bi-envelope-fill mr-3 bg-gray-900 text-gray-200 p-1 px-2"></i>
                            <p className="p-1 text-gray-700">
                                Email
                            </p>
                        </h3>
                        <h1 className="text-sm p-1 border rounded p-2 mt-2">{request.email}</h1>
                    </div>

                    <div className="flex flex-col">
                    <h3 className="text-sm bg-gray-50 flex rounded overflow-hidden">
                            <i className="bi bi-geo-fill mr-3 bg-gray-900 text-gray-200 p-1 px-2"></i>
                            <p className="p-1 text-gray-700">
                                Location
                            </p>
                        </h3>
                        <h1 className="text-sm p-1 border rounded p-2 mt-2 border rounded p-2 mt-2">{request.location}</h1>
                    </div>

                    <div className="flex flex-col">
                    <h3 className="text-sm bg-gray-50 flex rounded overflow-hidden">
                            <i className="bi bi-person-fill mr-3 bg-gray-900 text-gray-200 p-1 px-2"></i>
                            <p className="p-1 text-gray-700">
                                Student's Name (Request)
                            </p>
                        </h3>
                        <h1 className="text-sm p-1  flex flex-col gap-3 mt-2">
                        <p className="border rounded p-2 flex justify-between cursor-pointer" onClick={() => {
                            setSelectedStudent(student)
                        }}> {request?.firstName} {request?.lastName} <span>{student?.registrationNumber}</span></p>
                        {
                            request.status == 'pending' ?
                            <>
                                <p className={`${student.length !== '' ? 'text-green-700' : 'text-red-800'}  text-small`}>{
                                    student.length !== '' ? "Student's record found in the database" : "Student's record not found in the database "
                                }</p> 

                            </> : '' }
                        </h1>
                    </div>

                    <div className="flex flex-col">
                    <h3 className="text-sm bg-gray-50 flex rounded overflow-hidden">
                            <i className="bi bi-person-fill mr-3 bg-gray-900 text-gray-200 p-1 px-2"></i>
                            <p className="p-1 text-gray-700">
                                Student's Name (Selected)
                            </p>
                        </h3>
                        <h1 className="text-sm p-1 flex flex-col gap-3 mt-2">
                        <p className="border rounded p-2 flex justify-between cursor-pointer"> {selectedStudent?.firstName?.toUpperCase()} {selectedStudent?.lastName?.toUpperCase()} <span>{selectedStudent?.registrationNumber}</span></p>
                        </h1>
                    </div>

                    {
                        request.status == 'pending' ?
                        <>
                        <p className="text-sm " style={{
                            lineHeight: 1.5
                        }}>Search to select a matching student if the student on request isn't on the satabase</p>
                        <div className="flex justify-between relative border p-3 border-gray-400 rounded-lg px-2 bg-transparenttext-small">
                            <input type="text" placeholder={`Search student's name`} className="w-full  outline-none " value={searchInput} onChange={(e) => {
                                setSearchInput(e.target.value)
                                HandleSearch(e.target.value)
                            }}/>
                            <i className="bi bi-x bg-gray-100 rounded-full right-0 p-1 px-2" onClick={() => setSearchInput('')}></i>
                        </div>

                        <div className="flex flex-col gap-3">
                            {
                                searching ? 
                                <div className="center flex flex-col">
                                <SyncLoader color={'rgb(3, 3, 78)'} size={10} loading={true} speedMultiplier={0.8}/>
                                <SyncLoader color={'rgb(219, 20, 20)'} size={10} loading={true} speedMultiplier={0.8}/>
                                </div> 
                                :
                                matchingRecords?.map((s, key) => (
                                    <p key={key} className="bg-gray-200 p-2 flex justify-between cursor-pointer" onClick={() => {
                                        setSelectedStudent(s)
                                    }}> {s?.firstName.toUpperCase()} {s?.lastName.toUpperCase()} <span>{s?.registrationNumber}</span></p>
                                ))
                            }
                            {
                                matchingRecords.length == 0 ? 
                                <p className="text-sm">No student found</p> : ''
                            }
                        </div>
                        </>
                        : ''
                    }
                    {/* <div className="flex flex-col">
                    <h3 className="text-sm bg-gray-50 flex rounded overflow-hidden">
                            <i className="bi bi-chat-dots-fill mr-3 bg-gray-900 text-gray-200 p-1 px-2"></i>
                            <p className="p-1 text-gray-700">
                                Reason for request
                            </p>
                        </h3>                    <h1 className="text-sm p-1 border rounded p-2 mt-2 line-25" style={{
                            whiteSpace: 'pre-line'
                        }}>{request.reason}</h1>
                    </div> */}

                </div>
            </div>
        }
        </>
    )
}