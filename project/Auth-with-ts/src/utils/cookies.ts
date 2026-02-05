import { CookieOptions, Response } from "express";
import { fifteenMinutesFromNow, thirtyDaysFromNow } from "./date";

const secure=process.env.NODE_ENV !== "production";

const defaults:CookieOptions={
    httpOnly:true,
    sameSite:"strict",
    secure
};

const getAccessTokenCookieOptions=():CookieOptions=>({
    ...defaults,
    expires:fifteenMinutesFromNow(),
});

const getRefreshTokenCookieOptions=():CookieOptions=>({
    ...defaults,
    expires:thirtyDaysFromNow(),
    path:"/auth/refresh-token",
});

type params={
    res:Response,
    accessToken:string,
    refreshToken:string,
}
export const setAuthCookies = ({res, accessToken, refreshToken}: params) => 
    res
    .cookie("accessToken", accessToken,getAccessTokenCookieOptions())
    .cookie("refreshToken", refreshToken,getRefreshTokenCookieOptions());
