import { useState, useEffect } from "react";

function Comentarios({postId}) {
    const [comentarios, setComentarios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchComentarios() {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
            const comentariosList = await res.json();
            setComentarios(comentariosList);
            setLoading(false);
        }

        fetchComentarios();
    }, [postId]);

    if (loading) {
        return <div>Cargando comentarios...</div>;
    }

    return (
        <div className="comentarios">
            {comentarios.map(comentario => (
                <div className="comentario" key={comentario.id}>
                    <p><strong>{comentario.name}</strong> ({comentario.email})</p>
                    <p>{comentario.body}</p>
                </div>
            ))}
        </div>
    );
}

export default Comentarios;