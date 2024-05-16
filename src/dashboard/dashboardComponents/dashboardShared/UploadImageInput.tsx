import React, { CSSProperties, Dispatch, SetStateAction, useRef, useState } from 'react';
import Button from '@mui/joy/Button';
import SvgIcon from '@mui/joy/SvgIcon';
import { styled } from '@mui/joy';
import { UseFormSetValue, UseFormTrigger } from 'react-hook-form';

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;
export interface IUploadImageInput<T> {
    text: string;
    filesNames: string[] | undefined;
    setFilesNames: Dispatch<SetStateAction<string[]>> | undefined;
    type?: "accent";
    name?: string;
    multiple?: boolean;
    reactFormHookSetValue?: UseFormSetValue<T>;
    setImageValue?: React.Dispatch<SetStateAction<any>>;
    className?: string;
    style?: CSSProperties;
    showImageName?: boolean;
    filesNamesClasses?: string;
    filesNamesParentClasses?: string;
}


export default function UploadImageInput({ text, type = "accent", reactFormHookSetValue, setImageValue, multiple = false,
    name = "image", className = "", style = {}, showImageName = false, filesNames, setFilesNames, filesNamesClasses, filesNamesParentClasses }: IUploadImageInput<any>) {
    const inputRef = useRef(null);

    return (
        <>
            <Button
                className={`${className}`}
                component="label"
                role={"img"}
                tabIndex={-1}
                sx={{
                    backgroundColor: "transparent",
                    border: "1px solid var(--accent-color)",
                    color: "var(--accent-color)",
                    transition: "all 300ms",
                    ":hover,:active": {
                        backgroundColor: "var(--accent-color)",
                        color: "white"
                    },
                    ...style
                }}
                startDecorator={
                    <SvgIcon>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            color={`${type === "accent" ? "white" : ""}`}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                            />
                        </svg>
                    </SvgIcon>
                }
            >
                {text}
                <VisuallyHiddenInput ref={inputRef} type="file" multiple={multiple}
                    onChange={(e) => {
                        if (!multiple) {
                            if (setImageValue) {
                                setImageValue(e?.target?.files[0]);
                            }
                            if (reactFormHookSetValue) {
                                reactFormHookSetValue(name, e?.target?.files[0]);
                            }
                        }

                        if (multiple) {
                            if (setImageValue) {
                                setImageValue(e?.target?.files);
                            }
                            if (reactFormHookSetValue) {
                                reactFormHookSetValue(name, e?.target?.files);
                            }
                        }
                        setFilesNames([]);
                        for (let i = 0; i < e?.target?.files.length; i++) {
                            setFilesNames((prevValue) => [...prevValue, e?.target?.files.item(i).name])
                        }

                    }}
                />

            </Button>
            {showImageName && inputRef?.current && filesNames?.length > 0 && <span className={filesNamesParentClasses}>
                {showImageName && inputRef?.current && filesNames.map((fileName, index) => {
                    return (
                        <span key={index} className={`font-semibold text-sm tracking-wide ${filesNamesClasses || ""}`}>{multiple && index + 1 + "."} {(showImageName && inputRef.current) ? fileName : ""}</span>
                    )
                })}</span>}

        </>
    );
}