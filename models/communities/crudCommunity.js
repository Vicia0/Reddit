const community = require("./community");
const mongoose = require("mongoose");
class crudCommunity {
    constructor(){};
    async createCommunity(name,member){
        try {
            await mongoose.connect(process.env.MONGO_URI).then(async ()=> {
                
                let members = [member];
                await community.create({name,members}).then(d=>d).catch(e=>new Error(e));
            }).catch(e=>new Error(e));
        } catch (error) {
            throw new Error(error);
        }
    }

    async readCommunity(){
        try {
            let data = {};
            await mongoose.connect(process.env.MONGO_URI).then(async ()=> {
                await community.find({}).then(d=>{
                    data = d;
                }).catch(e=>new Error(e));
            }).catch(e=>new Error(e));
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }
    async joinCommunity(id, member) {
        try {
            await mongoose.connect(process.env.MONGO_URI).then(async ()=> {
                await community.findOne({_id:id}).then(async d=>{
                    let communityFound = d;
                    communityFound.members.push(member);
                    // after updating found community the update the model
                    let name = communityFound.name;
                    let members = communityFound.members;
                    await community.findOneAndUpdate({_id:id},{name,members}).then(d=>d).catch(e=>new Error(e));
                }).catch(e=>new Error(e));
                
            }).catch(e=>new Error(e));
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = crudCommunity;
