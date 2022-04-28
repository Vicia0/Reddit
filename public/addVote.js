
async function addVote(loggedinuser,vote,creator,postId,voteId) {
    //{id,vot,creator,postId}
    // things to figure out
    // user id, that is voting -->get it by calling get current user.
    // vote
    // post id's user id -> id
    //loggedinuser,-1,creator,voteKey
//console.log({loggedinuser,vote,creator,postId,voteId});
console.log({loggedinuser,vote,creator,postId});
    await axios.put('/api/posts/addVote',{
        id:loggedinuser,
        vot:vote,
        creator:creator,
        postId: postId
    }).then(d=> {
        console.log("votes",d.data);
        // document.getElementById(`${voteId}`).innerHTML = d.data['votes'].length;
    }).catch(e=>new Error(e));
}