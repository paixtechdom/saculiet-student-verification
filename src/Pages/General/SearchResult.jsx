import React, { useState } from "react"
import { Document, Page, pdfjs  } from "react-pdf"
import { ClipLoader } from "react-spinners";
import { useContext } from "react";
import { AppContext } from "../../assets/Contexts/AppContext";
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { useEffect } from "react";
import axios from "axios";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();

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

            {/* <div className="flex items-start justify-center overflow-hidden max-h-64 border border-gray-500 p-2">
                <img src={ProfilePics} alt="Student's Image" />
            </div> */}
            <div className="flex flex-col w-full ">
                <h3 className="bg-gray-50 p-2 text-sm font-bold text-gray-800">Name of Student</h3>
                <p className="text-sm p-1 border rounded p-2 mt-2">{student?.firstName?.toUpperCase()}  {student?.middleName?.toUpperCase()} {student?.lastName?.toUpperCase()}</p>
            </div>
            <div className="flex flex-col w-full ">
                <h3 className="bg-gray-50 p-2 text-sm font-bold text-gray-800">Registration Number</h3>
                <p className="text-sm p-1 border rounded p-2 mt-2">{student?.registrationNumber?.replaceAll('-','/')}</p>
            </div>
            <div className="flex flex-col w-full ">
                <h3 className="bg-gray-50 p-2 text-sm font-bold text-gray-800">Certificate Awarded</h3>
                <p className="text-sm p-1 border rounded p-2 mt-2">{student?.training}</p>
            </div>
            <div className="flex flex-col w-full ">
                <h3 className="bg-gray-50 p-2 text-sm font-bold text-gray-800">Email</h3>
                <p className="text-sm p-1 border rounded p-2 mt-2">{student?.email}</p>
            </div>
            <div className="flex flex-col w-full ">
                <h3 className="bg-gray-50 p-2 text-sm font-bold text-gray-800">Test Score (%)</h3>
                <p className="text-sm p-1 border rounded p-2 mt-2">{student?.testScore}%</p>
            </div>

            <div className="flex flex-col w-full ">
                <h3 className="bg-gray-50 p-2 text-sm font-bold text-gray-800">Exam Score (%)</h3>
                <p className="text-sm p-1 border rounded p-2 mt-2">{student?.examScore}%</p>
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
            
            {/* <div className="mt-9 pt-9"></div> */}
            {/* <iframe src={`${dbLocation}/certificates/${certificate}`} alt={'Certificate'} className='border-0 overflow-hidden bg-white center mt-9' width={''}  style={{
                height: 200+'px',
                backgroundColor: 'none'
            }}/> */}
            </>
            {/* <div className="flex items-start justify-center w-full px-5 bg-blue-40 h-90vh overflow-y-hidde mt-9">
                <div className="center -mt-48 - mx-6" style={{
                    transform: 'scale(0.4)'
                }}>
                    <Document file={`${dbLocation}/certificates/${certificate}`} 

                    onLoad={() => {
                        setLoadingCertificate(false) 
                        console.log('loading')}}

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
    )
} 