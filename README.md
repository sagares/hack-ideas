#  { Hack Ideas }
### A web application in react to register and view hackathon ideas of an organization.


## Demo Link
https://sagares.github.io/hack-ideas/


## Table of Content:

- [About The App](#about-the-app)
- [Technologies](#technologies)
- [Setup](#setup)
- [Screenshots](#screenshots)

## About The App
{ Hack Ideas } lets employees of an organization to add/manage challenges for internal hackathons.
The employees need to login with their employee ID. If the employee is visiting for the first time, they will be registered first and logged in from login form.
Once, the employee is logged in they are taken to home page where they can view all the list of challenges. Logged in user can perform following actions in the application:
- Create a new challenge by clicking on '+' button fixed at the right bottom corner of the page. Upon clicking, a dialog opens with form which captures Title, Description and Tags from a list of feature, tech and bugfix. 
- Upvote any challenge added by other employees.
- Filter the challenges by searching.
- Sort the challenges by their created time or by upvotes count.

## Technologies
I have developed this project using React JS. For styling I have used LESS. Using webpack to build and bundle.


## Set up

- Download or clone the repository
- Run `npm install`

### Command to run development environment
`npm run dev`

### Command to build for production
`npm run build`

### Command to run tests with coverage
`npm test`

## Screenshots

### Login Screen
<img width="1179" alt="Screenshot 2022-04-18 at 12 21 13 AM" src="https://user-images.githubusercontent.com/31887015/163728436-e2f30498-ee84-4e47-b781-18365ee38b23.png">

### Home Page
<img width="1788" alt="home-page" src="https://user-images.githubusercontent.com/31887015/163726912-4dabebea-261e-4623-a61d-bcbf8ab5a17c.png">

### Add challenge
<img width="1790" alt="register-idea-modal" src="https://user-images.githubusercontent.com/31887015/163726936-edb1b2de-5385-4391-9527-25bfdaa04470.png">

### Searching
<img width="1788" alt="search-bar" src="https://user-images.githubusercontent.com/31887015/163726947-5462c378-e4f0-4a98-8cef-cdfffb0222aa.png">

### Sorting
<img width="1789" alt="sort-by-menu" src="https://user-images.githubusercontent.com/31887015/163726963-b2f36f8a-c38f-4a8e-a445-02bd8a4a2568.png">


