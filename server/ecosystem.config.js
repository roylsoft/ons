module.exports = {
    apps: [
      {
        name: "server1",
        script: "./app.cjs",
        instances: 8, // Lancer 2 instances de cette app en parallèle
        env: {
          NODE_ENV: "development"
        },
        env_production: {
          NODE_ENV: "production"
        }
      },
      {
        name: "server2",
        script: "./app2.cjs",
        watch: true, // Redémarrer automatiquement en cas de modification du fichier
        error_file: "/home/user/apps/app2/err.log", // Fichier de log des erreurs
        out_file: "/home/user/apps/app2/out.log" // Fichier de log de la sortie standard
      },
      {
        name: "app3",
        script: "./app3.js",
        exec_mode: "cluster", // Lancer plusieurs instances en mode cluster
        instances: "8", // Utiliser le nombre maximal de CPU
        kill_timeout: 3000, // Donner 3 secondes pour un arrêt gracieux
        restart_delay: 30000 // Attendre 30 secondes avant un redémarrage en cas de plantage
      }
    ]
  }