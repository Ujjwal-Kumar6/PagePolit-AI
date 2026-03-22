'use server'
import { cookies } from "next/headers";

export const  isLogin = async () =>{
    const cookieStore = await cookies();
    const userSession = cookieStore.get('user_session');
    let user = null;
    if(userSession){
        try{
            user = JSON.parse(userSession.value);
        }catch(e){
            console.log("Fail to parse user session",e)
        }
    }
    return user;

}