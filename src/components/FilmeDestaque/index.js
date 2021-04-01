import React from 'react';
import './FilmeDestaque.css';
// eslint-disable-next-line
export default ({item}) => {

    let dataLanc = new Date(item.first_air_date);
    let generos = [];
    for(let i in item.genres) {
        generos.push( item.genres[i].name );
    }

    let sinopse = item.overview;
    if(sinopse.lenght > 200) {
        sinopse = sinopse.substring(0, 200)+'...'
    }

    return (
        <section className= "destaque" style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`

        }}>
            <div className="destaque--vertical">
                <div className="destaque--horizontal">
                    <div className="destaque--nome">{item.original_name}</div>
                    <div className="destaque--info">
                    <div className="destaque--pontos">{item.vote_average} pontos</div>
                    <div className="destaque--ano">{dataLanc.getFullYear()}</div>
                    <div className="destaque--temp">{item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : ''}</div>
                    </div>
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