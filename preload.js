/* eslint-disable no-undef */

const applyConfig = () => {
  const defaultConfigList = [
    {
      title: 'nnnnzs.cn',
      hotKey: 'n',
      appId: "74Q4ZJSGIE",
      indexName: 'nnnnzs',
      apiKey: '0d46f0335810c99223e60c13412be864',
      disabled: false,
    },
    {
      hotKey: 'v',
      title: 'vuejs.org',
      appId: "ML0LEBN7FQ",
      indexName: 'vuejs',
      apiKey: 'f49cbd92a74532cc55cfbffa5e5a7d01',
      disabled: false,
    }
  ];

  const config = utools.db.get('config');


  let configList = defaultConfigList;
  let split = ':'

  if (!config) {
    utools.db.put({
      _id: 'config',
      data:
      {
        configList: configList,
        split: split,
        language: 'zh'
      }
    });
  } else {
    split = config.data.split;
    configList = config.data.configList;
  }

  const cmds = configList.map((e) => {
    return {
      "type": "regex",
      "label": `在${e.title}搜索`,
      "match": `/${e.hotKey}${split}/i`,
      "minLength": 1
    }
  });

  const features = {
    "code": "utools-docsearch",
    "explain": "docsearch匹配网站",
    "cmds": cmds
  };

  utools.setFeature(features);

}
utools.onPluginReady(() => {
  applyConfig()
})
window.applyConfig = applyConfig;

