import './config';
import express from "express"
import cors from "cors"

import { morganMiddleware } from './middlewares'
import { notFoundMiddleware, logErrorMiddleware, errorHandlerMiddleware } from './errors';
import Logger from "./helpers/logger"
import * as routes from "./routes";

const port = process.env.SERVER_PORT || 8080;

const app = express();

app.use(morganMiddleware);
app.use(express.json());
app.use(cors());

// Routes
routes.register(app);

app.use(notFoundMiddleware)
app.use(logErrorMiddleware);
app.use(errorHandlerMiddleware);

app.listen(port, () => {
  Logger.debug(`server started at http://localhost:${port}`);
});