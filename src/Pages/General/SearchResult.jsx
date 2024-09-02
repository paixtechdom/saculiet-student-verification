import React, { useState } from "react"
import { ClipLoader } from "react-spinners";
import { useContext } from "react";
import { AppContext } from "../../assets/Contexts/AppContext";
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { useEffect } from "react";
import axios from "axios";



export const SearchResult = ({student, certificate, images}) => {
    const [ loadingCertificate, setLoadingCertificate ] = useState(true)
    const { dbLocation } = useContext(AppContext)

    useEffect(() => {
        
    }, [])

    return(
        <div className="center w-full flex-col p-3 gap-7 mb-9">
            { !loadingCertificate ?
                <p className="flex gap-3 items-center"><ClipLoader color={'rgb(0, 0, 0)'} size={25} loading={true} speedMultiplier={0.5}/>  Loading Result</p> : 
                <p></p>
            }
            <>
            <div className="flex flex-col gap-8 lg:flex-row w-full">
                <div className="flex flex-col w-full ">
                    <h3 className="bg-gray-50 p-3 text-sm font-bold text-gray-800">Name of Student</h3>
                    <p className="text-sm p-3 border rounded mt-2">{student?.firstName?.toUpperCase()}  {student?.middleName?.toUpperCase()} {student?.lastName?.toUpperCase()}</p>
                </div>
                <div className="flex flex-col w-full ">
                    <h3 className="bg-gray-50 p-3 text-sm font-bold text-gray-800">Registration Number</h3>
                    <p className="text-sm p-3 border rounded mt-2">{student?.registrationNumber?.replaceAll('-','/')}</p>
                </div>
            </div>

            <div className="flex flex-col gap-8 lg:flex-row w-full">
                <div className="flex flex-col w-full ">
                    <h3 className="bg-gray-50 p-3 text-sm font-bold text-gray-800">Certificate Awarded</h3>
                    <p className="text-sm p-3 border rounded mt-2">{student?.training}</p>
                </div>
                <div className="flex flex-col w-full ">
                    <h3 className="bg-gray-50 p-3 text-sm font-bold text-gray-800">Email</h3>
                    <p className="text-sm p-3 border rounded mt-2">{student?.email}</p>
                </div>
            </div>


            <div className="flex flex-col gap-8 lg:flex-row w-full">
                <div className="flex flex-col w-full ">
                    <h3 className="bg-gray-50 p-3 text-sm font-bold text-gray-800">Test Score (%)</h3>
                    <p className="text-sm p-3 border rounded mt-2">{student?.testScore}%</p>
                </div>
                <div className="flex flex-col w-full ">
                    <h3 className="bg-gray-50 p-3 text-sm font-bold text-gray-800">Exam Score (%)</h3>
                    <p className="text-sm p-3 border rounded mt-2">{student?.examScore}%</p>
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
                                className="object-cover h-full w-full" alt={`${student.firstName+"'s Training Picture" }`}/>
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


                <iframe src={`${dbLocation}/certificates/${certificate}#toolbar=0`}                    
                    style={{
                        width: '100%',
                        minHeight: '70vh',
                        border: 'none'
                    }}
                ></iframe>       
            </div>
            
           
            </>
            
            
        </div>
    )
} 