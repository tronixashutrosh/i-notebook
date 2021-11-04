var jwt = require('jsonwebtoken');
const JWT_SECRET= 'myn0te5';

const fetchUser= (req, res, next)=>{
    // get token
    const token= req.header('auth-token');
    if(!token){
        return res.status(401).send({error:'Invalid Token'});
    }
    try {
        const data= jwt.verify(token, JWT_SECRET);
        req.user= data.user;
        next();
        
    } catch (error) {
        return res.status(401).send({error:'Invalid Token'});
    }
}

module.exports= fetchUser;