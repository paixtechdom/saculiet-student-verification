import React from "react"
import { useContext } from "react"
import { OrganizationsInfo, StudentsInfo } from "../../assets/Constants"
import { Header } from "../../Components/Header"
import { Stats } from "../../Components/Stats"
import { Table, TableRow } from "../../Components/Table"
import { AppContext} from "../../assets/Contexts/AppContext"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useState } from "react"
import axios from "axios"
import Cookie from "js-cookie"

export const Dashboard = () => {
    const { setCurrentNav, dbLocation, setRequest, loggedIn } = useContext(AppContext)
      const userDetails = Cookie.get('userDetails')
    const nav = useNavigate()
    const [ requestsList, setRequestList ] = useState([])
    const [ pendingNo, setPendingNo ] = useState(0)
    const [ activeNo, setActiveNo ] = useState(0)
    const [ cancelledNo, setCancelledNo ] = useState(0)
    const [ expiredNo, setExpiredNo ] = useState(0)
    
    useEffect(() => {     
        if(userDetails == undefined){
            nav('/Login')
        }   
        // setOrganization(userDetails === undefined ? {} : userDetails)
        setCurrentNav(0)
        document.documentElement.scrollTop = 0
        // nav('/Organizations/16')
        // nav('/Organizations')
        // nav('/Students/1')
        // nav('/Saculietstudents')
        // nav('/Settings')
        // nav('/SendEmail')

        axios.get(`${dbLocation}/requests.php`).then(function(res) {
            
            const lis = res.data
            // let list = lis.filter((li) => li.status !== 'unconfirmed-email')
            setRequestList(lis)
            setRequestList(res.data)
            console.log(res.data)
            lis.forEach(li => {
                if(li.status == 'pending'){
                    setPendingNo(cur => cur + 1)
                }
                if(li.status == 'active'){
                    setActiveNo(cur => cur + 1)
                }
                if(li.status == 'expired'){
                    setExpiredNo(cur => cur + 1)
                }
                if(li.status == 'cancelled'){
                    setCancelledNo(cur => cur + 1)
                }
            });
        })
    }, [])
    return(
        <div className="my-9 py-9 center w-full flex-col">
            <p className="md:mt-9"></p>
            <div className="w-11/12 flex flex-col gap-6">
                <h2 className="text-2xl">DASHBOARD</h2>
                <div className="center flex-col gap-3 md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    
                    <Stats clas={'information'} title={'Pending Requests'} no={pendingNo} percent={40} icon='exclamation-octagon-fill'/>

                    <Stats clas={'success'} title={'Active Requests'} no={activeNo} percent={40} icon='clock-fill'/>

                    <Stats clas={'expired'} title={'Expired Requests'} no={expiredNo} percent={40} icon='clock-history'/>

                    <Stats clas={'danger'} title={'Cancelled Requests'} no={cancelledNo} percent={40} icon='x'/>

                </div>



                

            </div>
                <div className="flex w-11/12 flex-col overflow-hidden rounded-b-xl rounded-t-xl bg-gray-100 mt-9">
                    <Header backgroundColor={'bg-blue'} text={'Recent Activities'} linkTitle={'SEE ALL'}
                    link={'Requests'} btnClas={'border'} icon={'arrow-right'} type={'link'}
                    />
                    {/* <div className="grid grid-cols-5 border"> */}
                    <div className="">
                        {
                            React.Children.toArray(
                                requestsList.map((info, i) => 
                                    i < 5 ?
                                    <TableRow td1={info?.name?.replaceAll('_', ' ')} td2={info.email} td3={info.status} td3Class={info.status} id={info.id} type={'Requests'}/> : ''
                                )
                            )
                        }
                    </div>
                </div>
        </div>
    )
}