module.exports = {
    future: {
        webpack5: true,
    },
    devIndicators: {
        autoPrerender: false,
    },
    exportPathMap: async  (
      defaultPathMap,
      { dev, dir, outDir, distDir, buildId }
    )=> {
        return {
            '/': { page: '/' },
        }
    },
    env:{
        DEV: 'http://localhost:3001',
        PROD: '/'
    }
}
