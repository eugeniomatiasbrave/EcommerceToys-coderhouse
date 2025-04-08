import {productsService, cartsService, ticketsService } from "../services/repositories.js";


const renderHome = (req, res) => {
    try {
        const user = req.user || null; // Asegúrate de que req.user esté definido
        res.render('Home', { 
            user 
        });
    } catch (error) {
        console.error('Error en renderHome:', error);
        res.status(500).send({ status: "error", message: "Ocurrió un error en el servidor" });
    }
};

const renderRegister = (req, res) => {
    const user = req.user || null; // Asegúrate de incluir el usuario
    res.render('Register', { 
        user 
    });
};

const renderLogin = (req, res) => {
    const user = req.user || null; // Asegúrate de incluir el usuario
    res.render('Login' , { 
        user 
    });
};

const renderProfile = (req, res) => {
    const user = req.user;
    res.render('Profile', {
        user
    });
};

const renderProducts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const sort = req.query.sort || "asc";
    const productsPaginate = await productsService.getProducts(page, limit, sort);
    const products = productsPaginate.docs;
    const { hasPrevPage, hasNextPage, prevPage, nextPage, page: currentPage } = productsPaginate;
    const user = req.user || null; // Asegúrate de incluir el usuario
    res.render("Products", {
        products,
        page: currentPage,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        user // Pasa el usuario a la vista
    });
};

const renderRealTimeProducts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const sort = req.query.sort || "asc";
    const productsPaginate = await productsService.getProducts(page, limit, sort);
    const products = productsPaginate.docs;
    const { hasPrevPage, hasNextPage, prevPage, nextPage, page: currentPage } = productsPaginate;
    const user = req.user || null; // Asegúrate de incluir el usuario
    res.render("RealTimeProducts", {
        products,
        page: currentPage,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        user // Pasa el usuario a la vista
    });
};

const renderProductDetail = async (req, res) => {
  try {
   
    const product = await productsService.getProductById(req.params.pid);
    const cart = await cartsService.getCartById(req.params.cid);
    if (!product) {
      return res.status(404).send({ status: "error", error: 'Producto no encontrado' });
    }
    if (!cart) {
        return res.status(404).send({ status: "error", error: 'Carrito no encontrado' });
      }
    const cartId = cart._id;
    const user = req.user || null; // Asegúrate de incluir el usuario

    res.render('ProductDetail', { 
        product,
        cartId,
        user 
    });

  } catch (error) {
    console.error('Error al obtener el detalle del producto:', error);
    res.status(500).send({ status: "error", error: 'Error al obtener el detalle del producto' });
  }
};

const renderCartById = async (req, res) => { // muestro el carrito del usuario
    try {
        const cart = await cartsService.getCartById(req.params.cid);
        const cartId = cart._id;
        const user = req.user || null; // Asegúrate de incluir el usuario
        res.render('Cart', { 
            cart, 
            cartId, 
            user
        });
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        res.status(500).send({ status: "error", error: 'Error al obtener el carrito' });
    }
};

const renderTicket = async (req, res) => {
    const ticket = await ticketsService.getTicketBy(req.user._id);
    const user = req.user || null; // Asegúrate de incluir el usuario
    res.render('Ticket', { 
        ticket,
        user
    });
}

export default {
    renderHome,
    renderRegister,
    renderLogin,
    renderProfile,
    renderProducts,
    renderRealTimeProducts,
    renderProductDetail,
    renderCartById,
    renderTicket,
};