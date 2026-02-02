const Book=require("../models/Book");
const User=require("../models/User");

exports.create=async(req,res)=>{
  const book=await Book.create({...req.body,createdBy:req.user.id});
  res.json(book);
};

exports.getAll=async(req,res)=>{
  const q=req.query.q||"";
  const genre=req.query.genre||"";
  const filter={};
  if(q)filter.Name={$regex:q,$options:"i"};
  if(genre)filter.genres=genre;
  res.json(await Book.find(filter).sort({createdAt:-1}));
};

exports.getOne=async(req,res)=>{
  const book=await Book.findById(req.params.id);
  if(!book)return res.status(404).json({msg:"Not found"});
  res.json(book);
};

exports.update=async(req,res)=>{
  const book=await Book.findByIdAndUpdate(req.params.id,req.body,{new:true});
  if(!book)return res.status(404).json({msg:"Not found"});
  res.json(book);
};

exports.remove=async(req,res)=>{
  const book=await Book.findByIdAndDelete(req.params.id);
  if(!book)return res.status(404).json({msg:"Not found"});
  res.json({msg:"deleted"});
};

exports.stock=async(req,res)=>{
  const value=Number(req.body.value||0);
  const book=await Book.findByIdAndUpdate(req.params.id,{$inc:{copiesAvailable:value,copiesTotal:value}},{new:true});
  if(!book)return res.status(404).json({msg:"Not found"});
  res.json(book);
};

exports.addFavorite=async(req,res)=>{
  const user=await User.findByIdAndUpdate(req.user.id,{$addToSet:{favorites:req.params.bookId}},{new:true});
  res.json(user.favorites);
};

exports.removeFavorite=async(req,res)=>{
  const user=await User.findByIdAndUpdate(req.user.id,{$pull:{favorites:req.params.bookId}},{new:true});
  res.json(user.favorites);
};
