import {Request,Response} from 'express';
const UrlPattern = require('url-pattern')
module.exports = {
    sessionMiddleware: (req:Request, res:Response, next:Function):void => {
        // If request has session, match the pattern of the request path to either api/proxy/* or /pub/proxy/* 
        //otherwise return 401, unathourized
        if(req.session) {
            const pattern = new UrlPattern(/\/pub\/proxy|\/api\/proxy/)
            if(pattern.match(req.path) !== null) {
                next();
            } else {
                res.sendStatus(401)
            }
        } else {
            next()
        }
    }
}