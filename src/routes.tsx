import { RouteObject } from "react-router-dom";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import SiteRoute, { loader as siteLoader } from "./pages/SiteRoute";
import { loader as homeLoader } from "./pages/HomeRoute";
import { loader as articleLoader } from "./pages/ArticleRoute";
import ProblemRoute, { loader as problemLoader } from "./pages/ProblemRoute";
import SitePage from "./pages/SitePage";
import ProblemPage from "./pages/ProblemPage";
import ArticlePage from "./pages/ArticlePage";

export const routes = [
    {
        path: '/',
        errorElement: <ErrorPage />,
        loader: homeLoader,
        id: 'home',
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
                        path: '/:site/:category',
                        element: <SitePage />
                    },
                    {
                        path: '/:site/:contest/:problem',
                        loader: problemLoader,
                        id: 'problem',
                        element: <ProblemRoute />,
                        children: [
                            {
                                index: true,
                                element: <ProblemPage />
                            },
                            {
                                path: '/:site/:contest/:problem/:type/:id',
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
