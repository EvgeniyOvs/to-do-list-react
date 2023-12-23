import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";
import {RootState} from "../store";
import {item, Status} from "./mondaySlice";

type State = {
    items: item[];
    status: Status;
}


export const fetchWednesdayTask = createAsyncThunk<item[]>(
    'pizza/fetchWednesdayStatus',
    async (params) => {
        const { data } = await  axios.get<item[]>(
            `http://localhost:3002/wednesday`,
        )
        return data;
    }
)

const initialState : State = {
    items:[],
    status: Status.LOADING,
};



const wednesdaySlice = createSlice({
    name: 'wednesday',
    initialState,

    reducers: {
        setItemsWednesday(state, action){
            state.items = action.payload;
        },
        addItem(state, action:PayloadAction<item>){
            state.items.push({
                ...action.payload,
            })
        },
        removeItemWednesday(state, action:PayloadAction<string>){
            state.items = state.items.filter((obj) => obj.id != action.payload);
        },

    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchWednesdayTask.pending, (state) => {
            // Add user to the state array
            state.status = Status.LOADING;
            state.items =[];
        })
        builder.addCase(fetchWednesdayTask.fulfilled, (state, action) => {
            // Add user to the state array
            state.items = action.payload;
            state.status = Status.SUCCESS;
        })
        builder.addCase(fetchWednesdayTask.rejected, (state, action) => {
            // Add user to the state array
            state.status = Status.ERROR,
                state.items =[];
        })
    },
})

export const selectWednesday = (state: RootState) => state.wednesday;
export const { setItemsWednesday, addItem,removeItemWednesday } = wednesdaySlice.actions;

export default wednesdaySlice.reducer;