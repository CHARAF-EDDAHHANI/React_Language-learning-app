import { v4 as uuid } from "uuid";
import {readJson, writeJson} from "../Agents/DBAccess.js";

const fileKey = "sessions";

// create sessions
 export const createSession = async (sessionData) => {
    try {
        const sessions = await readJson(fileKey) || [];
        const newSession = {
            id : uuid(),
            title: sessionData.title,
            type: sessionData.type,
            level: sessionData.level,
            status: "draft",
            createdAt: new Date().toISOString()
            };
            sessions.push(newSession);
            await writeJson(fileKey, sessions);
            console.log("session created successfully");
            return newSession;

    {/*return {
      status: 201,
      message: "Session created successfully",
      data: newSession
    };
    */}
    }catch (error) {
        throw error

        {/**return {
      status: 500,
      message: "Failed to create session"
    }; */}
    }
 };

 //get sessions
 export const getSessions = async() => {
    try {
        const sessions= await readJson(fileKey);
        return sessions;
    }catch (error){
        throw error;
    }
 }
  