# Blog API

This is a blog Api that can **create, read, update and delete** a post and comment.

---

## Start-Up

The backend can be started with `yarn run dev` after running the `yarn` command to install the dependences, also make sure you have your mongoDB server runing in the background for the database connection, and if you don't have `nodemon` in your global machine, then you need to install it as a global or as a dependence.

## Documentation

**Base URL:**  
/api/v1

**Create Post**  
Returns all posts in a json format.

- **URL:**  
  /posts

- **Method:**  
  `GET`

- **URL Params**

  **Required:**  
  None

- **Data Params**  
  None

- **Success Response:**

  - **content:**

    > {  
    > statusCode : 200,  
    > status : "success",  
    > message: "successful",  
    > data:{
    >
    > > "posts":[array of posts with comments],  
    > > allPostTotal: number,  
    > > offset: number,  
    > > pageSize: number,  
    > > totalPages: number,  
    > > currentPage: number,  
    > > slNo: number,  
    > > hasPrevPage: boolean,  
    > > hasNextPage: boolean  
    > > }  
    > > }

  - `It returns empty array of post, if there are no post in the database`

## Hosted Api

- hosted api link: [https://blog-api-chubukas.vercel.app](https://blog-api-chubukas.vercel.app/api/v1)

## Tools Used

- Node Js
- Express Js
- MongoDB
- cloudinary (for storing of post images)

* **Notes:**

  > If you are going to run this app on your local host You have to create a `config.env` file and save these variables:
  >
  > - DATABASE (Link to your online monogoDb cluster )
  > - DATABASE_PASSWORD (The password to monogoDb cluster)
  > - CLOUDINARY_NAME (Your cloudinary username)
  > - CLOUDINARY_API_KEY (Your cloudinary API key)
  > - CLOUDINARY_SECRET (Your cloudinary secret)
