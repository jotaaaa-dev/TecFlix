import React, { useEffect , useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import Linhadefilme from './components/LinhaDeFilme';
import FilmeDestaque from './components/FilmeDestaque';
import Cabecalho from './components/Cabecalho/';

// eslint-disable-next-line
export default () => {

  const [movieList, setMovieList] = useState ([]);
  const [dadosDestaque, setDadosDestaque] = useState(null);
  const [fundoCabecalho, setFundoCabecalho] = useState(false);

  useEffect(()=>{
    const carregarTudo = async () => {
      // Pegando a lista total dos filmes da página principal
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //Pegando o Destaque
      let originais = list.filter(i=>i.slug === 'originais');
      let escolhaAleatoria = Math.floor(Math.random() * (originais[0].items.results.length - 1));
      let escolhido = originais[0].items.results[escolhaAleatoria]
      let infoEscolhido = await Tmdb.getInfoFilme(escolhido.id, 'tv');
      setDadosDestaque(infoEscolhido);
    }

    carregarTudo();
  }, []);

  useEffect(()=>{
    const scrollCheck = () => {
      if(window.scrollY > 10) {
        setFundoCabecalho(true);
      } else {
        setFundoCabecalho(false);
      }
    }
    window.addEventListener('scroll', scrollCheck);
    return () => {
    window.removeEventListener('scroll', scrollCheck);
    }
  }, []);

  return (
    <div className="page">

      <Cabecalho fundo={fundoCabecalho}/>

      {dadosDestaque &&
        <FilmeDestaque item={dadosDestaque} />
      }

      <section className="listas">
        {movieList.map((item, key)=>(
          <Linhadefilme key={key} title={item.titulo} items={item.items} />
        ))}
      </section>

      <footer>
        Feito com <span role="img" aria-label="coração">💖</span> por Jean e Nicolas<br/>
        Direitos de imagem para Netflix<br/>
        Dados pegos do site Themoviedb.org
      </footer>

      {movieList.length <= 0 &&
      <div className="carregando">
        <img src="https://motamachado.com.br/wp-content/themes/motamachado/assets/images/carregando.gif" alt="Carregando"/>
      </div>
      }
    </div>
  );
}