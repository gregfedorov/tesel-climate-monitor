module.exports = {
  apps: [{
      name: 'server',
      script: 'server.mjs',
      node_args: '--experimental-modules',
      instances: 1,
      exec_mode: "fork",
      wait_ready: false,
      watch: false,
      listen_timeout: 8000,
      kill_timeout: 3000
  }]
}