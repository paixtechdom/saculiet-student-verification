import { useEffect, useState } from "react"
import { useContext } from "react"
import { AppContext } from "../../assets/Contexts/AppContext"
import { FormError } from "../../Components/FormError"
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Cookie from "js-cookie"
import axios from "axios"

export const Settings = () => {

    const { setCurrentNav, dbLocation, setShowAlert, setAlertMessage, setAlertType } = useContext(AppContext)
    const [ adminDetails, setAdminDetails ] = useState({})
    const [ showPassword, setShowPassword ] = useState('password')
    const [ oldPassword, setOldPassword ] = useState('')
    const [ newPassword, setNewPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')
    const [ oldPasswordError, setOldPasswordError ] = useState('')
    const [ newPasswordError, setNewPasswordError ] = useState('')
    const [ confirmPasswordError, setConfirmPasswordError ] = useState('')
    const [ passwordPercentage, setPasswordPercentage ] = useState(0)
    const [ loading, setLoading ] = useState(false)
    

    useEffect(() => {
        setCurrentNav(4)
        const cookie = Cookie.get('userDetails')
        // console.log(cookie)
        if(cookie !== undefined){
            setAdminDetails(JSON.parse(cookie))
            
        }
    }, [])

    useEffect(() => {
        if(confirmPassword != '' && confirmPassword != newPassword){
            setConfirmPasswordError('Passwords do not match')
        }else{
            setConfirmPasswordError('')
            
        }
    }, [confirmPassword, newPassword])

    useEffect(() => {
      passwordStrength(newPassword)

      if(newPassword.length > 0){
        if(newPassword.length < 9){
            setNewPasswordError('Password must be at least 8 characters')
        }else{
            if(!newPassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)){
                setNewPasswordError('Password must contain at least an uppercase letter, a lowercase letter and a number')

            }else{
                setNewPasswordError('')
            }
            
        }
    }
    }, [newPassword])


    const passwordStrength = (newPassword) => {
        let length = 0
        let uppercase = 0
        let lowercase = 0
        let number = 0
        let sign = 0

        if(newPassword.length > 7){
            length = 20
            if(newPassword.match(/^(?=.*[a-z]).+$/)){
                lowercase = 20
            }
            if(newPassword.match(/^(?=.*[A-Z]).+$/)){
                uppercase = 20
            }
            if(newPassword.match(/^(?=.*\d).+$/)){
                number = 20
            }
            if(newPassword.match(/^(?=.*[!`~@#$%^&*()-+=_{}[\]|\:;"'<,./>?]).+$/)){
                sign = 20
            }
        }
        setPasswordPercentage(length + uppercase + lowercase + number + sign)
    }


    const handleSubmit = (e) => {
        e.preventDefault()
       
        if(confirmPasswordError == '' && newPasswordError == ''){
            update()
            setLoading(true)
        }
    }

    const update = async () =>{
        await axios.get(`${dbLocation}/admin.php/${oldPassword}/password`).then((res) => {
            if(res.data == 'password match'){
                axios.post(`${dbLocation}/admin.php/${newPassword}/password`).then(function(response){    
                        setShowAlert(true)
                        setAlertType('success')
                        setLoading(false)
                        setTimeout(() => {
                            setShowAlert(false)
                        }, 2000);
                        setOldPassword('')
                        setOldPasswordError('')
                        setNewPassword('')
                        setNewPasswordError('')
                        setConfirmPassword('')
                        setConfirmPasswordError('')
                        setAlertMessage(['Password Updated Successfully'])
                    })
                }else{
                    setLoading(false)
                    setOldPasswordError('Incorrect existing password')
                }
            })

        }

    return( 
        <div className="center w-full mt-9 pt-9 flex flex-col min-h-screen">


            {/* <UpdatePassword password={adminDetails?.password}/> */}
                <form onSubmit={handleSubmit} className="password w-11/12 gap-6 flex flex-col text-sm md:w-9/12 md:mt-9 lg:grid grid-cols-2">
                    <h4 className="text-xl col-span-2">Change Password</h4>
                    <div className="flex flex-col gap-2 col-span-2">
                        <input type={showPassword} placeholder="Old Password" className="shadow-lg p-3 outline-none border-bottom-primary bg-gray-50" onChange={(e) => setOldPassword(e.target.value)} value={oldPassword}  required/>
                        {
                            oldPasswordError != '' ?
                            <FormError message={oldPasswordError}/> : ''
                        }
                    </div>

                    <div className="flex flex-col">
                        <input type={showPassword} placeholder="New Password" name="" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}   className="shadow-lg p-3 outline-none border-bottom-primary bg-gray-50" required/>
                        {
                            newPassword.length > 7 ?
                            <>
                            <p className="mx-2 mt-2 mb-1 text-sm">Password Strength: {
                                passwordPercentage == 40 ? 'Weak' :
                                passwordPercentage == 60 ? 'Medium' :
                                passwordPercentage == 80 ? 'Strong' :
                                passwordPercentage == 100 ? 'Very Strong' 
                                : ''

                            } </p> 
                            <p className={`mb-2 h-1 rounded-xl mx-2 transition-all duration-500 ${
                                passwordPercentage == 0 ? 'w-0' :
                                passwordPercentage == 40 ? 'bg-red-600 w-4/12' :
                                passwordPercentage == 60 ? 'bg-yellow-400 w-6/12' :
                                passwordPercentage == 80 ? 'bg-blue w-10/12' :
                                passwordPercentage == 100 ? 'bg-green-600 w-full' 
                                : ''
                            }`}></p>
                            </>
                            : ''
                        }
                        {
                            newPasswordError != '' ?
                            <FormError message={newPasswordError}/> : ''
                        }
                        
                    </div>

                    <div className="flex flex-col gap-2 ">
                        <input type={showPassword} placeholder="Confirm New Password"  
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}   
                        className="shadow-lg p-3 outline-none border-bottom-primary bg-gray-50" required/>
                        {
                            confirmPasswordError != ''?
                            <FormError message={confirmPasswordError}/> : ''
                        }
                    </div>


                    <div className="passwordReveal flex gap-3 col-span-2">
                        <input type="checkbox" name="" id=""
                        className="border  shadow-lg"
                        onClick={() =>{
                            setShowPassword(showPassword == 'text' ? 'password' : 'text') 
                        }}/>
                        <p> Show Passwords </p>
                    </div>

                    <button type="submit" className="w-full bg-blue text-white rounded-lg p-3 mt-2 mb-5 col-span-2 "> 
                        {
                            loading ? 'PLEASE WAIT...' : 'SAVE'
                        }
                    </button>
                </form>
        </div>
    )
}


