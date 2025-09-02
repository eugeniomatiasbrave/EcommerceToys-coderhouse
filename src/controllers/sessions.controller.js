import jwt from 'jsonwebtoken';
import PresentUserDTO from '../dto/PresentUserDTO.js';
import MailingService from '../services/MailingService.js';

const SECRET_KEY = process.env.SECRET_KEY;

const register = async (req, res) => {
    
  const mailingService = new MailingService();
  try {

    const { email, firstName } = req.body;
    
    const result = await mailingService.sendMail({ email, firstName });
      console.log(result);
        
        res.send("Registered");
    } catch (error) {
        res.status(500).send({ message: "Error al registrar el usuario", error: error.message });
    }
};

const login = async (req,res)=>{ 
	console.log('Login - req.user:', req.user);
	if (!req.user) {
		console.log('Login fallido: req.user es null o undefined');
		return res.status(401).json({ error: "Credenciales inválidas" });
	}
	try {
		const sessionUser = new PresentUserDTO(req.user);
		const token = jwt.sign(sessionUser.toObject(), SECRET_KEY ,{expiresIn:'1h'}); // convierto a sessionUser en un objeto plano
		res.cookie('tokencito',token , { httpOnly: true }).send({ status: "success", message: "Logged in successfully", token }); 
	} catch (error) {
		console.error('Error creando PresentUserDTO:', error);
		return res.status(500).json({ error: "Error interno en login" });
	}
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