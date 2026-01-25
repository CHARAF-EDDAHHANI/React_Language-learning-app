import * as assignmentModel from '../models/assignmentModel.js'

export const createAssignment = async (req, res) => {
    try{
        const assignmentData= req.body;
        const assignment= await assignmentModel.createAssignment(assignmentData);
        res.status(201).json(assignment);
    }catch (error){
        res.status(500).json({message:"failed to create assignment", error: error.message});
    }
};

export const getAssignments = async (req, res) => {
    try {
    const assignments = await assignmentModel.getAssignments();
    res.status(200).json(assignments);
    }catch (error) {
    res.status(500).json({message:"error fetch assignments", error:error.message});
    }
};
