import React, { useContext, useEffect } from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { StudentsInfo } from "../../../assets/Constants"
import { AppContext } from "../../../assets/Contexts/AppContext"
import { Header } from "../../../Components/Header"
import { Table, TableRow } from "../../../Components/Table"
import {CircleLoader, GridLoader, DotLoader, ClimbingBoxLoader, FadeLoader, PacmanLoader, SyncLoader, SquareLoader, SkewLoader, ScaleLoader, RotateLoader, RingLoader, RiseLoader, PuffLoader, PropagateLoader, ClipLoader, ClockLoader, BarLoader,  } from 'react-spinners';
import axios from "axios"
import Cookie from "js-cookie"


export const Students = () => {
    const userDetails = Cookie.get('userDetails')

    const { setCurrentNav, dbLocation } = useContext(AppContext)
    const [ searchInput, setSearchInput ]  = useState('')
    const [ searchParameter, setSearchParameter ]  = useState('name')
    const [ fetchingData, setFetchingData ]  = useState(false)
    const [ studentsData, setStudentsData ]  = useState([])
    const [ students, setStudents ]  = useState([])
    
    const { clickedSearch, setClickedSearch } = useContext(AppContext)
    const nav = useNavigate()

    useEffect(() => {
        setFetchingData(true)
        setTimeout(() => {
            setFetchingData(false)
        }, 2000);
        if(searchInput.length < 1){
            // setStudentsData(StudentsInfo)
            // console.log(StudentsInfo)
        }
    }, [searchInput])
    
    useEffect(() => {
        if(userDetails == undefined){
            nav('/Login')
        }
        document.documentElement.scrollTop = 0

        setCurrentNav(2)
        axios.get(`${dbLocation}/students.php`).then(function(res) {
            setStudentsData(res.data)
            setStudents(res.data)
            setTimeout(() => {
                setFetchingData(false)
            }, 2000);
        })

    }, [])
    
    useEffect(() => {
        if(searchInput.length > 0){
            HandleSearch(searchInput)
        }
    }, [searchInput, searchParameter])


    const HandleSearch = (input) => {
        setSearchInput(input)
        // console.log('Handling Search')
        const newStudents = students.filter((stud) => {
            if(searchParameter == 'name'){
                if(stud.firstName?.toLowerCase().includes(input.toLowerCase())) {
                    return stud;
                }
                
            }else if(searchParameter == 'regNo'){
                if(stud.registrationNumber.toLowerCase().includes(input.toLowerCase())) {
                    return stud;
            
            }

            }
        })
        setStudentsData(newStudents)
    }

    return(
        <div className="center my-9 mb-9">
            <div className="w-11/12 rounded-t-xl  min-h-screen">
            {/* <div className="flex w-full flex-col overflow-hidden rounded-b-xl bg-gray-50"> */}
                <div className="sticky top-12 z-40">
                    <Header backgroundColor={'bg-blue'} text={'Students'} linkTitle={'Sort'}
                    link={''} btnClas={'border'} icon={'filter'}
                    type={'func'} no={fetchingData? 0 : studentsData.length}/>
                    {
                        clickedSearch ? 
                        <div className="flex p-2 gap-4 bg-white">
                            <input type="text" placeholder={`Search with ${searchParameter == 'regNo' ? 'reg number' : searchParameter}`} className="w-9/12 border p-1 border-gray-400 rounded-lg px-2 bg-transparent outline-none text-small" value={searchInput} onChange={(e) => {
                                HandleSearch(e.target.value)
                                }}/>

                            <div className="flex text-small gap-3 w-5/12">
                                <button className={`rounded-lg ${searchParameter == 'name' ? 'bg-sec text-gray-200 p-2' : 'border-gray-800'}`} onClick={() => {
                                    setSearchParameter('name')
                                }}>Name</button>

                                <button className={`rounded-lg ${searchParameter == 'regNo' ? 'bg-sec text-gray-200 p-2' : 'border-gray-800'}`} onClick={() => {
                                    setSearchParameter('regNo')
                                }}>Reg No</button>
                            </div>
                        </div>

                        : ''
                    }

                </div>
                    <div className="">
                        {  !fetchingData ?
                            
                            <Table data={studentsData} th1={'Names'} th2={'Reg Number'} type={'students'}/>
                            : 
                            <div className="center flex flex-col py-9">
                                <SyncLoader color={'rgb(3, 3, 78)'} size={15} loading={true} speedMultiplier={0.8}/>
                                <SyncLoader color={'rgb(219, 20, 20)'} size={15} loading={true} speedMultiplier={0.8}/>
                            </div>
                        }

                        {
                            studentsData.length < 1 ? 
                            <p className="p-2 text-sm mt-6">Empty list</p> : <p></p>
                        }
                    </div>
                {/* </div> */}

            </div>
        </div>
    )
}