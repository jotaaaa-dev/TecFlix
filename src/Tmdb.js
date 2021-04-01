const API_KEY = '98c875ad5889ce9a2f8a2a0c6ab23963'
const API_BASE = 'https://api.themoviedb.org/3';

/*
Títulos na página inicial do programa

- Originais da Netflix
- Recomendados (Trending)
- Em alta (Top rated)
- Ação
- Comédia
- Terror
- Romance
- Documentários
*/

/* Função para concatenar a url */
    const concUrl = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();
    return json;
}

// eslint-disable-next-line
export default {
    getHomeList: async () => {
        return [
            {
                slug: 'originais',
                titulo: 'Originais do Tecflix',
                items: await concUrl(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`) 
                /* Uso da função de concatenar a URL para encontrar os filmes e seriados originais da "NETFLIX" */
            },
            {
                slug: 'recomendados',
                titulo: "Recomendados para você",
                items: await concUrl(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
                /* Uso da função de concatenar a URL para encontrar os filmes e seriados recomendados para você, relacionados aos filmes que você avaliou positivamente */
            },
            {
                slug: 'alta',
                titulo: "Em Alta",
                items: await concUrl(`/movie/top_rated?&language=pt-BR&api_key=${API_KEY}`)
                /* Uso da função de concatenar a URL para encontrar os filmes e seriados mais assistidos do aplicativo */
            },
            {
                slug: 'acao',
                titulo: "Ação",
                items: await concUrl(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
                /* Uso da função de concatenar a URL para encontrar os filmes e seriados de ação */
            },
            {
                slug: 'comedia',
                titulo: "Comédia",
                items: await concUrl(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
                /* Uso da função de concatenar a URL para encontrar os filmes e seriados de comédia */
            },
            {
                slug: 'terror',
                titulo: "Terror",
                items: await concUrl(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
                /* Uso da função de concatenar a URL para encontrar os filmes e seriados de terror */
            },
            {
                slug: 'romance',
                titulo: "Romance",
                items: await concUrl(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
                /* Uso da função de concatenar a URL para encontrar os filmes e seriados de romance */
            },            
            {
                slug: 'documentario',
                titulo: "Documentários",
                items: await concUrl(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
                /* Uso da função de concatenar a URL para encontrar os filmes e seriados sobre documentários */
            }
        ];
    },

// Função para pegar informação do filme para utilizar na area de Destaque

    getInfoFilme : async (movieId, type) =>{
        let info = {};
        if(movieId) {
            switch(type){
                case 'movie':
                    info = await concUrl(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                break;
                 case 'tv':
                    info = await concUrl(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                break;
                default:
                    info = null;
                break;
            }
        }

         return info;
     
    }

}