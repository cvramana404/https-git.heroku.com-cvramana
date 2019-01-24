var exp=require('express');
var app=exp();
var path=require('path');
var bodyparser=require ('body-parser');
var bcrypt=require ('bcryptjs')
app.use(bodyparser.json());
var s;
var mongoose=require('mongoose');

//getting mongodb client object
var mongoclient=require ('mongodb').MongoClient;
var dbo;
var url="mongodb://cvramana404:r7204281483@ds161074.mlab.com:61074/onlinenoticeboard";






//connect with onlinenoticeboard db
mongoclient.connect(url,(err,client)=>{
    if(err)
    {
        console.log('error in db connection');
        
    }
    else
    {
        //get object of onlinenoticeboard db
        dbo=client.db('onlinenoticeboard');
        console.log('connect with data base');
    }
})


//connecting the server with angular application

app.use(exp.static(path.join(__dirname,'dist/noticeboard')));

app.post ('/home/register',(req,res,next)=>{
    console.log(req.body);
    //check with existing collection
dbo.collection('registration').find({email:req.body.email}).toArray((err,data)=>{
    

    //if user is not found then insert user document

    if(data.length===0)
    {
        bcrypt.hash(req.body.password,10,(err,hashcode)=>{
            if(err)
            {
                console.log('error during hashing');
            }
            else
            {
               dbo.collection('registration').insertOne({firstname:req.body.firstname,
                                                        password:hashcode,
                                                        middlename:req.body.middlename,
                                                        lastname:req.body.lastname,
                                                        email:req.body.email,
                                                        dateofbirth:req.body.dateofbirth,
                                                        rollnumber:req.body.rollnumber,
                                                        category:req.body.category,
                                                        branch:req.body.branch,
                                                        gender:req.body.gender},()=>{
                   res.json("registered successfully")
               }) 
            }
        })
    }

    //if user is existed
    else
    {
        res.json("user existed");
    }

    // {
    //     dbo.collection('registration').insert(req.body,(err,success)=>
    //     {
    //     if(err)
    //     {
    //         console.log('user not created');
    //     }
    //     else
    //     {
    //         res.send({"message":'registered successfully'})
    //     }
    //     })
    // }        
    
        // else
        // {
        //     res.send({"message":'user already existed choose another user name'});
        // }
    })
})


//login operation
app.post('/home/login',(req,res,next)=>{
    s=req.body.email;
    dbo.collection('registration').find({email:req.body.email}).toArray((err,data)=>{

        
        if(err)
        {
            console.log('err')
        }
        else
        {
            if(data.length===0)
            {
                res.json("user not existed")
            }
            else
            {
                //if password matched then true is assigned to success, else false
                bcrypt.compare(req.body.password,data[0].password,(err,success)=>{
                    console.log(success);
                    
                    if(err)
                    {
                        console.log('err');
                    }
                    else if(success===true && data[0].category==="Admin")
                    {
                        res.json("logged in successfully as admin");
                    }
                    else if(success===true && data[0].category==="Student")
                    {
                        res.json("logged in successfully as student");
                    }
                    else
                    {
                        res.json("wrong password");
                    }
                })
            }
        }
    })
})


//getting data from data base to admin profile or student profile
app.get('/admin/adminprofile',(req,res,next)=>{
    dbo.collection('registration').find({email:s}).toArray((err,data)=>{
        if(err)
        {
            console.log("err");
        }
        else
        {
            res.send(data);
        }

    }
    )}

)

//getting data from data base to student profile

app.get('/student/studentprofile',(req,res,next)=>{
    dbo.collection('registration').find({email:s}).toArray((err,data)=>{
        if(err)
        {
            console.log("err");
        }
        else
        {
            res.send(data);
        }

    }
    )}

)



//admin notifications operation
app.post('/admin/adminnotifications',(req,res,next)=>{
    
    dbo.collection('adminnotifications').insertOne({name:req.body.name,
                                                    date:req.body.date,
                                                    notifications:req.body.notifications},()=>{
                                                        res.json("notification created successfully")
                                                    })
})

//getting data from database to admin notifications
app.get('/admin/adminnotifications',(req,res,next)=>{
    dbo.collection('adminnotifications').find({}).toArray((err,data)=>{
        if(err)
        {
            console.log('err')
        }
        else
        {
            res.json(data);
        }
    })
})


