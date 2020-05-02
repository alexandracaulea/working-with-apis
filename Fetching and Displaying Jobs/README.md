# Fetching and Displaying Jobs Project

Allows a user to search and view jobs posted on GitHub. It uses [GitHub Jobs API](https://jobs.github.com/api) to retrieve data based on a keywords entered by the user.

To fetch data I’ve used the [axios](https://github.com/axios/axios) library.

I've also used [CORS Anywhere](https://cors-anywhere.herokuapp.com/) to add CORS header for each request made to GitHub jobs API.

## User Stories

1. User should be able to search by terms, such as "front end" or "java".
2. User should be able to enter a location, such as a name, zip code, or other search term location.
3. Each job should display the logo and name of the company, job type (full time, part time), location, published data and a button.
4. I should be able to click on the name of the company, and in a new tab I should be redirected to the company's website.
5. If the Jobs API does not return the company's logo, it should display the placeholder image that I've provided.
6. When the user clicks the description button, it should be displayed the aditional job information provided by the response from the API.
7. When the user clicks the description button, the text of the button should be replaced with "Collapse".
8. While waiting for the response from the API in order to display the data, I should see a loader.
9. The `h2` element with the class of `.job__title` should have 35 characters. If in the response from API, the length of the title is more than 35 characters I should add `...` and truncate the text.
10. I should be able to hover over each `h2` element with the class of `.job__title` and see the entire job title.
11. The date format should be `DD/MO/YYYY`.
12. There should be a location icon and a callendar icon for each job displayed.
13. If the API does not return any job, I should display the text "Nothing found".
14. The loader should be hidden if there is an error to display.
15. I should see displayed an error if the request was made to the server and the server responded with a status code that falls out of the range of `2xx`.
16. I should see an error if the request was made, but no response was received
17. I should see an error if something happened in setting up the request and triggered an `Error`.
18. My project should be responsive.

## Testing

I've manual tested all the requirements.

## [Solution](https://codepen.io/alexandracaulea/full/VwLBGOj)

This project allows a user to search and view jobs posted on GitHub. It uses GitHub Jobs API to retrieve data based on the keywords entered by the user.

This project was built using HTML, CSS and JavaScript. To fetch data I’ve used the axios library.

[Live Example on CodePen](https://codepen.io/alexandracaulea/full/VwLBGOj)

![Fetching and Displaying Jobs Project](img/gif/fetching-jobs.gif)
