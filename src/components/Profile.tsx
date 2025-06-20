import { useParams, Link } from "react-router-dom";
import mockData from "../data/videos.json";

const Profile = () => {
    const { userName } = useParams();
    if (localStorage.getItem('userId') && localStorage.getItem('userId') === userName) {
        return (
            <div className="min-h-screen bg-white text-black">
                <div className="flex items-center gap-4 p-4 border-b border-gray-700">
                    <img src={'/image.png'} className="w-16 h-16 rounded-full" />
                    <div>
                        <p className="text-xl font-bold">{userName}</p>
                        <p className="text-gray-400">@{userName.toLowerCase().replace(/\s/g, '')}</p>
                    </div>
                </div>
                <Link to="/" className="text-center block text-blue-400 py-4">
                    ← Back to Feed
                </Link>
            </div>
        )
    }
    const user = mockData.find((u) => u.userName === userName);

    if (!user) {
        return <div className="text-white p-4">User not found</div>;
    }
    console.log(user)
    return (
        <div className="min-h-screen bg-white text-black">
            <div className="flex items-center gap-4 p-4 border-b border-gray-700">
                <img src={user.userImage} className="w-16 h-16 rounded-full" />
                <div>
                    <p className="text-xl font-bold">{user.userName}</p>
                    <p className="text-gray-400">@{user.userName.toLowerCase().replace(/\s/g, '')}</p>
                </div>
            </div>

            <p className="px-4">Vidoes</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-4">
                {user.video.map((vid, i) => (
                    <video
                        key={i}
                        src={vid.videoUrl}
                        className="w-auto   object-cover"
                        muted
                        loop
                        autoPlay
                    />
                ))}
            </div>

            <Link to="/" className="text-center block text-blue-400 py-4">
                ← Back to Feed
            </Link>
        </div>
    );
};

export default Profile;
