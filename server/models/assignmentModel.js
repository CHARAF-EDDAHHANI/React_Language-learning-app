import { v4 as uuid} from 'uuid';
import { readJson, writeJson} from '../Agents/DBAccess.js';

const fileKey = "assignments";

export const createAssignment = async (assignmentData) => {
    try {
        const assignments = await readJson(fileKey);
        const newAssignment = {
            assignmentId : uuid(),
            title : assignmentData.title,
            level: assignmentData.level,
            createdAt : new Date().toISOString(),
        }
        assignments.push(newAssignment);
        writeJson(fileKey, assignments);
        console.log("assignment created successfully");
        return newAssignment;
    }catch (error){
        throw error
    }
}

{/*
    "id": "a1b2c3",
    "title": "Writing: My Daily Routine",
    "description": "Write a 150-word paragraph describing your daily routine in English.",
    "type": "writing",
    "skill": "Writing",
    "level": "Beginner",
    "teacherId": "t123",
    "sessionId": "s456",
    "resources": [
        {
            "type": "pdf",
            "url": "https://example.com/daily_routine_tips.pdf"
        }
    ],
    "dueDate": "2026-02-05T23:59:00Z",
    "createdAt": "2026-01-24T09:00:00Z",
    "updatedAt": "2026-01-24T09:05:00Z",
    "submissions": [],
    "status": "published"
}*/}


//get assignments
export const getAssignments = async () =>{
    try {
        const assignments = await readJson(fileKey);
        return assignments;
    }catch (error){
        throw error
    }
}