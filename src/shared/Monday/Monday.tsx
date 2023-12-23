import React, {ChangeEvent, useState} from 'react';
import styles from './monday.module.scss';
import {Ecolor, Skeletons, Text} from "../../components";
import {AppDispatch} from "../../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {
    addItem,
    item,
    fetchMondayTask,
    selectMonday,
    Status,
    setItemsMonday
} from "../../redux/slices/mondaySlice";
import {NewTask} from "../NewTask";
import {generateRandomString} from "../../utils/react/generateRandomIndex";
import axios from "axios";
export function Monday() {
    const dispatch = useDispatch<AppDispatch>();
    const { items, status }= useSelector(selectMonday);
    const [isTask, setIsTask] = useState(items);
    const [value, setValue] = useState('');
    async function fetchMondayTasks(){
        dispatch(fetchMondayTask(
        ))
    }

    const onClickAdd = async  () =>{
        const item: item = {
            id:generateRandomString(),
            title:value,
            day: "monday",
            completed: false,
        }
        dispatch(addItem(item))
        try {
            //     //отправляем заказ на бекэнд
            const { data } = await axios.post('http://localhost:3002/monday',
                {id:item.id,
                    title:item.title,
                    day: item.day,
                    completed: item.completed,});

        } catch (e) {
            alert('Не удалось добавить задание')

        }
        setValue( '')
    }
    function handleChange (event: ChangeEvent<HTMLInputElement>){
        setValue( event.target.value)
    }
    React.useEffect(()=>{
        fetchMondayTasks();
    }, []);

    React.useEffect(()=>{
        setIsTask(items)
    }, [items.length]);

    const skeletons = [...new Array(10)].map((_,index)=><Skeletons key={index}/>)
    const renderItems = () =>{
        return  isTask.map((item , index)=>(
            <NewTask
                key={index}
                id={item.id}
                title={item.title}
                completed={item.completed}
                day={item.day}
            />
        ))
    }
  return (
    <div className={styles.days}>
        <div className={styles.days__title}>
            <Text As="h1" size={28} color={Ecolor.black} weight={700}>
                Список дел в понедельник
            </Text>
        </div>
      <div className={styles.add}>
        <input
            // ref={inputRef}
            onChange={handleChange}
            value={value}
            className={styles.add__input}
            placeholder={'Новое задание ...'}
        />
          <button className={styles.add__btn} onClick={onClickAdd}>
              <span>
                <Text  size={14} color={Ecolor.orange} weight={700}>
                + Добавить
              </Text>
              </span>
          </button>
      </div>
        {
            status === Status.ERROR ? (
                    <div className={styles.error}>
                        <div className={styles.cartTitleEmpty}>
                            <Text As='h2' size={20} color={Ecolor.black} weight={700}>
                                Произошла ошибка загрузки
                            </Text>
                            <Text As='p' size={16} color={Ecolor.grey9D} weight={400}>
                                Мы уже работаем над ее устранением
                            </Text>
                        </div>
                    </div>)
                : (
                    <ul className={styles.days__list}>
                        {//рендерим карточки
                            status === Status.LOADING ? skeletons : renderItems()
                        }
                    </ul>
                )
        }
    </div>
  );
}
