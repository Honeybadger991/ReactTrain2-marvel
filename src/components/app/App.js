import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom/";
import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const MainPage = lazy(() => import('../pages/mainPage'))
const ComicsPage = lazy(() => import('../pages/comicsPage'))
const Page404 = lazy(() => import('../pages/404'))
const SingleItemPage = lazy(() => import('../pages/SingleItemPage'))
const SingleCharacterLayout = lazy(() => import('../pages/SingleCharacterLayout/SingleCharacterLayout')) 
const SingleComicLayout = lazy(() => import('../pages/SingleComicLayout/SingleComicLayout')) 

const App = () => {


    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/comics" element={<ComicsPage/>}/>
                            <Route path="/comics/:id" element={<SingleItemPage Component={SingleComicLayout} dataType="comic"/>} />
                            <Route path="/characters/:id" element={<SingleItemPage Component={SingleCharacterLayout} dataType="character"/>}/>
                            <Route path="*" element={<Page404/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;