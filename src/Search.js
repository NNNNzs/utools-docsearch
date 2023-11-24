/* eslint-disable no-undef */
import { DocSearchModal } from "@docsearch/react";
import {
  useNavigate
} from "react-router-dom";
import { useState, useEffect } from 'react'
import "@docsearch/css";

const navigate = (params) => {
  utools.ubrowser.goto(params.itemUrl).run({ width: 1000, height: 600 })
}

function App() {

  const [splitChar, setSplitChar] = useState(':');
  const router = useNavigate();
  const [appId, setAppid] = useState('')
  const [indexName, setIndexName] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [hotKey, setHotKey] = useState('')
  const [initialQuery, setInitQuery] = useState('')
  const [language, setLanguage] = useState('zh')

  utools.onPluginEnter(({ code, type, payload, option }) => {
    const config = utools.db.get('config');
    setSplitChar(config.data.split)
    if (code === 'utools-docsearch-setting') {
      router('/setting');
      return
    } else {
      const [key, query] = payload.split(splitChar);
      setHotKey(key)
      setInitQuery(query);
      setLanguage(config.data.language)
    }
  })

  useEffect(() => {
    const config = utools.db.get('config');
    const current = config.data.configList.find(e => e.hotKey === hotKey);
    if (current) {
      setAppid(current.appId)
      setIndexName(current.indexName)
      setApiKey(current.apiKey)
      console.log(current);
    }
  }, [hotKey]);

  return (
    <>
      <DocSearchModal
        appId={appId}
        indexName={indexName}
        apiKey={apiKey}
        initialQuery={initialQuery}
        searchParameters={{
          // facetFilters: [`language:${language}`],
        }}
        navigator={{
          navigate: navigate
        }}
      />
    </>
  );
}
export default App;
