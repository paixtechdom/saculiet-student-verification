import { useState } from "react"
import { ClipLoader, SyncLoader } from "react-spinners"
import { useForm } from "react-hook-form"
import * as  yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormError } from "../Components/FormError"
import { useContext } from "react"
import { AppContext } from "../assets/Contexts/AppContext"
import axios from "axios"


export const Request = () => {
    const [ isSending, setIsSending ] = useState(false)
    const { dbLocation, setShowAlert, setAlertType, setAlertMessage } = useContext(AppContext)
    
    const schema = yup.object().shape({
        name: yup.string().required('Name cannot be empty').min(3, 'Name is too short'),
        email: yup.string().email('Input a valid email').required('Email cannot be empty'),
        location: yup.string().required('Location cannot be empty').min(15, 'Location provided is too short'),
        reason: yup.string().required('Reason for request cannot be empty').min(10, 'Reason is too short'),

    })
    const { register, handleSubmit, setValue, formState: {errors}, reset } = useForm({
        resolver: yupResolver(schema)
    })


    const HandleSendRequest = (data) => {
        setValue('status', 'pending')
        // setValue('location', 'location is pending')
        // setValue('name', 'name of org')
        // setValue('email', 'emailispending@cmc.coc')
        setValue('userName', data.name.replaceAll(' ', '_'))

        axios.post(`${dbLocation}/organizations.php/request`, data).then(function(res) {
            setShowAlert(true)
            setAlertType('success')
            setAlertMessage(['Request sent successfully!','Keep browsing as you await a feedback'])
            reset({
                name : '',
                email: '',
                location: '',
                reason: '',
            })

        })

    }

    return(
        <div className="center mt-9 pt-9 full">
            <div className="w-11/12 flex-col">
                <h3 className="text-center text-2xl">Send a request to verify Our Students' Certificate</h3>

                <form action="" className="center flex-col my-9 gap-6 border border-gray-50 shadow-xl p-5 rounded-xl" 
                onSubmit={handleSubmit(HandleSendRequest)}
                >
                    <div className="flex flex-col w-full">
                    <div className="flex w-full rounded-xl overflow-hidden border border-gray-50 shadow-lg">
                        <i className="bi bi-person-fill bg-sec text-gray-200 p-2"></i>
                        <input type="text" placeholder="Name of your organizatoin" className="p-2 text-sm outline-none w-full" {...register("name")}/>
                    </div>
                    {
                        errors.name?.message ?
                        <FormError message={errors.name?.message}/> : ''
                    }
                    </div>

                    <div className="flex flex-col w-full">

                        <div className="flex w-full rounded-xl overflow-hidden border border-gray-50 shadow-lg">
                            <i className="bi bi-person-fill bg-blue text-gray-200 p-2"></i>
                            <input type="email" placeholder="Email" className="p-2 text-sm outline-none w-full" {...register("email")}/>
                        </div>
                        {
                            errors.email?.message ?
                            <FormError message={errors.email?.message}/> : ''
                        }
                    </div>
                    <div className="flex flex-col w-full">

                    <div className="flex w-full rounded-xl overflow-hidden border border-gray-50 shadow-lg">
                        <i className="bi bi-person-fill bg-blue text-gray-200 p-2"></i>
                        <input type="text" placeholder="Location" className="p-2 text-sm outline-none w-full" {...register("location")}/>
                    </div>
                        {
                            errors.location?.message ?
                            <FormError message={errors.location?.message}/> : ''
                        }
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="flex w-full rounded-xl overflow-hidden border border-gray-50 shadow-lg">
                            <i className="bi bi-person-fill bg-sec text-gray-200 p-2"></i>
                            <textarea type="text" placeholder="Reason for request" className="min-h-32 max-h-32 p-2 text-sm outline-none w-full" {...register("reason")}/>
                        </div>
                            {
                                errors.email?.message ?
                                <FormError message={errors.email?.message}/> : ''
                            }

                    </div>

                    <button className="bg-blue w-full p-3 text-gray-100 rounded-full flex justify-center items-center gap-1 text-sm">
                        {
                            isSending ?
                            <>
                            <ClipLoader color={'rgb(225, 225, 225)'} size={15} loading={true} speedMultiplier={0.5}/> SENDING...
                            </>
                            
                            :
                            <>
                            SEND REQUEST
                            <i className="bi bi-chevron-right"></i> 
                            </>
                        }
                      
                    </button>

                </form>

            </div>
        </div>
    )
}