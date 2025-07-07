"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const node_path_1 = __importDefault(require("node:path"));
const promises_1 = __importDefault(require("fs/promises"));
const vite_1 = require("vite");
dotenv_1.default.config();
const port = process.env.PORT || 8000;
const clientPath = node_path_1.default.join(__dirname, '..');
const isDev = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';
async function createServer() {
    const app = (0, express_1.default)();
    const vite = await (0, vite_1.createServer)({
        server: { middlewareMode: true },
        root: clientPath,
        appType: 'custom',
    });
    app.use(vite.middlewares);
    app.get('*all', async (req, res, next) => {
        const url = req.originalUrl;
        try {
            let template = await promises_1.default.readFile(node_path_1.default.resolve(clientPath, 'index.html'), 'utf-8');
            // Применяем встроенные HTML-преобразования vite и плагинов
            template = await vite.transformIndexHtml(url, template);
            console.log('template', template);
            // Загружаем модуль клиента, который будет рендерить HTML-код
            const { render } = await vite.ssrLoadModule(node_path_1.default.join(clientPath, 'src/entry-server.tsx'));
            // Получаем HTML-строку из JSX
            const appHtml = await render();
            console.log('appHtml', appHtml);
            // Заменяем комментарий на сгенерированную HTML-строку
            const html = template.replace(`<!--ssr-outlet-->`, () => appHtml);
            console.log('html', html);
            // Завершаем запрос и отдаём HTML-страницу
            res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
        }
        catch (e) {
            vite.ssrFixStacktrace(e);
            next(e);
        }
    });
    app.listen(port, () => {
        console.log(`Client is listening on port: ${port}`);
    });
}
createServer();
