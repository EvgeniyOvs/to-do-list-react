import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";
import {RootState} from "../store";
import {item, Status} from "./mondaySlice";

type State = {
    items: item[];
    status: Status;
}


export const fetchSundayTask = createAsyncThunk<item[]>(
    'pizza/fetchSundayStatus',
    async (params) => {
        const { data } = await  axios.get<item[]>(
            `http://localhost:3002/sunday`,
        )
        return data;
    }
)

const initialState : State = {
    items:[],
    status: Status.LOADING,
};



const sundaySlice = createSlice({
    name: 'sunday',
    initialState,

    reducers: {
        setItemsSunday(state, action){
            state.items = action.payload;
        },
        addItem(state, action:PayloadAction<item>){
            state.items.push({
                ...action.payload,
            })
        },
        removeItemSunday(state, action:PayloadAction<string>){
            state.items = state.items.filter((obj) => obj.id != action.payload);
        },

    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchSundayTask.pending, (state) => {
            // Add user to the state array
            state.status = Status.LOADING;
            state.items =[];
        })
        builder.addCase(fetchSundayTask.fulfilled, (state, action) => {
            // Add user to the state array
            state.items = action.payload;
            state.status = Status.SUCCESS;
        })
        builder.addCase(fetchSundayTask.rejected, (state, action) => {
            // Add user to the state array
            state.status = Status.ERROR,
                state.items =[];
        })
    },
})

export const selectSunday = (state: RootState) => state.sunday;
export const { setItemsSunday, addItem,removeItemSunday } = sundaySlice.actions;

export default sundaySlice.reducer;