# Blog API

This is a blog Api that can **create, read, update and delete** a post and comment.

---

## Start-Up

The backend can be started with `yarn run dev` after running the `yarn` command to install the dependences, also make sure you have your `mongoDB server` runing in the background for the database connection, and if you don't have `nodemon` in your global machine, then you need to install it as a global or as a dependence.

## Documentation

**Base URL:**  
**_`/api/v1`_**

### **/posts**

- #### **`GET`**

  - **Description:**  
    Returns all posts in a json format.

  - **Parameters:**

    - **_Required:_**  
      None

    - **_Optional:_**

      - _`QueryStrings : `_

        - `page : Integer`,
        - `size : Integer`

  - **Request Body:**  
    None

  - **Success Response:**

    - **Content:**

      > {  
      > statusCode : 200,  
      > status : `success`,  
      > message : `successful`,  
      > data : {
      >
      > > `posts : [array of posts with comments]`,  
      > > `allPostTotal : Integer`,  
      > > `offset : Integer`,  
      > > `pageSize : Integer`,  
      > > `totalPages : Integer`,  
      > > `currentPage : Integer`,  
      > > `slNo : Integer`,  
      > > `hasPrevPage : Boolean`,  
      > > `hasNextPage : Boolean`  
      > > }
      >
      > }

    - `It returns empty array of post, if there are no post in the database`

- #### **`POST`**

  - **Description:**  
    Creates a new post.

  - **Parameters:**

    - **_Required:_**  
      None

    - **_Optional:_**  
       None

  - **Request Body:**

    - **_Required:_**

      - `postMessage : String`

    - **_Optional:_**

      - `postPictures : Array[]`

  - **Success Response:**

    - **Content:**

    > {  
    > statusCode : 200,  
    > status : `success`,  
    > message : `successful`,  
    > data : {
    >
    > > `postMessage : String`,  
    > > `comments : [Array of comments]`,  
    > > `totalComments : Integer`,  
    > > `postPictures : [Array of pictures]`,  
    > > `_id : String`,  
    > > `createdAt : String`,  
    > > `updatedAt : String`  
    > > }
    >
    > }

  - **Error Response:**

    - **Content:**

      > {  
      > statusCode : 500,  
      > status : `error`,  
      > message : `String`  
      > }

### **/posts/:Id**

- #### **`GET`**

  - **Description:**  
    Returns a post that matches the `id` in a json format.

  - **Parameters:**

    - **_Required:_**

      - _`Path : `_

        - `Id : String`

    - **_Optional:_**  
      None

  - **Request Body:**  
     None

  - **Success Response:**

    - **Content:**

    > {  
    > statusCode : 200,  
    > status : `success`,  
    > message : `Post`,  
    > data : {
    >
    > > `totalComments : Integer`,  
    > > `posts : `  
    > > `{`  
    > > `_id : String`,  
    > > `postMessage : String`,  
    > > `comments : [Array of comments]`,  
    > > `totalComments : Integer`,  
    > > `postPictures : [Array of pictures]`,  
    > > `createdAt : String`,  
    > > `updatedAt : String`  
    > > `}`
    >
    > > }
    >
    > }

  - **Error Response:**

    - **Content:**

      > {  
      > statusCode : 400,  
      > status : `error`,  
      > message : `String`  
      > }

- #### **`PATCH`**

  - **Description:**  
    Updates a post that matches the `id`.

  - **Parameters:**

    - **_Required:_**

      - _`Path : `_

        - `Id : String`

    - **_Optional:_**  
      None

  - **Request Body:**

    - **_Required:_**

      - `postMessage : String`

  - **Success Response:**

    - **Content:**

    > {  
    > statusCode : 200,  
    > status : `success`,  
    > message : `successful`,  
    > data : {
    >
    > > `postMessage : String`,  
    > > `comments : [Array of comments]`,  
    > > `totalComments : Integer`,  
    > > `postPictures : [Array of pictures]`,  
    > > `_id : String`,  
    > > `createdAt : String`,  
    > > `updatedAt : String`  
    > > }
    >
    > }

  - **Error Response:**

    - **Content:**

      > {  
      > statusCode : 400,  
      > status : `error`,  
      > message : `String`  
      > }

- #### **`DELETE`**

  - **Description:**  
    Deletes a post that matches the `id`.

  - **Parameters:**

    - **_Required:_**

      - _`Path : `_

        - `Id : String`

    - **_Optional:_**  
      None

  - **Request Body:**

    - **_Required:_**
      None

  - **Success Response:**

    - **Content:**

      > {  
      > statusCode : 200,  
      > status : `success`,  
      > message : `String`  
      > }

  - **Error Response:**

    - **Content:**

      > {  
      > statusCode : 400,  
      > status : `error`,  
      > message : `String`  
      > }

## Hosted Api

- **_`hosted api link`_**:  
  [https://blog-api-chubukas.vercel.app](https://blog-api-chubukas.vercel.app/api/v1)

## Tools Used

- Node Js
- Express Js
- MongoDB
- cloudinary (for storing of post images)

## Note:

> If you are going to run this app on your local host You have to create a `config.env` file and save these variables:
>
> - DATABASE (Link to your online monogoDb cluster )
> - DATABASE_PASSWORD (The password to monogoDb cluster)
> - DATABASE_LOCAL (Your local mongoDB Link)
> - CLOUDINARY_NAME (Your cloudinary username)
> - CLOUDINARY_API_KEY (Your cloudinary API key)
> - CLOUDINARY_SECRET (Your cloudinary secret)
