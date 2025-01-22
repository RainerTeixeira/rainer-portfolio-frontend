import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type PostCardProps = {
    title: string;
    summary: string;
    imageUrl?: string;
    postId: string;
};

const PostCard: React.FC<PostCardProps> = ({ title, summary, imageUrl, postId }) => {
    const router = useRouter();

    const DEFAULT_IMAGE_URL = "/images/f1.jpg";

    const navigateToPost = () => {
        router.push(`/Blog/Post/${postId}`);
    };

    return (
        <div className="p-6 border rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
            <div className="relative w-full h-48 mb-4">
                <Image
                    src={imageUrl || DEFAULT_IMAGE_URL}
                    alt={title}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                />
            </div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-700 mb-4">{summary}</p>
            <button
                onClick={navigateToPost}
                className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
            >
                Leia mais
            </button>
        </div>
    );
};

export default PostCard;
