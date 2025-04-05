import nodemailer from 'nodemailer';
import config from '../config/config.js';


export default class MailingService {
	constructor() {
		this.mailer = nodemailer.createTransport({
			service: 'gmail',
			port: 587,
			auth:{
                user: config.mailer.USER,
                pass: config.mailer.PASSWORD
            }
		});
 	}

	 sendMail = async ({email, firstName}) => {

		if (!email || typeof email !== 'string' || !email.includes('@')) {
			throw new Error('Dirección de correo inválida');
		}
		console.log("Email:", email);
		try {
			const result = await this.mailer.sendMail({
				from: 'Jugueteria Toys - <eugeniomatiasbrave@gmail.com>',
				to: email,
				html: `<div>
                     Hola ${firstName}, bienvenido a la jugueteria Toys. Tu registro fue exitoso.
                   </div>`,
				subject: 'Registro exitoso',
			})
				return result;
			} catch (error) {
				console.log("Error al enviar el correo:", error);
				throw new Error("Error al enviar el correo");
			}
		}
}
