import { useEffect, useRef, useState } from 'react';
import mockData from '../data/videos.json';
import VideoCard from './VideoCard';
import BottomNav from './BottomNav';

const Feed = () => {
    const [videos, setVideos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const loaderRef = useRef<HTMLDivElement | null>(null);
    const [hasMore, setHasMore] = useState(true); // new

    const fetchVideos = async () => {
        setLoading(true);
        setTimeout(() => {
            const perPage = 1;
            const start = (page - 1) * perPage;
            const newVideos = mockData.slice(start, start + perPage);

            if (newVideos.length === 0) {
                setHasMore(false); // no more data to load
            } else {
                setVideos((prev) => [...prev, ...newVideos]);
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
        <div className="min-h-screen  overflow-y-auto w-full flex items-center justify-center flex-col snap-y snap-mandatory">
            <div>

                {videos.map((video, index) => (
                    <div key={`${video.id}-${index}`} className="snap-start h-screen">
                        <VideoCard video={video} />
                    </div>
                ))}

                <div className='sticky bottom-0'>
                    <BottomNav />
                </div>
            </div>

            {hasMore && (
                <div ref={loaderRef} className="h-32 flex items-center justify-center">
                    {loading && <span className="text-white">Loading more...</span>}
                </div>
            )}
        </div>
    );
};

export default Feed;
