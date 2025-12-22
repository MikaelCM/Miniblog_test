import styles from './CreatePost.module.css'

import { useState, type FormEventHandler } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'

type PostInsert = {
  title: string;
  image: string;
  body: string;
  tagsArray: string[];
  uid: string;
  createdBy: string | null;
};

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();

  const { insertDocument, response } = useInsertDocument<PostInsert>("posts");

  const navigate = useNavigate();

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    setFormError("");

    // Validate image URL
    try {
      new URL(image);

    } catch (error) {
      if (error instanceof Error) {
        setFormError("A imagem precisa ser uma URL.");
      };
    };

    // Checar todos os valores
    if (!title || !image || !tags || !body) {
      setFormError("Por favor, preencha todos os campos!")
    }

    if (!user) {
      setFormError("Usuário não autenticado.");
      return;
    };

    // Criar o array de tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    if (formError) return;

    await insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    })

    // Redirect to home page
    navigate("/")
  }

  return (
    <div className={styles.create_post}>
      <header>
        <h1>Create Post</h1>
        <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>
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
            <button className='btn'>Cadastrar</button>
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
    </div>
  )
}

export default CreatePost