import mongoose, { Schema } from 'mongoose';


const MemberSchema = new Schema({
    role: {
        type: String,
        enum: ['admin', 'moderator', 'guest'], // Allowed values
        default: 'guest', // Default value
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
        required: true,
    },
    serverId: {
        type: Schema.Types.ObjectId,
        ref: 'Server',
        required: true,
    },
},{ timestamps: true })

const MemberModel = mongoose.models?.Member || mongoose.model('Member', MemberSchema);
export default MemberModel;