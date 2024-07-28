const express= require("express");
const{requireSignIn,isAdmin}= require("./../middlewares/authMiddleware");
const { createProductController, getProductController, getSingleProductController, productPhotoController, deleteProductController, updateProductController, productFiltersController, productCountController, productListController, searchProductController, realtedProductController, productCategoryController } = require("../controllers/productConroller");
const formidable =require("express-formidable");

const router=express.Router();


// route
router.post("/create-product",requireSignIn,isAdmin,formidable(),createProductController);


//update product
router.put("/update-product/:pid",requireSignIn,isAdmin,formidable(),updateProductController);



//get all products
router.get("/get-product",getProductController);

//single product
router.get("/get-product/:slug",getSingleProductController);

//get image
router.get("/product-image/:pid",productPhotoController );


//delete product
router.delete("/delete-product/:pid",deleteProductController);

//filter product
router.post("/product-filters",productFiltersController);

//product count
router.get("/product-count",productCountController);
// product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

//categoris wise product
router.get("/product-category/:slug", productCategoryController);

module.exports=router;




