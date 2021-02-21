module.exports = {
  env: {
    jest: true,
  },
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  rules: {
    "comma-dangle": 0,
    "no-underscore-dangle": 0,
    "no-param-reassign": 0,
    "no-return-assign": 0,
    camelcase: 0,
  },
};
