import { useState, useEffect } from "react";

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
        return <div>Loading...</div>;
    }

    return (
        <div className="post-list">
            {posts.map(post => (
                <div className="post" key={post.id}>
                    <h2>{users[post.userId]}</h2>
                    <h1>{post.title}</h1>
                    <p>{post.body}</p>
                </div>
            ))}
        </div>
    );
}

export default Posts;