import React from 'react';
import styles from './info.module.scss';
import {Ecolor, Text} from "../../components";

import {Link} from "react-router-dom";

interface IInfoProps {
  title?: string,
  description?: string
  image?: string
}

export function Info({title, image, description}: IInfoProps) {
  //вытаскиваем из контекста состояние для закрытия корзины
  return (
      <div className={styles.drawerWrapperEmpty}>
        <div className={styles.cartEmpty}>
          <img className={styles.imgEmpty} src={image}/>
          <div className={styles.cartTitleEmpty}>
            <Text As='h2' size={20} color={Ecolor.black} weight={700}>
              {title}
            </Text>
          </div>
          <div className={styles.cartDescrEmpty}>
            <Text As='h2' size={16} color={Ecolor.grey9D} weight={400}>
              {description}
            </Text>
          </div>
          <Link to="/">
            <button
                //при нажатии закрывем корзину
                // onClick={()=>setCartOpened(false)}
                className={styles.countBtnEmpty}
            >
              <Text As='h2' size={16} mobileSize={12} color={Ecolor.white} weight={500}>
                Вернуться назад
              </Text>
            </button>
          </Link>

        </div>
      </div>
  );
}
