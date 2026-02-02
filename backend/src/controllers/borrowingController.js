const Borrowing=require("../models/Borrowing");
const Book=require("../models/Book");

exports.borrow=async(req,res)=>{
  const {bookId}=req.body;
  const book=await Book.findById(bookId);
  if(!book)return res.status(404).json({msg:"Book not found"});
  if(book.copiesAvailable<=0)return res.status(400).json({msg:"No copies available"});
  await Book.findByIdAndUpdate(bookId,{$inc:{copiesAvailable:-1}});
  const borrowing=await Borrowing.create({userId:req.user.id,bookId,borrowDate:new Date(),status:"active"});
  res.json(borrowing);
};

exports.returnBook=async(req,res)=>{
  const borrowing=await Borrowing.findById(req.params.id);
  if(!borrowing)return res.status(404).json({msg:"Borrowing not found"});
  if(String(borrowing.userId)!==String(req.user.id)&&req.user.role==="reader")return res.status(403).json({msg:"Access denied"});
  if(borrowing.status==="returned")return res.status(400).json({msg:"Already returned"});
  borrowing.status="returned";
  borrowing.returnDate=new Date();
  await borrowing.save();
  await Book.findByIdAndUpdate(borrowing.bookId,{$inc:{copiesAvailable:1}});
  res.json(borrowing);
};

exports.my=async(req,res)=>{
  res.json(await Borrowing.find({userId:req.user.id}).populate("bookId","Name"));
};

exports.all=async(req,res)=>{
  const status=req.query.status;
  const filter={};
  if(status)filter.status=status;
  res.json(await Borrowing.find(filter).populate("userId","name email").populate("bookId","Name"));
};
