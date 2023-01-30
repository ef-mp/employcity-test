import React from 'react';
import {rootState, StoreProvider} from "../../models/RootModel";
import {ProductListContainer} from "../../containers/ProductListContainer/ProductListContainer";
import {Cart} from "../Cart/Cart";
import './App.css'

export const App = () => {
  return (
    <StoreProvider value={rootState}>
      <div className="app">
        <div className="app__container">

          <header className="app_header">
            <h1>Магазин</h1>
          </header>

          <main className="app__main">
            <ProductListContainer />
            <Cart />
          </main>

        </div>
      </div>
    </StoreProvider>
  );
}
