const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");


//descriptyion....... Register a User
//routes ..... Post/user/register
//access public..
const registerUser = asyncHandler (async (req,res)  => {
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All field are mandatory!");
    }
    const userAvailable = await User.findOne({ email });
    if(userAvailable) {
        res.status(400);
        throw new Error("User Already registered!")
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password: ", hashedPassword);

    const user =  await User.create({
        username,
        email,
        password: hashedPassword,
    });
    console.log(`User Created ${user}`);
    if(user){
        res.status(201).json({_id: user.id, email: user.email});
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }



    res.json({message: "Register the user"});
});

//descriptyion....... =login a User
//routes ..... Post/user/login
//access public..
const loginUser = asyncHandler (async (req,res)  => {
    const { email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields re Mandatory");
    }
    const user = await User.findOne({email});
    //compare password with hashedPassword
    if(user && (await bcrypt.compare(password, user.password))){
        //if the psswrd mthes , we need to provide n access token to
        //respond
        const accessToken = jwt.sign({
            user: {
                user: user.username,
                email: user.email,
                id: user.id
            }, 
        },
         process.env.ACCESS_TOKEN_SECRET,
         //expirtion time of the token
         {expiresIn: "15m"}  

        );
        res.status(200).json({accessToken});
        
    } else {

        res.status(401)
        throw new Error("email or password is not valid");
    }
});

//descriptyion....... =current User info
//routes ..... get/user/login
//access private..
// to access it you need  current user info
const currentUser = asyncHandler (async (req,res)  => {
    res.json(req.user);
});




module.exports = {registerUser, loginUser, currentUser}