module.exports = {
  "extends": "airbnb",
  rules: {
    "linebreak-style": ["error", "windows"],
    "no-console": "off",
    "no-underscore-dangle": ["error", { "allow": ["_id"] }],
    "react/react-in-jsx-scope": "off"
  },
  "env": {
    "browser": true,
    "node": true,
    "mocha": true,
    "jest": true,
  },
  "globals": {
    "React": "readonly",
    "ReactDOM": "readonly",
    "styled": "readonly",
  },
};
