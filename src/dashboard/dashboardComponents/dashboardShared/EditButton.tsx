import { Tooltip } from '@mui/joy';
import { FC } from 'react'
import { FaEdit } from "react-icons/fa";

export interface IEditButton {
    onClick: () => any;
    Icon?: typeof FaEdit | FC;
    IconSize?: number | string;
    mode?: "word" | "icon" | "both"
}

function EditButton({ onClick, Icon = FaEdit, IconSize = 16, mode = "icon" }: IEditButton) {
    return (
        <Tooltip  title={mode=== "icon" ? "Edit" : undefined}>
            <button className='px-2 py-1 rounded-md bg-blue-500 duration-500 hover:bg-blue-700
     text-white' onClick={() => onClick()}>
                {mode === "icon" ? <Icon size={IconSize} /> : (mode === "word" ? "Edit" :
                 <div className='flex gap-x-1 items-center justify-center'> <Icon size={IconSize} /> Edit</div>)}
            </button>
        </Tooltip>
    )
}

export default EditButton