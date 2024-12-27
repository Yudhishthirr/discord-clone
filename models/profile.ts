import mongoose, { Schema } from 'mongoose';

// Suggested code may be subject to a license. Learn more: ~LicenseLog:1748343417.
const ProfileSchema = new Schema({
    name:{ 
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique:true
    },
    userId: { 
        type: String,
        required: true, 
        unique:true
    },
    imageUrl:{
        type: String,

        // required: true
    }
},{ timestamps: true });


const ProfileModel = mongoose.models?.Profile || mongoose.model('Profile', ProfileSchema);
export default ProfileModel;