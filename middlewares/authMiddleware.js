
const jwt = require('jsonwebtoken');
module.exports = function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if (!Boolean(token)) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (err,user)=>{
        if (err) return res.redirect('/login')
        if (err) return res.sendStatus(403)
       // next()
    })

}