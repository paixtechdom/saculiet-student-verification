import { Link } from "react-router-dom"
import { PrimaryButton, SecondaryButton } from "./Button"

export const Stats = ({clas, title, no, icon, link, percent}) => {
    return(
        <div className={`center ${clas} p-4 rounded-xl text-gray-200 w-full`}>
            <Link to='/Organizations' className="w-full rounded-lg flex justify-between bg-blue-80">
                <div className="flex flex-col justify-center items-start bg-blue-20 w-full">
                    <p className="text-gray-100 text-lg">{no} {title}</p>
                        {/* this button should set status to ... and search on click on the org page */}
                        <SecondaryButton text={'View'} icon='eye-fill' btnClas={'border  border-gray-300 mt-4 bg-transparent'} />
                </div>
                <div className="flex flex-col w-8/12 items-end justify-between opacity-60">
                    {/* <div className="center text-4xl border rounded-full w-5/12 center" style={{
                        width: 100+'px',
                        height: 100+'px',
                    }}> */}
                    <i className={`bi bi-${icon} text-gray-300 text-5xl border rounded-full p-4`}></i>
                    {/* </div> */}
                </div>
            </Link>
        </div>
    )
}