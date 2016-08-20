module.exports = {
  servers: {
    one: {
      host: 'www.drakemalu.com',
      username: 'ubuntu',
      pem: '~/.ssh/id_rsa'
      // password:
      // or leave blank for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'life_stats',
    path: '../',
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      ROOT_URL: 'drakemalu.com/lifestats',
      MONGO_URL: 'mongodb://demo:AvxgRFxh5ZrZor82MOLV@ds013414.mlab.com:13414/life_stats'
    },

    //dockerImage: 'kadirahq/meteord'
    deployCheckWaitTime: 60
  }
};