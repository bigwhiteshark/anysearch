import Koa, { Context } from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import { searchController } from './controllers/index';

const app = new Koa();
const port = process.env.PORT || 3000;

app.use(bodyParser());
const router = new Router();
app.use(router.routes()).use(router.allowedMethods());

router.get('/api/search', searchController);

app.listen(port, () => {
  console.log('Server listen on port 3000');
});
