module.exports = {
    devServer(configFunction) {
        return function (proxy, allowedHost) {
            const config = configFunction(proxy, allowedHost);
            return config;
        }
    },
    webpack: function override(webpackConfig) {
        const babelConfig = webpackConfig.module.rules[1].oneOf[2];
        babelConfig.options.plugins.push([
            'emotion',
            {
                sourceMap: true,
                autoLabel: process.env.NODE_ENV !== 'production',
                labelFormat: '[local]-[filename]',
                cssPropOptimization: true,
            }
        ])
        return webpackConfig;
    }

}