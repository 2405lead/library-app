const mongoose=require("mongoose");

const BorrowingSchema=new mongoose.Schema({
  userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
  bookId:{type:mongoose.Schema.Types.ObjectId,ref:"Book",required:true},
  borrowDate:{type:Date,default:Date.now},
  dueDate:{type:Date,default:null},
  returnDate:{type:Date,default:null},
  status:{type:String,enum:["active","returned","overdue"],default:"active"},
  fine:{amount:{type:Number,default:0},currency:{type:String,default:"USD"}}
},{timestamps:true});

module.exports=mongoose.model("Borrowing",BorrowingSchema);
