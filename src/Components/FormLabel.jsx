export const FormLabel = ({text, icon}) => {
    return(
        <div className="flex items-center gap-2 mb-2 text-gray-700">
            <i className={`bi bi-${icon} text-xl`}></i>
            <label className="text-lg w-full">
                {text}
            </label>
        </div>
    )
}