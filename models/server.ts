import mongoose, { Schema } from 'mongoose';

const ServerSchema = new Schema({
    name:{ 
        type: String, 
        required: true
    },
    imageUrl:{
        type: String,
        required: true
    },
    inviteCode:{
        type: String,
        // required: true
    },
    creatorId:{
        type:Schema.Types.ObjectId,
        ref:"Profile",
        required:true
    }
},{ timestamps: true });


const ServerModel = mongoose.models?.Server || mongoose.model('Server', ServerSchema);
export default ServerModel;
    
