import express from 'express';
const router=express.Router();

import { getUsers } from '../controllers/user.js'



router.get('/',getUsers);

router.post('/',(req,res)=>{

});

export default router;