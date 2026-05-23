import app from "./app.js";
import config from "./config/index"
import { initDB } from "./db/index";


const main= async() =>{
     await initDB();
     app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  



}
main()
