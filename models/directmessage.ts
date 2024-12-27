import mongoose, { Schema } from 'mongoose';

// Suggested code may be subject to a license. Learn more: ~LicenseLog:1748343417.
const DirectMessageSchema = new Schema({
    content:{ 
        type: String, 
    },
    fileUrl:{
        type: String,
    },
    memberId:{
        type:Schema.Types.ObjectId,
        ref:"Member",
        required:true
    },
    conversationId:{
        type:Schema.Types.ObjectId,
        ref:"Conversation",
        required:true
    },
    deleted:{
        type:Boolean,
        default:false
    },
},{ timestamps: true });


const DirectMessageModel = mongoose.models?.Directmessage || mongoose.model('Directmessage', DirectMessageSchema);
export default DirectMessageModel;