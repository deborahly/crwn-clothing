# CRWN CLOTHING (e-commerce)

### CONCEPT
Crwn Clothing is a clothing shop website with five categories (hats, jackets, sneakers, womens, mens). Users can select one or many products to be added to their cart, and go to the checkout page when they are ready, and even after a page refresh (cart items are stored in the browser local storage). On the checkout page, users can manage their shopping items, by adding, subtracting or removing an item altogether, before proceeding to the payment, down on the same page.

App deployed in: https://crwn-clothing-delight.netlify.app/

### PROJET CHARACTERISTICS 
The project is a SPA e-commerce built with React, using Redux for the state management. Redux-Thunk was originally implemented to deal with side effects, later replaced by Redux-Saga. 

The project was written in JavaScript, converted to TypeScript at a certain point. For user authentication and products storage, the application uses Firebase, whereas for the payment, it uses Stripe. Styling was included using the styled-component library.  

### KEY FEATURES
- Register
- Login
- On the **index**, get an overview of all five categories
- On the **shop** page, see a preview of each category, and select any of them to get a full catalogue display
- The catalogue includes a photo, the name and the price of each product
- On the navigation bar, once clicking on the cart icon, verify the selected products 
- In the cart drop-down, select checkout to go to the **checkout** page
- On the checkout page, manage the shopping items (adding, subtracting or removing items), get the total price and make the payment

### INSTALL AND RUN
Clone branch and install all dependencies:

```bash
git clone https://github.com/deborahly/e-commerce.git
cd e-commerce
yarn install
```

To run the application, execute:

```bash
netlify dev
```
The app is going to run on [127.0.0.1:8888](http://127.0.0.1:8888/).
