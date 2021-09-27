const axios = require("axios");
const inquirer = require("inquirer");

getMovie();

async function getMovie() {
  try {
    const { movie } = await inquirer.prompt({
      message: "Search your favorite actor:",
      name: "movie"
    });
    // https://api.themoviedb.org/3/movie/550?api_key=17c9d39e63049e126ad75c88b296d1f1
    // https://api.themoviedb.org/3/search/person?api_key=17c9d39e63049e126ad75c88b296d1f1&language=en-US&query
    //    =${movie}&page=1&include_adult=false
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/person?api_key=17c9d39e63049e126ad75c88b296d1f1&language=en-US&query=${movie}&page=1&include_adult=false`
      // `https://api.themoviedb.org/3/search/person/${movie}/movie_credits?api_key=17c9d39e63049e126ad75c88b296d1f1&language=en-US`
    ); 

    data.results.map(item => {

      item.known_for.forEach(element => {
        console.log("Movie Title\n ", element.original_title)
      
      
      });
    });
  
  } catch (err) {
    console.log(err);
  }
}


async function compareActors() {
  try {
    const { movie } = await inquirer.prompt({
      message: "Enter two actors",
      name: "actorOne",
      message: "Enter two actors",
      name: "actorTwo"
    })

    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/person?api_key=17c9d39e63049e126ad75c88b296d1f1&language=en-US&query=${movie}&page=1&include_adult=false`
      // `https://api.themoviedb.org/3/search/person/${movie}/movie_credits?api_key=17c9d39e63049e126ad75c88b296d1f1&language=en-US`
    ); 
    then(
      if( a > b) {
        console.log("a is in more movies than b")
      } else if(a < b) {
        console.log("b is in more movies than a")
      } else { "a and b are in the same amont of movies."
      }
    );
  } catch (err) {
    console.log(err);
  }
  }