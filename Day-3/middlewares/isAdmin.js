const isAdmin = (req,res,next)=>{
    const decodedData = req.user;
    const {role} = decodedData;
    if(role === 'admin'){
        next();
    }
    else{
        res.status(403).send('Access Denied');
    }
 
 
}
module.exports = isAdmin