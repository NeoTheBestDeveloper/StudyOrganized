import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { baseURL } from './Config';


export const resourceApi = createApi({
    reducerPath: 'resourceApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
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
    })
});

