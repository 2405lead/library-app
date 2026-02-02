const Borrowing=require("../models/Borrowing");

exports.topBooks=async(req,res)=>{
  const data=await Borrowing.aggregate([
    {$group:{_id:"$bookId",borrowCount:{$sum:1}}},
    {$sort:{borrowCount:-1}},
    {$limit:5},
    {$lookup:{from:"books",localField:"_id",foreignField:"_id",as:"book"}},
    {$unwind:"$book"},
    {$project:{_id:0,bookId:"$book._id",Name:"$book.Name",borrowCount:1}}
  ]);
  res.json(data);
};

exports.activeReaders=async(req,res)=>{
  const data=await Borrowing.aggregate([
    {$group:{_id:"$userId",totalBorrowings:{$sum:1}}},
    {$sort:{totalBorrowings:-1}},
    {$limit:5},
    {$lookup:{from:"users",localField:"_id",foreignField:"_id",as:"user"}},
    {$unwind:"$user"},
    {$project:{_id:0,userId:"$user._id",name:"$user.name",email:"$user.email",totalBorrowings:1}}
  ]);
  res.json(data);
};
