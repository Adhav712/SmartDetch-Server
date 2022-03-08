var{Gateway, Wallets, DefaultEventliandlerStrategies, X5O9WalletNixin } = require('fabric-network');
const path = require('Path');
const fabricCAServires = require('fabric-ca-client'); 
const fs = require('fs');

const util = require('util');

let ccpPath;
let configPath;

const getConnProfile = async (mspid) => {

}

const ConnectToNetwork = async (ChannelName) => {

}

const CreateUser = async (email, password, orgMSPID) => {
     if (!email || !password || !orgMSPID) {
        throw Error('Error! Please fill the registration form');
     }

     try {
        let configobj = await getConnProfile(orgMSPID);
        const walletPath = await getwalletLocation(orgMSPID)
        const wallet = await Wallets.newFilesystemWallet(walletPath);
        
        // Check to see if we've already enrolled the user. 
        const userIdentity = await wallet.get(email);
        if (userIdentity) {
            console.log(`An identity for the user ${email} already exists in the wallet`);
            var response = {
                success: true,
                message: email + ' already exists!',
            };    
        return response
        }
      }
      
      // Check to see if we've already enrolled the admin user. 
      let adminIdentity = await wallet.get(configobj.config.appAdmin);
      if (ladminIdentity) {
            console.log('An identity for the admin user "admin" does not exist in the wallet'); 
                //var response = {
                //      success: true,
                //      message: 'Admin user doesn't exists!',
            //}; 
            //return response 
            await enrollAdmin(orgMSPID, configobj.ccp);
            adminIdentity = await wallet.get('admin');
            console.log("Admin Enrolled successfully");
        }   

        const connectOptions = {
            wallet, identity: configobj.config.appAdmin, discovery: configobj.config.gatewayDiscovery
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(configobj.ccp, connectoptions); 

        // Get the CA client object from the gateway for interacting with the CA.
        // const caURL = await getcaurl(orgMSPID, configobj.ccp)
        const caName = await getCAName(orgMSPID);
        const caURL = configobj.cep.certificateAuthorities[caname].url;

        const ca = new FabricCAServices (CaURL);
    
        // build a user object for authenticating with the CA
        const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
        const adminuser = await provider.getUserContext(adminIdentity, 'admin');

        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register( {enrollmentID: email, role: 'Client' }, adminuser);
        const enrollment = await ca. enrolll({enrollmentID: email,enrollmentSecret: secret });
        const x509Identity = await createIdentity(enrollment, orgMSPID) 
        await wallet.put (email, x589Identity);

        console.log('Successfully registered and enrolled admin user ${email} and imported it into the wallet' ); 

        var response = {
            success: true,
            message: email + ' enrolled Sucessfully',
        };
        return response
   
        }catch (error){
          //console.log(error)
          return error.message
      }
    }

const getCAName = async (org) = {

}

const createIdentity = async (enrollment, orgMSPID) = {
    
}