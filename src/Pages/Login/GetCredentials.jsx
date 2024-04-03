import { useContext, useState, useEffect } from "react"
import { ParallaxRight } from "../../../../saculietSchool/src/Components/Parallax"
import axios from "axios"
import { AppContext } from "../../assets/Contexts/AppContext"
import { FormError } from "../../Components/FormError"
import { Removespaces } from "../../assets/Functions/Func"
import { ClipLoader } from "react-spinners"
import { ChangePassword } from "./ChangePassword"
import { FormLabel } from "../../Components/FormLabel"

export const GetCredentials = ({setAuthState}) => {
    const { dbLocation } = useContext(AppContext)
    const [ progress, setProgress ] = useState(1)
    const [ email, setEmail ] = useState('')
    const [ pin, setPin ] = useState('')
    const [ error, setError ] = useState('')
    const [ loading, setLoading ] = useState(false)
    
    useEffect(() => {
        document.documentElement.scrollTop = 0
    }, [progress])

    const HandleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        if(progress == 0){
            axios.get(`${dbLocation}/admin.php/${email}/fetchemail`).then((res) => {
                if(res.data == 'email match'){
                    setError('')
                    let subject = 'Admin Email Verification - Saculiet Driving School'
                    axios.post(`${dbLocation}/verifyAdminEmail.php/` ,{
                        to: email,
                        subject: subject,
                      }, {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      })
                        .then(() => {
                            setProgress(1)

                        })
                        .catch(() => setError('Error shit'));
                    
                }
                else{
                    setError('Incorrect Admin Email')
                }
                setLoading(false)
            })
        }
        
        if(progress == 1){
            axios.get(`${dbLocation}/admin.php/${pin}/fetchpin`).then((res) => {
                setLoading(false)
                if(res.data == 'pin match'){
                    setProgress(2)
                }else{
                    setError(res.data)
                }
            })
        }
    }


    return(
        <>
        <div className="mt-9 fixed left-0 w-full center top-12">

        <div className="flex w-11/12 md:w-9/12 p-1 rounded-full shadow border-primar items-center justify-center my-9 bg-white">
            <ProgressCircle check={progress > 0}/>
            <div className={`w-4/12 h-1 ${progress > 0 ? 'bg-green-700' : 'bg-green-200'}`}></div>
            <ProgressCircle check={progress > 1}/>
            <div className={`w-4/12 h-1 ${progress > 1 ? 'bg-green-700' : 'bg-green-200'}`}></div>
            <ProgressCircle check={progress > 2}/>
        </div>
        </div>
        <div className="my-9"></div>
        {
            progress < 2 ?
            <form className="flex justify-between w-11/12 items-center transition-all duration-500 gap-3 flex-col bg-blue-30 lg:w-9/12 xl:w-7/12" onSubmit={HandleSubmit}>


                    <div className="w-full mb-3">
                        <h2 className="text-lg text-gray-900">{
                            progress == 0? 'Enter admin email address to change password':
                            progress == 1? `Enter the pin sent to ${email}`:''

                        }</h2>
                    </div>
                    {
                        progress == 0 ?
                        <ParallaxRight clas='w-full' id='name'>
                            {/* <FormLabel text={'Email'} icon={'envelope-fill'}/> */}
                            
                            <div className="flex border-bottom-primary w-full  overflow-hidden bg-gray-50">
                                        <i className="bi bi-envelope-fill bg-blue p-2 text-white opacity-90"></i>
                                        <input type="email" placeholder="Email" className="bg-transparent p-2 px-4 w-full outline-none bg-gray-50" 
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(Removespaces(e.target.value))
                                        }} 
                                        required 
                                        />

                            </div>
                                
                        </ParallaxRight> : ''
                    } 
                    {
                        progress == 1 ?
                        <ParallaxRight clas='w-full' id='email'>
                            {/* <FormLabel text={'Pin'} icon={'key-fill'}/> */}
                            <div className="flex w-full overflow-hidden border-bottom-primary bg-gray-50">
                                    <i className="bi bi-key-fill bg-blue p-2 text-white opacity-90"></i>
                                    <input type='number' placeholder='Pin' className="bg-transparent p-2 px-4 w-full outline-none bg-gray-50 " 
                                    value={pin}
                                    onChange={(e) => {
                                        setPin(Removespaces(e.target.value))
                                    }} 
                                    required 
                                    />
                            </div>
                        </ParallaxRight> : ''
                    }
                    <div className="w-full">
                        {
                            error != '' ?
                            <FormError message={error}/> : ''
                        }
                    </div>


                    <ParallaxRight clas='w-full ' id='send'>
                            {
                                loading ? 
                                <>
                                    <button className="flex cursor-pointer items-center bg-gray-90 bg-blue shadow-xl rounded-xl p-2 text-lg transition-all duration-500  m-auto justify-center cursor-pointer w-full text-white gap-3"> 
                                    <ClipLoader loading={true} color="white" size={20}/> 
                                    Please wait...
                                    </button>
                                </>
                            :
                                <input type="submit" className="flex cursor-pointer items-center bg-gray-90 bg-blue shadow-xl rounded-lg p-2 text-lg transition-all duration-500  m-auto justify-center cursor-pointer w-full text-white" value={'Submit'}/>
                            }

                        {/* </div> */}
                    </ParallaxRight>
                </form> :
                progress == 2 ? 
                <ChangePassword setAuthState={setAuthState} setProgress={setProgress}/> : ''
            }
         </> 
    )
}



const ProgressCircle = ({check}) => {
    return(
        <div className={`flex items-center justify-center rounded-full bg-green-00 border border-green- shadow scale-90`} style={{
            height: 30+'px',
            width: 30+'px'
        }}>
            <div className={`flex items-center justify-center rounded-full ${check ? 'bg-green-600' : 'bg-green-200'} text-gray-100 text-xl shadow scale-90`} style={{
            height: 20+'px',
            width: 20+'px'
        }}>
            {
                check ?
                <i className="bi bi-check"></i> : ''
            }
            </div>
        </div>
    )
}