import passport from "passport";

export const passportCall = (strategy) => (req, res, next) => {
    passport.authenticate(strategy, { session: false }, (error, user, info) => {
        if (error) {
            console.error('Error en la autenticación:', error);
            return res.status(500).send({ status: 'error', message: 'Error en la autenticación' });
        }
        if (!user) {
            console.log('Usuario no autenticado');
            req.user = null;
        } else {
            console.log('Usuario autenticado:', user);
            req.user = user; // Persistir el usuario autenticado
        }
        next();
    })(req, res, next);
};

// para cuando nesecitas autenticar ususarios en rutas especificas, proteger rutas que nesecitan autenticacion.
// Ejemplo de rutas: ususarios o productos. passportCall('jwt') o passportCall('jwtCookies')

