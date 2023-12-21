/* eslint-disable no-undef */
const version = '1.0.1';
const defaultSplitChar = ":"
const defaultConfigList = [
  {
    id: "vue",
    hotKey: 'v',
    title: 'cn.vuejs.org',
    appId: "UURH1MHAF7",
    indexName: 'vuejs_cn2',
    apiKey: 'c23eb8e7895f42daeaf2bf6f63eb4bf6',
    facetFilters: "",
    disabled: false,
  },
  {
    id: "vite",
    hotKey: 'vi',
    title: 'cn.vitejs.dev',
    appId: "7H67QR5P0A",
    indexName: 'vitejs',
    apiKey: 'deaab78bcdfe96b599497d25acc6460e',
    facetFilters: '["tags:cn","lang:zh-CN"]',
    disabled: false,
  }
];

const applyConfig = () => {

  const config = utools.db.get('config');

  // 需要动态添加配置的数组
  let configList = defaultConfigList;

  let split = defaultSplitChar;

  if (!config) {
    utools.db.put({
      _id: 'config',
      data: {
        version: version,
        configList: configList,
        split: split,
      }
    });
  } else {
    split = config.data.split;
    configList = config.data?.configList || [];
  }

  const cmds = configList.map((e) => {
    return {
      "type": "regex",
      "label": `在${e.title}搜索`,
      "match": `/${e.hotKey}${split}/i`,
      "minLength": 1
    }
  });

  if (cmds.length > 0) {
    const features = {
      "code": "utools-docsearch",
      "explain": "docsearch匹配网站",
      "cmds": cmds
    };
    utools.setFeature(features);
  }


}

utools.onPluginReady(() => {
  applyConfig()
})
window.applyConfig = applyConfig;

