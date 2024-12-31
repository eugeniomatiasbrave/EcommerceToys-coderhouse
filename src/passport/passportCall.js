import passport from "passport";

export const passportCall = (strategy) => {
    return async (req, res, next) => {
        console.log(`Authenticating with strategy: ${strategy}`);
        passport.authenticate(strategy, function (error, user, info) {
            if (error) {
                console.error('Authentication error:', error);
                return next(error);
            }

            if (!user) {
                console.log('No user found');
                req.user = null;
            } else {
                console.log('User authenticated:', user);
                req.user = user;
            }

            next();
        })(req, res, next);
    }
}

// para cuando nesecitas autenticar ususarios en rutas especificas, proteger rutas que nesecitan autenticacion.
// Ejemplo de rutas: ususarios o productos. passportCall('jwt') o passportCall('jwtCookies')

