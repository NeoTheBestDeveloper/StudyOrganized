import { fetchResourceAPI, updateResourceAPI } from "../../api/Resources";

import {
    fetchingResource, fetchingResourceError, fetchingResourceSuccess,
    updatingResource, updatingResourceError, updatingResourceSuccess
} from "./Slices/ResourceSlice";


export const fetchResource = (id) => async (dispatch) => {
    try {
        dispatch(fetchingResource());
        const resource = await fetchResourceAPI(id);
        const theme = await fetchResourceAPI(id);
        dispatch(fetchingResourceSuccess({ resource: resource.data, themeTitle: theme.data.title }));
    } catch (e) {
        dispatch(fetchingResourceError(e.message));
    }
}

export const updateResource = (id, title, description) => async (dispatch) => {
    try {
        dispatch(updatingResource());
        await updateResourceAPI(id, title, description);
        dispatch(updatingResourceSuccess({ title, description }));
    } catch (e) {
        dispatch(updatingResourceError(e.message));
    }
}
