import axios from "axios"
import React, { useContext, useState } from "react"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { SyncLoader } from "react-spinners"
import { StudentsInfo } from "../../../assets/Constants"
import { AppContext } from "../../../assets/Contexts/AppContext"
import { Document, Page, pdfjs  } from "react-pdf"
import Cookie from "js-cookie"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();


export const AStudent = () => {
    const userDetails = Cookie.get('userDetails')
    const nav = useNavigate()
    const id = useParams()
    const [ student, setStudent ] = useState({})
    const [ certificate, setCertificate ] = useState({})
    const [ images, setImages ] = useState([])
    const [ fetchingData, setFetchingData ] = useState(true)
    const { setCurrentNav, dbLocation, loggedIn } = useContext(AppContext)
    useEffect(() => {
        if(userDetails == undefined){
            nav('/Login')
        }   
        document.documentElement.scrollTop = 0

        setCurrentNav(2)
        FetchStudent(id.id)
    }, [])

    const FetchStudent = (nId) => {
        setFetchingData(true)
        axios.get(`${dbLocation}/students.php/${nId}`).then(function(res) {
            const regNo = res.data.registrationNumber
            axios.get(`${dbLocation}/certificates.php/${regNo}`).then(function(response) {
                setCertificate(response.data)
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
            <div className="center mt-9 pt-9">
                <div className="flex justify- flex-col w-11/12 gap-8">

                    <div className="flex flex-col">
                    <h3 className="text-sm bg-gray-50 flex rounded overflow-hidden">
                            <i className="bi bi-person-fill mr-3 bg-gray-900 text-gray-200 p-1 px-2"></i>
                            <p className="p-1 text-gray-700">
                                Full Name
                            </p>
                        </h3>
                        <h1 className="text-sm p-1 border rounded p-2 mt-2">{student.firstName}  {student?.middleName?.toUpperCase()} {student.lastName} </h1>
                    </div>
                    <div className="flex flex-col">
                    <h3 className="text-sm bg-gray-50 flex rounded overflow-hidden">
                            <i className="bi bi-pen-fill mr-3 bg-gray-900 text-gray-200 p-1 px-2"></i>
                            <p className="p-1 text-gray-700">
                                Registration Number
                            </p>
                        </h3>
                        <h1 className="text-sm p-1 border rounded p-2 mt-2">{student.registrationNumber}</h1>
                    </div>
                    <div className="flex flex-col">
                    <h3 className="text-sm bg-gray-50 flex rounded overflow-hidden">
                            <i className="bi bi-award mr-3 bg-gray-900 text-gray-200 p-1 px-2"></i>
                            <p className="p-1 text-gray-700">
                                Certificate Awarded
                            </p>
                        </h3>
                        <h1 className="text-sm p-1 border rounded p-2 mt-2">{student?.training}</h1>
                    </div>
                    <div className="flex flex-col">
                    <h3 className="text-sm bg-gray-50 flex rounded overflow-hidden">
                            <i className="bi bi-envelope-fill mr-3 bg-gray-900 text-gray-200 p-1 px-2"></i>
                            <p className="p-1 text-gray-700">
                                Email
                            </p>
                        </h3>
                        <h1 className="text-sm p-1 border rounded p-2 mt-2">{student?.email}</h1>
                    </div>
                    <div className="flex flex-col">
                    <h3 className="text-sm bg-gray-50 flex rounded overflow-hidden">
                            <i className="bi bi-percent mr-3 bg-gray-900 text-gray-200 p-1 px-2"></i>
                            <p className="p-1 text-gray-700">
                                Test Score (%)
                            </p>
                        </h3>
                        <h1 className="text-sm p-1 border rounded p-2 mt-2">{student?.testScore}</h1>
                    </div>
                    <div className="flex flex-col">
                    <h3 className="text-sm bg-gray-50 flex rounded overflow-hidden">
                            <i className="bi bi-percent mr-3 bg-gray-900 text-gray-200 p-1 px-2"></i>
                            <p className="p-1 text-gray-700">
                                Exam Score
                            </p>
                        </h3>
                        <h1 className="text-sm p-1 border rounded p-2 mt-2">{student?.examScore}</h1>
                    </div>
                    <div className="center w-full flex flex-col gap-5">
                        <h3 className="text-sm bg-gray-50 flex rounded overflow-hidden w-full my-5">
                                <i className="bi bi-image-fill mr-3 bg-gray-900 text-gray-200 p-1 px-2"></i>
                                <p className="p-1 text-gray-700">
                                    Training Images
                                </p>
                            </h3>

                        {
                              React.Children.toArray(
                                images.map((image, i) => 
                                    <img src={`${dbLocation}/images/${image.fileName}`} alt={`${student.firstName+"'s Training Picture" }`} />
                                ))
                        }
                       
                    </div>


                    <div className="center w-full flex flex-col gap-5">
                        <h3 className="text-sm bg-gray-50 flex rounded overflow-hidden w-full my-5">
                                <i className="bi bi-award-fill mr-3 bg-gray-900 text-gray-200 p-1 px-2"></i>
                                <p className="p-1 text-gray-700">
                                    Certificate
                                </p>
                            </h3>

                            <img src={`${dbLocation}/certificates/${student.certificate}`} alt={`${student.firstName+"'s Certificate" }`} />
                           
                       
                    </div>

                    {/* <div className="flex items-start justify-center w-full px-5 bg-blue-40 h-90vh overflow-y-hidde mt-9 flex-col">
                <div className="center -mt-48 - mx-6" style={{
                    transform: 'scale(0.4)'
                }}>
                    <Document file={`${dbLocation}/certificates/${certificate.fileName}`} 
                    // loading={()=> console.log('loading') } 
                    error={
                    <p className="scale-110 text-2xl text-red-700">Error Loading Certificate</p>
                    }
                    className='-mt-9 h-90vh'
                    >
                        <Page pageNumber={1} />
                    </Document>

                </div>
            </div> */}
            

                </div>
            </div>
            }
        </>
    )
}