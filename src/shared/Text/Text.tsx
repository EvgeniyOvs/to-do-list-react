import React from 'react';
import styles from './text.module.scss';
import classNames from 'classnames';



type TSizes = 32 | 28 | 24 | 20 | 16 | 14 | 12 | 10;
type FWeight = 700 | 600 | 500 | 400 ;
export enum Ecolor {
  black = 'black',
  white = 'white',
  black2C = 'black2C',
  grey9D = 'grey9D',
  grey5C = 'grey5C',
  orange = 'orange',
  grey8D = 'grey8D',

  greyCA='greyCA',


}
interface ITextProps {
  As?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div' ;
  children?: React.ReactNode;
  size: TSizes;
  mobileSize?: TSizes;
  tabletSize?: TSizes;
  dekstopSize?: TSizes;
  color?: Ecolor;
  weight?: FWeight;
}

export function Text(props: ITextProps) {
    const {
        As = 'span',
        color = Ecolor.black,
        weight = '400',
        children,
        size,
        mobileSize,
        dekstopSize,
        tabletSize } = props;

    const classes = classNames(
        styles[`s${size}`],
        styles[`w${weight}`],
        styles[color],
        { [styles[`m${mobileSize}`]]: mobileSize },
        { [styles[`t${tabletSize}`]]: tabletSize },
        { [styles[`d${dekstopSize}`]]: dekstopSize },
    );
  return (
    <As className={classes}>
      {children}
    </As>
  );
}
