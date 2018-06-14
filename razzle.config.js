module.exports = {
  modify: (config, { target, dev }, webpack) => {
    // do something to config
    if (config.devServer) {
      config.devServer.watchOptions["poll"] = 1000;
      config.devServer.watchOptions["aggregateTimeout"] = 300;
      console.log("Config: ", config);
    }
    return config;
  }
};

//Shoutout to alexjoyner:
//https://github.com/jaredpalmer/razzle/issues/416#issuecomment-348781076
