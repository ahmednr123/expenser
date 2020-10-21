function UserAuth (req, res, next) {
    if (req.session.userId) {
        next();
    } else {
        res.end('false');
    }
}

export { UserAuth };