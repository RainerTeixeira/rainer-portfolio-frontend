"use client";

import React, { useState, useEffect, useCallback } from "react";

interface Comment {
    commentId: string;
    content: string;
    date: string;
    author: string;
}

interface CommentSectionProps {
    postId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [newComment, setNewComment] = useState("");

    const fetchComments = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:4000/blog/posts/${postId}/comments`);
            if (!response.ok) {
                throw new Error("Erro ao carregar comentários");
            }
            const data = await response.json();
            setComments(data.comments || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro desconhecido");
        } finally {
            setLoading(false);
        }
    }, [postId]);

    const handleCommentSubmit = async () => {
        if (!newComment.trim()) return;
        try {
            const response = await fetch(`http://localhost:4000/blog/posts/${postId}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: newComment }),
            });
            if (!response.ok) {
                throw new Error("Erro ao enviar comentário");
            }
            setNewComment("");
            fetchComments(); // Atualiza os comentários após enviar
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro desconhecido");
        }
    };

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    if (loading) {
        return <div>Carregando comentários...</div>;
    }

    if (error) {
        return <div className="text-red-500">Erro: {error}</div>;
    }

    return (
        <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Comentários</h2>
            <div className="space-y-4">
                {comments.map((comment) => (
                    <div key={comment.commentId} className="p-4 border rounded-lg bg-gray-50">
                        <p className="text-sm text-gray-600">{comment.author} - {new Date(comment.date).toLocaleDateString("pt-BR")}</p>
                        <p className="text-gray-800">{comment.content}</p>
                    </div>
                ))}
            </div>
            <div className="mt-4">
                <textarea
                    className="w-full p-2 border rounded-lg"
                    rows={3}
                    placeholder="Escreva seu comentário..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
                    onClick={handleCommentSubmit}
                >
                    Enviar
                </button>
            </div>
        </div>
    );
};

export default CommentSection;
