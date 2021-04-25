import dotenv from "dotenv";
import express from "express"
import cors from "cors"
import mongoose from "mongoose"

import morganMiddleware from './middlewares/morganMiddleware'
import Logger from "./helpers/logger"
import * as routes from "./routes";

// initialize configuration
dotenv.config();

// Mongodb
const mongoUri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWD}@cluster0.qwrnf.mongodb.net/${process.env.MONGODB_DB}?retryWrites=true&w=majority`
mongoose.connect(mongoUri)
  .then(() => Logger.info('Connected to MongoDB...'))
  .catch((err) => Logger.error('Could not connect to MongoDB: ', err))

const port = process.env.SERVER_PORT || 8080;

const app = express();
// app.use(morgan("combined"));
app.use(morganMiddleware);
app.use(express.json({
  verify: (req: any, res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(cors());

// Routes
routes.register(app);

app.listen(port, () => {
  Logger.debug(`server started at http://localhost:${port}`);
});