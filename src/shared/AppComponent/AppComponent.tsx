import React, {lazy, Suspense} from 'react';
import {Layout} from "../Layout";
import {Route, Routes} from "react-router-dom";
import {Monday} from "../Monday";







export type ICartItems = Array<Cart>

export interface Cart   {
    id?: string;
    imageUrl?: string,
    title?: string,
    price?: string,
    sizes?: Array<number>;
    types?: Array<number>;

}

const Tuesday = lazy(() =>
    import('../Tuesday')
        .then(({ Tuesday }) => ({ default: Tuesday })),
);
const Wednesday = lazy(() =>
    import('../Wednesday')
        .then(({ Wednesday }) => ({ default: Wednesday })),
);
const Thursday = lazy(() =>
    import('../Thursday')
        .then(({ Thursday }) => ({ default: Thursday })),
);
const Friday = lazy(() =>
    import('../Friday')
        .then(({ Friday }) => ({ default: Friday })),
);
const Sunday = lazy(() =>
    import('../Sunday')
        .then(({ Sunday }) => ({ default: Sunday })),
);
const Saturday = lazy(() =>
    import('../Saturday')
        .then(({ Saturday }) => ({ default: Saturday })),
);
const NotFound = lazy(() =>
    import('../NotFound')
        .then(({ NotFound }) => ({ default: NotFound })),
);
export function AppComponent(){

    //определяем изменение в инпуте

//определяем есть ли добавленые карточки в корзине


  return (
              <Routes>
                  <Route path="/" element={<Layout/>}>
                      <Route  path="/"  element={<Monday/>}/>
                      <Route  path="/tuesday"
                        element={
                          <Suspense fallback={ <div>Загрузка </div> }>
                              <Tuesday/>
                          </Suspense>
                        }
                      />
                      <Route  path="/wednesday"
                              element={
                                  <Suspense fallback={ <div>Загрузка </div> }>
                                      <Wednesday/>
                                  </Suspense>
                              }
                      />
                      <Route  path="/thursday"
                              element={
                                  <Suspense fallback={ <div>Загрузка </div> }>
                                      <Thursday/>
                                  </Suspense>
                              }
                      />
                      <Route  path="/friday"
                              element={
                                  <Suspense fallback={ <div>Загрузка </div> }>
                                      <Friday/>
                                  </Suspense>
                              }
                      />
                      <Route  path="/saturday"
                              element={
                                  <Suspense fallback={ <div>Загрузка </div> }>
                                      <Saturday/>
                                  </Suspense>
                              }
                      />
                      <Route  path="/sunday"
                              element={
                                  <Suspense fallback={ <div>Загрузка </div> }>
                                      <Sunday/>
                                  </Suspense>
                              }
                      />
                      <Route  path="*"
                              element={
                                  <Suspense fallback={ <div>Загрузка </div> }>
                                      <NotFound/>
                                  </Suspense>
                              }/>
                  </Route>
              </Routes>
  );
}
