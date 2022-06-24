# Take-home challenge instructions

### Aim of this challenge:

- Develop a simple web app using React / VanillaJS
- You have full freedom over the styling of your app and while this is not as important to your overall score as functionality and code conventions we would expect your app to be responsive and follow best CSS practices (e.g. BEM naming conventions)
- App.tsx currently imports dummy json data - you **MUST** use data returned from an api call in your final submission, rather than this data.

### Running the app

To fire up the project run `npm install` and then `npm run start` in the root directory

### Requirements and expectations:

#### Junior Developer

- Create at least two separate pages:
  - Home page with ~10 items displayed
  - Individual page to show info on each item, accessed by clicking on an item on the home page
- Use of at least 3 separate front-end components to display data (you may edit and use the existing `Card` component but `App` does not count 😉 )
- Integrate with one of the APIs listed below to retrieve data using a GET request (any method of implementation is allowed)
  - https://openwhyd.github.io/openwhyd/API
  - https://www.tvmaze.com/api
  - https://elephant-api.herokuapp.com/
- Push to a repo on github/gitlab with properly labelled commits

#### IMPORTANT

- To run this app use a **dev server** with the **WebPack Configuration** in this repo. This ensures the API requests run through a **proxy**.
- The proxy is necessary due to a CORS issue with Openwhyd's API (no 'Access-Control-Allow-Origin' header).

#### P.S.

Since the API provides YouTube links, I have decided to implement a small player as well. :)
