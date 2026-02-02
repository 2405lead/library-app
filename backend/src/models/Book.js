const mongoose=require("mongoose");

const BookSchema=new mongoose.Schema({
  Name:{type:String,required:true},
  authors:{type:[String],default:[]},
  genres:{type:[String],default:[]},
  copiesTotal:{type:Number,default:1},
  copiesAvailable:{type:Number,default:1},
  metadata:{
    pages:{type:Number,default:0},
    language:{type:String,default:""}
  },
  createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
},{timestamps:true});

module.exports=mongoose.model("Book",BookSchema);
