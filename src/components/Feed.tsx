import { useEffect, useRef, useState } from 'react';
import mockData from '../data/videos.json';
import VideoCard from './VideoCard';
import BottomNav from './BottomNav';

const Feed = () => {
    const [users, setUser] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const loaderRef = useRef<HTMLDivElement | null>(null);
    const [hasMore, setHasMore] = useState(true); // new

    const fetchVideos = async () => {
       

        setLoading(true);
        setTimeout(() => {
            const perPage = 1;
            const start = (page - 1) * perPage;
            const flatVideos = mockData.flatMap((user) =>
                user.video.map((vid: any) => ({
                    ...vid,
                    userName: user.userName,
                    userImage: user.userImage,
                    userId: user.id
                }))
            );
            const newVideos = flatVideos.slice(start, start + perPage);
            if (newVideos.length === 0) {
                setHasMore(false);
            } else {
                setUser((prev) => [...prev, ...newVideos]);
                
            }

            setLoading(false);
        }, 800);
    };

    useEffect(() => {
        fetchVideos();
        
    }, [page]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading && hasMore) {
                    setPage((prev) => prev + 1);
                }
            },
            { threshold: 1.0 }
        );
        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [loading, hasMore]);

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center">
            <div>
                <div className="h-screen overflow-y-auto  flex flex-col snap-y no-scrollbar snap-mandatory">
                    {users.map((video, index) => (
                        <div key={`${video.id}-${index}`} className="snap-start   h-screen">
                            <VideoCard video={video} />
                        </div>
                    ))}

                    {hasMore && (
                        <div ref={loaderRef} className="h-32 flex items-center justify-center">
                            {loading && (
                                <div className="flex justify-center items-center h-16">
                                    <div className="w-6 h-6 border-2 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                                </div>
                            )}

                        </div>
                    )}
                </div>
                <div className="sticky  bottom-0 z-50">
                    <BottomNav />
                </div>
            </div>

        </div>
    );
};

export default Feed;
