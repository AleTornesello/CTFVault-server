import dotenv from "dotenv";
// initialize configuration
dotenv.config();

import "reflect-metadata";
import { registerDependencies as registerGithubDependencies } from "../github/config";

export const API_VERSION = process.env.API_VERSION;

registerGithubDependencies();