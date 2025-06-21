import { Heart, IndianRupee, Maximize, MessageCircle, Plus, Send, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Video } from '../types/type';


export default function VideoCard({ video }: { video: Video }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [muted, setMuted] = useState(true);
    const [likeCount, setLikeCount] = useState(video.likes);
    const [liked, setLiked] = useState(false);
    const handleLike = async () => {
        const original = likeCount;
        setLikeCount((prev: number) => prev + (liked ? -1 : 1));
        setLiked((prev) => !prev);

        const success = await fakeLikeAPI();

        if (!success) {

            setLikeCount(original);
            setLiked((prev) => !prev);
            alert("Failed to update like.");
        }
    };

    const fakeLikeAPI = () => {
        return new Promise<boolean>((resolve) =>
            setTimeout(() => resolve(Math.random() > 0.1), 700)
        );
    };
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (videoRef.current) {
                    if (entry.isIntersecting) {
                        videoRef.current.play();
                    } else {
                        videoRef.current.pause();
                    }
                }
            },
            { threshold: 0.7 }
        );

        if (videoRef.current) observer.observe(videoRef.current);

        return () => {
            if (videoRef.current) observer.unobserve(videoRef.current);
        };
    }, []);
    useEffect(() => {
        const enableSoundOnFirstClick = () => {
            setMuted(false);
            window.removeEventListener('click', enableSoundOnFirstClick);
        };

        window.addEventListener('click', enableSoundOnFirstClick);

        return () => {
            window.removeEventListener('click', enableSoundOnFirstClick);
        };
    }, []);
    const togglePlay = () => {
        const vid = videoRef.current;
        if (!vid) return;
        if (vid.paused) {
            vid.play();
            
        } else {
            vid.pause();
            
        }
    };

    const toggleMute = () => {
        setMuted(!muted);
    };

    return (
        <div className="relative h-full bg-black">
            <video
                ref={videoRef}
                src={video.videoUrl}
                className="w-full h-full object-cover"
                muted={muted}
                loop
                autoPlay
                playsInline
                onClick={togglePlay}
            />
            <div className='flex flex-col gap-0.5 absolute bottom-6 py-3 px-2 w-full'>
                <div className="space-y-4 self-end text-white text-right text-sm">
                    <button className='flex flex-col items-center' onClick={handleLike}><Heart stroke={liked ? 'red' : 'white'} fill={liked ? 'red' : 'transparent'} /> {likeCount}</button>
                    <div className='flex flex-col items-center'><MessageCircle /> {video.comments}</div>
                    <div className='flex flex-col items-center'><Send /> {video.shares}</div>
                    <div className='flex flex-col items-center'><IndianRupee /> {video.earnings}</div>
                </div>
                <div className=" flex justify-between gap-2 items-end left-0   text-white">
                    <div className='flex flex-col gap-2'>
                        <div className='space-x-2 flex '>
                            <p>#{video.hashtag}</p>
                            <button className='border border-white rounded px-2'><Plus size={15} /></button>
                        </div>
                        <Link to={`/profile/${video.userName}`} className='flex gap-2'>
                            <img src={video.userImage} alt={video.userName} className='w-8 h-8 rounded-full' />
                            <p className="font-semibold">@{video.userName}</p>
                        </Link>
                        <p className="font-bold text-lg">{video.title}</p>
                        <p className="line-clamp-2 break text-sm">{video.description}</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <button className='border border-white rounded text-yellow-600 px-2'>Paid</button>
                        <Maximize />
                    </div>
                </div>
            </div>
            <div className="absolute top-2 right-4 flex gap-4">
                <button onClick={toggleMute}>

                    {muted ? <VolumeX className='text-white' /> : <Volume2 className='text-white' />}
                </button>
            </div>
        </div>
    );
}
