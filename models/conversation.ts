import mongoose, { Schema } from 'mongoose';

// Suggested code may be subject to a license. Learn more: ~LicenseLog:1748343417.
const ConversationSchema = new Schema({
    memberOne:{
        type:Schema.Types.ObjectId,
        ref:"Member",
        required:true
    },
    memberTwo:{
        type:Schema.Types.ObjectId,
        ref:"Member",
        required:true
    },
    deleted:{
        type:Boolean,
        default:false
    },
},{ timestamps: true });


const ConversationModel = mongoose.models?.Conversation || mongoose.model('Conversation', ConversationSchema);
export default ConversationModel;