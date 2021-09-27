//imports
const axios = require("axios");
const inquirer = require("inquirer");

//calling get movie function
getMovie();

//getting the api and returning the movie credits with user input of favorite actor
async function getMovie() {
  try {
    const { actor } = await inquirer.prompt({
      message: "Search your favorite actor:",
      name: "actor"
    });
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/person?api_key=17c9d39e63049e126ad75c88b296d1f1&language=en-US&query=${actor}&page=1&include_adult=false`
      // `https://api.themoviedb.org/3/search/person/${movie}/movie_credits?api_key=17c9d39e63049e126ad75c88b296d1f1&language=en-US`
    ); 
    console.log("Movies " + actor + " is in:")
    data.results.map(item => {

      item.known_for.forEach(element => {
        console.log(element.original_title)
      
      
      });
      
    });
    compareActors();
  
  } catch (err) {
    console.log(err);
  }
}


async function compareActors() {
  try {
    const { actorOne } = await inquirer.prompt([
        {
            type: 'list',
            name: 'reptile',
            message: "Would you like to compare two actors movie credit amounts?",
            choices: ['yes', 'no'],
              },
        {
      message: "Enter two actors",
      name: "actorOne",
        },
        {
      message: "Enter two actors",
      name: "actorTwo"

    }])

    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/person?api_key=17c9d39e63049e126ad75c88b296d1f1&language=en-US&query=${actorOne}&page=1&include_adult=false`
      // `https://api.themoviedb.org/3/search/person/${movie}/movie_credits?api_key=17c9d39e63049e126ad75c88b296d1f1&language=en-US`
    ); 
    // data.results.map(item => {
const num = data.result.length
console.log(num);
    //     item.known_for.forEach(element => {
    //     //   console.log("Movie Title\n ", element.length)
    //    const number = item.length
    //    console.log(number);
       
   // });
    //   if( a > b) {
    //     console.log("a is in more movies than b")
    //   } else if(a < b) {
    //     console.log("b is in more movies than a")
    //   } else { "a and b are in the same amont of movies."
    //   }
    // })
} catch (err) {
    console.log(err);
  }};