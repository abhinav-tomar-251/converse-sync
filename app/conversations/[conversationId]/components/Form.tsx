'use client';

import { 
  HiPaperAirplane, 
  HiPhoto
} from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { 
  FieldValues, 
  SubmitHandler, 
  useForm 
} from "react-hook-form";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import useConversation from "@/app/hooks/useConversation";
import { BsEmojiSmile } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
// import CaptureAudio from "./CaptureAudio";
import dynamic from "next/dynamic";

// const CaptureAudio = dynamic(()=> import('./CaptureAudio'),{ssr:false,});
const Form = () => {
  const { conversationId } = useConversation();
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      message: ''
    }
  });



  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue('message', '', { shouldValidate: true });
    axios.post('/api/messages', {
      ...data,
      conversationId: conversationId
    })
  };

  const handleUpload = (result: any) => {
    axios.post('/api/messages', {
      image: result?.info?.secure_url,
      conversationId
    })
  }

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (event.target.id !== "emoji-open") {
        if (emojiPickerRef.current &&
            !(emojiPickerRef.current as HTMLElement).contains(event.target)) {
          setShowEmojiPicker(false);
        }
      }
    }
    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    }
  }, [emojiPickerRef]);

  const handleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  }

  const handleEmojiClick = (emoji: any) => {
    setValue('message' + `${emoji.emoji}`, { shouldValidate: true });
    // setValue((message) => (message += emoji.emoji));
  }

  const [showAudioRecorder, setshowAudioRecorder] = useState(false);

  


  return ( 
    <div 
      className="
        py-4 
        px-4 
        bg-indigo-200
        border-t 
        flex 
        items-center 
        gap-2 
        lg:gap-4 
        w-full
      "
    >
{!showAudioRecorder && (
    <>
      <BsEmojiSmile
        size={32}
        className="text-indigo-900 cursor-pointer hover:text-indigo-800"
        id="emoji-open"
        title="Emoji"
        onClick={handleEmojiPicker}
      />
      {showEmojiPicker && (
        <div className="absolute bottom-24 z-40" ref={emojiPickerRef}>
        <EmojiPicker 
          onEmojiClick={handleEmojiClick}
        />
        </div>
      )}
      
      <CldUploadButton 
        options={{ maxFiles: 10 }} 
        onUpload={handleUpload} 
        uploadPreset="tugcgfjm"
      >
        <HiPhoto size={30} className="text-indigo-900" />
      </CldUploadButton>
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput 
          id="message" 
          register={register} 
          errors={errors} 
          required 
          placeholder="Type your message here..."
        />
          {/* <FaMicrophone
          size={30}
          className="text-indigo-900 cursor-pointer hover:text-indigo-800"
          onClick={() => setshowAudioRecorder(true)}
        /> */}
        <button
          type="submit"
          className="
            bg-indigo-900 
            text-white 
            rounded-full 
            p-2 
            hover:bg-indigo-800 
            transition 
            duration-200 
            ease-in-out
          "
        >
          <HiPaperAirplane size={30} />
        </button>
      </form>
 </>
 )}
  {/* {showAudioRecorder && (
    <CaptureAudio hide={() => setshowAudioRecorder(false)} />
  )} */}
    </div>
   
  );
}
 
export default Form;