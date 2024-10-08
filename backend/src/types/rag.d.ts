type TRagOptions = {
  engine: SearchEngine;
  stream?: boolean;
  model?: string;
  locally?: boolean;
  provider?: Provider;
};

export enum SearchEngine {
  GOOGLE = 'GOOGLE',
  BAIDU = 'BAIDU',
  BING = 'BING',
  SOGOU = 'SOGOU',
  SEARXNG = 'SEARXNG',
}

export type TMode = 'simple' | 'deep' | 'research';
