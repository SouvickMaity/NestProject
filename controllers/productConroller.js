const slugify  = require("slugify");
const productModule=require("../models/productModel");
const categoryModule=require("../models/categoryModel");
const fs=require("fs");

module.exports.createProductController=async(req,res)=>{

 try{
    //create
    const {name,slug,description,price,category,quantity,shipping} = req.fields;
   const {image}=req.files;
   //validation
   switch(true){
      
    case !name: return res.status(500).send({error:"name is require"});
    case !description: return res.status(500).send({error:"description is require"});
    case !price: return res.status(500).send({error:"price is require"});
    case !category: return res.status(500).send({error:"category is require"});
    case !quantity: return res.status(500).send({error:"quantity is require"});
    case image && image.length>0 && image[0].size > 1000000:
         return res.status(500).send({error:"image is require and less then 1mb"});

}




   
    const products= new productModule({...req.fields,slug:slugify(name)});
    if(image){
        products.image.data = fs.readFileSync(image.path);
        products.image.contentType = image.type;
    }
    await products.save();
    res.status(201).send({
        success:true,
        message:"product created successfully",
        products
    });

 }catch(error){
    console.log(error);
    res.status(500).send({
        success:false,
        error,
        message:"error in product creation"

    });

 }
};



// get all product controller
 module.exports.getProductController=async(req,res)=>{

    try{
        const products=await productModule.find({}).populate("category").select("-image").limit(12).sort({createdAt:-1});
        res.status(200).send({
            success:true,
            countTotal:products.length,
            message:"all products",
            products
        });
          
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"error in product creation"
        });
    }

}

// single product controller
module.exports.getSingleProductController=async(req,res)=>{

    try{
        const slug=req.params;
        const product=await productModule.findOne(slug).select("-image").populate("category");
        res.status(200).send({
            success:true,
            message:"single product",
            product,
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"error in geting single product",
        })
        
    }
};

// product image controller
module.exports.productPhotoController=async(req,res)=>{
 try{
    
    const product=await productModule.findById(req.params.pid).select("image");
    if(product.image.data){
        res.set('Content-type',  product.image.contentType);
       return res.status(200).send(product.image.data);

    }

 }catch(error){
    console.log(error);
    res.status(500).send({
        success:false,
        error,
        message:"error in product image"
    })
 }
};

//delete product
module.exports.deleteProductController=async(req,res)=>{
  
    try{
        const product=await productModule.findByIdAndDelete(req.params.pid).select("-image");
        res.status(200).send({
            success:true,
            message:"product deleted",

        })
         

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"error in deleting product"
        })
    }
};


//update product
module.exports.updateProductController=async(req,res)=>{
 try{
    const {name,slug,description,price,category,quantity,shipping} = req.fields;
    const {image}=req.files;
    //validation
    switch(true){
       
     case !name: return res.status(500).send({error:"name is require"});
     case !description: return res.status(500).send({error:"description is require"});
     case !price: return res.status(500).send({error:"price is require"});
     case !category: return res.status(500).send({error:"category is require"});
     case !quantity: return res.status(500).send({error:"quantity is require"});
     case !image && image.size>1000000:
          return res.status(500).send({error:"image is require and less then 1mb"});
 
 }
    
     const products=await productModule.findByIdAndUpdate(req.params.pid,{...req.fields,slug:slugify(name)},{new:true});

     if(image){
         products.image.data = fs.readFileSync(image.path);
         products.image.contentType = image.type;
     }
     await products.save();
     res.status(201).send({
         success:true,
         message:"product updated successfully",
         products
     });
 

 }catch(error){
    console.log(error);
    res.status(500).send({
        success:false,
        error,
        message:"error in updating product"
    })
 }
}


//filter
module.exports.productFiltersController=async(req,res)=>{
    try {
        const { checked, radio } = req.body;
        let args = {};
        if (checked.length > 0) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
        const products = await productModule.find(args);
        res.status(200).send({
          success: true,
          products,
        });
      } catch (error) {
        console.log(error);
        res.status(400).send({
          success: false,
          message: "Error WHile Filtering Products",
          error,
        });
      }

}

// 
module.exports.productCountController=async(req,res)=>{
try{
    const total=await productModule.find({}).estimatedDocumentCount();
    res.status(200).send({
        success:true,
        total
    })


}catch(error){
    console.log(error);
    res.status(400).send({
        success:false,
        message:"Error in counting products",

    })
}
};

//product list
module.exports.productListController=async(req,res)=>{
    try{
        const perPage=6
        const page=req.params.page ? req.params.page: 1
        const products=await productModule.find({}).select("-image").skip((page-1)*perPage).limit(perPage).sort({createdAt:-1});
        res.status(200).send({
            success:true,
            products,
        })
        

    }catch(error){
        console.log(error);
        res.status(400).send({
            success:false,
            message:"Error in getting product list",
        })
    }

};

//search product
module.exports.searchProductController=async(req,res)=>{
    try{
        const {keyword}=req.params
        const result=await productModule.find({
            $or:[
                {name:{$regex:keyword,$options:"i"} },
                {description:{$regex:keyword,$options:"i"} },

            ]
        }).select("-image");
        res.json(result);
       


    }catch(error){
        console.log(error);
        res.status(400).send({
            success:false,
            message:"Error in searching product",
        })
    }
};

//similar product 
module.exports.realtedProductController=async(req,res)=>{

    try {
        const { pid, cid } = req.params;
        const products = await productModule
          .find({
            category: cid,
            _id: { $ne: pid },
          })
          .select("-image")
          .limit(3)
          .populate("category");
        res.status(200).send({
          success: true,
          products,
        });
      } catch (error) {
        console.log(error);
        res.status(400).send({
          success: false,
          message: "error while geting related product",
          error,
        });
      }
    };

    //get product by category
    module.exports.productCategoryController=async(req,res)=>{
        try {
            const category = await categoryModule.findOne({ slug: req.params.slug });
            const products = await productModule.find({ category }).populate("category");
            res.status(200).send({
              success: true,
              category,
              products,
            });
          } catch (error) {
            console.log(error);
            res.status(400).send({
              success: false,
              error,
              message: "Error While Getting products",
            });
          }

    };






    

