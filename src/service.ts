import Response from "./model";
import axios from "axios";
import * as dotenv from 'dotenv';
import { sanitizeData } from "./sanitize";

dotenv.config();

export async function gptService() {
    

const headerVal = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  };
  const url="https://api.openai.com/v1/chat/completions";

  const data = await Response.findAll({limit: 5 });

  for (const row of data) {
    
    var santizied_content = sanitizeData(row.dataValues.answertext)
    const payload = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: santizied_content }],
      temperature: 0
    };

    const response = await axios.post(url, payload, {headers: headerVal})
          //console.log(response.data.choices[0].message);
         row.update({chatgptreply: response.data.choices[0].message.content});
           
        
        

  };
  
}
//cleanup gdpr rule 

//sanitize data()
//number lai 0000 
//email xxxxx
//bank NLxx BANK xxx-xxxx-xx
//postal code
//address

//regular expression search and replace
//if number email regular expression match (stack overflow) replace it with xx
//postal 4 ota number 2 ota digit
//list of municipality for address in array




//(^\+[0-9]{2}|^\+[0-9]{2}\(0\)|^\(\+[0-9]{2}\)\(0\)|^00[0-9]{2}|^0)([0-9]{9}$|[0-9\-\s]{10}$)