import axios from "axios"
import { useContext, useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router"
import { OrganizationsInfo } from "../../../assets/Constants"
import { AppContext } from "../../../assets/Contexts/AppContext"
import { SyncLoader } from 'react-spinners'
import Cookie from "js-cookie"


export const AOrganization = () => {
    const id = useParams()
    const userDetails = Cookie.get('userDetails')
    const [ organization, setOrganization ] = useState({})
    const [ fetchingData, setFetchingData ]  = useState(false)
    const [ countDown, setCountDown ]  = useState(0)
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
        FetchOrganization(nId)
        const interval = setInterval(() => {
            setCountDown(prev => 
                Math.max(0, prev - 1))
            }, 1000)
            
            return () => clearInterval(interval)
        }, [])
        
        useEffect(() => {
            if(countDown == 1 && organization.status == 'active'){
                axios.post(`${dbLocation}/organizations.php/expired/${id.id}`).then(function(res) {
                    FetchOrganization(id.id)
                })
                console.log('is = 1')
            }
        }, [countDown])

        const count  = (t) => {
            const currentTime = new Date()
            const counter = Math.floor((currentTime - new Date(t))/1000
            )
            setCountDown(3600 - counter < 1 ? 1 : 3600 - counter)
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
    
    const FetchOrganization = (nId) => {
        setFetchingData(true)
        axios.get(`${dbLocation}/organizations.php/${nId}`).then(function(res) {
            setOrganization(res.data)
            count(res.data.time)
                
            setTimeout(() => {
                setFetchingData(false)
            }, 2000);
            })
            
        }
        
        const GrantRequest = (id) => {
            const characters = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuioplkjhgfdsazxcvbnm1234567890-_={}[]\/?><.,:;!@#$%&*()'
            const randomCharacters = Array.from({ length : 12}, () => characters.charAt( Math.floor(Math.random() * characters.length)));
            const pass = (organization.name[0]+organization.name[1]+randomCharacters)
            const password = pass.replaceAll(',', '')
            setFetchingData(true)
            axios.post(`${dbLocation}/organizations.php/active/${id}/${password}`).then(function(res) {
                setShowAlert(true)
                setAlertType('success')
                setAlertMessage(['Request granted!', 'An email will be sent to the organization'])

            FetchOrganization(id)
        })
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
                <div className="flex justify- flex-col w-11/12 gap-5 min-h-screen">

                    <div className="flex flex-col justify-between">
                        <div className={`text-sm bg-gray-100 flex justify-between items-center p-2 rounded-lg  md:p-3 ${organization.status}`}>
                            <p className="px-2">Status: {organization.status?.toUpperCase()}</p>
                            {
                                organization.status == 'pending' ?
                                <button className="flex border border-green-400 text-green-400 gap-3 p-1 m-1">
                                    {/* <i className="bi bi-check"></i> */}
                                    <p onClick={() => GrantRequest(organization.id)}>Grant request</p>
                                </button> 
                                : ''
                            }
                        </div>
                        <h1 className="text-sm text-gray-700 p-1">
                            {
                                organization.status == 'pending' ? 'Time of Request' : 
                                organization.status == 'active' ? 'Time of Request' : 
                                organization.status == 'expired' ?  'Date Expired' :
                                organization.status == 'cancelled' ? 'Date of Request' : '' 
                            }: 
                            <span className="text-gray-900 mx-3">
                                {formatTime(organization.time)}
                                </span>
                            
                        </h1>
                        {
                            organization.status == 'active' ? 
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
                        <h3 className="text-sm bg-gray-100 flex rounded overflow-hidden">
                            <i className="bi bi-people-fill mr-3 bg-gray-900 text-gray-200 p-1 px-2"></i>
                            <p className="p-1 text-gray-700">
                                Name Of Organization
                            </p>
                        </h3>
                        <h1 className="text-sm p-1">{organization.name}</h1>
                    </div>

                    <div className="flex flex-col">
                    <h3 className="text-sm bg-gray-100 flex rounded overflow-hidden">
                            <i className="bi bi-envelope-fill mr-3 bg-gray-900 text-gray-200 p-1 px-2"></i>
                            <p className="p-1 text-gray-700">
                                Email
                            </p>
                        </h3>
                        <h1 className="text-sm p-1">{organization.email}</h1>
                    </div>

                    <div className="flex flex-col">
                    <h3 className="text-sm bg-gray-100 flex rounded overflow-hidden">
                            <i className="bi bi-geo-fill mr-3 bg-gray-900 text-gray-200 p-1 px-2"></i>
                            <p className="p-1 text-gray-700">
                                Location
                            </p>
                        </h3>
                        <h1 className="text-sm p-1">{organization.location}</h1>
                    </div>

                    <div className="flex flex-col">
                    <h3 className="text-sm bg-gray-100 flex rounded overflow-hidden">
                            <i className="bi bi-chat-dots-fill mr-3 bg-gray-900 text-gray-200 p-1 px-2"></i>
                            <p className="p-1 text-gray-700">
                                Reason for request
                            </p>
                        </h3>                    <h1 className="text-sm p-1 line-25">{organization.reason}</h1>
                    </div>

                </div>
            </div>
        }
        </>
    )
}