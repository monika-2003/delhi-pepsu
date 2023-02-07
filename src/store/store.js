import { configureStore } from '@reduxjs/toolkit';
import  biltySlices  from "../slices/challanBiltySlices"
import tripReducers from "../slices/tripSlices"
import unloadingSlices from '../slices/unloadingSlices';

export default configureStore({
    reducer: {
        bilty_reducers:biltySlices,
        trip_reducers:tripReducers,
        unloading_bilty_reducers:unloadingSlices
    },
});