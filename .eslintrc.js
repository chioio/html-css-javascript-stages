module.exports = {
    "env": {
        "node": true,
        "browser": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "rules": {
        "no-console": process.env.NODE_ENV !== "production" ? off : error,
        "no-useless-escape": off,
        "no-empty": 0
    },
};
