import axios from "axios"
import { useContext, useState } from "react"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { AppContext } from "../../../assets/Contexts/AppContext"
import { ClipLoader, SyncLoader } from 'react-spinners'
import Cookie from "js-cookie"
import { Removespaces } from "../../../assets/Functions/Func"
import { requestTime } from "../../../assets/Constants"
import { Link } from "react-router-dom"


export const ARequest = () => {
    const username = useParams()
    const userDetails = Cookie.get('userDetails')
    const [ request, setRequest ] = useState({})
    const [ fetchingData, setFetchingData ]  = useState(false)
    const [ searching, setSearching ]  = useState(false)
    const [ student, setStudent ]  = useState({})
    const [ selectedStudent, setSelectedStudent ]  = useState({})
    const [ countDown, setCountDown ]  = useState(0)
    const [ searchInput, setSearchInput ]  = useState('')
    const [ matchingRecords, setMatchingRecords ]  = useState([])

    const nav = useNavigate()
    const { setCurrentNav, dbLocation, setShowAlert, setAlertMessage, setAlertType, loggedIn } = useContext(AppContext)
    const userName = username.userName
    useEffect(() => {
        if(userDetails == undefined){
            nav('/Login')
        }   
        document.documentElement.scrollTop = 0

        setCurrentNav(1)
        setFetchingData(true)
        Fetchrequest(userName)
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
                // console.log('is = 1')
            }
        }, [countDown])

        const count  = (t) => {
            const currentTime = new Date()
            const counter = (Math.floor((currentTime - new Date(t)))/1000
            )
            setCountDown(requestTime - counter < 1 ? 1 : requestTime - counter)
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
    
    const Fetchrequest = (userName) => {
        setFetchingData(true)
        axios.get(`${dbLocation}/requests.php/${userName}`).then(function(res) {
            setRequest(res.data)
            count(res.data.time)
            axios.get(`${dbLocation}/students.php/${res.data.firstName}/${res.data.lastName}`).then((res) => {
                setFetchingData(false)
                if(res.data == false){
                    setStudent('')
                    setSelectedStudent('')
                }else{
                    setStudent(res.data)
                    setSelectedStudent(res.data)

                }
            })
            // setTimeout(() => {
            // }, 2000);
        })
            
    }
    
    useEffect(() => {
        const delay = setTimeout(() => {
            HandleSearch(searchInput)
        }, 1000);

        return () => clearTimeout(delay)
    }, [searchInput])


    
    const HandleSearch = (e) => {
        setSearching(true)
        if(e == ''){
            setMatchingRecords([])
            setSearching(false)
        }else{

            axios.get(`${dbLocation}/students.php/${e?.toUpperCase()}/search`).then((res) => {
                setSearching(false)
            // console.log(res.data)
            setMatchingRecords(res.data)
        })
    }

    }

    const informOrganization = (email, userName, pass, subject, organization, time, registrationNumber, firstName, lastName) => {
        axios.post(`${dbLocation}/informOrganization.php/` ,{
            email: email,
            userName: userName,
            password: pass,
            subject: subject,
            organization: organization,
            firstName: firstName,
            registrationNumber: registrationNumber,
            lastName: lastName,
            time: time,
          }, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then(response => console.log(response.data))
            .catch(error => console.error('Error:', error));
    
          
      }


    const GrantRequest = (id) => {
        if(selectedStudent == ''){
            setAlertType('Failed')
            setAlertMessage(['No student was selected'])
            setShowAlert(true)
        }
        else{
            const characters = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuioplkjhgfdsazxcvbnmQWERTYUIOPASDFGHJKLZXCVBNMqwertyuioplkjhgfdsazxcvbnm1234567890_{}[]/?:;!@#$%&()'
                const randomCharacters = Array.from({ length : 12}, () => characters.charAt( Math.floor(Math.random() * characters.length)));
                const pas = (request.name[0]+request.name[1]+randomCharacters)
                const password = pas.replaceAll(',', '')
                setFetchingData(true)
                let selectedStud = `${selectedStudent.firstName}_${selectedStudent.middleName}_${selectedStudent.lastName}`
                axios.post(`${dbLocation}/requests.php/active/${id}/${password}/${selectedStud}`).then(function(res) {
                    axios.get(`${dbLocation}/requests.php/${userName}`).then((resp) => {
                        setRequest(resp.data)
                        count(resp.data.time)

                        // console.log(resp.data.time)


                        let email = request.email
                        let pass = password
                        let organization = request.name?.replaceAll('_', ' ')
                        let uname = request.userName
                        let time = request.time
                        let subject = 'Saculiet Student Verification Request Granted'
                        let registrationNumber = selectedStudent.registrationNumber?.replaceAll('-','/')
                        let firstName = selectedStudent.firstName
                        let lastName = selectedStudent.lastName
                        
                        informOrganization(email, uname, pass, subject, organization, time, registrationNumber, firstName, lastName)
                        setShowAlert(true)
                        setAlertType('success')
                        setAlertMessage(['Request granted!',
                        `An email containing the organization's login credentials, the name and registration number of the student will be sent to ${organization}`])

                    })
    
                setFetchingData(false)

            })
        }
    }
    

    return(
        <>
        {
            fetchingData ?
            <div className="center flex flex-col py-9 h-screen">
            <SyncLoader color={'rgb(3, 3, 78)'} size={15} loading={true} speedMultiplier={0.8}/>
            <SyncLoader color={'rgb(219, 20, 20)'} size={15} loading={true} speedMultiplier={0.8}/>
            </div> 
            :
            <div className="center my-9 py-9">
                <div className="flex justify- flex-col w-11/12 gap-8 min-h-screen md:w-9/12">

                    <div className="flex flex-col justify-between">
                        <div className={`text-sm bg-gray-50 flex justify-between items-center ${request.status == 'pending' ? 'p-2' : 'p-4'} rounded-lg  md:p-3 ${request.status}`}>
                            <p className="px-2">Status: {request.status?.toUpperCase()}</p>
                            {
                                request.status == 'pending' ?
                                <button className="flex border border-gray-100 text-gray-100 gap-3 p-1 m-1 rounded-sm">
                                    <p onClick={() => GrantRequest(request.id)}> Grant Request </p>
                                </button> 
                                : ''
                            }
                        </div>
                        <h1 className={`text-sm text-gray-700 p-1`}>
                            {
                                request.status == 'pending' ? 'Time of Request' : 
                                request.status == 'active' ? 'Time of Request' : 
                                request.status == 'expired' ?  'Date Expired' :
                                request.status == 'cancelled' ? 'Date of Request' : '' 
                            }: 
                            <span className="text-gray-700 mx-3">
                                {formatTime(request.time)}
                                </span>
                            
                        </h1>
                        {
                            request.status == 'active' ? 
                            <>
                            <h1 className="text-sm text-gray-700 p-1">
                                Time Left: 
                                <span className="mx-3">
                                    {formatCountdown(countDown)}
                                </span>
                                
                            </h1>
                            </>
                             : ''

                        }
                    </div>

                    <div className="flex flex-col">
                        <h3 className="text-sm bg-gray-50 flex rounded overflow-hidden w-full">
                            <i className="bi bi-people-fill mr-3 bg-gray-900 text-gray-200 p-1 px-2"></i>
                            <p className="p-1 text-gray-700">
                                Name Of Organization
                            </p>
                        </h3>
                        <Link to={`/AOrganization/${request.organizationId}`} className="text-sm  border rounded mt-2 flex justify-between w -full tableRow transition-all duration-500">
                            <p className="truncate p-2">    {request?.name?.replaceAll('_', ' ')}</p>
                            <i className="bi bi-eye-fill rounded-r text-gray-200 p-2 bg-gray-900"></i>
                        </Link>
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
                        }}> {request?.firstName} {request?.lastName} <span>{student?.registrationNumber?.replaceAll('-','/')}</span></p>
  
                            <p className={`${student.length == '' ?  'text-red-800' : 'text-green-700' }  text-small`}>{
                                student.length == '' ? "Student's record not found in the database " : "Student's record found in the database" 
                            }</p> 
    
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
                        <p className="border rounded p-2 flex justify-between cursor-pointer">
                            {selectedStudent == '' ? 
                                <p className="text-red-700 font-bold">
                                    No Sudent Selected                                      
                                </p> 
                                : 
                                <>
                                    {
                                        request.status == 'pending' ?
                                        <>
                                        <span className="">
                                            {selectedStudent?.firstName?.toUpperCase()} {selectedStudent?.middleName?.toUpperCase()} {selectedStudent?.lastName?.toUpperCase()}
                                        </span> 
                                        <span>
                                            {selectedStudent?.registrationNumber?.replaceAll('-','/')}
                                        </span>
                                        </>
                                          : 
                                        <span>{request?.selectedStudent?.replaceAll('_',' ')}</span>
                                    }
                                </>
                            }
                            
                            </p>
                        </h1>
                    </div>
                    {
                        request.status == 'pending' ?
                        <>


                        <p className="text-sm " style={{
                            lineHeight: 1.5
                        }}>Search to select a matching student if the student on request isn't on the database</p>
                        <div className="flex justify-between relative border p-3 border-gray-400 rounded-lg px-2 bg-transparenttext-small">
                            <input type="text" placeholder={`Search student's name`} className="w-full  outline-none " value={searchInput} onChange={(e) =>setSearchInput(e.target.value)}/>
                            <i className="bi bi-x-lg bg-gray-100 rounded-full right-0 p-1 px-2 cursor-pointer" onClick={() => setSearchInput('')}></i>
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
                                    <p key={key} className="bg-gray-100 p-2 px-3 flex justify-between cursor-pointer text-sm rounded-sm" onClick={() => {
                                        setSelectedStudent(s)
                                    }}> <span className="">{s?.firstName.toUpperCase()} {s?.middleName?.toUpperCase()} {s?.lastName.toUpperCase()}</span> <span>{s?.registrationNumber?.replaceAll('-','/')}</span></p>
                                ))
                            }
                            {
                                matchingRecords.length == 0 && searching == false ? 
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