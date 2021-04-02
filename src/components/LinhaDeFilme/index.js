import React, { useState }from 'react';
import './Linhadefilme.css';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

// eslint-disable-next-line
export default ({title, items}) => {
    const [scrollX, setScrollX] = useState(0)

/* Função matemática para mover as listas para a esquerda */
    const moverSetaEsquerda = () => {
        let x = scrollX + Math.round(window.innerWidth / 2);
        if(x > 0) {
            x= 0;
        }
        setScrollX(x);
    }

/* Função matemática para mover as listas para a direita */
    const moverSetaDireita = () => {
        let x = scrollX - Math.round(window.innerWidth / 2);
        let largLista = items.results.length * 150;
        if((window.innerWidth - largLista) > x){
            x = (window.innerWidth - largLista) - 60;
        }
        setScrollX(x);
    }

    return (
        /* Disposição das listas dos filmes e das setas de movimento */
        <div className="linhasDeFilme">

            <h2>{title}</h2>
            <div className="linhaDeFilme--esquerda" onClick={moverSetaEsquerda}>
                <ArrowLeftIcon style={{fontSize: 50}}/>
            </div>
            <div className="linhaDeFilme--direita" onClick={moverSetaDireita}>
                <ArrowRightIcon style={{fontSize: 50}}/>
            </div>
           
            <div className="linhasDeFilme--areaDaLista">
                <div className="linhasDeFilme--lista" style={{
                    marginLeft: scrollX,
                    width: items.results.length * 150
                }}>     
               {/* Comando para olhar na lista de itens e se tiver algum filme para mostrar ele vai mapear esses filmes*/}
                {items.results.length > 0 && items.results.map((item, key)=>(               
                       
                       <div key={key} className="linhasDeFilme--item">  

                           {/* Comando para mostrar a capa do filme, a capa se encontra no "poster_path", porém ele não vem com a URL completa por ser dinamica,
                            com isso foi montado a url pra obter essas imagens complementado pelo conteudo da "poster_path" */}
                           <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={items.original_title}/>
                       </div>
                    ))}                     
                </div>                   
            </div>            
        </div>
   );
}