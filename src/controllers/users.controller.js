import { usersService} from "../services/repositories.js";
import AuthService from "../services/AuthService.js";


const getUsers = async (req, res) => {
    try {
        const users = await usersService.getUsers();
        res.send(users);
    } catch (error) {
        res.status(500).send({ message: "Error al obtener los usuarios", error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await usersService.getUserById(req.params.uid);
        if (!user) {
            return res.status(404).send({ message: "Usuario no encontrado" });
        }
        res.send(user);
    } catch (error) {
        res.status(500).send({ message: "Error al obtener el usuario", error: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const { email, password, firstName, lastName, birthDate } = req.body;

        if (!email || !password || !firstName || !lastName || !birthDate) {
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
        res.send("User created");
    } catch (error) {
        res.status(500).send({ message: "Error al crear el usuario", error: error.message });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const { userId, firstName, lastName, email, birthDate } = req.body;

        if (!userId || !firstName || !lastName || !email || !birthDate) {
            return res.status(400).send({ message: "Todos los campos son obligatorios" });
        }
        
        const updatedUser = await usersService.updateUser(userId, {
            firstName,
            lastName,
            email,
            birthDate
        });
        console.log( "updatedUser",updatedUser);

        if (!updatedUser) {
            return res.status(404).send({ message: "Usuario no encontrado" });
        }

        res.send({ message: "Perfil actualizado con éxito", user: updatedUser });
    } catch (error) {
        res.status(500).send({ message: "Error al actualizar el perfil", error: error.message });
    }
};


const deleteUser = async (req, res) => {
    try {
        await usersService.deleteUser(req.params.uid);
        res.send({ message: "Usuario eliminado con éxito" });
    } catch (error) {
        res.status(500).send({ message: "Error al eliminar el usuario", error: error.message });
    }
};

export default {
    getUsers,
    getUserById,
    createUser,
    updateUserProfile,
    deleteUser
};