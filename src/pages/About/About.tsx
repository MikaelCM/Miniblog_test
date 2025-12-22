// CSS
import styles from './About.module.css'

import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className={styles.about}>
        <header>
            <h1>Sobre o Mini <span>Blog</span></h1>
            <p>Este projeto consiste em um blog feito com React no front-end e Firebase no back-end.</p>
        </header>

        <div>
          <Link to='/posts/create' className='btn'>Criar post</Link>
        </div>
    </div>
  )
}

export default About