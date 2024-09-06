import { Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes,scrypt as _scrypy } from "crypto";
import { promisify } from "util";

const scrypt =promisify(_scrypy);
@Injectable()
export class AuthService{
    constructor(private usersService:UsersService){}
    
    async secret(password:string){
        const salt=randomBytes(8).toString('hex');
        const hash=await scrypt(password,salt,32) as Buffer;
        const result=salt+ '.'+hash.toString('hex');
        return result;

    }
    
}