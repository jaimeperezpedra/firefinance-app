module.exports = {
    "settings": {
        "react": {
            "pragma": "React",
            "version": "17.0.2"
        }
    },
    "env": {
        "browser": true,
        "es2021": true,
        "node": true,
        "jest/globals": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react", "jest"
    ],
    "rules": {
    }
}