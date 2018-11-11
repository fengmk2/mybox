'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1541953768568_8830';

  // add your config here
  config.middleware = [];

  // https://github.com/eggjs/egg-multipart#enable-file-mode-on-config
  config.multipart = {
    mode: 'file',
  };

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks',
    },
  };

  config.oss = {
    client: {
      accessKeyId: process.env.MYBOX_OSS_ID || 'your access key',
      accessKeySecret: process.env.MYBOX_OSS_SECRET || 'your access secret',
      bucket: process.env.MYBOX_OSS_BUCKET || 'your bucket name',
      endpoint: process.env.MYBOX_OSS_ENDPOINT || 'https://oss-cn-hangzhou.aliyuncs.com',
      timeout: '60s',
    },
  };

  return config;
};