//admin results operation
app.post('/admin/adminresult',(req,res,next)=>{
    dbo.collection('adminresults').insertOne({name:req.body.name,
                                            branch:req.body.branch,
                                            subject1:req.body.subject1,
                                            marks1:req.body.marks1,
                                            subject2:req.body.subject2,
                                            marks2:req.body.marks2,
                                            subject3:req.body.subject3,
                                            marks3:req.body.marks3,
                                            subject4:req.body.subject4,
                                            marks4:req.body.marks4},()=>{
                                                res.json("results genetated succssfully")
                                            })
})


//getting data from database to admin results
app.get('/admin/adminresult',(req,res,next)=>{
    dbo.collection('adminresults').find({}).toArray((err,data)=>{
        if(err)
        {
            console.log('err');
        }
        else
        {
            res.json(data);
        }
    })
})


//update of admin profile

app.put('/admin/adminprofile',(req,res)=>{
    //object received from client
    console.log(req.body);
    //converting strinng id into object id
    var objectId=new mongoose.Types.ObjectId(req.body._id);
    console.log(objectId);
    //updating document in database
    dbo.collection('registration').update({_id:objectId},{$set:{firstname:req.body.firstname,
                                                                
                                                                middlename:req.body.middlename,
                                                                lastname:req.body.lastname,
                                                                email:req.body.email,
                                                                dateofbirth:req.body.dateofbirth,
                                                                rollnumber:req.body.rollnumber,
                                                                category:req.body.category,
                                                                branch:req.body.branch,
                                                                gender:req.body.gender}},(err,success)=>{
        if(err)
        {
            console.log('err');
        }
        else
        {
            dbo.collection('registration').find({}).toArray((err,data)=>{
                if(err)
                {
                    console.log('err');
                }
                else
                {
                    res.json("updated successfull");
                }
            })
        }
    })
})


//update of student profile

app.put('/student/studentprofile',(req,res)=>{
    //object received from client
    console.log(req.body);
    //converting strinng id into object id
    var objectId=new mongoose.Types.ObjectId(req.body._id);
    console.log(objectId);
    //updating document in database
    dbo.collection('registration').update({_id:objectId},{$set:{firstname:req.body.firstname,
                                                                
                                                                middlename:req.body.middlename,
                                                                lastname:req.body.lastname,
                                                                email:req.body.email,
                                                                dateofbirth:req.body.dateofbirth,
                                                                rollnumber:req.body.rollnumber,
                                                                category:req.body.category,
                                                                branch:req.body.branch,
                                                                gender:req.body.gender}},(err,success)=>{
        if(err)
        {
            console.log('err');
        }
        else
        {
            dbo.collection('registration').find({}).toArray((err,data)=>{
                if(err)
                {
                    console.log('err');
                }
                else
                {
                    res.json("updated successfull");
                }
            })
        }
    })
})


//delete of student profile
app.delete('/student/studentprofile',(req,res)=>{
    //object received from client
    console.log(req.body);
    //converting strinng id into object id
    // var objectId=new mongoose.Types.ObjectId(req.body._id);
    // console.log(objectId);
    //delete document in database
    dbo.collection('registration').remove({rollnumber:req.body.rollnumber},(err,success)=>{
if(err)
{
    console.log('err');
}
else
{
    dbo.collection('registration').find({}).toArray((err,data)=>{
        if(err)
        {
            console.log('err');
        }
        else
        {
            res.json(data);
        }
    })
}
                                                                })
})


//delete of admin Notifications
app.delete('/admin/adminnotifications',(req,res)=>{
    //object received from client
    console.log(req.body);
    //converting strinng id into object id
    // var objectId=new mongoose.Types.ObjectId(req.body._id);
    // console.log(objectId);
    //delete document in database
    dbo.collection('adminnotifications').remove({name:req.body.name},(err,success)=>{
if(err)
{
    console.log('err');
}
else
{
    dbo.collection('adminnotifications').find({}).toArray((err,data)=>{
        if(err)
        {
            console.log('err');
        }
        else
        {
            res.json(data);
        }
    })
}
                                                                })
})




app.listen(process.env.PORT||8080,()=>{
    console.log('server started');
})


