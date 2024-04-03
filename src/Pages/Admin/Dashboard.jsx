import React from "react"
import { useContext } from "react"
import { Header } from "../../Components/Header"
import { Stats } from "../../Components/Stats"
import { Table, TableRow } from "../../Components/Table"
import { AppContext} from "../../assets/Contexts/AppContext"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useState } from "react"
import axios from "axios"
import Cookie from "js-cookie"
import { SyncLoader } from "react-spinners"

export const Dashboard = () => {
    const { setCurrentNav, dbLocation, setRequest, loggedIn } = useContext(AppContext)
    const userDetails = Cookie.get('userDetails')
    const nav = useNavigate()

    const [ loading, setLoading ] = useState(false)
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
        setLoading(true)
        axios.get(`${dbLocation}/requests.php`).then(function(res) {
            const lis = res.data
            // let list = lis.filter((li) => li.status !== 'unconfirmed-email')
            setRequestList(lis)
            setRequestList(res.data)
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
            });
            setLoading(false)
        })
    }, [])
    return(
        <>

        {
            loading ? 
                <div className="center flex flex-col py-9 h-screen">
                <SyncLoader color={'rgb(3, 3, 78)'} size={15} loading={true} speedMultiplier={0.8}/>
                <SyncLoader color={'rgb(219, 20, 20)'} size={15} loading={true} speedMultiplier={0.8}/>
                </div> 
            :

            <div className="my-9 py-9 center w-full flex-col">
                <p className="md:mt-9"></p>
                <div className="w-11/12 flex flex-col gap-6 md:mb-9 md:w-9/12">
                    <h2 className="text-2xl">DASHBOARD</h2>
                    <div className="center flex-col gap-3 md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 stretch">
                        <Stats clas={''} title={'All Requests'} no={requestsList.length} percent={40} icon='inbox-fill'/>


                        <Stats clas={'pending'} title={'Pending Requests'} no={pendingNo} percent={40} icon='exclamation-circle-fill'/>

                        <Stats clas={'success'} title={'Active Requests'} no={activeNo} percent={40} icon='clock-fill'/>

                        <Stats clas={'expired'} title={'Expired Requests'} no={expiredNo} percent={40} icon='clock-history'/>

                    </div>



                    

                </div>
                    <div className="flex w-11/12 md:w-9/12  flex-col overflow-hidden rounded-t-xl bg-gray-100 mt-9">
                        <Header backgroundColor={'bg-blue'} text={'Recent'} linkTitle={'SEE ALL'}
                        link={'Requests'} btnClas={'border'} icon={'arrow-right'} type={'link'}
                        hIcon={'clock-fill'}/>


                        <div className="">
                        {/* <Table data={requestsList} th1={'NAME'} th2={'STUDENT'} type={'requests'} /> */}
                            {
                                React.Children.toArray(
                                    requestsList.map((request, i) => 
                                        i < 5 ?
                                        <TableRow td1={request?.name?.replaceAll('_', ' ')} td2={request.firstName + ' ' + request.lastName} td3={request.status} td3Class={request.status} id={request.userName} type={'Requests'}/> : ''
                                    )
                                )
                            }
                        </div>
                    </div>
            </div>
        }
        </>
    )
}