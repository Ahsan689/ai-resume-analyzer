import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { formatSize } from '../lib/utils'


interface FileUploaderProps {
    onFileSelect? : (file: File | null) => void
}


const FileUploader = ({onFileSelect}: FileUploaderProps) => {


    const onDrop = useCallback((acceptedFiles: File[]) => {
        // Do something with the files
        const file = acceptedFiles[0] || null

        onFileSelect?.(file)
    }, [onFileSelect])
    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({
        onDrop,
        multiple: false,
        accept:{'application/pdf': ['.pdf']},
        maxSize:20 * 1024 * 1024,
    })

    const file = acceptedFiles[0] || null


    return (
        <div className='w-full gradient-border'>

        <div {...getRootProps()}>
            <input {...getInputProps()} />
          <div className='space-y-4 cursor-pointer'></div>
            <div className='mx-auto w-16 h-16 flex items-center justify-center'>
                <img src='/icons/info.svg' alt='uplaod' className='size-20' />
            </div>
            {file ? (
                <div className='flex items-center space-x-4 p-4 bg-gray-50 rounded-lg'>
                    <div className='flex-1'>
                        <p className='text-sm font-medium text-gray-900 truncate'>{file.name}</p>
                        <p className='text-xs text-gray-500'>{formatSize(file.size)}</p>
                    </div>
                </div>
            ):(
                <div>
                    <p className='text-lg text-gray-500'>
                        <span className='font-semibold'>
                            Click to Upload
                        </span> or drag and drop
                    </p>
                    <p className='text-lg text-gray-500'> PDF (max 20 MB)</p>
                </div>
            )
            }
        </div>
        </div>
    )
}
export default FileUploader
