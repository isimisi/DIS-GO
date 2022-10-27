import dotenv from 'dotenv';
dotenv.config();

export default class Env {
    /**
     * 
     * @param {'PORT'} envVariable 
     * @returns 
     */
    static get(envVariable){
        if (!process.env[envVariable]) return new Error('Environment variable does not exist')
        return process.env[envVariable];
    }
}