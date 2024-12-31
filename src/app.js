import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import Handlebars from "handlebars";
import exphbs from "express-handlebars";
import cookieParser from "cookie-parser";
import passport from "passport";
import './passport/jwt.js';
import cors from 'cors';
import __dirname from "./utils.js";
import ViewsRouter from "./routes/ViewsRouter.js";
import sessionsRouter from "./routes/sessions.router.js";
import productsRouter from "./routes/products.router.js";
import usersRouter from "./routes/users.router.js";
import cartsRouter from "./routes/carts.router.js";
import usersMocksRouter from "./routes/usersMocks.router.js";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { handlerError } from "./middlewares/handler.error.js";
import { info } from "./docs/info.js";
import initializePassportConfig from "./passport/jwt.js";

const app = express();

const PORT = process.env.PORT || 8080;

const URL = process.env.MONGO_URL;
const connection = mongoose.connect(URL);

app.use(cors());

// Swagger Configuration
const specs = swaggerJSDoc(info);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(helmet()); // Usar helmet para mejorar la seguridad
  
// Register Handlebars helpers
Handlebars.registerHelper("multiply", (a, b) => a * b);
Handlebars.registerHelper("calculateTotal", function (products) {
  let total = 0;
  products.forEach((product) => {
    total += product.quantity * product.product.price;
  });
  return total.toFixed(2); // Formato de dos decimales
});

// Handlebars Configuration
const handlebars = exphbs.create({
  handlebars: Handlebars,
  runtimeOptions: {
   allowProtoPropertiesByDefault: true,
   allowProtoMethodsByDefault: true,
  },
});

  
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Passport Configuración
initializePassportConfig(); 
app.use(passport.initialize());


//Rutas
  app.use("/", ViewsRouter);
  app.use("/api/products", productsRouter);
  app.use("/api/users", usersRouter)
  app.use("/api/carts", cartsRouter);
  app.use("/api/sessions", sessionsRouter);
  app.use("/api/mockingtoys", usersMocksRouter);

  // Middleware de errores
 app.use(handlerError);

 app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;

  
