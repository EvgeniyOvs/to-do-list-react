import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";
import {RootState} from "../store";
import {item, Status} from "./mondaySlice";

type State = {
    items: item[];
    status: Status;
}


export const fetchFridayTask = createAsyncThunk<item[]>(
    'pizza/fetchFridayStatus',
    async (params) => {
        const { data } = await  axios.get<item[]>(
            `http://localhost:3002/friday`,
        )
        return data;
    }
)

const initialState : State = {
    items:[],
    status: Status.LOADING,
};



const fridaySlice = createSlice({
    name: 'friday',
    initialState,

    reducers: {
        setItemsFriday(state, action){
            state.items = action.payload;
        },
        addItem(state, action:PayloadAction<item>){
            state.items.push({
                ...action.payload,
            })
        },
        removeItemFriday(state, action:PayloadAction<string>){
            state.items = state.items.filter((obj) => obj.id != action.payload);
        },

    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchFridayTask.pending, (state) => {
            // Add user to the state array
            state.status = Status.LOADING;
            state.items =[];
        })
        builder.addCase(fetchFridayTask.fulfilled, (state, action) => {
            // Add user to the state array
            state.items = action.payload;
            state.status = Status.SUCCESS;
        })
        builder.addCase(fetchFridayTask.rejected, (state, action) => {
            // Add user to the state array
            state.status = Status.ERROR,
                state.items =[];
        })
    },
})

export const selectFriday = (state: RootState) => state.friday;
export const { setItemsFriday, addItem,removeItemFriday } = fridaySlice.actions;

export default fridaySlice.reducer;