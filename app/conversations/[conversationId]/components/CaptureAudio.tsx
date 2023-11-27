

// import React, { useRef, useState } from 'react';
// import { FaMicrophone, FaPauseCircle, FaPlay, FaStop, FaTrash } from 'react-icons/fa';
// import { useEffect } from 'react';

// import { MdSend } from 'react-icons/md';
// import WaveSurfer from 'wavesurfer.js';
// import axios from 'axios';
// import pusher from 'pusher';
// import user from 'pusher-js/types/src/core/user';
// import useConversation from '@/app/hooks/useConversation';







// const CaptureAudio = ({ hide }: { hide: () => void }) => {
//     const { conversationId } = useConversation();

//     const [isRecording, setIsRecording] = useState(false);
//     const [recordedAudio, setRecordedAudio] = useState<HTMLAudioElement | null>(null);
//     const [waveform, setWaveform] = useState<WaveSurfer | null>(null);
//     const [recordingDuration, setRecordingDuration] = useState<number>(0);
//     const [currentPlaybackTime, setCurrentPlaybackTime] = useState<number>(0);
//     const [totalDuration, setTotalDuration] = useState<number>(0);
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [renderedAudio, setRenderedAudio] = useState<HTMLAudioElement | null>(null);


//     const audioRef = useRef<HTMLAudioElement | null>(null);
//     const mediaRecorderRef = useRef<MediaRecorder | null>(null);
//     const waveFormRef = useRef<HTMLDivElement | null>(null);

//     useEffect(() =>{
//         let interval: string | number | NodeJS.Timer | undefined;
//         if (isRecording) {
//             interval = setInterval(() => {
//                 setRecordingDuration((prevDuration)=>{
//                     setTotalDuration(prevDuration + 1);
//                     return prevDuration + 1;
//                 });
//             }, 1000);
//         }
//         return () => {clearInterval(interval);
//         };
//     }, [isRecording]);

//     useEffect(() => {
//             const wavesurfer = WaveSurfer.create({
//                 container: waveFormRef.current!,
//                 waveColor: "#ccc",
//                 progressColor: "#4a9eff",
//                 cursorColor: "#7ae3c3",
//                 barWidth: 3,
//                 height: 30,
//                 // responsive: true,
//             });
//             setWaveform(wavesurfer)

//             wavesurfer.on("finish", () => {
//                 setIsPlaying(false);
//                 // setCurrentPlaybackTime(0);
//             });

//             return () => {
//                 wavesurfer.destroy();
//             };
//         }, []);

//         useEffect(() => {
//             if(waveform) handleStartRecording();
//         }, [waveform]);

//     const handleStartRecording = () => {
//         setRecordingDuration(0);
//         setCurrentPlaybackTime(0);
//         setTotalDuration(0);
//         setIsRecording(true);
//         setRecordedAudio(null);
//         navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
//             const mediaRecorder = new MediaRecorder(stream);
//             mediaRecorderRef.current = mediaRecorder;
//             if (audioRef.current) {
//                 audioRef.current.srcObject = stream;
//             }

//             const chunks: BlobPart[] = [];
//             mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
//             mediaRecorder.onstop = () => {
//                 const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
//                 const audioURL = window.URL.createObjectURL(blob);
//                 const audio = new Audio(audioURL);
//                 setRecordedAudio(audio);

//                 if (waveform) {
//                     waveform.load(audioURL);
//                 }
//             };

//             mediaRecorder.start();
//         }).catch(error => {
//             console.log(error);
//         });
//     };

//     const handleStopRecording = () => {
//         if (mediaRecorderRef.current && isRecording) {
//             mediaRecorderRef.current.stop();
//             setIsRecording(false);
//             waveform?.stop();
    
//             const audioChunks: BlobPart[] = [];
//             mediaRecorderRef.current.addEventListener("dataavailable", (event) => {
//                 audioChunks.push(event.data);
//             });
    
//             mediaRecorderRef.current.addEventListener("stop", () => {
//                 const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
//                 const audioFile = new File([audioBlob], "recording.mp3");
//                 setRenderedAudio(audioFile);
//                 // const audioURL = URL.createObjectURL(audioBlob);
//                 // setRenderedAudio(new Audio(audioURL));
//             });
//         }
//     };
    
//     useEffect(() =>{
//         if(recordedAudio){
//             const updatePlaybackTime = () => {
//                 setCurrentPlaybackTime(recordedAudio.currentTime);
//             };
//             recordedAudio.addEventListener("timeupdate", updatePlaybackTime);
//             return () => {
//                 recordedAudio.removeEventListener("timeupdate", updatePlaybackTime);
//             };
//         }
//     }, [recordedAudio]);

