
const getenv = (key:string,defaultValue?:string):string => {
    const value=process.env[key] || defaultValue;

    if(value===undefined){
        throw new Error(`Environment variable ${key} is not set`);
    }
    return value;
};

export const MONGO_URI = getenv("MONGO_URI");
export const JWT_SECRET = getenv("JWT_SECRET");
export const JWT_REFRESH_SECRET = getenv("JWT_REFRESH_SECRET");
export const PORT=getenv("PORT","4004");
export const NODE_ENV=getenv("NODE_ENV","development");
export const APP_ORIGIN=getenv("APP_ORIGIN","http://localhost:5173");
export const EMAIL_SENDER=getenv("EMAIL_SENDER");
export const RESEND_API_KEY=getenv("RESEND_API_KEY");