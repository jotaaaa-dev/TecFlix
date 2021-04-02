import React from 'react';
import './FilmeDestaque.css';
// eslint-disable-next-line
export default ({item}) => {


    /* Uso de uma função do javascript para definir a data de lançamento */
    let dataLanc = new Date(item.first_air_date);
    /* Váriavel para guardar os gêneros da API */
    let generos = [];
    /* Estrutura de repetição para pegar todos os gêneros da API */
    for(let i in item.genres) {
        generos.push( item.genres[i].name );
    }

    /* Váriavel para guardar a sinopse da API */
    let sinopse = item.overview;
    /* Função if (se) para interpretar se a sinopse daquele filme tem mais de 200 caractéres, caso tiver, cortar o 
    conteúdo no máximo de caractéres e concatenar a substring "..." */
    if(sinopse.lenght > 200) {
        sinopse = sinopse.substring(0, 200)+'...'
    }
    
    return (
        /* Seção para trazer a imagem do fundo (backdrop_path) da série ou filme em destaque */
        <section className= "destaque" style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`

        /* Definição da disposição dos itens na área do destaque */
        }}>
            <div className="destaque--vertical">
                <div className="destaque--horizontal">
                    <div className="destaque--nome">{item.original_name}</div>
                    <div className="destaque--info"></div>
                    <div className="destaque--pontos">{item.vote_average} pontos</div>
                    <div className="destaque--ano">{dataLanc.getFullYear()}</div>
                    <div className="destaque--temp">{item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : ''}</div>
                    <div className="destaque--sinopse">{item.overview}</div>
                    <div className="destaque--botoes">
                        <a href={`/watch/${item.id}`}className ="destaque--botaoassistir">► Assistir</a>
                        <a href={`/list/add/${item.id}`}className ="destaque--botaolista">+ Minha Lista</a>
                    </div>
                    <div className="destaque--generos"><strong>Gêneros:</strong> {generos.join(', ')}</div>
                </div>
            </div>
        </section>
    )
}
