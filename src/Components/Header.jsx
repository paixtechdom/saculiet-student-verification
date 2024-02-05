import { useContext } from "react"
import { Link } from "react-router-dom"
import { AppContext } from "../assets/Contexts/AppContext"
import { SearchFunc, SortFunc } from "../assets/Functions/Func"
import { PrimaryButton } from "./Button"

export const Header = ({backgroundColor, text, linkTitle,
link, btnClas, icon, type, no}) => {
    const { clickedSearch, setClickedSearch } = useContext(AppContext)


    return(
        <div className={`w-full ${backgroundColor} flex justify-between items-center text-white p-3 rounded--xl`}>
            <h3 className="text-lg">{text} {type == 'func' ? `(${no})` : ''}</h3>
            {
                type == 'link' ?
                <Link to={`/${link}`}> 
                    <PrimaryButton  icon={icon} text={linkTitle} btnClas={btnClas}/>
                </Link> : type == 'func' ? 
                <div className="flex gap-5">

                    <button onClick={() => {
                        setClickedSearch(!clickedSearch)
                    }}> 
                        <i className="bi bi-search"></i>
                    </button>

                    {/* <button onClick={() => {

                    }}> 
                        <i className="bi bi-filter text-2xl"></i>
                    </button> */}
                </div>
                : ''
            }
        </div>
    )
}