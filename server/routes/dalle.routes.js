import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi} from 'openai';

dotenv.config();

//heres where our logic with the dalle(nick name of our svr) api will go

const router = express.Router();

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
//just creatd the new instance of the openaiapi with the key
const openai = new OpenAIApi(config);

router.route('/').get((req, res) => {
  res.status(200).json({ message: "Hello from DALL.E ROUTES" })
})

//lets create th route to pass the prompt from frontend to the svr
router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await openai.createImage({ // this fn will creates the img based on the given prompt
      prompt,
      n: 1, //no of img
      size: '1024x1024',
      response_format: 'b64_json' //base64 format
    });
//once we get the res we can get the img of it, 
    const image = response.data.data[0].b64_json;

     
    //then finally pass it to the frontend
    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" })
  }
})

export default router;