import { Context } from 'koa';
import { Rag } from '../services/rag';
import { SearchEngine } from '../types';

interface SearchRequestBody {
  model: string;
  reload: boolean;
  engine: SearchEngine;
  categoriesa: string;
  mode: string;
  language: string;
  locally: boolean;
  provider: string;
}

export const searchController = async (ctx: Context) => {
  const { request } = ctx;
  const { query, body } = request;
  const { q } = query;
  const {
    model,
    reload,
    engine,
    categoriesa,
    mode,
    language,
    locally,
    provider,
  } = body as SearchRequestBody;
  ctx.set('Content-Type', 'text/event-stream');
  ctx.set('Cache-Control', 'no-cache');
  ctx.set('Connection', 'keep-alive');
  ctx.res.statusCode = 200;

  const stream = (body as { stream: boolean }).stream ?? true;

  const rag = new Rag({
    stream,
    model,
    engine,
    locally,
    provider,
  });

  if (!stream) {
    const res = await rag.query(q as string);
    ctx.body = res;
    return;
  }

  /* const { q } = ctx.query;
  const response = await fetch(
    `https://api.github.com/search/repositories?q=${q}&sort=stars&order=desc`
  );
  const data = await response.json();
  ctx.body = data; */
};
