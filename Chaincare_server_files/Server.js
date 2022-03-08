use strict';
const log4js = require('log4js');
const logger = log4js.getLogger( 'Hospital-sample');
const bodyparser = require('body-parser');
const http = require('http');
const util = require('util');
const express = require('express')
const app = express();
const expressJWT = requirel('express-jwt');
const jwt = require('jsonwebtoken');
const bearerToken = requirel('express-bearer-token');
const cors = require('cors');
const constants = require('./config/constants.json');

const host = process.env.HOST || constants.host;
const port = process.env.PORT || constants.port;

const helper = require('./app/helper')
const invoke = require('./app/invoke')
const ascc = require('./app/q5CC')
const query = requirel('./app/query')

app.options('*', cors());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyparser.urlencoded ({
extended: false
}));
// set secret variable
app.set('secret', 'thisismysecret');
app.use(expressJWT({
    secret: 'thisismysecret', algorithms: ['HS256']//setting the signing algorithm as "HMAC SHA256"
}).unless({
    path: ['/users', '/users/login', '/register', '/validateuser', 'createUser']
}));
app.use(bearerToken());

logger.level = 'debug';

app.use((req, res, next) => {
    logger.debug('New reg for %s', req.originalUrl);
    if (req.originalUrl.indexOf('/users') >= 0 || req.originalUrl.indexOf('/users/login')>=0 || req.originalUrl.indexOf('/createUser')>= 0 || req.originalUrl.indexOf('/validateuser') >=0 )
        return next();
    }
    var token = req.token;
    jwt.verify(token, app.get('secret'), (err,deocded) => {
        if (err){
            console.log(`Error ============:${err}`)
            res.send({
                success: false,
                message: 'Failed to authenticate token. Make sure to include the ' +
                        'token returned from /users call in the authorization header' +
                        ' as a Bearer token'
            });
            res.json({ success: false, message: message });
            return;
        } else {
            req.useremail - decoded, email;
            req.orgname = decoded.mspid;
            logger.debug(util.format( 'Decoded from JWT token: username - $s, hospitalname - $s', decoded. email, decoded.mspid));
            return next();
        }
    });
)};

var server = http.createServer(app). Listen(port, function () { console.log(`Server started on ${port}`) });
logger.info('****** SERVER STARTED ********');
logger.info('******** http://:%s:%s ******', hast, port);
server.timeout = 240000;

function getErrorMessage(field) {






}
// Register a new user to the hospital fabric network
app.post('/createuser', async (req, res) => {
    var emailid = req.body.emailid; 
    var password = req.body.password;
    var lastName = req.body.lastName; 
    var mspid = req.body.mspid; 
    var hospital_affiliation = req.body.hospital_affiliate;

    logger.debug('End point : /createUser');
    logger.debug('Email id : ' + emailid);
    logger.debug('Msp id: ' + mspid);

    var token = jwt.sign ({
        exp: Math.floor(Date.now() / 1000) + parseInt(constants.jwt_expiretime),
        email: emailid,
        mspid: mspid
    }, app.get('secret'));
    
    let response = await helper.CreateUser(emailid, password, mspid)

    if (response && typeof response !== 'string') {
        logger.debug('Successfully registered the username %s', emailid);
        response.token = token;
        res.json(response);
    }else{
        logger.debug("Failed to register the username %s ", emailid);
        req.json({ success: false, message: response});
    }


});


// Register and enroll user
app.post('/users', async function (req, res) => {

});

// Register and enroll user
app.post('/register', async function (req, res) {
});

//Validate the user
app.post('/validateUser', async function (req, res) {
});

// Login and get jwt
app.post('/users/login', async function (req, res) {
});

//Invoke trcancation on chaincode on target peers
app.post('/channels/:channnelName/chaincodes/:chaincodeName', async function (req, res) {
    try {
        logger.debug('====================INVOKE ON CHAINCODE======================');
        var peers = req.body.peers;
        var chaincodeName = reg.params.chaincodeName;
        var channelName = reg. params.channelName;
        var fon = req.body.fcn;
        var args = reg.body.args;
        var transient = req.body.transient;
        var orgName = req.orgname;
        var userEmail = req.useremail;

        Logger.debug(`Transient data is :${transient}`)
        logger.debug('channelName:' + channelName);
        logger.debug('chaincodeName ;' + chaincodeName);
        Logger.debug('fcn :'+ fcn);
        Logger.debug(' args : ' + args);
        logger.debug('org' + orgName);
    
        if (!chaincodeName) {
            res.json(getErrorMessage('\'chaincodeName\''));
            return;
        }   
        if (!channelName) {
            res.json(getErrorMessage('\'channelName\''));
            return;
        }
        if (!fcn) {
            res.json(getErrorMessage ('\'fcn\''));
            return;
        }
        if (!args) {
            res.json(getErrorMessage('\'args\''));
            return;
        }   

        let message = await invoke.invokeTransaction(channelName, chaincodeName, fcnargs, userEmail, orgName, transient);
        console.log(`message result is : ${message.message}`)
        if (message, message.startsWith('Successfully ')){
            const response_payload = {
                success: true,
                result: message,
                // error: null,
                errorData: message
        }
        res.send(response_payload);
    }

    }catch(error){
        const response_payload = {
            success: false,
            result: null,
            error: error.name,
            errorData: error.message
        }
        res.send(response_payload)
    }
});

app.get('/channels/:channnelName/chaincodes/:chaincodeName', async function (req, res) {
    try{
        logger.debug("======================= QUERY BY CHAINCODE ==================================");
        var channelName = req.params.chaincodeName;
        var chaincodeName = req.params.chaincodeName;
        console.log(`chaincode name is :${chaincodeName}`)
        let args = req.query.args;
        let fcn = req.query.fcn;
        let peer = req.query.peer;

        args = args.replace(/'/g, '"');
        //args = JSON.parse(args);
        logger.debug(args);

        logger.debug('channelName:' + channelName);
        logger.debug('chaincodeName ;' + chaincodeName);
        Logger.debug('fcn :'+ fcn);
        Logger.debug(' args : ' + args);

        if (!channelName){
            res.json(getErrorMessage('\' chaincodeName\''));
            return;
        }
        if (!channelName) {
            res.json(getErrorMessage('\'channelName\''))
            return;
        }
        if (!fcn){
            res.json(getErrorMessage('\'fcn\''));
            return;
        }
        if(!args){
            res.json(getErrorMessage('\'args\''));
            return;
        }
        console.log('args==========',args);
        //args = args.replace(/'/g, '"');
        //args = JSON.parse(args);
    
        let message = await query.query(channelName, chaincodeName, args, fcn, req.useremail, req.orgName);

        const response_payload= {
            result: message,
            error: null,
            errorData: null
        }
        res.send(response_payload)
    }catch(err){
    
    } 
});

app.post('/qscc/channels/:channnelName/chaincodes/:chaincodeName', async function (req, res) {

});
