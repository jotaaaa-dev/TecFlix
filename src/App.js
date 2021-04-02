import React, { useEffect , useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import Linhadefilme from './components/LinhaDeFilme';
import FilmeDestaque from './components/FilmeDestaque';
import Cabecalho from './components/Cabecalho/';

// eslint-disable-next-line
export default () => {

  /* Definição da váriavel de lista de filme, que será utilizada para exibir todas as listas de filme na página principal */
  const [listaFilme, setlistaFilme] = useState ([]);
  /* Definição da váriavel de dados do filme destaque, que será exibido também na página inicial mas separadamente dos outros filmes, como um destaque */
  const [dadosDestaque, setDadosDestaque] = useState(null);
  /* Definição da váriavel da cor do fundo do cabeçalho (header), utilizada no momento da rolagem pela página, com a função de aparecer e desaparecer */
  const [fundoCabecalho, setFundoCabecalho] = useState(false);

  useEffect(()=>{
    const carregarTudo = async () => {
      // Pegando a lista total dos filmes da página principal
      let list = await Tmdb.getHomeList();
      setlistaFilme(list);

      // Pegando o Destaque
      let originais = list.filter(i=>i.slug === 'originais');
      let escolhaAleatoria = Math.floor(Math.random() * (originais[0].items.results.length - 1));
      let escolhido = originais[0].items.results[escolhaAleatoria]
      let infoEscolhido = await Tmdb.getInfoFilme(escolhido.id, 'tv');
      setDadosDestaque(infoEscolhido);
      /* Nesta parte temos uma função matemática para escolher aleatóriamente um filme da lista de originais da TECFLIX (NETFLIX) e assim mostrá-lo no destaque da página */
    }

    carregarTudo();
  }, []);
  
  /* O uso do hook "useEffect" nesta situação serve para perceber um ação dentro da página, que no caso é a ação de rolagem da página.
     Assim sua funcionalidade é que quando ele percebe esta rolagem da página, ativa-se ou desativa-se o "setFundoCabecalho" que fará com que a parte de
     cima da página (o header) fique preto ou transparente, e assim não interrompa a busca dos filmes pela lista */
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

  
/* Montagem da página, disposição dos elementos, cabeçalho, o filme destaque, as listas dos filmes, o 
   rodapé da página e a função de carregar (loading) antes de abrir a página */
  return (
    <div className="page">

      <Cabecalho fundo={fundoCabecalho}/>

      {dadosDestaque &&
        <FilmeDestaque item={dadosDestaque} />
      }

      <section className="listas">
        {listaFilme.map((item, key)=>(
          <Linhadefilme key={key} title={item.titulo} items={item.items} />
        ))}
      </section>

      <footer>
        Feito com <span role="img" aria-label="coração">💖</span> por Jean e Nicolas<br/>
        Direitos de imagem para Netflix<br/>
        API utilizada do site Themoviedb.org
      </footer>

      {listaFilme.length <= 0 &&
      <div className="carregando">
        <img src="https://motamachado.com.br/wp-content/themes/motamachado/assets/images/carregando.gif" alt="Carregando"/>
      </div>
      }
    </div>
  );
}