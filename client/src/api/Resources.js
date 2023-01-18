import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { baseURL } from './Config';
import { getToken } from './Auth';


export const resourceApi = createApi({
    reducerPath: 'resourceApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: (headers, { getState }) => {
            headers.set('Authorization', `Bearer ${getToken()}`)
            return headers
        },
    }),
    tagTypes: ['Resource'],
    endpoints: (build) => ({
        fetchThemeResources: build.query({
            query: (themeId) => `/themes/${themeId}/resources`,
            providesTags: res => ['Resource'],
        }),
        fetchResource: build.query({
            query: (resourceId) => `/resources/${resourceId}`,
            providesTags: res => ['Resource'],
        }),
        createResource: build.mutation({
            query: (resource) => ({
                url: '/resources',
                method: 'POST',
                body: resource,
            }),
            invalidatesTags: res => ['Resource'],
        }),
        updateResource: build.mutation({
            query: ({ resourceId, newResource }) => ({
                url: `/resources/${resourceId}`,
                method: 'PUT',
                body: newResource,
            }),
            invalidatesTags: res => ['Resource'],
        }),
        deleteResource: build.mutation({
            query: (resourceId) => ({
                url: `/resources/${resourceId}`,
                method: 'DELETE',
            }),
            invalidatesTags: res => ['Resource'],
        }),
    })
});

