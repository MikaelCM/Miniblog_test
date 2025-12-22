import { useNavigate } from 'react-router-dom';
import { useAuthentication } from '../../hooks/useAuthentication';
import styles from './Register.module.css'

import { useState, type FormEventHandler } from 'react'

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { createUser, error: authError, loading } = useAuthentication();
  const navigate = useNavigate();

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      displayName: displayName,
      email: email,
      password: password,
    };

    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais!")
      return;
    }

    const createdUser = await createUser(user);

    if (createdUser) {
      navigate("/");
    }
  }

  return (
    <div className={styles.register}>
      <header>
        <h1>Cadastre-se para postar</h1>
        <p>Crie seu usuário e compartilhe suas histórias</p>
      </header>

      <main>

        <form onSubmit={handleSubmit}>

          <label>
            <span>Nome:</span>
            <input
              type="text"
              name='displayName'
              required
              placeholder='Nome do usuário'
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </label>

          <label>
            <span>E-mail:</span>
            <input
              type="email"
              name='email'
              required
              placeholder='E-mail do usuário'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            <span>Senha:</span>
            <input
              type="password"
              name='password'
              required
              placeholder='Insira sua senha'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <label>
            <span>Confirmação de senha:</span>
            <input
              type="password"
              name='confirmPassword'
              required
              placeholder='Confirme a sua senha'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>

          {!loading ? (
            <button className='btn'>Cadastrar</button>
          ) : (
            <button className='btn' disabled>Aguarde...</button>
          )}

          {error && (
            <p className='error'>{error}</p>
          )}

          {authError && (
            <p className="error">{authError}</p>
          )}
        </form>

      </main>
    </div>
  )
}

export default Register