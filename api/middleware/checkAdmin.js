const jwt =require("jsonwebtoken")

module.exports= (req, res, next) => {
    try{
        const token=req.headers.authorization.split(" ")[1];
        const decoded=jwt.verify(token, "secret"); //process.env.JWT_KEY
        console.log(decoded);
        if(decoded.email==="admin@admin.com"){
            req.userData=decoded; //add a new field userData to request
            next();
        } else {
            return res.status(401).json({message: "Auth failed"});
        }
    } catch (error) {
        return res.status(401).json({message: "Auth failed"});
    }
};