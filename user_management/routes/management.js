import express from 'express';
const router = express.Router();

import { v4 as uuidv4 } from 'uuid';

import ManageModel from '../model/manage_models.js'

// Build APIs for a user management system
// Search user (by name, email & phone)
// Update a user
// Delete User

router.get('/getusers',async(req,res)=>{
    try{
        var allusers = await ManageModel.find();
    }catch(error){
        console.log(error);
        return res.status(400).json({
            message:error
        });
    }
    return res.status(200).json({
        data:allusers
    })
});

router.post('/addusers',async(req,res)=>{

    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    const id = uuidv4();

    console.log(name+" "+email+' '+phone);

    if(name.isEmpty || email.isEmpty || phone.isEmpty){
        return res.status(400).json({
            messag:"Please fill all the filled"
        });
    }

    const newuser = new ManageModel({ 'name': name, 'email': email, 'phone': phone })

    try {
        const response = await newuser.save();
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: error
        })
    }
    return res.status(200).json({
        message: "Task Added successfully!!"
    })

   
});




router.get('/searchuser/:id',async(req,res)=>{
        var user = req.params.id
        try {
            var user = await ManageModel.findOne({ id:user})
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                message: error
            });
        }
    
        return res.status(200).json({
            data: user
        })
});

router.delete('/deleteuser/:id', async (req, res) => {
    var userid = req.params.id;

    try {

        var useritem = await ManageModel.deleteOne({
            id: userid
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            mesage: error
        });
    }

    if(useritem['deletedCount']===0)
    {
        return res.status(400).json({
            message: "Item does not exist"
        }); 
    }
    return res.status(200).json({
        message: "user deleted"
    })

});

router.put('./updateuser',async(req,res)=>{

    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    try {
        const res = await Person.updateOne(
            { name: name }, { name:email },{phone:phone});
    } 
    catch (error) {
        console.log(error);
        return res.status(400).json({
            message: error
        
        });
    }
    return res.status(200).json({
        message: "task updated"
    })

    
});







export default router;