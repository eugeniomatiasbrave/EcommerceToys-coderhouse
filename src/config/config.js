import dotenv from 'dotenv';
dotenv.config()


export default {
	app : {
		ADMIN_USER : process.env.ADMIN_EMAIL,
        ADMIN_PWD : process.env.ADMIN_PASSWORD,
		ADMIN_EMAIL: process.env.ADMIN_EMAIL,
		MODE: process.env.MODE
	},
	// PUEDO PONER LAS VARIABLES DE JWT AQUI, secret token y cookies
	jwt: {
        SECRET_KEY: process.env.SECRET_KEY,
    },
	mocks: {
		MOCKS: process.env.PASSWORD_MOCKS,
	},
};
