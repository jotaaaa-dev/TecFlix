import React from 'react';
import './Cabecalho.css';
// eslint-disable-next-line
export default ({fundo}) => {
    return (
        <header className={fundo ? 'fundo' : ''}>
            <div className="cabecalho--logo">
                <a href="/">
                    <img src="https://fontmeme.com/permalink/210401/f169c0f457a32ebf164ad097ff942706.png" alt="Tecflix"/>
                </a>
            </div>
            <div className="cabecalho--usuario">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="Usuário"/>
                </a>
            </div>
        </header>
    )
}