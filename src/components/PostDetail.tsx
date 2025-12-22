import { Link } from 'react-router-dom'
import styles from './PostDetail.module.css'

type PostDetail = {
  id: string;
  title: string;
  image: string;
  createdBy: string;
  tagsArray: string[];
};

type PostDetailProps = {
  post: PostDetail;
};

const PostDetail = ({ post }: PostDetailProps) => {
  return (
    <div className={styles.post_detail}>
      <img src={post.image} alt={post.title} />
      <h2>{post.title}</h2>
      <p className={styles.createdBy}>{post.createdBy}</p>

      <div className={styles.tags}>
        {post.tagsArray.map((tag) => (
          <p key={tag}>
            <span>#</span>{tag}
          </p>
        ))}
      </div>
      <Link to={`/posts/${post.id}`} className='btn btn-outline'>Ler</Link>
    </div>
  )
}

export default PostDetail