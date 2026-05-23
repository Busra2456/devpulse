import express,{
       type Application,
       type Request,
       type Response
       } from "express";


import { authRoute } from "./modules/auth/auth.route";
import logger from "./middleware/logger";
import cookieParser from "cookie-parser";
import cors from "cors";
import globalErrorHandler from "./middleware/globalErrorHandler";
import { userRoute } from "./modules/user/user.route";
import config from "./config/index";


      
const app : Application = express();
app.use(cookieParser())
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended : true}));
app.use(logger);

app.use(cors({
       origin: config.client_url,
       credentials: true,
}));


app.get('/', (req : Request, res : Response) => {
//   res.send('Hello World!')
res.status(200).json({
      message  :"Express Server",
      "author" :"Next Level",
})
});


app.use("/api/auth",authRoute)
app.use("/api/users", userRoute);
app.use(globalErrorHandler);

export default app;

