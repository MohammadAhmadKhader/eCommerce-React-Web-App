# GoStore

## Frontend side of (MERN) project and deployed on [render](https://render.com/) service.

## Note : 
The Backend of this project repository: [Backend repository](https://github.com/MohammadAhmadKhader/eCommerce-MongoDB).  
Deployment Link: [Deployment](https://ecommerce-react-web-app.onrender.com/) 

**Its deployed on render service which means takes about 60-90 seconds~ to boot the service (because it's a free service)**

## Technologies:
- React.
- Typescript.
- TailwindCSS.
- Material UI.
- Stripe.
- React Hook Form.

## Known issues:
- You might try to purchase an order if it throws an error its because the stripe rollback keys are outdated, they last for 7 days then they need to be re-created.

## Possible Improvements:
- Moving state management to a state manager like [Redux-Toolkit](https://redux-toolkit.js.org/), React context were used in this project which would add complexity as the project grows.
- Applying Compound React Component to Inputs to have better re-usability and code quality.
- Adding Coupons system (with stripe).