import mongoose from "mongoose";


const msgSchema = mongoose.Schema({
    msg: {
        type: String,
        required:true
    },
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: Array,
        required: true
    }
})

const ChatSchema = mongoose.Schema({
    users:[
        {
            type: String,
            required: true

        }
    ],
    msgs: [msgSchema]

})

const Conversation = mongoose.model('Conversation',ChatSchema)

export default Conversation

