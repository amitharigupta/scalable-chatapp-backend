module.exports = {
    apps: [
        {
            name: 'Express App',
            script: './dist/index.js',
            instance: "max",
            exec_mode: 'cluster',
            autorestart: true,
            watch: ['.'],
            max_memory_restart: '512M',
            env_production: {
                NODE_ENV: 'production'
            },
            env: {
                NODE_ENV: 'development'
            }
        }
    ]
}