
export const roleAuth = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.redirect('/login'); // Redirigir al login si no está autenticado
        }
        if (roles.includes(req.user.role)) {
            return next(); // Usuario autorizado
        }
        return res.status(403).render('Unauthorized'); // Redirigir a una página de acceso denegado
    };
};