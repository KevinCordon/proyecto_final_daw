const apiKey = "1234";

function verifyKey(req, res, next) {
    const key = req.headers.authorization;

    if (!key || key !== apiKey) {
        return res.status(401).json({ error: "Unauthorized - Invalid API Key" });
    }

    next();
}

module.exports = verifyKey;