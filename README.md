# Project 3 ReadMe - Cosmic Collectibles - MERN Full Stack application

## Description

This was a group project in which we had to build a single page full stack application using a React frontend and an Express backend. The project needed to have CRUD (Create, Read, Updated and Delete) functionality and authentication. My group decided quite quickly on an ecommerce site. We wanted to challenge ourselves to implement key features you would usually have in a virtual store, such as a shopping cart, stock indications and interesting and unique themes. We went with a space theme and landed on a site called Cosmic Collectibles. 

## Deployment link

Netlify Frontend: https://cosmiccollectibles.netlify.app/

## Getting Started/Code Installation

GitHub Frontend: https://github.com/alexstocking/Project3-Frontend

GitHub Backend: https://github.com/alexstocking/Project3Backend

## Timeframe & Working Team (Solo/Pair/Group)

We had just over a week to complete this project (Friday to Friday) and there were three of us working on the project. We had some assistance from our instructors, but mostly worked entirely within our group, building different parts of the project. I specifically worked on a lot of the backend endpoints as well as the functionality and visuals of the shopping cart on the frontend.


## Technologies Used

We used express and React to create the backend and frontend respectively. This also included using HTML, CSS and JavaScript to add full functionality for the application. As a group project, we also extensively used GitHub to share different versions of the website we might have been working on independently. I used netlify to deploy the website online.


## Brief

Your App Must:
☐ A working full-stack, single-page application hosted on Netlify.
☐ Incorporate the technologies of the MERN-stack:
MongoDB/Mongoose
Express
React
Node
☐ Have a well-styled interactive front-end.
☐ Communicates with the Express backend via AJAX.
☐ Implement token-based authentication. Including the ability of a user to sign-up, log in & log out.
☐ Implement authorization by restricting CUD data functionality to authenticated users. Also, navigation should respond to the login status of the user.
☐ Have a well-scoped feature-set. Full-CRUD data operations are not required if one or more other features are included, for example:
Consume data from a third-party API.
Implement additional functionality if the user is an admin.
Implementation of a highly dynamic UI or data visualization.
Other, instructor approved, complexity/features.



## Planning

We spent most of Friday morning creating our plan for the site, coming up with the idea and listing out the features we wanted to implement. We did this on an excalidraw page, with all 3 of us being able to access it. 

![image](https://github.com/alexstocking/Project3-Frontend/assets/48350543/b4ba00a4-159c-4548-89d3-fe0ea3ef83cf)


## Build/Code Process

Whilst we worked as a group for this project, I will primarily focus on my contributions to the project. Because this was a group project, we started each day with an additional stand up where we talked through any version changes any of us had made and what each of us was going to focus on on that day.

### Day 1 (Friday): 
We spent the morning planning our project, building out the idea and the functions we wanted for the site. We each decided what we wanted to work on. I initially wanted to focus on the Express backend, and getting the schemas and endpoints set up to start building out the frontend. We spent the afternoon working out GitHub versions and ensuring we all had our own individual branches that we could independently work on. We set up our development branch where our primary version of the site would be kept. We finished the day by getting the React frontend and Express backend set up and running.

## Day 2 (Monday): 
I spent most of Monday creating the Express backend endpoints and schemas. I began with schemas for the products, carts and users, but later had to change the user schema to a slightly different structure to get the authentication working. I knew that the cart schema would need to interact with the product schema so researched how I could set this up, and ended up with the following: 


    mongoose.connect(process.env.DATABASE_URL)
    
    
    const productSchema = new mongoose.Schema({
        name: String,
        description: String,
        price: Number,
        stock: Number,
        image: String,
        category: String
    })
    
    
    const cartSchema = new mongoose.Schema({
        products: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: Number
        }],
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    })
    
    
    const Product = mongoose.model("Product", productSchema)
    const Cart = mongoose.model("Cart", cartSchema)
    


My products in the cart schema would use the productId created by MongoDb when those products were first added to the database.

I also created and tested (on Postman) the product end points so we could start adding products for our site. Here is an example of 3 of the endpoints I made to read an individual product, delete said product or edit said product.



    app.get('/products/:id', async (req, res) => {
        try {
            const product = await Product.findById(req.params.id)
            res.json(product)
        } catch (e) {
            console.error(e)
        }
    })
    
    
    app.delete('/products/:id', (req, res) => {
        Product.deleteOne({"_id": req.params.id})
        .then(() => {
            res.sendStatus(200)
        })
        .catch(err => {
            res.sendStatus(500)
        })
    })
    
    
    app.put('/products/:id', (req, res) => {
        Product.updateOne({"_id": req.params.id}, {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            image: req.body.image,
            category: req.body.category
        })
        .then(() => {
            res.sendStatus(200)
        })
        .catch(err => {
            res.sendStatus(500)
        })
    })



### Day 3 (Tuesday): 
With a lot of the backend set up, we were having trouble with authentication and having users being able to log in. I worked through it step by step, creating a user controller, route and model, as well as implementing a checkToken function using jsonwebtoken. I also used bcrypt to ensure the password would be saved to the database as an encrypted string and not readable. This took a lot of the day to get working and tested. By the end of the day I had made functions to sign up and login to our site, connecting these backend points to our frontend. I also had implemented functionality on the frontend to check if a user was logged in or not to restrict some features if there was no user. For example:

      <Nav>
              {user ?
                <>
                  <Nav.Link as={Link} to="/cart">
                    <img
                      src="https://www.shareicon.net/data/2016/02/07/281223_cart_512x512.png"
                      width="40vh"
                      height="35vh"
                      className="d-inline-block align-top"
                      alt="Shopping cart logo"
                    />
                  </Nav.Link>
                  &nbsp;
                  &nbsp;
                  <div className='d-flex align-items-center'>
                    <h5 style={{color: "white", paddingTop: '4%'}}>Welcome {user.name}</h5>
                    &nbsp;
                    &nbsp;
                    <Button variant="secondary" onClick={handleLogOut}>Log out</Button>
                  </div>
                </>
                :
                <div className='d-flex'>
                  <Button variant="secondary" onClick={() => setShowLoginFormModal(true)}>Log in</Button>
                  &nbsp;
                  &nbsp;
                  <Button variant="secondary" onClick={() => setShowSignupFormModal(true)}>Sign up</Button>
                </div>
              }
            </Nav>

