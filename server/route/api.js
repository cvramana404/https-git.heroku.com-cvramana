var exp=require ('express');
var app=exp();
var jwt=require ('jsonwebtoken')
const bodyparser=require ('body-parser');
const path=require('path');

var s="secret here";
var bcrypt=require ('bcryptjs')
app.use(bodyparser.json());
var t;
var mongoose=require('mongoose');

//check for validation of token
let checkToken=(req,res,next)=>{
    //capture headers with names 'x-access-token' or 'otherization'
    //express headers are auto converted to lowercase
    let token=req.headers['x-access-token']||req.headers['authorization'];
    if(token===undefined)
    {
        return res.json({message:'no token found'})
    }
    if (token.startsWith('Bearer '))
    {
        //remove Bearer from string
        token=token.slice(7,token.length);
    }
    //using jwt package and secret string validate the token
    if(token!==undefined)
    {
        jwt.verify(token,s,(err,decoded)=>{
            //if anything goes wrong return an error immediately before passing control to next
            if(err)
            {
                return res.json({
                    message:'Token is not valid'
                });
            }
            else
            {
                req.decoded=decoded;
                next();
            }
        })
    }
}






//get our api routes


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

//getting data from data base to userdetails
app.get('/home/register',checkToken,(req,res,next)=>{
    dbo.collection('registration').find({}).toArray((err,data)=>{
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


//login operation
app.post('/home/login',(req,res,next)=>{
    t=req.body.email;
    console.log(this.t)
    dbo.collection('registration').find({email:req.body.email}).toArray((err,data)=>{
console.log(data.length)
        
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
                        var jwtBearerToken=jwt.sign(
                            {email:req.body.email},s,{expiresIn:604800}
                        );
                        console.log('token is'+jwtBearerToken);
                    res.status(200).json({idToken:jwtBearerToken,info:'logged in admin'});

                    }
                    else if(success===true && data[0].category==="Student")
                    {
                        
                        var jwtBearerToken=jwt.sign(
                            {email:req.body.email},s,{expiresIn:604800}
                        );
                        console.log('token is'+jwtBearerToken);
                        res.status(200).json({idToken:jwtBearerToken,info:'logged in student'});

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


//getting data from data base to admin profile
app.get('/admin/adminprofile',checkToken,(req,res,next)=>{
    dbo.collection('registration').find({email:t}).toArray((err,data)=>{
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

//getting data from data base to student profile

app.get('/student/studentprofile',checkToken,(req,res,next)=>{
    dbo.collection('registration').find({email:t}).toArray((err,data)=>{
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

//update of student profile

app.put('/student/studentprofile',checkToken,(req,res)=>{
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



//admin notifications operation wing
//admin notifications post operation
app.post('/admin/adminnotifications',checkToken,(req,res,next)=>{
    
    dbo.collection('adminnotifications').insertOne({name:req.body.name,
                                                    date:req.body.date,
                                                    notifications:req.body.notifications},()=>{
                                                        res.json("notification created successfully")
                                                    })
})

//getting data from database to admin notifications
app.get('/admin/adminnotifications',checkToken,(req,res,next)=>{
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



//update of admin Notifications

app.put('/admin/adminnotifications',checkToken,(req,res)=>{
    //object received from client
    console.log(req.body);
    //converting strinng id into object id
    var objectId=new mongoose.Types.ObjectId(req.body._id);
    console.log(objectId);
    //updating document in database
    dbo.collection('adminnotifications').update({_id:objectId},{$set:{name:req.body.name,
                                                                
                                                                    date:req.body.date,
                                                                    notifications:req.body.notifications
                                                                }},(err,success)=>{
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
                    res.json("updated successfull");
                }
            })
        }
    })
})


//delete of admin Notifications
app.delete('/admin/adminnotifications',checkToken,(req,res)=>{
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
            res.json("deleted succesfully");
        }
    })
}
                                                                })
})


//admin results operation wing
//admin results post operation
app.post('/admin/adminresult',checkToken,(req,res,next)=>{
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
app.get('/admin/adminresult',checkToken,(req,res,next)=>{
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

//update of admin results

app.put('/admin/adminresult',checkToken,(req,res)=>{
    //object received from client
    console.log(req.body);
    //converting strinng id into object id
    var objectId=new mongoose.Types.ObjectId(req.body._id);
    console.log(objectId);
    //updating document in database
    dbo.collection('adminresults').update({_id:objectId},{$set:{name:req.body.name,
                                                                branch:req.body.branch,
                                                                subject1:req.body.subject1,
                                                                marks1:req.body.marks1,
                                                                subject2:req.body.subject2,
                                                                marks2:req.body.marks2,
                                                                subject3:req.body.subject3,
                                                                marks3:req.body.marks3,
                                                                subject4:req.body.subject4,
                                                                marks4:req.body.marks4
                                                                }},(err,success)=>{
        if(err)
        {
            console.log('err');
        }
        else
        {
            dbo.collection('adminresults').find({}).toArray((err,data)=>{
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


//delete of admin results
app.delete('/admin/adminresult',checkToken,(req,res)=>{
    //object received from client
    console.log(req.body);
    //converting strinng id into object id
    // var objectId=new mongoose.Types.ObjectId(req.body._id);
    // console.log(objectId);
    //delete document in database
    dbo.collection('adminresults').remove({name:req.body.name},(err,success)=>{
if(err)
{
    console.log('err');
}
else
{
    dbo.collection('adminresults').find({}).toArray((err,data)=>{
        if(err)
        {
            console.log('err');
        }
        else
        {
            res.json("deleted succesfully");
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


module.exports=app;