const { Gateway, Wallets, TXEventHandler, Gatewayoptions, DefaultEventHandlerstrategies, TxEventHandlerFactory } = require('fabric-network');
const fs = require('fs');
const path = require("path");
const log4js = require('log4js');
const logger = log4js.getLogger('Hospital-sample')
const util = require('util')

const helper = require('./helper')

const invokeTransaction = async (channelName, chaincodeName, fcn, args, username, hospital_name, transientData) =>{
    try {
        logger.debug(util.format( '\n=============invoke transaction on channel %s ==============\n', channelName));

        // load the network configuration
        const ccp = await helper.getCCP(hospital_name) //JSON.parse(ccpJSON);
        
        // Create a new file system based wallet for managing identities.
        const walletPath = await helper.getWalletLocation(hospital_name) //path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFilesystemwallet(walletPath);
        console.log(`wallet path: ${walletPath}`);


        // Check to see if we've already enrolled the user.
        let identity = await wallet.get (username);
        if (!identity) {
            console.log(` An identity for the user ${username} does not exist in the wallet, so registering user`);
            await helper.getRegisteredUser(username, hospital_name, true)
            identity - await wallet.get(username);
            console.log("Run the registerUser.js application before retrying");
            return;
        }
        const connectoptions = {
            wallet, identity: username, discovery: { enabled: true, asLocalhost: true },
            eventHandleroptions: {
                commitTimeout: 100,
                strategy: DefaultEventHandlerstrategies.NETWORK_SCOPE_ALLFORTX
            }
        }    
        // Create a new gateway for connecting to our peer node

        const gateway = new Gateway();
        await gateway.connect(ccp, connectoptions);

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(channelName);

        const contract = network.getContract(chaincodeName);
        // console.log(contract);
        let result
        let message;
        if (fcn === "AddPatient" || fcn === "createPrivateAssetImplicitForHospital1"
            || fcn == "createPrivateAssetImplicitForHospital2") {

            result = await contract.submitTransaction(fcn, args[0], args[i], args[2], args[3], args[4], args[5], args[6], args[7], args[8]);
            message = `Successfully added the patient with key ${args[0]}`

            } else if (fcn = "AddDrug" || fcn == "updateMyDrug") {
            } else if (fcn = "AddReport"){
                const transientDrugData = {
                    patientId: args[0],
                    reportNumber: args[1],
                    reportName: args[2],
                    introduction: args[3],
                    procedure: args[4],
                    result: args[5],
                    imageHash: args[6]
                }    
                args = JSON.stringify(transientDrugbata);
                result = await contract.submitTransaction(fon,args);
                message = 'Successfully added the patient report.'
                console.log(`Transaction ${fcn} with args ${args} has been submitted`);
        } else {
            return `Invocation require either createcar or changeCarowner as function but got ${fcn}`

        }
    await gateway.disconnect();
    
    //result = JSON.parse(result.toString());
    
    let response = {
        message: message,
        result
    }
    return response;
    }
}