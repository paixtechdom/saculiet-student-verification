export const UpdatePassword = ({password}) => {
    return(
        <form className="password">
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
            </form>
    )
}