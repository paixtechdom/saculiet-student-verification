import axios from "axios"
import React, { useContext, useState } from "react"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { SyncLoader } from "react-spinners"
import { AppContext } from "../../../assets/Contexts/AppContext"
import Cookie from "js-cookie"


export const AStudent = () => {
    const userDetails = Cookie.get('userDetails')
    const nav = useNavigate()
    const id = useParams()
    const [ student, setStudent ] = useState({})
    const [ certificate, setCertificate ] = useState("")
    const [ images, setImages ] = useState([])
    const [ fetchingData, setFetchingData ] = useState(true)
    const { setCurrentNav, dbLocation, loggedIn } = useContext(AppContext)
    useEffect(() => {
        if(userDetails == undefined){
            nav('/Login')
        }   
        document.documentElement.scrollTop = 0

        setCurrentNav(3)
        FetchStudent(id.id)
    }, [])

    const FetchStudent = (nId) => {
        setFetchingData(true)
        axios.get(`${dbLocation}/students.php/${nId}`).then(function(res) {
            const regNo = res.data.registrationNumber
            axios.get(`${dbLocation}/certificates.php/${regNo}`).then(function(response) {

                setCertificate(`${dbLocation}/certificates/${response.data.fileName}`)

                    axios.get(`${dbLocation}/images.php/${regNo}`).then(function(resp) {
                        setImages(resp.data)
                        setStudent(res.data)
                        
                        setTimeout(() => {
                            setFetchingData(false)
                        }, 2000);
                        // })
                    })
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
            <div className="center mt-[10vh] lg:mt-[15vh] pt-9">
                <div className="flex justify- flex-col w-11/12 lg:w-10/12 xl:w-9/12 gap-8">
                    <h1 className="text-2xl font-bold text-blue">Student Details</h1>

                    <div className="flex flex-col gap-8 lg:flex-row w-full">
                        <div className="flex flex-col w-full">
                            <h3 className="text-sm bg-gray-50 flex rounded overflow-hidden">
                                <i className="bi bi-person-fill mr-3 bg-gray-900 text-gray-200 p-3 px-3"></i>
                                <p className="p-3 text-gray-700">
                                    Full Name
                                </p>
                            </h3>
                            <h1 className="text-sm border rounded p-3 mt-3 uppercase">{student?.firstName}  {student?.middleName?.toUpperCase()} {student?.lastName} </h1>
                        </div>
                        <div className="flex flex-col w-full">
                            <h3 className="text-sm bg-gray-50 flex rounded overflow-hidden">
                                <i className="bi bi-pen-fill mr-3 bg-gray-900 text-gray-200 p-3 px-3"></i>
                                <p className="p-3 text-gray-700">
                                    Registration Number
                                </p>
                            </h3>
                            <h1 className="text-sm border rounded p-3 mt-3">{student.registrationNumber?.replaceAll('-','/')}</h1>
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-8 lg:flex-row w-full">
                        <div className="flex flex-col w-full">
                            <h3 className="text-sm bg-gray-50 flex rounded overflow-hidden">
                                <i className="bi bi-award mr-3 bg-gray-900 text-gray-200 p-3 px-3"></i>
                                <p className="p-3 text-gray-700">
                                    Certificate Awarded
                                </p>
                            </h3>
                            <h1 className="text-sm border rounded p-3 mt-3">{student?.training}</h1>
                        </div>
                        <div className="flex flex-col w-full">
                            <h3 className="text-sm bg-gray-50 flex rounded overflow-hidden">
                                <i className="bi bi-envelope-fill mr-3 bg-gray-900 text-gray-200 p-3 px-3"></i>
                                <p className="p-3 text-gray-700">
                                    Email
                                </p>
                            </h3>
                            <h1 className="text-sm border rounded p-4 mt-3">{student?.email}</h1>
                        </div>
                    </div>

                    <div className="flex flex-col gap-8 lg:flex-row w-full">
                        <div className="flex flex-col w-full">
                            <h3 className="text-sm bg-gray-50 flex rounded overflow-hidden">
                                <i className="bi bi-percent mr-3 bg-gray-900 text-gray-200 p-3 px-3"></i>
                                <p className="p-3 text-gray-700">
                                    Test Score (%)
                                </p>
                            </h3>
                            <h1 className="text-sm border rounded p-3 mt-3">{student?.testScore}</h1>
                        </div>
                        <div className="flex flex-col w-full">
                            <h3 className="text-sm bg-gray-50 flex rounded overflow-hidden">
                                <i className="bi bi-percent mr-3 bg-gray-900 text-gray-200 p-3 px-3"></i>
                                <p className="p-3 text-gray-700">
                                    Exam Score
                                </p>
                            </h3>
                            <h1 className="text-sm border rounded p-3 mt-3">{student?.examScore}</h1>
                        </div>
                    </div>

                    <div className="center w-full flex flex-col gap-5">
                        <h3 className="text-sm bg-gray-50 flex rounded overflow-hidden w-full my-5">
                                <i className="bi bi-image-fill mr-3 bg-gray-900 text-gray-200 p-3 px-3"></i>
                                <p className="p-3 text-gray-700">
                                    Training Images
                                </p>
                            </h3>
                            <div className="flex flex-col gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 w-full">
                                {
                                    React.Children.toArray(
                                        images.map((image, i) => 
                                            <div key={i} className="h-[50vh] flex items-center justify-center w-full">
                                                <img src={`${dbLocation}/images/${image.fileName}`} 
                                                className="object-cover h-full w-full" 
                                                alt={`${student.firstName+"'s Training Picture" }`} />
                                            </div>
                                        ))
                                }
                            </div>
                       
                    </div>


                    <div className="center w-full flex flex-col gap-5">
                        <h3 className="text-sm bg-gray-50 flex rounded overflow-hidden w-full my-5">
                            <i className="bi bi-award-fill mr-3 bg-gray-900 text-gray-200 p-3 px-3"></i>
                            <p className="p-3 text-gray-700">
                                Certificate
                            </p>
                        </h3>

                        <iframe src={`${certificate}#toolbar=0`}
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