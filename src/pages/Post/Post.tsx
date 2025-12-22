import useFetchDocument from '../../hooks/UseFetchDocument';
import styles from './Post.module.css'

// Hooks
import { useParams } from 'react-router-dom'

const Post = () => {
    const {id} = useParams();
    const {document: post, loading} = useFetchDocument("posts", id);

    return (
        <div className={styles.post_container}>
            {loading && <p>Carregando post...</p>}
            {post && (
                <>
                    <h1>{post.title}</h1>
                    <img src={post.image} alt={post.title} />
                    <p>{post.body}</p>
                    <h2>Este post trata sobre:</h2>
                    <div className={styles.tags}>
                        {post.tagsArray.map((tag: string) => (
                            <p key={tag}>
                                <span>#</span>
                                {tag}
                            </p>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default Post