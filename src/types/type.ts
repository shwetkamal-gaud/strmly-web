export interface Video{
    id: number;
    videoUrl: string;
    title: string;
    description: string;
    likes: number;
    comments: number;
    shares:number;
    earnings: number;
    isPaid: boolean;
    hashtag: string ;
    userName?: string;
    userImage?: string;
    userId?: number
}

export interface User{
    id: number;
    userName: string;
    userImage: string;
    video:Video[]
}