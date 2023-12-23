import React from 'react';
import styles from './skeletons.module.scss';
import ContentLoader from "react-content-loader";

export function Skeletons() {
  return (
      <div className={styles.skeletons}>

      <div className={styles.skeletons__dekstop}>
          <ContentLoader
              speed={2}
              width={800}
              height={150}
              viewBox="0 0 800 150"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
          >
              <circle cx="31" cy="79" r="23" />
              <rect x="84" y="50" rx="5" ry="5" width="393" height="55" />
          </ContentLoader>
      </div>
          <div className={styles.skeletons__tablet}>
              <ContentLoader
                  speed={2}
                  width={600}
                  height={50}
                  viewBox="0 0 600 50"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
              >
                  <circle cx="31" cy="18" r="18" />
                  <rect x="58" y="4" rx="5" ry="5" width="348" height="30" />
              </ContentLoader>
          </div>
          <div className={styles.skeletons__mobile}>
              <ContentLoader
                  speed={2}
                  width={240}
                  height={50}
                  viewBox="0 0 240 50"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"

              >
                  <circle cx="17" cy="17" r="11" />
                  <rect x="40" y="9" rx="5" ry="5" width="220" height="16" />
              </ContentLoader>
          </div>
      </div>
  );
}
