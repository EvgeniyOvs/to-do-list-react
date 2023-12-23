import React, {useState} from 'react';
import styles from './header.module.scss';
import {Link} from "react-router-dom";
import {Ecolor, Text} from "../../components";
export function Header() {
  const [isMenuOpen, toggleMenu] = useState(false);

  function toggleMenuMode() {
    toggleMenu(!isMenuOpen);
  }
  const clickHandler = () => {
    toggleMenuMode();
  };
  return (
      <header className={styles.header}>
        <div className={styles.header__top}>
          <Text As="h1" size={28} color={Ecolor.black} weight={700}>
            Список дел
          </Text>
        </div>
        <button onClick={clickHandler} className={isMenuOpen ? styles.burger + " " + styles.burger__active : styles.burger}>
          <span className={styles.burger__line}></span>
        </button>
        <nav className={isMenuOpen ? styles.nav + " " + styles.nav__active : styles.nav}>
          <ul className={styles.header__list}>
            <li className={styles.list__item}>
              <Link to="/">
                <div onClick={clickHandler} className={styles.day}>
                  <Text As="p" size={20} color={Ecolor.black} weight={500}>
                    Понедельник
                  </Text>
                </div>
              </Link>
            </li>
            <li className={styles.list__item}>
              <Link to="/tuesday">
                <div onClick={clickHandler} className={styles.day}>
                  <Text As="p" size={20} color={Ecolor.black} weight={500}>
                    Вторник
                  </Text>
                </div>
              </Link>
            </li>
            <li className={styles.list__item}>
              <Link to="/wednesday">
                <div onClick={clickHandler} className={styles.day}>
                  <Text As="p" size={20} color={Ecolor.black} weight={500}>
                    Среда
                  </Text>
                </div>
              </Link>
            </li>
            <li className={styles.list__item}>
              <Link to="/thursday">
                <div onClick={clickHandler} className={styles.day}>
                  <Text As="p" size={20} color={Ecolor.black} weight={500}>
                    Четверг
                  </Text>
                </div>
              </Link>
            </li>
            <li className={styles.list__item}>
              <Link to="/friday">
                <div onClick={clickHandler} className={styles.day}>
                  <Text As="p" size={20} color={Ecolor.black} weight={500}>
                    Пятница
                  </Text>
                </div>
              </Link>
            </li>
            <li className={styles.list__item}>
              <Link to="/saturday">
                <div onClick={clickHandler} className={styles.day}>
                  <Text As="p" size={20} color={Ecolor.black} weight={500}>
                    Суббота
                  </Text>
                </div>
              </Link>
            </li>
            <li className={styles.list__item}>
              <Link to="/sunday">
                <div onClick={clickHandler}className={styles.day}>
                  <Text As="p" size={20} color={Ecolor.black} weight={500}>
                    Воскресенье
                  </Text>
                </div>
              </Link>
            </li>
          </ul>
        </nav>

      </header>

  );
}
