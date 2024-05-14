import { Tooltip } from '@mui/joy';
import { FC } from 'react'
import { MdDelete } from 'react-icons/md'

export interface IDeleteButton {
    onClick: () => any;
    Icon?: FC | typeof MdDelete;
    IconSize?: number | string;
    mode? :"word" | "icon" | "both"
}

function DeleteButton({ onClick, Icon = MdDelete, IconSize = 16 ,mode = "icon"}: IDeleteButton) {
    return (
        <Tooltip title={mode=== "icon" ? "Delete" : undefined}>
            <button className='px-2 py-1 rounded-md bg-red-600 duration-500 hover:bg-red-800
     text-white' onClick={() => onClick()}>
                {mode === "icon" ? <Icon size={IconSize} /> : (mode === "word" ? "Delete" :
                 <div className='flex gap-x-1 items-center justify-center'> <Icon size={IconSize} /> Delete</div>)}
                
            </button>
        </Tooltip>
    )
}

export default DeleteButton