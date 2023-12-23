import React, {useState} from 'react';
import styles from './newtask.module.scss';
import {Ecolor, Text} from "../../components";
import {removeItemMonday, selectMonday,} from "../../redux/slices/mondaySlice";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {AppDispatch} from "../../redux/store";
import {removeItemSaturday} from "../../redux/slices/saturdaySlice";
import {removeItemTuesday} from "../../redux/slices/tuesdaySlice";
import {removeItemThursday} from "../../redux/slices/thursdaySlice";
import {removeItemWednesday} from "../../redux/slices/wednesdaySlice";
import {removeItemFriday} from "../../redux/slices/fridaySlice";
import {removeItemSunday} from "../../redux/slices/sundaySlice";
interface ITask{
    id: string,
    title: string,
    completed: boolean,
    day: string,
}
export function NewTask({id, title, completed, day} : ITask) {
    const dispatch = useDispatch<AppDispatch>();
    const [isCompleted, setIsCompleted]=useState(completed)
    const onCompleted = async  (i:string) =>{
        try {
             await axios.put('http://localhost:3002/'+ day +'/'+ i,
                {title: title,
                    day:day,
                    completed : isCompleted});


        } catch (e) {
            alert('Не удалось создать заказ')
        }
    }

    const onClickRemove = async  (i:string) =>{
        if (window.confirm('Вы уверены?')){
            if( day=== 'monday' ) {
                dispatch(
                    removeItemMonday(id))
            }
            if( day === 'tuesday' ) {
                dispatch(
                    removeItemTuesday(id))
            }
            if( day === 'wednesday' ) {
                dispatch(
                    removeItemWednesday(id))
            }

            if( day === 'thursday' ) {
                dispatch(
                    removeItemThursday(id))
            }
            if( day === 'friday' ) {
                dispatch(
                    removeItemFriday(id))
            }
                if( day === 'saturday' ) {
                dispatch(
                    removeItemSaturday(id))
            }
            if( day === 'sunday' ) {
                dispatch(
                    removeItemSunday(id))
            }
        }
        try {
                await axios.delete('http://localhost:3002/' + day + '/' + i);
        } catch (e) {
            alert('Не удалось удалить заказ')
        }

    }
    const onDone = (i:boolean)=>{
        setIsCompleted(i)
    }

    React.useEffect(()=>{
        onCompleted(id)
    },[isCompleted])


  return (
      <li className={ isCompleted ? styles.task + " " + styles.active : styles.task}>
          <div className={styles.descr}>
              <Text size={14} color={Ecolor.black} weight={700}>
                  {title}
              </Text>
          </div>
          <ul className={styles.btnList}>
              <button onClick={()=> onDone(!completed)} className={styles.btn + " " + styles.btnList__done}> done</button>
              <button onClick={()=>onClickRemove(id)} className={styles.btn + " " + styles.btnList__remove}> remove</button>
          </ul>
      </li>
  );
}
