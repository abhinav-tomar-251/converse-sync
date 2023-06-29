'use client';

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
    placeholder?: string;
    id: string;
    required?: boolean;
    type?: string;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors
}

const MessageInput: React.FC<MessageInputProps>  = ({
    placeholder,
    id,
    required,
    type,
    register,
    errors
}) => {
    return ( 
        <div className="relative w-full">
            <input
                id={id}
                type={type}
                autoComplete={id}
                {...register(id, { required })}
                placeholder={placeholder}
                className="font-light text-black px-4 py-2 w-full rounded-full bg-neutral-100 focus:outline-none"/>
                
        </div>
     );
}
 
export default MessageInput ;