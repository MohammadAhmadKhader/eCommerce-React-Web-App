import { MouseEvent } from 'react'
import ButtonLoader from './ButtonLoader';

export interface ICreateButton {
    onClick?: (e: MouseEvent) => any;
    type?: "submit" | "button" | "reset";
    word?: string;
    className?: string;
    disabled?: boolean;
    isLoading?:boolean;
}




function CreateButton({ onClick, type = "submit", word = "Create", className = "", disabled = false ,isLoading=false}: ICreateButton) {
    return (
        <button className={`text-white font-semibold bg-color-accent px-10 py-1.5 rounded-md duration-300 hover:bg-sky-700 disabled:hover:bg-color-accent disabled:opacity-80 ${className}`} type={`${type}`}
         onClick={(e)=>{
            if(onClick){
                onClick(e)
            }
         }}
            disabled={disabled}
        >
            <span className='flex justify-center items-center gap-x-2'><span>{word}</span> {isLoading && <ButtonLoader />}</span>
        </button>
    )
}

export default CreateButton