This shows a conditional in our navbar that checks for a user, using the useState function within react. If a user is found, it displays their name, the shopping cart link and a logout button. If no user is found, it displays signup and log in buttons.

### Day 4 (Wednesday): 
At this point in our site, the frontend page layout was mostly complete, and the product database had been populated. We were displaying a product page, individual product information pages with links to individual shopping carts, but our cart functionality wasn’t implemented and it was quite the challenge. We worked collaboratively on this, with a lot of context functions being created that connected to our backend endpoints. The way we ended up implementing the cart was via the user's id. When the cart page would load, we used useEffect to pull that user's shopping cart.

    export default function ShoppingCartPage({ user }) {
      const [shoppingCart, setShoppingCart] = useState()
      const {cart, getShoppingCartProducts} = useProducts()
      const {isUpdated, setIsUpdated} = useProducts()

      useEffect(() => {
        getShoppingCartProducts(user._id)
        setShoppingCart(true)

In our context page we had various functions to get the shopping cart, add to it, remove items from it and edit items based on the stock of that item.

    function getShoppingCartProducts(userId) {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/cart?userId=${userId}`)
        .then(response => {
            setCart(response.data)
        })
        .catch(error => console.error("Error fetching cart products", error))
    }
   
    function addToCart(productId, quantity, userId) {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/cart/add`, {
            productId: productId,
            quantity: quantity,
            userId: userId
        })
        .then(response => {
            console.log("Product add to cart", response.data)
            setCart(response.data)
             
        })
        .catch(error => console.error("Error adding product to cart", error))
    }



These are the two context functions I made to fetch the data from the end point and post to the end point when we wanted to add to the cart. We also used axios to fetch to the backend rather than the built in fetch function so we’d have more experience using both. 

### Day 5 (Thursday): 
I spent Thursday implementing various features pertaining to stock. I ensured that when a product was added to the cart it’s stock was lowered by the amount added on the backend database, and that when the stock reached 0, no more of that product could be added to a cart. I added a frontend state change with this in mind that changed the add to cart button to an out of stock button on the product pages. Whilst the products were held in a users cart, they could be increased or decreased which would also change the stock, and if entirely removed it would add all of that stock back to that respective product.

This is the product context function I made for these features: 


    function updateProductStock(productId, stock, setStock) {
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/products/${productId}`, {
            stock: stock
        })
            .then(response => {
                console.log('Product stock updated:', response.data);
                setStock(stock)
                setIsUpdated(true)
            })
            .catch(error => console.error('Error updating product stock:', error));
    }



I added stock checks to other functions on the product pages, for example these lines into the handleAddToCart function we used: 


     const handleAddToCart = () => {
        if (localStock > 0) {
          addToCart(id, 1, user._id)
          const updatedStock = localStock - 1
          updateProductStock(id, updatedStock, setLocalStock)
          setLocalStock(updatedStock)
          getSingleProduct(id)
        } else {
          alert('No More Stock')
        }
      }

I also added conditionals to the visuals to reflect the state changing when stock reached 0:

      <>
      {stock > 0 ? <Button variant="outline-light" onClick={() => {
        handleAddToCart()
        handleAlertAddedChange()
        }}>Add To Shopping Cart</Button> : <Button variant="outline-danger" onClick={handleAlertStockChange}>Out of Stock</Button>}

I spent Thursday afternoon finishing the styling of the site with Baran. We added styling to the cart page, making backgrounds consistent across the site and the styling overall more encompassing the theme.

### Day 6 (Friday): 
Friday was spent primarily ironing out any bugs that had arisen, and final pushes to the development branch. We then pushed the development branch to the main branch and deployed the frontend and backend to netlify. We presented our project to the rest of our cohort on Friday afternoon, receiving positive feedback.



## Challenges

The main challenges of my third project was ensuring all of the features worked how we wanted them to from our initial planning. The user authentication and shopping cart were the most challenging of these features to implement fully. 

I needed to research how to effectively use jsonwebtoken and bcrypt to be able to add encrypted users to our database. I had an example to use from another activity we worked on, but that was a combined frontend and backend and was structured differently. I had to go through each part of the authentication process to make it work for our separate frontend and backend.

For the shopping cart, we had to research how to create relationships between mongoose schemas to create a cart for each user with one product being able to be added to many different carts.


## Wins

Overcoming the challenges I ran into with user authentication was a particularly proud moment for me within the project, as a lot of the project hinged on this being functional. It allowed us to work on the frontend and the shopping cart features. 

I was also pleased with how I used React components to create editable frontend features, particularly the product card that we used in our product page and shopping cart pages. I worked with react bootstrap for the first time, and was pleased with how quickly I picked up their default components and would look to customise these a bit more in future projects.

## Key Learnings/Takeaways

Collaboration on a project can be very helpful for expanding the scope of a project. Using the different skills of each team member is useful, but it is important to learn from each other and not just use features of a site without understanding them first.
React is a very useful tool for frontend development and I will definitely use it in the future. I really enjoyed the component style and passing props down to different pages and components.
User authentication is very important for many sites, particularly ecommerce sites where the website doesn’t really function without it.


## Future Improvements

I would like to add a wish list and continue to make it more mobile friendly.



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`
