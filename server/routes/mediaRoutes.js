import express from 'express';
import uploadMedia from '../Agents/multerMedia.js';
import {uploadMediaController} from '../controllers/mediaController.js';

const router = express.Router();

//single media 
router.post('/upload', uploadMedia.single('media'), uploadMediaController);
//multiple media 
router.post('/upload-multiple', uploadMedia.array('media', 10), uploadMediaController);
 export default router;