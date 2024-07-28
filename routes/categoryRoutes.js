const express=require("express");
const {
    createCategoryController,
     updateCategoryController,
       CategoryController, 
       singleCategoryController,
        deleteCategoryController}=require("../controllers/categoryController") ;
        
const {requireSignIn,isAdmin}= require("./../middlewares/authMiddleware");


const router = express.Router();

//routes
// create category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//update category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//getALl category
router.get("/get-category", CategoryController);

//single category
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

module.exports = router;