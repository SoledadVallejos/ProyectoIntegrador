function authMiddleware(req, res, next) {
	if (!req.session.userLogin) {
		return res.redirect('/users/login');
	}
	if (!'http://localhost:3001/users/5') {
		return res.send('forbiden');
	}

	next();
}

module.exports = authMiddleware;