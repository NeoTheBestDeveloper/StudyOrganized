import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { baseURL } from './Config';


export const getToken = () => {
    return localStorage.getItem('token');
}

const setToken = (token) => {
    localStorage.setItem('token', token);
}


export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: (headers, { getState }) => {
            headers.set('Authorization', `Bearer ${getToken()}`)
            return headers
        },
    }),
    tagTypes: ['User'],
    endpoints: (build) => ({
        login: build.mutation({
            query: ({ email, password }) => {
                const formData = new FormData();
                formData.set('username', email);
                formData.set('password', password);

                return {
                    url: `/auth/token/login`,
                    method: 'POST',
                    body: formData,
                };
            },
            transformResponse: (response, meta, arg) => {
                setToken(response.access_token);
                return response;
            },
            invalidatesTags: res => ['User'],
        }),
        register: build.mutation({
            query: (user) => ({
                url: '/auth/register',
                method: 'POST',
                body: user,
            }),
            invalidatesTags: res => ['User'],
        }),
        logout: build.mutation({
            query: () => ({
                url: '/auth/token/logout',
                method: 'POST',
            }),
            invalidatesTags: res => ['User'],
        }),
        getMe: build.query({
            query: () => '/users/me',
            providesTags: res => ['User'],
        }),
    })
});

