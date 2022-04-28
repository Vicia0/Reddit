const community = require("../models/communities/crudCommunity");




const createCommunity = async (req,res)=> {
    try {
        const {name,member} = req.body;
        await new community().createCommunity(name,member).then(d=>res.status(200).json(d)).catch(e=>new Error(e));
    } catch (error) {
        
    }
}

const readCommunity = async (req,res)=> {
    try {
        await new community().readCommunity().then(d=>res.status(200).json(d)).catch(e=>new Error(e));
    } catch (error) {
        
    }
}

const joinCommunity = async (req, res) => {
    try {
        const {id,member} = req.body;
        await new community().joinCommunity(id,member).then(d=>res.status(200).json(d)).catch(e=>new Error(e));
    } catch (error) {
        
    }
}

module.exports = {createCommunity, readCommunity,joinCommunity};