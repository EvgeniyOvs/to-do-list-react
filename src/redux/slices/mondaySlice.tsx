import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";
import {RootState} from "../store";

export type item = {
    id: string,
    title: string,
    completed: boolean,
    day: string,

}

type State = {
    items: item[];
    status: Status;
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

export const fetchMondayTask = createAsyncThunk<item[]>(
    'pizza/fetchMondayStatus',
    async (params) => {
        const { data } = await  axios.get<item[]>(
            `http://localhost:3002/monday`,
        )
        return data;
    }
)

const initialState : State = {
    items:[],
    status: Status.LOADING,
};



const mondaySlice = createSlice({
    name: 'monday',
    initialState,

    reducers: {
        setItemsMonday(state, action){
            state.items = action.payload;
        },
        addItem(state, action:PayloadAction<item>){
                state.items.push({
                    ...action.payload,
                })
            },
        removeItemMonday(state, action:PayloadAction<string>){
            state.items = state.items.filter((obj) => obj.id != action.payload);
        },

    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchMondayTask.pending, (state) => {
            // Add user to the state array
            state.status = Status.LOADING;
            state.items =[];
        })
        builder.addCase(fetchMondayTask.fulfilled, (state, action) => {
            // Add user to the state array
            state.items = action.payload;
            state.status = Status.SUCCESS;
        })
        builder.addCase(fetchMondayTask.rejected, (state, action) => {
            // Add user to the state array
                state.status = Status.ERROR,
                state.items =[];
        })
    },
})

export const selectMonday = (state: RootState) => state.monday;
export const { setItemsMonday, addItem,removeItemMonday } = mondaySlice.actions;

export default mondaySlice.reducer;