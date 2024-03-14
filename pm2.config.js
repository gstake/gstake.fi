module.exports = {
    apps: [
        {
            name: 'metaworldWeb',
            script: './node_modules/next/dist/bin/next',
            args: 'start',
            cwd: './',
            max_memory_restart: '800M',
            exec_mode: 'cluster',
            instances: 'max',
            watch: false,
            ignore_watch: ['node_modules', 'logs', 'static'],
            node_args: '--harmony',
            out_file: './logs/out.log',
            error_file: './logs/err.log',
            merge_logs: true,
            log_date_format: 'YYYY-MM-DD HH:mm Z',
        },
    ],
}
