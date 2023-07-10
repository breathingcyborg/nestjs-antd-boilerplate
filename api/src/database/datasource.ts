import 'dotenv/config'
import { DataSource } from "typeorm";
import { getConfig } from "./config";

export const dataSource = new DataSource(getConfig());
