module.exports = {
  prod: {
    url: 'https://fidcor.manticore-labs.com',
    port: '443',
    "urlWebsockets": "https://fidcor.manticore-labs.com",
    "portWebsockets": "443",
  },
  preProd: {
    url: 'http://186.4.149.35',
    port: '8080/bvq',
  },
  test: {
    url: 'http://186.4.149.35',
    port: '8080/bvq',
    "urlWebsockets": "http://186.4.149.35",
    "portWebsockets": "8080/bvq",
  },
  dev: {
    url: 'http://localhost',
    port: '8080',
    "urlWebsockets": "http://localhost",
    "portWebsockets": "8080",
  },
};
