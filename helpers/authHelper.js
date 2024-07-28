const bcrypt=require("bcrypt");


module.exports.hashPassword= async(password)=>{
    try{
        const salt= 10;
        const hashPassword= await bcrypt.hash(password,salt);
        return hashPassword;

    } catch(error){
        console.log(error);
    }
 
};

module.exports.comparePassword = async(password,hashPassword)=>{
 
        return bcrypt.compare(password,hashPassword);
}




