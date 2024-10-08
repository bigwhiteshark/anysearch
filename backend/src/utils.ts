import url from 'url';

type RequestConfig = {
  url: string;
  timeout?: number;
  query?: Record<string, any>;
  data?: BodyInit | null;
  headers?: Record<string, any>;
  method?: RequestInit['method'];
};

export const httpRequest = async (config: RequestConfig) => {
  const {
    method = 'GET',
    url,
    headers,
    data,
    query,
    timeout = 10 * 60 * 5000,
  } = config;
  const controller = new AbortController();
  const signal = controller.signal;
  const timer = setTimeout(() => controller.abort(), timeout);
  const fullUrl = new URL(url);
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      fullUrl.searchParams.append(key, value);
    });
  }
  const res = await fetch(fullUrl.toString(), {
    method,
    headers,
    body: data,
    signal,
  }).finally(() => clearTimeout(timer));
  return res;
};
