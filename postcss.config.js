module.exports = {
    plugins: {
        'postcss-pxtorem': {
            rootValue: 75,
            selectorBlackList  : ['.van'],
            propList: ['*'],
        },
    },
};
