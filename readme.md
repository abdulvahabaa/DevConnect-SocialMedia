# DevConnect-SocialMedia

> A developer-focused social networking site that enables users to connect, share, and collaborate. Built with modern web technologies for a seamless experience.

## Table of Contents

- [DevConnect-SocialMedia](#devconnect-socialmedia)
  - [Table of Contents](#table-of-contents)
    - [Video Demo](#video-demo)
    <!-- - [Screenshots](#screenshots) -->
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Installation and Setup](#installation-and-setup)
    - [Prerequisites](#prerequisites)
    - [Environment Setup](#environment-setup)
    - [Running the Application](#running-the-application)
  - [Usage](#usage)
    - [Swagger-API-Documentation](#swagger-api-Documetation)
    - [APIs](#apis)

  - [Links](#links)

### Video Demo

[link-to-video-demo](https://drive.google.com/file/d/1vejLUkzmSxXgqY5tetKPsg4fin-EIOE0/view?usp=sharing)

<!-- ### Screenshots

![Homepage](link-to-homepage-screenshot)
*Homepage showing user posts and interactions*

![User Profile](link-to-user-profile-screenshot)
*User profile page with customizable options* -->


## Features
<!-- ### User Guide -->

- **Sign Up/Sign In**: Create an account or log in to start using the platform.
- **Profile Management**: Customize your profile, add a bio, and upload a profile picture.
- **Posts**: Create, edit, and delete posts. Interact with posts by liking, commenting, and replying.
- **Real-Time Chat**: Use the chat feature to communicate with other users in real-time.
- **Admin Features**: Admins can manage user accounts and posts, including blocking and unblocking users and handling reported posts.
- **User Interactions**: Connect with other developers by following/unfollowing, liking, commenting, and replying to posts.
- **Real-Time Communication**: Enjoy real-time chat and call functionalities.
- **Media Uploads**: Utilize AWS S3 Bucket for image and data uploads.
- **Customization**: Switch between Light and Dark Modes for better user experience.
- **Security**: Secure JWT Authentication for safe user sessions.
- **Admin Tools**: Admins can block/unblock users and manage reported posts.
- **Data Management**: Advanced search, sort, and filter tools, and export data to PDF and CSV formats.

## Technologies Used

- **Frontend**: React, Material UI, Redux-Toolkit
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Hosting**: AWS EC2, Nginx
- **Storage**: AWS S3 Bucket
- **Authentication**: JWT
## Installation and Setup
### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed
- MongoDB installed and running
- AWS account for S3 bucket setup

### Environment Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/DevConnect-SocialMedia.git
   
    ```
    ```bash
     cd DevConnect-SocialMedia
    ```

2. Install dependencies:
  > correct the server side 
  ```bash
    cd server
  ```

  ```bash
    npm install
  ```

3. Create an `.env` file in the server directory and add the following:

```env

  MONGO_URL="YOUR_MONGODB_URI"

  JWT_SECRET="YOUR_JWT_SECRET"

  PORT=3001

  ADMIN_EMAIL="admin@gmail.com"

  ADMIN_PASSWORD="admin"

  ADMIN_JWT_SECRET="YOUR_ADMIN_JWT_SECRET"

  BUCKET_NAME='YOUR_S3_BUCKET_NAME'

  BUCKET_REGION='YOUR_BUCKET_REGION'

  ACCESS_KEY='YOUR_AWS_ACCESS_KEY_ID'

  SECRET_ACCESS_KEY='YOUR_AWS_SECRET_ACCESS_KEY'

```
> install dependnscy on the client side

```bash
cd client
```
```bash
npm install
```


### Running the Application

1. Start the backend server:

    ```bash
    npm run server
    ```

2. Start the frontend development server:

    ```bash
    npm start
    ```

3. Open your browser and navigate to `http://localhost:3000`.

## Usage

### Swagger-API-Documetation

### APIs

<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7069046813449719808" height="1206" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>



## Links

For further information, feel free to reach out:

- [Project Website](www.devconnect.website) : `expierd because free preiod is over`
- GitHub Repository: [DevConnect-SocialMedia](link-to-github-repo)

---

Thank you for visiting DevConnect-SocialMedia! Happy coding!


