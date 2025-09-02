import { productsService } from "../services/repositories.js";
import { makeid } from "../utils.js";
import { BadRequestError } from '../utils/custom.error.js'; 
import httpResponse from '../utils/http.response.js';
import logger from '../../logs/app.logs.js';
import fs from 'fs'; // para eliminar archivos
import __dirname from "../utils.js";



const getProducts = async (req,res,next) => {
    try {
      const products = await productsService.getProducts();
      if(!products) throw new BadRequestError("No se encontraron productos"); 
      logger.info("Productos obtenidos con éxito"); // uso de logger
      httpResponse.Success(res, products);
    } catch (error) {
         logger.error("Error al obtener los productos");
         next(error);
    }
};

const getProductById = async (req,res,next) => {
    const pid = req.params.pid;
    try {
        const product = await productsService.getProductById(pid);
        if(!product) throw new BadRequestError("No se encontro producto con ese id"); 
        logger.info("Producto obtenido con éxito"); // uso de logger   
        httpResponse.Success(res, product);
    } catch (error) {
        logger.error("Error al obtener el producto");
        next(error);
    }
};

const createProduct = async (req,res,next) => {
    const { title, description, price, code, stock, category  } = req.body;
    
    console.log('body-controller:', req.body);
    // Validar campos requeridos
    if (!title || !description || !price || !code || !stock || !category) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
   } 

   //console.log('campos-controller:', title, description, price, code, stock, category);

    try {
        const newProduct = {
            title,
            description,
            price,
            code,
            status: true, // no requerido en el body
            stock,
            category,
            slug: `${title}_${makeid(4)}`, // no requerido en el body
            thumbnails: []  // no requerido en el body
        };

        for (let i = 0; i < req.files.length; i++) {
                newProduct.thumbnails.push({ maintype: req.files[i].mimetype, path: `/files/products/${req.files[i].filename}`, main: i == 0 });
        }
        const result = await productsService.createProduct(newProduct);
        if(!result) throw new BadRequestError("No se pudo crear el producto");
        logger.info("Producto creado con éxito"); // uso de logger
        httpResponse.Created(res, result);
    } catch (error) {
        logger.error("Error al crear el producto");
        next(error);
    }
};

const deleteProduct = async (req, res, next) => {
    const pid = req.params.pid;
    try {
        // Verificar si el producto existe antes de intentar eliminarlo
        const product = await productsService.getProductById(pid);
        if (!product) throw new BadRequestError("No se encontró producto con ese id");

        // Validar que el producto tenga thumbnails
        if (!product.thumbnails || product.thumbnails.length === 0) {
            throw new BadRequestError("El producto no tiene imágenes asociadas para eliminar.");
        }

       
        const path = product.thumbnails[0].path; // Obtener el path de la miniatura principal
        const filePath = `${__dirname}/public${path}`; // Ruta absoluta del archivo

        // Verificar si el archivo existe antes de intentar eliminarlo
        if (fs.existsSync(filePath)) {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(`Error al eliminar el archivo: ${err}`);
                } else {
                    console.log('Archivo eliminado exitosamente');
                }
            });
        } else {
            console.warn(`El archivo no existe en la ruta: ${filePath}`);
        }

        const deletedProduct = await productsService.deleteProduct(pid);
        if (!deletedProduct) throw new BadRequestError("No se pudo borrar el producto");

        logger.info("Producto borrado con éxito"); // Uso de logger
        httpResponse.Success(res, deletedProduct);
    } catch (error) {
        logger.error("Error al borrar el producto:", error);
        next(error);
    }
};

const updateProduct = async (req,res,next) => {
    try {
        const pid = req.params.pid;
        const updateData = req.body;
        if (updateData.pid) delete updateData.pid; // Me aseguro que el id no se actualice en la DB
        const result = await productsService.updateProduct(pid, updateData);
        if(!result) throw new BadRequestError("No se pudo actualizar el producto");
        const updatedProduct = await productsService.getProductById(pid);
        if(!updatedProduct) throw new BadRequestError("No se encontro producto con ese id");
        logger.info("Producto actualizado con éxito"); // uso de logger
        httpResponse.Success(res, updatedProduct);
    } catch (error) {
        logger.error("Error al actualizar el producto");
        next(error);
    }
};

export default { 
	getProducts,
	getProductById,
	createProduct,
	deleteProduct,
	updateProduct
};