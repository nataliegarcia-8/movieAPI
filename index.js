// Imports
const axios = require("axios");
const inquirer = require("inquirer");

// Calling get movies function
getMovies();

// Returning the movie credits with user input of favorite actor
async function getMovies() {
    try {
        // Using inquirer to prompt questions for user input
        const { actor } = await inquirer.prompt({
            message: "Search your favorite actor:",
            name: "actor"
        });
        // Using user input and retriving response from API
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/search/person?api_key=17c9d39e63049e126ad75c88b296d1f1&language=en-US&query=${actor}&page=1&include_adult=false`
        );
        console.log("Movies " + actor + " is in:")
        // Mapping through the results to get Movie title
        data.results.map(item => {

            item.known_for.forEach(element => {
                if (element.title != undefined) {
                    console.log(element.title)
                }
            });
        }
        );
        // Calling next function to compare two actors
        compareActors();

    } catch (err) {
        //   console.log(err)
        // If there is an invalid actor -> call function again to enter valid actor
        console.log("Please enter a valid actor name");
        getMovies();
    }

}

// Returning which actor has been in more movies
async function compareActors() {
    try {
        // Using inquirer to prompt questions for user input
        const { actorOne, actorTwo } = await inquirer.prompt([
            {
                message: "Enter two actors to compare who has been in more movies \n Enter first actor:",
                name: "actorOne",
            },
            {
                message: "Enter second actor:",
                name: "actorTwo"

            }])
        //  Using user input and retrieving response from API
        const resp = await axios.get(
            `https://api.themoviedb.org/3/search/person?api_key=17c9d39e63049e126ad75c88b296d1f1&language=en-US&query=${actorOne}&page=1&include_adult=false`
        );

        // Grabbing the number of movies and storing in var
        const num1 = resp.data.results.length
        // console.log(num1);

        const resp2 = await axios.get(
            `https://api.themoviedb.org/3/search/person?api_key=17c9d39e63049e126ad75c88b296d1f1&language=en-US&query=${actorTwo}&page=1&include_adult=false`
        );

        // Grabbing the number of movies and storing in var
        const num2 = resp2.data.results.length
        //  console.log(num2);

        // Comparing the amount of movies each actor has been in and sending user correct response
        if (num1 > num2) {
            console.log(actorOne + " is in more movies than " + actorTwo)
        } else if (num1 < num2) {
            console.log(actorTwo + " is in more movies than " + actorOne)
        } else {
            console.log(actorOne + " and " + actorTwo + " are in the same amont of movies.")
        }
    }
    catch (err) {
        //  console.log(err)
        // If there is an invalid actor -> call function again to enter valid actor
        console.log("Please enter a valid actor name");
        compareActors();

    }
};