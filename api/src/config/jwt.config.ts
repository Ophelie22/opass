import e from "express";

 ///https://www.uuidgenerator.net/ pour generer le secret
const secret ='f80984c2-5132-4a8a-afd0-d3c9abc27

const jwt = require('jsonwebtoken');

const createJwtToken = (user) => {
    const jwtToken = jwt.sign({
    sub: user._id.toString()
}, secret);
return jwtToken;
}

// Middleware  pour extraire l'utilisateur et verifier si il a un token
const extracUserFromToken = (req, res, next    ) => {
    //jwt sera notre key
    const token =req.cookies.jwt
if (token) {
    try {
        const decodedToken =jwt.verify(token, secret);//soit on va avoir les infos du paylod soit une errreur
        const user = await
    } catch (error) {
        res.clearCookie('jwt');// on delete le token si il y a une erreur
        res.redirect('/login');//on le redirigige vers la page de login
    } else {
        next();
    }
}