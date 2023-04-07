import { createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import {APIS} from "../url/url"

const uData = JSON.parse(localStorage.getItem('Udata'));
const token = uData?.token

export const addUser = createAsyncThunk(
    "blog/addUser",
    async () => {
        return fetch(`${APIS.USER_API}/alluser`, {
            headers: { 'Authorization': 'Bearer ' + token }}).then((res)=> res.json())
    })

const userSlice = createSlice({
    name:'user',
    initialState:{
        user:[],
        loading:false,
        error:null
    },
    extraReducers:{
        [addUser.pending]:(state,action) => {
            state.loading = true
        },
        [addUser.fulfilled]:(state,action) => {
            state.loading = false
            state.user = action.payload
        },
        [addUser.rejected]:(state,action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

export default userSlice.reducer