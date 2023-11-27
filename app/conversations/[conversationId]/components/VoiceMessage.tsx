// 'use client';
// import React, { useEffect, useRef, useState } from 'react';
// import WaveSurfer from 'wavesurfer.js';



// const VoiceMessage = ({message}) => {

//     const [{userId, username, avatar}] = useStateValue();
//     const [audioMessage, setAudioMessage] = useState(null);
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [currentPlaybackTime, setCurrentPlaybackTime] = useState<number>(0);
//     const [totalDuration, setTotalDuration] = useState<number>(0);


//     const waveFormRef = useRef<HTMLDivElement | null>(null);
//     const waveform = useRef<HTMLDivElement | null>(null)


//     useEffect(() => {
//         if (waveform.current===null) {

//             const waveform.current = WaveSurfer.create({
//                 container: waveFormRef.current!,
//                 waveColor: "#ccc",
//                 progressColor: "#4a9eff",
//                 cursorColor: "#7ae3c3",
//                 barWidth: 3,
//                 height: 30,
//                 // responsive: true,
//             });
//             waveform.current.on("finish", () => {
//                 setIsPlaying(false);
//                 // setCurrentPlaybackTime(0);
//             });
//         }

       

//         return () => {
//             waveform.current.destroy();
//         };
//     }, []);

//     useEffect(() => {
//         const audioURL= `${HOST}/${message.message}`;
//         const audio = new Audio(audioURL);
//         setAudioMessage(audio);
//         waveform.current.load(audioURL);
//         waveform.current.on("ready", () => {
//             setTotalDuration(waveform.current.getDuration());
//         });
//     }, [message.message]);


//     useEffect(() =>{
//         if(audioMessage){
//             const updatePlaybackTime = () => {
//                 setCurrentPlaybackTime(audioMessage.currentTime);
//             };
//             audioMessage.addEventListener("timeupdate", updatePlaybackTime);
//             return () => {
//                 audioMessage.removeEventListener("timeupdate", updatePlaybackTime);
//             };
//         }
//     }, [audioMessage]);

//     const formatTime = (time: number): string => {
//         const minutes = Math.floor(time / 60);
//         const seconds = Math.floor(time % 60);
//         return `${minutes}:${seconds.toString().padStart(2, '0')}`;
//     };

//     const handlePlayAudio = () => {
//         if (audioMessage
//             // && waveform
//             ) {
//             waveform.current.stop();
//             waveform.current.play();
//             audioMessage.play();
//             setIsPlaying(true);
//         }
//     };

//     const handlePauseAudio = () => {
        
//             // waveform && 
//             waveform.current.stop();
//             audioMessage.pause();
//             setIsPlaying(false);
//         };
//     };


//     return ( 
//         <div>
//             VoiceMessage
//         </div>
//      );
// }
 
// export default VoiceMessage;

// function useStateValue(): [{ userId: any; username: any; avatar: any; }, any] {
//     throw new Error('Function not implemented.');
// }
