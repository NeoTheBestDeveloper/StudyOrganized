import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { baseURL } from './Config';
import { getToken } from './Auth';



export const themeAPI = createApi({
    reducerPath: 'themeAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: (headers, { getState }) => {
            headers.set('Authorization', `Bearer ${getToken()}`)
            return headers
        },
    }),
    tagTypes: ['Theme'],
    endpoints: (build) => ({
        fetchTheme: build.query({
            query: (themeId) => `/themes/${themeId}`,
            providesTags: res => ['Theme'],
        }),
        searchThemes: build.query({
            query: (value, key = "all", offset = 0, limit = 100, order = "desc") => (
                `/themes?value=${value}&key=${key}&limit=${limit}&offset=${offset}&order=${order}`
            ),
            providesTags: res => ['Theme'],
        }),
        fetchSavedUserThemes: build.query({
            query: () => '/users/me/themes?type=saved',
            providesTags: res => ['Theme'],
        }),
        createTheme: build.mutation({
            query: (theme) => ({
                url: '/themes',
                method: 'POST',
                body: theme,
            }),
            invalidatesTags: res => ['Theme'],
        }),
        deleteTheme: build.mutation({
            query: (themeId) => ({
                url: `/themes/${themeId}`,
                method: 'DELETE',
            }),
            invalidatesTags: res => ['Theme'],
        }),
        updateTheme: build.mutation({
            query: ({ themeId, newTheme }) => ({
                url: `/themes/${themeId}`,
                method: 'PUT',
                body: newTheme,
            }),
            invalidatesTags: res => ['Theme'],
        }),
        saveTheme: build.mutation({
            query: (themeId) => ({
                url: `/users/me/save/themes/${themeId}`,
                method: 'POST',
            }),
            invalidatesTags: res => ['Theme'],
        }),
    })
});
