module.exports = {
  apps: [{
    script: 'npm',
    args: 'start',
    instances: "max",
    exec_mode: "cluster"
  }],
};
