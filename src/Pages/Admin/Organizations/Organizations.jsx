import React, { useContext, useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { OrganizationsInfo } from "../../../assets/Constants"
import { AppContext } from "../../../assets/Contexts/AppContext"
import { Header } from "../../../Components/Header"
import { Table, TableRow } from "../../../Components/Table"
import {CircleLoader, GridLoader, DotLoader, ClimbingBoxLoader, FadeLoader, PacmanLoader, SyncLoader, SquareLoader, SkewLoader, ScaleLoader, RotateLoader, RingLoader, RiseLoader, PuffLoader, PropagateLoader, ClipLoader, ClockLoader, BarLoader,  } from 'react-spinners';
import axios from "axios"
import Cookie from "js-cookie"


export const Organizations = () => {
    const userDetails = Cookie.get('userDetails')

    const { setCurrentNav, loggedIn } = useContext(AppContext)
    const [ searchInput, setSearchInput ]  = useState('')
    const [ searchParameter, setSearchParameter ]  = useState('name')
    const [ fetchingData, setFetchingData ]  = useState(false)
    const [ organizationsData, setOrganizationsData ]  = useState([])
    const [ organizations, setOrganizations ]  = useState([])
    
    const { clickedSearch, setClickedSearch, dbLocation } = useContext(AppContext)

    useEffect(() => {

        // setFetchingData(true)
        if(searchInput.length < 1){
            // setOrganizationsData(OrganizationsInfo)
            // setFetchingData(false)
        }
    }, [searchInput])
    
    useEffect(() => {
        if(userDetails == undefined){
            nav('/Login')
        }   
        document.documentElement.scrollTop = 0

        axios.get(`${dbLocation}/organizations.php`).then(function(res) {
            setOrganizationsData(res.data)
            setOrganizations(res.data)
            setTimeout(() => {
                setFetchingData(false)
            }, 2000);
        })
    }, [])
    
    useEffect(() => {
        setCurrentNav(1)
    }, [])
    
    useEffect(() => {
        if(searchInput.length > 0){
            HandleSearch(searchInput)
        }
    }, [searchInput, searchParameter])


    const HandleSearch = (input) => {
        setSearchInput(input)
        // console.log('Handling Search')
        // setFetchingData()
        const newOrganizations = organizations.filter((org) => {
            if(searchParameter == 'name'){
                if(org.name.toLowerCase().includes(input.toLowerCase())) {
                    return org;
                }
                
            }else if(searchParameter == 'status'){
                if(org.status.toLowerCase().includes(input.toLowerCase())) {
                    return org;
                    
                }
                
            }
        })
        setOrganizationsData(newOrganizations)
        setFetchingData(false)
    }

    return(
        <div className="center py-9 mb-9">
            <div className="w-11/12 rounded-t-xl">
            {/* <div className="flex w-full flex-col overflow-hidden rounded-b-xl bg-gray-50 "> */}
                    <div className="sticky top-12 z-40">
                    <Header backgroundColor={'bg-blue'} text={'Organizations'} linkTitle={'Sort'}
                    link={''} btnClas={'border'} icon={'filter'}
                    type={'func'} no={fetchingData ? 0 : organizationsData.length}/>

                    {
                        clickedSearch ? 
                        <div className="flex p-2 gap-4 bg-white">
                            <input type="text" placeholder={`Search with ${searchParameter}`} className="w-full border p-1 border-gray-400 rounded-lg px-2 bg-transparent outline-none text-small" value={searchInput} onChange={(e) => {
                                HandleSearch(e.target.value)
                                }}/>

                            <div className="flex text-small gap-3">
                                <button className={`rounded-lg ${searchParameter == 'name' ? 'bg-sec text-gray-200 p-2' : 'border-gray-800'}`} onClick={() => {
                                    setSearchParameter('name')
                                }}>Name</button>

                                <button className={`rounded-lg ${searchParameter == 'status' ? 'bg-sec text-gray-200 p-2' : 'border-gray-800'}`} onClick={() => {
                                    setSearchParameter('status')
                                }}>Status</button>
                            </div>
                        </div>

                        : ''
                    }
                    </div>
                    <div className="">
                        {  !fetchingData ?
                            <Table data={organizationsData} th1={'Names'} th2={'Emails'} type={'organizations'}/>

                            : 
                            <div className="center flex flex-col py-9">
                                <SyncLoader color={'rgb(3, 3, 78)'} size={15} loading={true} speedMultiplier={0.8}/>
                                <SyncLoader color={'rgb(219, 20, 20)'} size={15} loading={true} speedMultiplier={0.8}/>
                            </div>
                        }

                        {
                            organizationsData.length < 1 ? 
                            <p className="p-2 text-sm mt-6">Empty list</p> : <p></p>
                        }
                    </div>
                {/* </div> */}

            </div>
        </div>
      
    )
}