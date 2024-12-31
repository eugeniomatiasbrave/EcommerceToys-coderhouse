import jwt from 'jsonwebtoken';
import PresentUserDTO from '../dto/PresentUserDTO.js';
import { usersService} from "../services/repositories.js";
import AuthService from "../services/AuthService.js";

const SECRET_KEY = process.env.SECRET_KEY;
const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PWD = process.env.ADMIN_PWD;

const register = async (req, res) => {
    try {
        const { email, password, firstName, lastName, birthDate } = req.body;
        //console.log('body',req.body);

        if (!email || !password || !firstName || !lastName || !birthDate) {  // Validaciones de los campos
            return res.status(400).send({ message: "Todos los campos son obligatorios" });
        }

        let role = 'user';
        if (email === ADMIN_USER && password === ADMIN_PWD) {
            role = 'admin';
        }

        const authService = new AuthService();
        const hashedPassword = await authService.hashPassword(password);

        const newUser = {
            firstName,
            lastName,
            email,
            birthDate,
            password: hashedPassword,
            role,
            cartId: null
        };
       
        await usersService.createUser(newUser);
        res.send("Registered");
    } catch (error) {
        res.status(500).send({ message: "Error al registrar el usuario", error: error.message });
    }
};

const login = async (req,res)=>{ 
	const sessionUser = new PresentUserDTO(req.user);
	const token = jwt.sign(sessionUser.toObject(), SECRET_KEY ,{expiresIn:'1h'}); // convierto a sessionUser en un objeto plano
	res.cookie('tokencito',token).send({ status: "success", message: "Logged in successfully", token }); 
}

const current = (req,res)=>{ //el proposito es obtener y devolver informacion del usuario actual que esta autenticado
	if (!req.user) {
		return res.status(401).send({ status: "error", error: "Not logged in" });
	}
	const currentUser = new PresentUserDTO(req.user);
    res.send(currentUser.toObject()); // convierto a currentUser en un objeto plano
}

const logout = (req,res)=>{ 
	res.clearCookie('tokencito').redirect('/');
}

export default { 
	register,
	login,
	current,
	logout
}