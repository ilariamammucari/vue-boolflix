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
            axios.get("https://api.themoviedb.org/3/search/movie", {
                params: {
                    api_key: this.apiKey,
                    query: this.valoreInput,
                    language: this.lingua
                }
            }).then((result) => {
                this.films = result.data.results;
                this.valoreInput = '';

                this.voto(this.films);
            }).catch((error) => alert('errori'));

            axios.get("https://api.themoviedb.org/3/search/tv", {
                params: {
                    api_key: this.apiKey,
                    query: this.valoreInput,
                    language: this.lingua
                }
            }).then((result) => {
                this.series = result.data.results;
                this.valoreInput = '';

                this.voto(this.series);
            }).catch((error) => alert('errori'));
        },
        voto(array){
            array.forEach((element) => {
                element.vote_average = parseInt(element.vote_average * 5 / 10);
            });
        }
    }
});