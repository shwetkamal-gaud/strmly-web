import { Play, Plus, Search, Video } from "lucide-react"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BottomNav = () => {
    const [userName, setUserName] = useState<string | null>('')
    useEffect(() => {
        if (localStorage.getItem('userId')) {
            setUserName(localStorage.getItem('userId'))
        }
    }, [localStorage])
    return (
        <div className=" bg-gray-800 w-full text-white flex justify-between  px-4 py-3 text-sm rounded-t-md">
            <Play className="rounded" />
            <Video fill="white" />
            <Plus className=" border-white rounded border-[2.3px]" />
            <Search />
            <Link to={`/profile/${userName}`}>
                <img src='/image.png' alt="user-profile" className="w-8 h-8 rounded-full" />
            </Link>
        </div>
    );
}

export default BottomNav