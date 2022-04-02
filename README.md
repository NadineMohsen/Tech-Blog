# Tech-Blog
  ![MIT License](https://img.shields.io/badge/license-MIT-blue)

## Table of Contents
  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contribution](#contribution)
  - [Test-Instructions](#test-instructions)
  - [License](#license)
  - [Repository](#repository)
  - [Link](#link)
  - [Questions](#questions)

## Description
Generates a CMS style blog. Developers can use this tech blog to publish posts and comments. 

```
GIVEN a CMS-style blog site
WHEN I visit the site for the first time
THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in

WHEN I click on the homepage option
THEN I am taken to the homepage

WHEN I click on any other links in the navigation
THEN I am prompted to either sign up or sign in

WHEN I choose to sign up
THEN I am prompted to create a username and password

WHEN I click on the sign-up button
THEN my user credentials are saved and I am logged into the site

WHEN I revisit the site at a later time and choose to sign in
THEN I am prompted to enter my username and password

WHEN I am signed in to the site
THEN I see navigation links for the homepage, the dashboard, and the option to log out

WHEN I click on the homepage option in the navigation
THEN I am taken to the homepage and presented with existing blog posts that include the post title and the date created

WHEN I click on an existing blog post
THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment

WHEN I enter a comment and click on the submit button while signed in
THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created

WHEN I click on the dashboard option in the navigation
THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post

WHEN I click on the button to add a new blog post
THEN I am prompted to enter both a title and contents for my blog post

WHEN I click on the button to create a new blog post
THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post

WHEN I click on one of my existing posts in the dashboard
THEN I am able to delete or update my post and taken back to an updated dashboard

WHEN I click on the logout option in the navigation
THEN I am signed out of the site

WHEN I am idle on the site for more than a set time
THEN I am able to view comments but I am prompted to log in again before I can add, update, or delete comments
```
## Installation

Requires Node.js, Express.js, Sequelize, mysql2.
Clone the repo and Use the following command lines:

 `npm i`

 `source schema.sql`

 `use tech_db`

 `node server.js`


## Usage
Log in or signup if you're not already a member.

Once logged in, user can view his dashboard including posts and comments.

User can edit,delete and add new tech blog posts.

User can also add comments on other developer posts.

## Contribution

If you would like to contribute to this project reach out to me. Contact Information can be found below.

## Test-Instructions


## License
This application is licensed under the MIT license.

[MIT License](https://opensource.org/licenses/BSD-3-Clause)

## Repository
https://github.com/NadineMohsen/Tech-Blog
## Link 
[Heroku](https://lychee-cupcake-15671.herokuapp.com/)

## Questions
For any questions you can reach me on github or by email
- Github [My Profile on Github](https://github.com/NadineMohsen)
- Email nadine.mohsen@hotmail.com

## Demo
![Demo1](./assets/Screenshot.png)

## Links to Demo


