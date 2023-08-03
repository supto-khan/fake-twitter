# Angular Project - Social Media Application

This repository contains an Angular project for a social media application. The application allows users to login, create new user accounts, view a home page with a sidebar, make tweets, and interact with other users. The project utilizes JWT token-based authentication for secure user access.

## Getting Started

To run the project, please follow the steps below:

1. Clone the repository to your local machine:

    git clone <repository_url>
    cd <project_folder>

2. Install the project dependencies:

   npm install

3. Start the development server:

  ng serve

The server will be available at http://localhost:4200/.

# Login

Upon accessing the front-end server at http://localhost:4200/, you will be presented with a login page. You can use the following credentials to login:

  Email: supto@test.com
  Password: 123456
Alternatively, you can create a new user account by clicking the "Sign Up" button.

## Home Page

After successfully logging in, you will be redirected to the home page. The home page contains a sidebar, a "Make Tweet" option, and a user list.

## Sidebar Navigation

You can navigate to different routes in the application using the sidebar.

## Make Tweet

The "Make Tweet" option allows you to create new posts (tweets) on the social media platform.

## User List

The user list displays a list of users. From this list, you can follow or unfollow a user, view a user's profile page, and access user details.

## JWT Token Authentication

The application uses JWT token-based authentication to ensure secure access to user data. The token sent with each API request will change every time it expires. If the token expires or becomes invalid, you will be redirected to the login page for reauthentication.

## Happy Coding!

Enjoy exploring and developing this social media application using Angular! If you encounter any issues or have any questions, feel free to reach out. Happy coding! 😊🚀
