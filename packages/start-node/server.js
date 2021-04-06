import compression from 'compression';
import fs from 'fs';
import polka from 'polka';
import { dirname, join } from 'path';
import sirv from 'sirv';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const noop_handler = (_req, _res, next) => next();
const paths = {
	assets: join(__dirname, '/assets')
};

export function createServer({ render }) {
	const assets_handler = fs.existsSync(paths.assets)
		? sirv(paths.assets, {
				maxAge: 31536000,
				immutable: true
		  })
		: noop_handler;

	const server = polka().use(
		compression({ threshold: 0 }),
		assets_handler,
		render
	);

	return server;
}