import React, { useContext, useEffect, useRef } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router"
import { AppContext } from "../../../assets/Contexts/AppContext"
import { Header } from "../../../Components/Header"
import { Table, TableRow } from "../../../Components/Table"
import {CircleLoader, GridLoader, DotLoader, ClimbingBoxLoader, FadeLoader, PacmanLoader, SyncLoader, SquareLoader, SkewLoader, ScaleLoader, RotateLoader, RingLoader, RiseLoader, PuffLoader, PropagateLoader, ClipLoader, ClockLoader, BarLoader,  } from 'react-spinners';
import axios from "axios"
import Cookie from "js-cookie"
import { Removespaces } from "../../../assets/Functions/Func"


export const Organizations = () => {
    const userDetails = Cookie.get('userDetails')

    const { setCurrentNav, loggedIn, dbLocation } = useContext(AppContext)
    const [ searchInput, setSearchInput ]  = useState('')
    const [ searchParameter, setSearchParameter ]  = useState('name')
    const [ fetchingData, setFetchingData ]  = useState(false)
    const [ organizationsData, setOrganizationsData ]  = useState([])
    const [ Organizations, setOrganizations ]  = useState([])
    const [ max, setMax  ]  = useState(10)
    const nav = useNavigate()
    const searchRef = useRef()

    useEffect(() => {

        setFetchingData(true)
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
        fetchOrganizations()
    }, [])
    
    const fetchOrganizations = () => {
        axios.get(`${dbLocation}/organizations.php`).then(function(res) {
            setOrganizationsData(res.data)
            setOrganizations(res.data)
            setTimeout(() => {
                setFetchingData(false)
            }, 2000);
        })

    }
    
    useEffect(() => {
        setCurrentNav(2)
    }, [])
    
    useEffect(() => {
        const delay = setTimeout(() => {
            HandleSearch(searchInput)
        }, 1000);

        return () => clearTimeout(delay)
    
    }, [searchInput])


    const HandleSearch = (e) => {
        setFetchingData(true)
        if(e == ''){
            fetchOrganizations()
        }else{
            axios.get(`${dbLocation}/organizations.php/${e?.toUpperCase()}/search`).then((res) => {
                setOrganizationsData(res.data)
                setTimeout(() => {
                    setFetchingData(false)
                }, 500);
            // if(res.data != false){
            // }
        })
        }
    }

    return(
        <div className="center py-9 mb-9">
            <div className="w-11/12 rounded-t-xl md:w-9/12 md:mt-9">
            {/* <div className="flex w-full flex-col overflow-hidden rounded-b-xl bg-gray-50 "> */}
                    <div className="sticky top-12 z-40">
                    <Header backgroundColor={'bg-blue'} text={'Organizations'} linkTitle={'Sort'}
                    link={''} btnClas={'border'} icon={'filter'}
                    type={'func'} no={fetchingData ? 0 : organizationsData.length} hIcon={'people-fill'}/>

                    <div className="flex p-2 gap-4 bg-white border border-gray-400 my-3 rounded-lg">
                        <i className="bi bi-search right-0 p-1 px-2 cursor-pointer" onClick={() => searchRef.current.focus()} 
                        ></i>

                        <input type="text" placeholder={`Search`} className="w-full bg-transparent outline-none text-small" value={searchInput} ref={searchRef} onChange={(e) => {
                            setSearchInput(e.target.value)
                        }}/>
                        <i className="bi bi-x-lg bg-gray-100 rounded-full right-0 p-1 px-2 cursor-pointer" onClick={() => {setSearchInput('')
                        searchRef.current.focus()
                        }}></i>
                    </div>

                    </div>
                    <div className="">
                        {  !fetchingData ?
                            <Table data={organizationsData} th1={'NAME'} th2={'EMAIL'} type={'AOrganization'} max={max}/>

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

                        <div className="w-full center flex-col my-9">
                        <div className="mb-2">Pages</div>
                        <div className="w- grid grid-cols-9 gap-4">
                            {
                                organizationsData.map((i, key) => (
                                    // key/10 != 0 &&
                                    key % 10 == 0 ?

                                    <div className={`cursor-pointer center text-sm ${key + 10 == max ? 'font-bold text-xl' : 'bg-gray-50 shadow-xl rounded-full' }`} key={key}
                                    style={{
                                        height: 30+'px',
                                        width: 30+'px',
                                    }}
                                        onClick={() => {
                                            setMax(key + 10)
                                            document.documentElement.scrollTop = 0
                                        }}
                                    >{((key + 10)/10) }</div>

                                    : ''
                                ))
                            }
                        </div>

                    </div>
                    </div>
                {/* </div> */}

            </div>
        </div>
      
    )
}