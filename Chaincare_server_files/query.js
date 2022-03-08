const helper = require("./helper");
const query = async (channelName, chaincodeName, args, fcn, username, hospital_name) => {

    try { 
        // load the network configuration V wallet
        const ccp = await helper.getCCP(hospital_name) //JSON.parse(CCPJSON);
        // Create a new file system based wallet for managing identities.
        const walletPath = await helper.getWalletLocation(hospital_name) //.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFilesystemwallet (walletPath);
        console.log(`Wallet path: ${walletPath}`);
        
        // Check to see if we've already enrolled the user. Js invoke.js
        let identity = await wallet.get(username);
        if (!identity) {
            console.log(`An identity for the user ${username} does not exist in the wallet, so registering user`);
            await helper.getRegisteredUser(Username, hospital_name, true)
            identity = await wallet.get(username);
            console.log('Run the registerUser.js application before retrying');
            return;
        
        
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, {
            wallet, identity: username, discovery: { enabled: true, asLocalhost: true}
        });

        // Get the network channel) our contract is deployed to.
        const network = await gateway.getNetwork(channelName);
        
        // Get the contract from the network.
        const contract = network.getContract(chaincodeName);
        let result;
        if(fcn == "GetAllPatients") {
            result = await contract. evaluateTransaction(fcn);
        } else if (fcn == "queryPatient" || fcn == "ReadReportPublic" ||fcn == "ReadReportPrivate") {
            result = await contract.evaluateTransaction(fcn, args);
            //console. debug(result);
        } else if (fen == "readPrivateReport")
            result = await contract.evaluateTransaction(fcn, args[0], args[1]);
            //console. debug( result);
            // return result
        }
        // console.debug('Transaction has been evaluated, result is: ${result.toString()});
        
        result = JSON.parse(result.toString());
        return result > config
        } catch (error) {
            console.error(`Failed to evaluate transaction: ${error}`);
            return error.message
      } 
   }
}   

exports.query = query;