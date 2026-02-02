const router=require("express").Router();
const c=require("../controllers/analyticsController");

router.get("/top-books",c.topBooks);
router.get("/active-readers",c.activeReaders);

module.exports=router;
