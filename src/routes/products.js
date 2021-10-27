const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require('fs');

/* Configuración de Multer  */
const multer = require("multer");
const storage = multer.diskStorage({
    destination : (req, file, cb) =>{
        console.log(req.body);
        if (!fs.existsSync(path.resolve(__dirname, `../../public/img/${req.body.productName}-imgs`))){
            fs.mkdirSync(path.resolve(__dirname, `../../public/img/${req.body.productName}-imgs`));
        }
        cb(null, path.resolve(__dirname, `../../public/img/${req.body.productName}-imgs`));
    },
    filename: (req, file, cb) => {
        let newFilename
        if (file.fieldname === "logo"){
            newFilename = "Logo" + req.body.productName + Date.now() + path.extname(file.originalname)
        } else{
            newFilename = "Img"+ req.body.productName + Date.now() + path.extname(file.originalname)
        }
        cb(null, newFilename )
    }
})
const upload = multer({storage});

const productsController = require("../controllers/productsController");


router.get("/", productsController.categories);
router.post("/", upload.fields([{name: "logo"},{name: "image"}]), productsController.store);

/* CRUD */
router.get("/dashboard", productsController.dashboard);

/* Carrito */
router.get("/shoppingCart", productsController.cart);

/* Editar producto */
router.get("/edit/:id", productsController.edit);

router.post("/edit", productsController.edit);
/*Actualizar producto */
router.put("/edit/:id", productsController.update);
/* Crear Producto*/
router.get("/create", productsController.create);
/*Borrar producto */
//router.delete()
/* Detalle de producto*/
router.get("/:id", productsController.detail);

router.get("/categories/:category", productsController.categorygames);


module.exports = router;