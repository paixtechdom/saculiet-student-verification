import { useEffect, useState } from "react"
import { useContext } from "react"
import { AppContext } from "../../assets/Contexts/AppContext"
// import { UpdatePassword } from "./UpdatePassword"
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Cookie from "js-cookie"

export const Settings = () => {

    const { setCurrentNav } = useContext(AppContext)
    const [ adminDetails, setAdminDetails ] = useState({})
    const [ showPassword, setShowPassword ] = useState('password')
    const user = {
        password: ''
    }

    useEffect(() => {
        const cookie = Cookie.get('userDetails')
        // console.log(cookie)
        if(cookie !== undefined){
            setAdminDetails(JSON.parse(cookie))
            
        }
    }, [])

    const schema = yup.object().shape({
        confirmOldPassword: yup.
        string()
        .oneOf([(user.password), null], 'Password do not match old password')
        .required('Old Password is a required'),
        password: yup.string().min(6).max(18).required(),
        confirmNewPassword: yup.
        string()
        .oneOf([yup.ref('password'), null], 'Passwords do not match')
        .required('Confirm New Password is a required')
    })
    
    const { register, handleSubmit, setValue, formState: {errors}, reset } = useForm({
        resolver: yupResolver(schema)
    })
    const onUpdate =  (data) =>{
        Update(data.password, id)
    }
    const Update = async (password, id) =>{
        setLoading(true)
        await axios.post(`${dbLocation}/user/${id}/${password}`).then(function(response){    
                setAlert(true)
                setLoading(false)
                setTimeout(() => {
                    setAlert(false)
                }, 2000);
                reset({
                    confirmNewPassword: '',
                    password: '',
                    confirmOldPassword:''
                })
                setAlertMessage('Password Updated Successfully')
                getUser()
        })

        }

    useEffect(() => {
        setCurrentNav(3)
    }, [])
    return( 
        <div className="center w-full mt-9 pt-9 flex flex-col">
            SETTINGS PAGE


            {/* <UpdatePassword password={adminDetails?.password}/> */}
                {/* <form className="password w-11/12 gap-4 flex flex-col">
                    <h4>Change Password</h4>
                    
                    <input type={showPassword} placeholder="Old Password"  {...register('confirmOldPassword')}/>
                    <p className="error">{errors.confirmOldPassword?.message}</p>

                    <input type={showPassword} placeholder="New Password"  {...register('password')}/>
                    <p className="error">{errors.password?.message}</p>

                    <input type={showPassword} placeholder="Confirm New Password"  {...register('confirmNewPassword')}/>
                    <p className="error">{errors.confirmNewPassword?.message}</p>
                    <div className="passwordReveal" >
                        <input type="checkbox" name="" id="" onClick={() =>{
                            setShowPassword(showPassword == 'text' ? 'password' : 'text') 
                        }}/>
                        <p> Show Password </p>
                    </div>

                    <button onClick={handleSubmit(onUpdate)} style={{color: 'black'}}> 
                            Save 
                    </button>
                </form> */}
        </div>
    )
}



const UpdatePassword = ({}) => {
    return(
        <>
        </>
    )
}