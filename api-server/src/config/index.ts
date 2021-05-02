import dotenv from "dotenv";
// initialize configuration
dotenv.config();

import "reflect-metadata";
import { registerDependencies } from "./dependency-injection";
import { configureElasticSearch } from "./elasticsearch";

export const API_VERSION = process.env.API_VERSION;

registerDependencies();
configureElasticSearch();