import { useState} from 'react';
import { createAssignment as apiCreateAssignment } from '../api/assignment.js'
import { toast} from 'react-toastify';

export const useAssignment = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createAssignment = async(assignmentData) => {
        setLoading(true);
        setError(null);
        try {
            const newAssignment = await apiCreateAssignment(assignmentData);
            toast.success("Assignment created successfully");
            return newAssignment;
        }catch (err){
            const message = err?.message || " failed to create assignment"
            setError(message);
            toast.error(message);
            throw err;
        }finally{
            setLoading(false);
        };
    };
    return{
        createAssignment,
        loading,
        error,
    }

}