import { Link } from "react-router-dom"
import { PrimaryButton, SecondaryButton } from "./Button"
import { useContext, useState } from "react"
import { AppContext } from "../assets/Contexts/AppContext"

export const Stats = ({clas, title, no, icon, link, percent}) => {

    const { searchInput, setSearchInput } = useContext(AppContext)
    const [ mouseOver, setMouseOver ] = useState(false)
    return(
        <div className={`center ${clas == '' ? 'bg-blue' : clas} p-4 md:min-h-36 rounded-xl text-gray-200 w-full`} 
        onMouseOver={() => setMouseOver(true)}
        onMouseOut={() => setMouseOver(false)}
        > 
            <Link to='/Requests' className="w-full rounded-lg flex justify-between bg-blue-80 transition-all duration-500" onClick={() => {
                setSearchInput(clas)
            }}>
                <div className="flex flex-col justify-center items-start bg-blue-20 w-full">
                    <p className="text-gray-100 text-lg">{no} {title}</p>
                        {/* this button should set status to ... and search on click on the org page */}
                        <SecondaryButton text={'View'} icon='eye-fill' btnClas={'border  border-gray-300 mt-4 bg-transparent'} />
                </div>
                <div className="flex flex-col w-8/12 items-end justify-between opacity-60 bg-green-90 relative">
                    <div className="center absolut top-0 h-full " >
                    <i className={`bi bi-${icon} transition-all duration-500 ${mouseOver ? 'text-5xl p-4 text-white' : 'text-2xl p-3 px-4 text-gray-300'}  border rounded-full`}></i>
                    </div>
                </div>
            </Link>
        </div>
    )
}