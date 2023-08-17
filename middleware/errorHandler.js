const {constants} = require("../constants");
const errorHandler = (err,req,res,next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch(statusCode){
        case constants.VALIDATION_ERROR:
            res.json({
                title:"Not Found", 
                message: err.message, 
                stackTrace: err.stackTrace
            });      
            break;
            case constants.NOT_FOUND:
            res.json({
                title:"Not Found ", 
                message: err.message, 
                stackTrace: err.stackTrace
            });
            break;
            case constants.UNAUTHORIZED:
            res.json({
                title:"Unauthorized ", 
                message: err.message, 
                stackTrace: err.stackTrace
            });
            break;
            case constants.FORBIDDEN:
            res.json({
                title:" forbidden", 
                message: err.message, 
                stackTrace: err.stackTrace
            });
            break;
            case constants.SERVER_ERROR:
            res.json({
                title:"Server_Error ", 
                message: err.message, 
                stackTrace: err.stackTrace
            });
           
        default:
            console.log("No Error, All good!")
        break;
    }
    
    res.json({title:"Valiation Failed", message: err.message, stackTrace: err.stackTrace})



};

module.exports = errorHandler;