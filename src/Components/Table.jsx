import React from "react"
import { Link } from "react-router-dom"
 
const Table = ({th1, th2, data, type, max}) =>{
    return(
        <table className="flex flex-col w-full border-0 relative">
            <thead className="grid grid-cols-5 shadow-lg text-sm sticky bg-gray-50 py-1 pt-2" style={{
                // top: 140
            }}>
                <th className="col-span-2 p-1 px-3">
                    <tr>{th1}</tr>
                </th>
                <th className="col-span-3 p-1 px-3">
                    <tr>{th2}</tr>
                </th>
                <th className="p-1 px-3"> 
                    {/* <tr>Action</tr> */}
                </th>
            </thead>
            <tbody className="">
                {
                    type == 'requests' ?
                    React.Children.toArray(
                        data.map((data, i) => 
                            <TableRow td1={data?.name?.replaceAll('_', ' ')} td2={data.firstName + ' ' + data.lastName} id={data.userName} td3={data.status} td3Class={data.status} type={type} i={i}/>
                        )
                        ) : 
                    type == 'students' ?
                    React.Children.toArray(
                        data.map((data, i) => 
                            i < max && i >= max -10 ?
                            <TableRow td1={data.firstName + ' ' + data.lastName} td2={data.registrationNumber?.replaceAll('-','/')} id={data.id} td3={'view'} td3Class={'bg-sec text-white px-3'} type={type} i={i}/> 
                            : ''
                        )
                        ) 
                        :
                    type == 'AOrganization' ?
                    React.Children.toArray(
                        data.map((data, i) => 
                            <TableRow td1={data.name?.replaceAll('_', ' ')} td2={data.email} id={data.id} td3={'view'} td3Class={'bg-sec text-white px-3'} type={type} i={i}/>
                        )
                        ) 
                        : ''
                }
                
            </tbody>
        </table>
    )
}


const TableRow = ({td1, td2, td3, td3Class, id, type, i}) => {
    return(
        <>
        {/* <tr className="">{i+1}</tr> */}
        <Link to={`/${type}/${id}`} className={`${i % 2 != 0 ? 'bg-gray-50' : ''} grid grid-cols-5 border border-bottom-primary border-0 text-sm  py-3 tableRow transition-all duration-500`}>

            <tr className="col-span-2 p-2 md:mx-4">{td1}</tr>
            <tr className="col-span-2  shado p-2 truncate">{td2}</tr>
            {
                td3 && td3.length > 0 ?
                <tr className={`small  p-1 center`}>
                    <td className={`${td3Class} rounded-lg opacity-9 p-1 px-1`}>{td3.toUpperCase()}</td>
                    
                </tr> : ''
            }
            {/* <i className="bi bi-archive-fill"></i>
            <i className="bi bi-eye-fill"></i> */}
        </Link>
        </>
    )
}

export { Table, TableRow }