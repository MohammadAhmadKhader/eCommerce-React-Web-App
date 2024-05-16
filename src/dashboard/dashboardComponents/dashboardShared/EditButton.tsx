import { Tooltip } from '@mui/joy';
import { FC } from 'react'
import { FaEdit } from "react-icons/fa";
import ButtonLoader from './ButtonLoader';

export interface IEditButton {
    onClick?: () => any;
    Icon?: typeof FaEdit | FC;
    IconSize?: number | string;
    mode?: "word" | "icon" | "both";
    disabled?: boolean;
    customWord?: null | string;
    className?: string;
    isLoading?: boolean;
}

function EditButton({ onClick, Icon = FaEdit, IconSize = 16, mode = "icon", disabled = false, customWord = null, className = "", isLoading = false }: IEditButton) {
    return (
        <Tooltip title={mode === "icon" ? (customWord ? customWord : "Edit") : undefined}>
            <button className={`px-2 py-1 rounded-md bg-blue-500 duration-500 hover:bg-blue-700 hover:disabled:bg-blue-500 disabled:opacity-80
     text-white ${className}`} onClick={() => {
                    if (onClick) {
                        onClick()
                    }
                }} disabled={disabled}>

                {mode === "icon" ? <Icon size={IconSize} /> : (mode === "word" ? (customWord ? <span className='flex items-center justify-center gap-x-3'><span>{customWord} {isLoading && <ButtonLoader />}</span>
                    {isLoading && <ButtonLoader />}
                </span> : <span>Edit</span>) :
                    <div className='flex gap-x-1 items-center justify-center'>
                         <Icon size={IconSize} /> {customWord ? customWord : "Edit"} {isLoading &&  <ButtonLoader />}
                    </div>)}
            </button>
        </Tooltip>
    )
}

export default EditButton