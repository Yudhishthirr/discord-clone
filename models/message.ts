import mongoose, { Schema } from 'mongoose';

// Suggested code may be subject to a license. Learn more: ~LicenseLog:1748343417.
const MessageSchema = new Schema({
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
    channelId:{
        type:Schema.Types.ObjectId,
        ref:"Channel",
        required:true
    },
    deleted:{
        type:Boolean,
        default:false
    },
},{ timestamps: true });


const MessageModel = mongoose.models?.Message || mongoose.model('Message', MessageSchema);
export default MessageModel;