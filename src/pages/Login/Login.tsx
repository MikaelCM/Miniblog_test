import styles from './Login.module.css'

import { useAuthentication } from '../../hooks/useAuthentication';

import { useState, type FormEventHandler } from 'react'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error: authError, loading } = useAuthentication();

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

   e.preventDefault();

    await login({
      email,
      password,
    });
  };

  return (
    <div className={styles.login}>
      <header>
        <h1>Entrar</h1>
        <p>Faça o login para poder utilizar o sistema</p>
      </header>
      <main>
        <form onSubmit={handleSubmit}>

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

          {!loading ? (
            <button className='btn'>Entrar</button>
          ) : (
            <button className='btn' disabled>Aguarde...</button>
          )}
          
          {authError && (
            <p className='error'>{authError}</p>
          )}
        </form>
      </main>
    </div>
  )
}

export default Login