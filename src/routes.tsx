import { RouteObject } from "react-router-dom";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import SiteRoute, { loader as siteLoader } from "./routes/SiteRoute";
import HomeRoute, { loader as homeLoader } from "./routes/HomeRoute";
import { loader as articleLoader } from "./routes/ArticleRoute";
import ProblemRoute, { loader as problemLoader } from "./routes/ProblemRoute";
import SitePage from "./pages/SitePage";
import ProblemPage from "./pages/ProblemPage";
import ArticlePage from "./pages/ArticlePage";

export const routes = [
    {
        path: '/',
        errorElement: <ErrorPage />,
        loader: homeLoader,
        id: 'home',
        element: <HomeRoute />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/:site',
                element: <SiteRoute />,
                id: 'site',
                loader: siteLoader,
                children: [
                    {
                        index: true,
                        element: <SitePage />
                    },
                    {
                        path: '/:site/c/:category',
                        element: <SitePage />
                    },
                    {
                        path: '/:site/p/:problem',
                        loader: problemLoader,
                        id: 'problem',
                        element: <ProblemRoute />,
                        children: [
                            {
                                index: true,
                                element: <ProblemPage />
                            },
                            {
                                path: '/:site/p/:problem/:type/:id',
                                loader: articleLoader,
                                id: 'article',
                                children: [
                                    {
                                        index: true,
                                        element: <ArticlePage />
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
] as RouteObject[];
