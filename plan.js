//626a636caaa9cf8a5be2836f
////626985f27e55ebf704662e78 //626a53fb2cef6882c0e3e939

/*

await vote.create({creator,voteCount:votes}).then(async v=> {
                await post.create({creator,title,content,votes:v,comments: []}).then(p=>{

                    console.log("successfully created post");
                            return p;
                        }).catch(e=>new Error(e));
                });
                
                await new postCrud().createPost(creator,title,content,votes,comments).then(d=> {
            res.status(200).json(d);
        }).catch(e=>new Error(e));
                
                */


/*
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
*/

/*
how to implement the vote feature?
what if there is a votes collection for each post.
and each time, a use votes, a vote is added to the collection, and the copied to the post.
 
find the vote creator, if the vote creator is the voter, delete the document in the vote collection and in post collection votes array., and add the current vote
link the current vote to the post by pushing it in the array.


*/