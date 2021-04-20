import express from 'express';
const router=express.Router();

const users=[
    {
        firstname:"John",
        lastname:"Doe",
        age:25
    },
    {
        firstname:"John",
        lastname:"Doe",
        age:25
    }
]

router.get('/',(req,res)=>{
 console.log('Users requested');
 res.send(users);
})

router.post('/',(req,res)=>{

});

export default router;