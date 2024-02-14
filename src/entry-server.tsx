import {renderToString} from "react-dom/server";
import {StaticRouter} from "react-router-dom/server";
import App from './App'
import cls from './entry-server.module.css'

interface Props {
    path: string
}

export const render = ({path}: Props) => {
    const app = renderToString(
        <StaticRouter location={path}>
            <h1 className={cls.serverHeader} style={{position:"absolute",textAlign: 'center',
                margin: '0 auto',left: 0, top: 0, width: '100%',}}>МосКод</h1>
            <App />
        </StaticRouter>
    )
    const styles = CssBaseline.flushToHTML()
    return [app, styles]
}