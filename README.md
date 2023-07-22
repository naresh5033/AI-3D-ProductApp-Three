# Build and Deploy an AI-Powered 3D Website Using React and three js

- This is an AI powered 3d website for designing our custom t-shirt, with features like cust logo on our t-shirt.
- initialize the project ```npm create vite@latest -- --template react client```

## Packages

This is a react based app and the other packages used are as follows

- ThreeJS - a powerful 3D graphics library for rendering and animating the 3D model
- React Three Fiber - a popular library for creating 3D graphics with ThreeJS in React
- valtio - for managing the react states
- TailwindCSS - a popular utility-first CSS styling framework
- Framer Motion - the most popular library used to bring your React website to life with animations

# client packages

`npm i three @react-three/fibre @react-three/drei valtio maath react-color framer-motion`

- the valtio is the state mgmt lib, in which we ve to create the store and then put the store as proxy, then import the store in our app

- `npm i -D tailwindcss postcss autoprefixer`
- `npx tailwind init -p`

-

# ToDO

- Load, create and customize stunning 3D models and geometries with various lights, as well as understand the 3D world with a camera and positioning of an object in space.
- Make your code reusable and scalable using Higher Order Components (HOCs) and other industry-standard best practices
- Add custom color and file support.
- Generate and use images through DALLE AI
- Download the resulting t-shirt model image
- Ensure responsiveness across all devices and improve your site's performance

# customizer page

- The customizer page is the main part of our app, as it contains all the business logic
- on the left side we ve 3 tabs for the color picker, ai img picker, and the logo picker
- and on the bottom we'll be having couple of toggles 1. for the logo 2. for the decal
- and 3rd tab for download the obj, and finally there is back btn.

- "show the tab content depending on the active tab"
- when we click the tab we wana open the model, for the specific tab to be marked as active
- and we also need to open up the corresponding picker.

# components

- we ve diff comps such as the ai picker(for picking the ai image), the color picker, file picker, tab and custom btn comp.

# canvas

- lets make our canvas and impl the 3d model,
- we'll be having 3 canvas model
  1. for the shirt
  2. for the cameraRig (for positioning of the camera)
  3. for the backdrop (is gon be the backsplash/ shadow effect of the color that we apply on our shirt)

# Backend (AI picker)

- to set add the ai picker fn to our tab, lets impl the backend to generate the ai image for our ai picker.
- we will create a backend node svr and then to call the api which will deliver the gen image to the client.
- `npm init -y`

- the required packages are cloudinary for saving our imgs
- cors for hadling our cross origin request, mongoose for the db, express svr
- openai
- `npm i cloudinary cors dotenv express nodemon mongoose openai`

- once we setup our backend we can finally send req(prompt) from the frontend and the backend will talk to the openai (for img creation) and response to the client with the generated (requested) img.

- once we done with styling the ai picker (btns), in the customizer.jsx(page) we can go and fetch the ai generated img from our backend.

# ai picker

- finally we can ask the open ai to gen a logo for our shirt, some of them are good but not as good as the img that we upload by ourselves, bcoz the ai gen logos are mostly not transparent, as it simply creates an img not an png.
- but one thing the ai is really good at is the gradient(ex: create a gradient pattern that goes from green to red), it can really generate a cool gradient for our shirts

- or we can really ask chat gpt to create a prompt for logo or gradient for us.

# deployments

- The backend was deployed in the render.com. and the [deployed url is](https://ai-3d-product-backend.onrender.com)
- and the front end was [deployed in netlify and the url is](https://resonant-seahorse-56e6c4.netlify.app)
- and replace the fetch url in customizer.jsx and config.jsx with the backend url
- then in the client fetch req ve to change the backend url from the localhost
- the client was deployed in the vercel `npm run build`


