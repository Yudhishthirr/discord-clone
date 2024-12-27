import mongoose, { Schema } from 'mongoose';


const ChannelSchema = new Schema({
    name:{ 
        type: String, 
        required: true
    },
    type: {
        type: String,
        enum: ['TEXT', 'VIDEO', 'AUDIO'], // Allowed values
        default: 'TEXT', // Default value
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

const ChannelModel = mongoose.models?.Channel || mongoose.model('Channel', ChannelSchema);
export default ChannelModel;