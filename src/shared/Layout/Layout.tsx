import React from 'react';
import styles from './layout.module.scss';
import {Header} from  "../../components";
import {Outlet} from "react-router-dom";
import {Hr} from "../Hr";


export function Layout() {
  return (
    <div className={styles.layout}>
      <Header/>
        <Hr/>
      <main>
          <Outlet/>
      </main>
    </div>
  );
}
