import styles from './EditPost.module.css'

import { useState, type FormEventHandler } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import useFetchDocument from '../../hooks/UseFetchDocument'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'
import type { Post } from '../../types/Post'

const EditPost = () => {
  const { id } = useParams<{ id: string }>();
  const { document: post } = useFetchDocument("posts", id);

  const { user } = useAuthValue();

  const { updateDocument, response } = useUpdateDocument("posts");

  const navigate = useNavigate();

  const [formError, setFormError] = useState("");

  const typedPost = post as Post;

  const [title, setTitle] = useState(typedPost.title);
  const [image, setImage] = useState(typedPost.image);
  const [body, setBody] = useState(typedPost.body);
  const [tags, setTags] = useState(typedPost.tagsArray.join(", "));

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    setFormError("");

    // Checar todos os valores
    if (!title || !image || !tags || !body) {
      setFormError("Por favor, preencha todos os campos!")
      return;
    };

    // Validate image URL
    try {
      new URL(image);

    } catch (error) {
      if (error instanceof Error) {
        setFormError("A imagem precisa ser uma URL.");
        return;
      };
    };

    // Criar o array de tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    if (!user || !id) {
      setFormError("Erro ao obter dados do usuário.");
      return;
    };

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName ?? ""
    }

    updateDocument(id, data);

    // Redirect to dashboard page
    navigate("/dashboard");
  }

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <header>
            <h1>Editando post: {post.title}</h1>
            <p>Altere os dados do post como desejar.</p>
          </header>

          <div>
            <form onSubmit={handleSubmit}>
              <label>
                <span>Título:</span>
                <input
                  type="text"
                  name='title'
                  required placeholder='Pense num bom título...'
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </label>

              <label>
                <span>URL da imagem:</span>
                <input
                  type="text"
                  name='image'
                  required placeholder='Insira uma imagem que represente o seu post'
                  onChange={(e) => setImage(e.target.value)}
                  value={image}
                />
              </label>

              <p className={styles.preview_title}>Preview da imagem atual:</p>
              <img className={styles.image_preview} src={post.image} alt={post.title} />

              <label>
                <span>Conteúdo:</span>
                <textarea
                  name="body"
                  required
                  placeholder='Insira o conteúdo do post'
                  onChange={(e) => setBody(e.target.value)} value={body}
                ></textarea>
              </label>

              <label>
                <span>Tags:</span>
                <input
                  type="text"
                  name='tags'
                  required placeholder='Insira as tags separadas por vírgula'
                  onChange={(e) => setTags(e.target.value)}
                  value={tags}
                />
              </label>

              {!response.loading ? (
                <button className='btn'>Editar</button>
              ) : (
                <button className='btn' disabled>Aguarde...</button>
              )}

              {response.error && (
                <p className='error'>{response.error}</p>
              )}

              {formError && (
                <p className='error'>{formError}</p>
              )}
            </form>
          </div>
        </>
      )}
    </div>
  )
}

export default EditPost