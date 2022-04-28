const mongoose = require("mongoose");
const {post,comment,vote} = require("../models/posts/post");
const postCrud = require("../models/posts/postCrud");

const viewPosts = async (req,res) => {
    try {
        await new postCrud().getPost().then(d=> {
            console.log("here is data");
            console.log(d);
            res.status(200).json(d);
        }).catch(e=>new Error(e));
    } catch (error) {
        throw new Error(error);
    }
}

const viewSinglePost = async (req,res) => {
    try {
        const {id} = req.params;
        await new postCrud().getOnePost(id).then(d=> {
            console.log("one post");
            console.log(d);
            res.status(200).json(d);
        }).catch(e=>new Error(e));
    } catch (error) {
        throw new Error(error);
    }
}
const createPosts = async (req,res) => {
    try {
        const {creator,title,content,votes,comments} = req.body;
        await mongoose.connect(process.env.MONGO_URI).then(async ()=> {
            await comment.create({creator,comments}).then(async d=>{
                //console.log(d) d=comment
                await vote.create({creator,voteCount:votes}).then(async v=> {
                    await post.create({creator,title,content,votes:v,comments: d}).then(p=>{
    
                        console.log("successfully created post");
                                
                            res.status(200).json(p);
                            }).catch(e=>new Error(e));
                    }).catch(e=>new Error(e)); 
            }).catch(e=>new Error(e));
            }).catch(e=>new Error(e));
        
    } catch (error) {
        throw new Error(error);
    }
}

const updatePosts = async (req,res) => {
    try {
        const {id,title,content,votes,comments} = req.body;
        await new postCrud().updatePost(id,title,content,votes,comments).then(d=> {
            res.status(200).json(d);
        }).catch(e=>new Error(e));
    } catch (error) {
        throw new Error(error);
    }
}

const deletePosts = async (req,res) => {
    try {
        const {id} = req.body;
        await new postCrud().deletePost(id).then(d=> {
            res.status(200).json(d);
        }).catch(e=>new Error(e));
    } catch (error) {
        throw new Error(error);
    }
}

const addComment = async(req,res) => {
    try {
        const {id,commentInput,creator} = req.body;
        console.log("please add comment", req.body);
        await new postCrud().addCommentToPost(id,commentInput,creator).then(d=> {
            // 
            res.status(200).json({activity: "added comment...", d});
        }).catch(e=>new Error(e));
    } catch (error) {
        throw new Error(error);
    }
}


const voteComment = async(req,res) => {
    try {
        await mongoose.connect(process.env.MONGO_URI).then(async ()=> {
            const {id, vot,creator,postId} = req.body;
            // how to create comment

            // what is id: the one who is sending the vote
            // what is creator: the one who created the post.
            let oneSendingVote = id;
            let oneCreatedPost = creator;
            if(oneSendingVote==oneCreatedPost) {
                console.log("same post creator");
                res.status(404).json({status: "same post creator"});
            }else if(oneSendingVote!=oneCreatedPost){  
            let returnNow = true; 
            await vote.find({}).then(d=> {
                for(let v=d.length-1;v>=0;v--) {
                    // find and delete one sending the 
                    if(d[v].creator == oneSendingVote && d[v].voteCount == vot) {
                        console.log(d[v]);
                        console.log("creator already exists and vote is the same");
                        returnNow = false;
                        res.status(404).json({status: "vote exists, resource not found"});
                    }
                    if(d[v].creator == oneSendingVote && d[v].voteCount != vot) {
                        return;
                    }
                }
            }).catch(e=>new Error(e));

            
                if(returnNow) {

            console.log("creating vote and updating post");
            let result;
                    await post.findOne({_id:postId}).then(async d=> {
                        await vote.create({creator:oneSendingVote, voteCount: vot}).then(d=> {

                        }).catch(e=>new Error(e));
                        d.votes = await vote.find({}).then(d=>d);
                        const {title, content,votes,comments} = d;
                        let id = postId;
                        await post.findOneAndUpdate({_id: id},{title,content,votes,comments}).then(d=>{
                            console.log("updated with votes");
                            result = d.votes;
                        }).catch(e=>new Error(e));
                    
                }).catch(e=>new Error(e));

                console.log(result);
                res.status(200).json(result);
                }
            
        }
        }).catch(e=>new Error(e));
    } catch (error) {
        throw new Error(error);
    }
}

const editComment = async(req,res) => {
    try {
        const {id1,id2,commentInput} = req.body;
        await new postCrud().editComments(id1,id2,commentInput).then(d=> {
            res.status(200).json({activity: "edited comment..."});
        }).catch(e=>new Error(e));
    } catch (error) {
        throw new Error(error);
    }
}

const deleteComment = async(req,res)=> {
    try {
        const {id1,id2} = req.body;
        await new postCrud().deleteComments(id1,id2).then(d=> {
            res.status(200).json({activity: "deleted comment..."});
        }).catch(e=>new Error(e));
    } catch (error) {
        throw new Error(error);
    }
} 
module.exports = {viewPosts, viewSinglePost, createPosts,updatePosts,deletePosts,addComment,voteComment,editComment,deleteComment};