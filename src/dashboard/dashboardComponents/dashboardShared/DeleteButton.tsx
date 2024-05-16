import { Tooltip } from '@mui/joy';
import { FC, JSX } from 'react'
import { MdDelete } from 'react-icons/md'
import ButtonLoader from './ButtonLoader';

export interface IDeleteButton {
    onClick?: (e: any) => any;
    Icon?: FC | typeof MdDelete;
    IconSize?: number | string;
    mode?: "word" | "icon" | "both";
    customWord?: null | string;
    className?: string;
    disabled?: boolean;
    isLoading?: boolean;
}

function DeleteButton({ onClick, Icon = MdDelete, IconSize = 16, mode = "icon", customWord = null, className, disabled = false, isLoading = false }: IDeleteButton) {

    return (
        <Tooltip title={mode === "icon" ? (!customWord ? "Delete" : customWord) : undefined}>
            <button className={`px-2 py-1 rounded-md bg-red-600 duration-500 hover:bg-red-800 disabled:hover:bg-red-600 disabled:opacity-80 text-white ${className}`}
                onClick={(e) => {
                    if (onClick) {
                        onClick(e)
                    }
                }}

                disabled={disabled}>
                {mode === "icon" ? <Icon size={IconSize} /> : (mode === "word" ? (!customWord ? "Delete" : customWord) :
                    <div className='flex gap-x-1 items-center justify-center'>
                        <Icon size={IconSize} /> {(!customWord ?
                            // Not custom word and mode set to both
                            <span className='flex items-center justify-center gap-x-1'>
                                <span>Delete </span> {isLoading && <ButtonLoader />}
                            </span>
                            :
                            // custom word and mode set to both
                            <span className='flex gap-x-1 items-center justify-center'>
                                <span>{customWord}</span> {isLoading && <ButtonLoader />}
                            </span>)}
                    </div>)}

            </button>
        </Tooltip>
    )
}

export default DeleteButton