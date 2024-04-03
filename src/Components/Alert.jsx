import React, { useContext } from "react"
import { AppContext } from "../assets/Contexts/AppContext"
import Cookie from "js-cookie"
import { useNavigate } from "react-router"

export const Alert = () => {
    const {showAlert, setShowAlert, setAlertType, alertType, setAlertMessage, alertMessage, setIsAdmin} = useContext(AppContext)
    const navigate = useNavigate()

    const logout = () => {
        Cookie.remove('userDetails', {path:'/'})
        setIsAdmin(false)
        setShowAlert(false)
        navigate('/Login')
    }


    if(showAlert) {
        if(alertType == 'func'){
            return( 
                <div className={`center fixed top-0 w-full h-screen z-100`} style={{
                    backgroundColor: 'rgba(225, 225, 225, 0.6)',
                    zIndex: 401
                }}>
                    <div className={`w-11/12 md:w-6/12 xl:w-3/12  min-h-64 bg-gray-50 shadow-xl rounded-2xl center flex-col gap-7 py-4 px-6 alert text-center`}>        
                        <h3 className="text-lg">{alertMessage[0]?.toUpperCase()}</h3>

                        <div className="flex justify-between w-full gap-5">
                            <button className={`bg-blue w-5/12 rounded-lg p-2 text-gray-200 text-small`} onClick={() => logout()}>YES</button>


                            <button className={`border border-gray-900 bg-transparent w-5/12 rounded-lg p-2 text-gray-900 text-small`} onClick={() => setShowAlert(false)}>NO</button>

                        </div>
                    </div>
                </div>
            )

        }
        
        
        else{
            return( 
                <div className={`center fixed top-0 w-full h-screen z-100`} style={{
                    backgroundColor: 'rgba(225, 225, 225, 0.6)',
                    zIndex: 401
                }}>
                    <div className={`w-9/12 md:w-9/12 xl:w-6/12  min-h-64 bg-gray-50 shadow-xl rounded-3xl center flex-col gap-4 py-7 px-6 alert text-center`}>
                        <i className={`bi bi-${
                            alertType == 'success' ? 'check' :
                            alertType == 'cancelled' ? 'x-lg' :
                            alertType == 'expired' ? 'clock-fill' :
                            alertType == 'pending' ? 'exclamation-octagon-fill' : ''
                        } text-5xl ${alertType} rounded-full p-2 px-2`}></i> 
        
                        <h3 className="text-xl">{alertType?.toUpperCase()}</h3>
                        <p className="flex flex-col text-center text-sm line-25">
                            {
                                 React.Children.toArray(
                                    alertMessage.map(message => 
                                        <p>{message}</p>
                                        )
                                    ) 
                            }
                        </p>
                        <button className={`border- bg-gray-900 w-6/12 rounded-lg p-2 text-gray-200 text-small`} onClick={() => setShowAlert(false)}>CLOSE</button>
                    </div>
                </div>
            )

        }
    }
}