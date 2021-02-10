var app = new Vue({
    el: '#root',
    data:{
        valoreInput: '',
        apiKey: '64ea8cbbcce6f7fd105fce2d2c4b9e9a',
        lingua: 'it-IT',
        films: ''
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

                this.voto();
            }).catch((error) => alert('errori'));

            axios.get("https://api.themoviedb.org/3/search/tv", {
                params: {
                    api_key: this.apiKey,
                    query: this.valoreInput,
                    language: this.lingua
                }
            }).then((result) => {
                this.films.push(result.data.results);
                this.valoreInput = '';

                this.voto();
            }).catch((error) => alert('errori'));
        },
        voto(){
            this.films.forEach((element) => {
                element.vote_average = parseInt(element.vote_average * 5 / 10);
            });
        }
    }
});