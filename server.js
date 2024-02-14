import path from "path"
import express from 'express'
import fs from "fs";
import {createClient} from "redis";

const createServer = async () => {
    const app = express()
    const client = createClient({url: process.env.REDIS_URL})
    await client.connect()
    let vite

    if (process.env.NODE_ENV === 'development') {
        vite = await (
            await import('vite')
        ).createServer({
            server: {middlewareMode: true},
            appType: 'custom',
        })
        app.use(vite.middlewares)
    } else {
        app.use((await import("compression")).default())
        app.use(
            (await import('serve-static')).default(path.resolve("dist/client"), {
                index: false
            }),
        )
    }


    app.use('*', async (req, res, next) => {
        const url = req.originalUrl
        let template, render

        try {
            const cacheKey = `page:${url}`;
            const cachedPage = await client.get(cacheKey);
            // const cachedPage = null;

            if (cachedPage) {
                res.status(200).set({"Content-Type": "text/html"}).end(cachedPage);
            } else {
                let template, render;
                if (process.env.NODE_ENV === "development") {
                    template = fs.readFileSync(path.resolve('./index.html'), "utf-8")
                    template = await vite.transformIndexHtml(url, template)
                    render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render
                } else {
                    template = fs.readFileSync(path.resolve('./dist/client/index.html'), "utf-8")
                    render = (await import("./dist/server/entry-server.js")).render
                }
                const [appHtml, appCss] = await render({path: url})
                const html = template.replace(`<!--ssr-outlet-->`, appHtml).replace(`<!--app-head-->`, appCss)

                await client.set(cacheKey, html, {EX: 10});

                res.status(200).set({"Content-Type": "text/html"}).end(html);
            }

        } catch (e) {
            if (process.env.NODE_ENV === "development") {
                vite.ssrFixStacktrace(e)
            }
            next(e)
        }
    })

    app.listen(8888, '0.0.0.0')
}


createServer()