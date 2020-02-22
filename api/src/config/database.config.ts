import { registerAs } from "@nestjs/config";
import * as path from 'path';

export default registerAs('database', () => ({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: ['dist/**/*.entity{.ts,.js}'],
  // entities: [`${path.resolve(
  //   'src')}/**/*.entity{.ts,.js}`],
  synchronize: true,
  // useNewUrlParser: true,
  // useFindAndModify: false,
}));
