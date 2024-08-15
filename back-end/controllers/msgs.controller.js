import Conversation from "../models/chat.model.js";

export const addMsgToConversation = async(users,msg)=>{
    try {
        let conversation =  await Conversation.findOne({users: {$all: users}})
        if(!conversation){
            conversation =  await Conversation.create({users: users})
            console.log(users);
        }
        conversation.msgs.push(msg)
        await conversation.save()
    } catch (error) {
        console.log(error);
    }
}

const getMsgsForConversation = async(req,res)=>{
    try {
        const {sender,receiver} = req.query
        const users = [sender,receiver]
        const conversation = await Conversation.findOne({users: {$all : users}})
        if(!conversation){
            console.log("There are no Conversations!!!");
            return res.status(200).send()
        }
 
            return res.json(conversation.msgs)
        
    } catch (error) {
        console.log(error);
        res.status(501).json({error: error})
    }
}

export default getMsgsForConversation
