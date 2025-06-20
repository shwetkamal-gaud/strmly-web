import { Play, Plus, Search, Video } from "lucide-react"

const BottomNav = () => {
    return (
        <div className=" bg-gray-800 text-white flex justify-between px-4 py-3 text-sm rounded-t-md">
            <Play className="rounded"/>
            <Video fill="white"/>
            <Plus className=" border-white rounded border-[2.3px]"/>
            <Search/>
        </div>
    );
}

export default BottomNav