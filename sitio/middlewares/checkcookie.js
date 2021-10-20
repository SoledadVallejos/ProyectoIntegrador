module.exports = (req,res,next) =>{
    if(req.cookies.rememberRoma){
        req.session.userLogged = req.cookies.rememberRoma
    }
    next()
}