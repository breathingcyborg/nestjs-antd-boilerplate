import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSourceOptions } from "typeorm";

export const getConfig  = () : DataSourceOptions => {
    const config : DataSourceOptions = {
        type: 'mariadb',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [
            __dirname + '/../**/*.entity.{ts,js}' ,           
        ],
        subscribers: [
            __dirname + '/../**/*.subscriber.{ts,js}' ,
        ],
        migrations: [
            __dirname + '/migrations/*.{ts,js}' ,
        ],
        synchronize: false, 
    }
    return config;
}

export default registerAs('database', getConfig);
