const router=require("express").Router();
const c=require("../controllers/bookController");
const auth=require("../middleware/auth");
const role=require("../middleware/role");

router.get("/",c.getAll);
router.get("/:id",c.getOne);

router.post("/",auth,role(["librarian","admin"]),c.create);
router.put("/:id",auth,role(["librarian","admin"]),c.update);
router.delete("/:id",auth,role(["admin"]),c.remove);
router.patch("/:id/stock",auth,role(["librarian","admin"]),c.stock);

router.post("/:bookId/favorite",auth,c.addFavorite);
router.delete("/:bookId/favorite",auth,c.removeFavorite);

module.exports=router;
