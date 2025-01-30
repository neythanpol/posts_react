import { useState, useEffect } from "react";
import Comentarios from "./Comentarios";

function Posts() {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPosts() {
            const res = await fetch('https://jsonplaceholder.typicode.com/posts');
            const postList = await res.json();
            setPosts(postList);
            setLoading(false);
        }

        fetchPosts();
    }, []);

    useEffect(() => {
        async function fetchUserNames() {
            const res = await fetch('https://jsonplaceholder.typicode.com/users');
            const userList = await res.json();
            const userMap = userList.reduce((acc, user) => {
                acc[user.id] = user.name;
                return acc;
            }, {});
            setUsers(userMap);
        }

        fetchUserNames();
    }, [posts]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="post-list">
            {posts.map(post => (
                <div className="post" key={post.id}>
                    <h1>{post.title}</h1>
                    <p>{post.body}</p>
                    <p><strong>Autor:</strong> {users[post.userId]}</p>
                    <Comentarios postId={post.id} />
                </div>
            ))}
        </div>
    );
}

export default Posts;