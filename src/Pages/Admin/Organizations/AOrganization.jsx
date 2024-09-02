import axios from "axios"
import React, { useContext, useState } from "react"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { SyncLoader } from "react-spinners"
import { AppContext } from "../../../assets/Contexts/AppContext"
import Cookie from "js-cookie"




export const AOrganization = () => {
    const userDetails = Cookie.get('userDetails')
    const nav = useNavigate()
    const org = useParams()
    const [ organization, setOrganization ] = useState({})
    const [ noRequests, setNoRequests ] = useState(0)
    const [ fetchingData, setFetchingData ] = useState(true)
    const { setCurrentNav, dbLocation, loggedIn } = useContext(AppContext)
    useEffect(() => {
        if(userDetails == undefined){
            nav('/Login')
        }   
        document.documentElement.scrollTop = 0

        setCurrentNav(2)
        FetchOrganization(org.id)
    }, [])

    const FetchOrganization = (id) => {
        setFetchingData(true)
        axios.get(`${dbLocation}/organizations.php/${id}`).then((res) => {
            axios.get(`${dbLocation}/requests.php/${res.data.name}/${res.data.email}/organization`).then(function(response) {

                setOrganization(res.data)
                setNoRequests(response.data.length)
                setTimeout(() => {
                    setFetchingData(false)
                }, 500);

                })
            })
            
        }


    return(
        <>
            {
                fetchingData ? 
                <div className="center flex flex-col py-9 h-screen">
                <SyncLoader color={'rgb(3, 3, 78)'} size={15} loading={true} speedMultiplier={0.8}/>
                <SyncLoader color={'rgb(219, 20, 20)'} size={15} loading={true} speedMultiplier={0.8}/>
            </div> :
            <div className="center mt-9 pt-9">
                <div className="flex justify- flex-col w-11/12 gap-8 md:w-9/12 mt-4">

                    <div className="flex flex-col">
                    <h3 className="text-sm bg-gray-50 flex rounded overflow-hidden">
                            <i className="bi bi-person-fill mr-3 bg-gray-900 text-gray-200 p-3 px-2"></i>
                            <p className="p-3 text-gray-700">
                                Name of Organization
                            </p>
                        </h3>
                        <h1 className="text-sm p-3 border rounded  mt-2">{organization?.name?.replaceAll('_', ' ')}  </h1>
                    </div>

                    <div className="flex flex-col">
                    <h3 className="text-sm bg-gray-50 flex rounded overflow-hidden">
                            <i className="bi bi-envelope-fill mr-3 bg-gray-900 text-gray-200 p-3 px-2"></i>
                            <p className="p-3 text-gray-700">
                                Email
                            </p>
                        </h3>
                        <h1 className="text-sm p-3 border rounded  mt-2">{organization?.email}</h1>
                    </div>
                    <div className="flex flex-col">
                    <h3 className="text-sm bg-gray-50 flex rounded overflow-hidden">
                            <i className="bi bi-geo-fill mr-3 bg-gray-900 text-gray-200 p-3 px-2"></i>
                            <p className="p-3 text-gray-700">
                                Location
                            </p>
                        </h3>
                        <h1 className="text-sm p-3 border rounded  mt-2">{organization?.location}</h1>
                    </div>

                    <div className="flex flex-col">
                    <h3 className="text-sm bg-gray-50 flex rounded overflow-hidden">
                            <i className="bi bi-inbox-fill mr-3 bg-gray-900 text-gray-200 p-3 px-2"></i>
                            <p className="p-3 text-gray-700">
                                Number of Requests
                            </p>
                        </h3>
                        <h1 className="text-sm p-3 border rounded  mt-2">{noRequests}</h1>
                    </div>


                    <div className="center w-full flex flex-col gap-5">
                        <h3 className="text-sm bg-gray-50 flex rounded overflow-hidden w-full my-5 ">
                                <i className="bi bi-award-fill mr-3 bg-gray-900 text-gray-200 p-3 px-2"></i>
                                <p className="p-3 text-gray-700">
                                    Certificate
                                </p>
                            </h3>

                            <iframe src={`${dbLocation}/certificates/${organization?.certificate}`} frameborder="2" alt="dkdk"></iframe>
                           
                       
                    </div>

                    <div className="flex items-start justify-center w-full px-5 bg-blue-40 h-90vh overflow-y-hidde mt-9 flex-col">
                        <iframe src={`${dbLocation}/certificates/${organization.certificate}#toolbar=0`}                    
                        style={{
                            width: '100%',
                            minHeight: '70vh',
                            border: 'none'
                        }}
                    ></iframe>  
            </div>
            

                </div>
            </div>
            }
        </>
    )
}