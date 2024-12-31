
export const roleAuth = (roles) => {
    return async (req, res, next) => {
        if (roles.includes('PUBLIC')) return next();
        if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
        if (roles.includes('AUTHORIZED') && !req.user) return res.status(401).json({ error: 'Unauthorized' });
        if (roles.includes(req?.user?.role?.toUpperCase())) return next();
        return res.status(403).json({ error: 'Forbidden' });
    }
}