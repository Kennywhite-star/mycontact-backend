const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel")


//descriptyion....... get all contact
//routes ..... get/api/contact
//access private.. for now... private when auth come in
 const getContacts = asyncHandler (async (req,res)  => {
    const contacts = await Contact.find({user_id : req.user.id });
    res.status(200).json(contacts);
});

//descriptyion....... get all contact
//routes ..... post/api/contact
//access private.. for now... private when auth come in
const createContact = asyncHandler (async (req,res)=> {
    console.log(" the request body is: ", req.body)
    const {name, email, phone} = req.body;
    if(!name || !email || !phone ){
        res.status(400);
        throw new Error("All field are mandatory");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });
 
    res.status(200).json(contact);
});

//descriptyion....... get contact
//routes ..... get/api/contact/:id
//access private.. for now... private when auth come in
const getContact = asyncHandler (async (req,res)=> {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

//descriptyion....... delete contact
//routes ..... put/api/contact/:id
//access private.. for now... private when auth come in
const updateContact = asyncHandler (async (req,res)=> {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update other people contacts");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );

    res.status(200).json(updatedContact);
});

//descriptyion....... delete contact
//routes ..... delete/api/contact/:id
//access public.. for now... private when auth come in
const deleteContact = asyncHandler (async (req,res)=> {
    //fetch contact  from database
    const contact = await Contact.findById(req.params.id);
    //check if the contact is found
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    //check if the user id match
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update other people contacts");
    }
    await Contact.deleteOne({_id: req.params.id}); 
    res.status(200).json(contact);
});

 module.exports = {
     getContacts, 
     createContact,
     getContact, 
     updateContact, 
     deleteContact
    }