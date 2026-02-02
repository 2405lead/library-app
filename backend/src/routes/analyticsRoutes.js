const router=require("express").Router();
const Borrowing=require("../models/Borrowing");

router.get("/top-books",async(req,res)=>{
  const data=await Borrowing.aggregate([{$group:{_id:"$bookId",borrowCount:{$sum:1}}},{$sort:{borrowCount:-1}},{$limit:5},{$lookup:{from:"books",localField:"_id",foreignField:"_id",as:"book"}},{$unwind:"$book"},{$project:{_id:0,borrowCount:1,book:{Name:"$book.Name",authors:"$book.authors"}}}]);
  res.json(data);
});

router.get("/top-books",async(req,res)=>{
  const data=await Borrowing.aggregate([{$group:{_id:"$bookId",borrowCount:{$sum:1}}},{$sort:{borrowCount:-1}},{$limit:5},{$lookup:{from:"books",localField:"_id",foreignField:"_id",as:"book"}},{$unwind:"$book"},{$project:{_id:0,borrowCount:1,bookId:"$_id",Name:"$book.Name",authors:"$book.authors"}}]);
  res.json(data);
});

module.exports=router;