//     const handlePlayRecording = () => {
//         if (recordedAudio
//             // && waveform
//             ) {
//             waveform.stop();
//             waveform.play();
//             recordedAudio.play();
//             setIsPlaying(true);
//         }
//     };

//     const handlePauseRecording = () => {
//         if (
//             // waveform && 
//             recordedAudio) {
//             waveform.stop();
//             recordedAudio.pause();
//             setIsPlaying(false);
//         }
//     };
   
      
//     // const onSubmit: SubmitHandler<FieldValues> = (data) => {
//     //     setValue('message', '', { shouldValidate: true });
//     //     axios.post('/api/messages', {
//     //       ...data,
//     //       conversationId: conversationId
//     //     })
//     //   };


//     // const recordedAudioToBlob = async (audio: HTMLAudioElement): Promise<Blob> => {
//     //     return new Promise((resolve) => {
//     //         const blob = new Blob([audio.src], { type: 'audio/ogg; codecs=opus' });
//     //         resolve(blob);
//     //     });
//     // };
    
//     // const saveAudioToServer = async (audioBlob: Blob): Promise<string> => {
//     //     const formData = new FormData();
//     //     formData.append('audio', audioBlob, 'audio.ogg');
    
//     //     try {
//     //         const response = await fetch('/api/upload-audio', {
//     //             method: 'POST',
//     //             body: formData,
//     //         });
    
//     //         if (response.ok) {
//     //             const data = await response.json();
//     //             return data.audioUrl;
//     //         } else {
//     //             throw new Error('Error uploading audio');
//     //         }
//     //     } catch (error) {
//     //         console.error('Error uploading audio:', error);
//     //         throw error;
//     //     }
//     // };
    

//     const sendRecording = async () => {
//         // try {
//         //     const formData = new FormData();
//         //     formData.append("audio", renderedAudio); 
//         //     const response = await axios.post('/api/upload-audio', formData, {
//         //         headers: {
//         //             'Content-Type': 'multipart/form-data',
//         //         },
//         //         params: {
//         //             conversationId: conversationId
//         //         },
//         //     });
//         //     if (response.status === 201) {
//         //         pusher.current.emit('message', {
//         //             conversationId: conversationId,
//         //             senderId: user.id,
//         //             audio: response.data.audioUrl,
//         //         })
//         //     }
//         // } catch (error) {
            
//         // }
//     };
    

    

//     // const formatTime = (time: number): string => {

//     //     const  minutes = Math.floor (time/60);
//     //     const seconds = Math.floor(time%60);
//     //     return `${minutes}:${seconds.toString().padStart(2, '0')}}`
//     // };

//     const formatTime = (time: number): string => {
//         const minutes = Math.floor(time / 60);
//         const seconds = Math.floor(time % 60);
//         return `${minutes}:${seconds.toString().padStart(2, '0')}`;
//     };

//     return ( 
//         <div className="flex text-2xl w-full justify-end items-center">
//             <div className="pt-1">
//                 <FaTrash className="text-panel-header-icon cursor-pointer" onClick={() => hide()} />
//             </div>
//             <div className="mx-4 py-2 px-4 text-white text-lg flex gap-3 justify-center items-center bg-indigo-800 rounded-full drop-shadow-lg ">
//                 {
//                     isRecording ? (
//                     <div className="text-red-500 animate-pulse 2-60 text-center">
//                         Recording... <span>{recordingDuration}s</span>
//                     </div>):(
//                     <div>{
//                         recordedAudio && 
//                         <>
//                            {!isPlaying ? <FaPlay className='cursor-pointer' onClick={handlePlayRecording}/> :  <FaStop className='cursor-pointer' onClick={handlePauseRecording}/> }
//                         </>
//                     }</div>
//                 )}
//                 <div className="w-60" ref={waveFormRef}  />
//                 { recordedAudio && isPlaying && (
//                         <span>
//                             {formatTime(currentPlaybackTime)}
//                         </span> )}
//                         {
//                             recordedAudio && !isPlaying && (
//                              <span>{formatTime(totalDuration)}</span>
//                         )}
//                  <audio ref={audioRef} hidden />    
//             </div>
//                  <div className="mr-4">
//                     {!isRecording ? ( <FaMicrophone className="text-red-500 cursor-pointer" onClick={handleStartRecording}/> ):( <FaPauseCircle className="text-red-500 cursor-pointer" onClick={handleStopRecording}/>)}
//                 </div>  
//                 <div>
//                     <MdSend className=" cursor-pointer" onClick={sendRecording} />
          
//                 </div> 
            
//         </div>
//      );
// }
 
// export default CaptureAudio;




