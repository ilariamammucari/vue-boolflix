var app = new Vue({
    el: '#root',
    data:{
        valoreInput: '',
        apiKey: '64ea8cbbcce6f7fd105fce2d2c4b9e9a',
        lingua: 'it-IT',
        films: '',
        series: '',
        baseIndirizzoImg: 'https://image.tmdb.org/t/p/w342'
    },
    methods: {
        ricercaInput(){
            // metto i parametri in una costante così non devo ripeterli per ogni chiamata
            const parametri = {
                api_key: this.apiKey,
                query: this.valoreInput,
                language: this.lingua
            };

            // metto i .get() delle chiamate nella costante
            const movieReq = axios.get("https://api.themoviedb.org/3/search/movie", { params: parametri });
            const serieTvReq = axios.get("https://api.themoviedb.org/3/search/tv", { params: parametri });

            // in questo modo entro nel .then() solo quando entrambe le chiamate sono avvenute così non ho problemi di caricamenti differenti
            axios.all( [movieReq,serieTvReq] ).then(axios.spread((movie,serieTv) => {
                this.films = movie.data.results;
                this.series = serieTv.data.results;

                this.voto(this.films);
                this.voto(this.series);

                this.valoreInput = '';
            })).catch((error) => alert('errori'));
        },
        voto(array){
            array.forEach((element) => {
                element.vote_average = parseInt(element.vote_average * 5 / 10);
            });
        }
    }
});