import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: {
        type: String,
        required: true,
        select: false
    },
    phoneNumber: String,
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    profile: {
        type: String,
        default: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
    },

    
});


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
export default mongoose.models.User || mongoose.model("User", userSchema);