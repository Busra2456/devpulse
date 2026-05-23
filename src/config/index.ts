
import * as path from "path";
import dotenv from "dotenv";

dotenv.config({
      path :path.join(process.cwd(),'.env')
});

const config = { 
      connection_string: process.env.CONNECTION_STRING as string,
      port :process.env.PORT,
      secret : process.env.JWT_SECRET,
      client_url: process.env.CLIENT_URL
     
    
};
export default config