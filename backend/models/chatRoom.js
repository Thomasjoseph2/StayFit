import mongoose from 'mongoose'

const chatRoom = mongoose.Schema({
    user: {
         type: mongoose.Schema.Types.ObjectId, ref: 'User' 
    }, 
    trainer: {
         type: mongoose.Schema.Types.ObjectId, ref: 'Trainer'
    }, 
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ChatMessage' }],

    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChatMessage',
        default: null
      }
})

const ChatRoom = mongoose.model('chatRoom',chatRoom);

export default ChatRoom ;