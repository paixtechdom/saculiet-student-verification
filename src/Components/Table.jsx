import React from "react"
import { Link } from "react-router-dom"
 
const Table = ({th1, th2, data, type}) =>{
    return(
        <table className="flex flex-col w-full border-0">
            <thead className="grid grid-cols-5 shadow-xl text-sm sticky bg-white py-1 pt-2" style={{
                top: 140
            }}>
                <th className="col-span-2 p-1 px-3">
                    <tr>{th1}</tr>
                </th>
                <th className="col-span-2 p-1 px-3">
                    <tr>{th2}</tr>
                </th>
                <th className="p-1 px-3"> 
                    <tr>Action</tr>
                </th>
            </thead>
            <tbody className="">
                {
                    type == 'organizations' ?
                    React.Children.toArray(
                        data.map((data, i) => 
                            <TableRow td1={data.name} td2={data.email} id={data.id} td3={data.status} td3Class={data.status} type={type} i={i}/>
                        )
                        ) : 
                    type == 'students' ?
                    React.Children.toArray(
                        data.map((data, i) => 
                            <TableRow td1={data.firstName + ' ' + data.lastName} td2={data.registrationNumber} id={data.id} td3={'view'} td3Class={'pending'} type={type} i={i}/>
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
        <Link to={`/${type}/${id}`} className="grid grid-cols-5 shadow-lg text-sm border-0 py-3">

            <tr className="col-span-2 p-2 ">{td1}</tr>
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