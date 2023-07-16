module.exports = {
  apps: [
    {
      name: "Revetment frontend",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      instances: 5,
      exec_mode: "cluster",
      watch: false,
      max_memory_restart: 1000,
      env_local: {
        APP_ENV: "local",
      },
      env_dev: {
        APP_ENV: "dev",
      },
      env_prod: {
        APP_ENV: "prod",
      },
    },
  ],
};
