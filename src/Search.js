/* eslint-disable no-undef */
import { DocSearchModal } from "@docsearch/react";
import { useParams, useLocation } from "react-router-dom";
import "@docsearch/css";

const baseSize = { width: 1000, height: 600 };

const navigateWindow = (params) => {
  utools.ubrowser.goto(params.itemUrl).run(baseSize)
}

function Search() {
  const param = useParams();
  const hotKey = param.payload;
  const location = useLocation();
  const query = location.state.query

  let appId = '';
  let indexName = '';
  let apiKey = '';
  let facetFilters = [];
  const config = utools.db.get('config');
  const current = config?.data?.configList.find(e => e.hotKey === hotKey);
  if (current) {
    appId = current.appId;
    indexName = current.indexName;
    apiKey = current.apiKey;
    if (current.facetFilters) {
      try {
        facetFilters = JSON.parse(current.facetFilters)
      } catch (error) {

      }
    }
  } else {
    return <div>未找到配置</div>
  }



  return (
    <>
      <DocSearchModal
        key={`${hotKey}_${query}`}
        appId={appId}
        indexName={indexName}
        apiKey={apiKey}
        initialQuery={query}
        searchParameters={{
          facetFilters: facetFilters,
        }}
        navigator={{
          navigate: navigateWindow
        }}
      />
    </>
  );
}
export default Search;
