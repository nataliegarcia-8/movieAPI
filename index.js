//imports
const axios = require("axios");
const inquirer = require("inquirer");

//calling get movie function
getMovies();

//getting the api and returning the movie credits with user input of favorite actor
async function getMovies() {
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
        // console.log(element.title)
        // console.log(typeOf(element))
        if(element.title != undefined) {
            console.log(element.title)
        }
    });
}
    );
    compareActors();
  
  } catch (err) {
      console.log(err)
    // console.log("Please enter a valid actor name");
    // getMovies();
  }

}


async function compareActors() {
  try {
    const { actorOne, actorTwo } = await inquirer.prompt([
        {   
      message: "Enter two actors to compare who has been in more movies \n Enter first actor:",
      name: "actorOne",
        },
        {
      message: "Enter second actor:",
      name: "actorTwo"

    }])

    const resp = await axios.get(
      `https://api.themoviedb.org/3/search/person?api_key=17c9d39e63049e126ad75c88b296d1f1&language=en-US&query=${actorOne}&page=1&include_adult=false`
      // `https://api.themoviedb.org/3/search/person/${movie}/movie_credits?api_key=17c9d39e63049e126ad75c88b296d1f1&language=en-US`
    ); 
    resp.data.results.map(item => {
        item.known_for.forEach(element => {
        //   console.log(element.title)
      });
    
    })
    const num1 = resp.data.results.length
    console.log(num1);

 const resp2 = await axios.get(
    `https://api.themoviedb.org/3/search/person?api_key=17c9d39e63049e126ad75c88b296d1f1&language=en-US&query=${actorTwo}&page=1&include_adult=false`
    // `https://api.themoviedb.org/3/search/person/${movie}/movie_credits?api_key=17c9d39e63049e126ad75c88b296d1f1&language=en-US`
  ); 
  resp2.data.results.map(item => {
  
     item.known_for.forEach(element => {
        // console.log(element.title)
     })
});
const num2 = resp2.data.results.length
 console.log(num2);

      if( num1 > num2) {
        console.log(actorOne + "is in more movies than " + actorTwo)
      } else if(num1 < num2) {
        console.log(actorTwo + " is in more movies than " + actorOne)
      } else { console.log(actorOne + " and " + actorTwo + " are in the same amont of movies.")
      }
   }
 catch (err) {
    //  console.log(err)
    console.log("Please enter a valid actor name");
    compareActors();
    
  }};