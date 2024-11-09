type TRagOptions = {
  engine: TSearchEngine;
  stream?: boolean;
  model?: string;
  locally?: boolean;
  provider?: Provider;
};

export enum TSearchEngine {
  GOOGLE = 'GOOGLE',
  BAIDU = 'BAIDU',
  BING = 'BING',
  SOGOU = 'SOGOU',
  SEARXNG = 'SEARXNG',
}

export type TMode = 'simple' | 'deep' | 'research';
