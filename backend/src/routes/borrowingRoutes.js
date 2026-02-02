const router=require("express").Router();
const c=require("../controllers/borrowingController");
const auth=require("../middleware/auth");
const role=require("../middleware/role");

router.post("/borrow",auth,c.borrow);
router.post("/return/:id",auth,c.returnBook);
router.get("/me",auth,c.my);
router.get("/",auth,role(["librarian","admin"]),c.all);

module.exports=router;
