import pkg from 'dotenv';
const { config } = pkg;
import { join, resolve } from 'path';
import { ok } from 'assert'
const production = "production"
let env = process.env.NODE_ENV || 'dev'

env = env === "production" ? "prod" : env;

ok(env === "prod" || env === "dev", `a env ${env} é inválida, ou dev ou prod`);
const __dirname = resolve();
const configPath = join(__dirname, './config', `.env.${env}`);

config({
    path: configPath
});

export default env;