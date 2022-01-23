import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface RestaurantList {
  name: string;
  id: number
}

interface Order {
  orderNumber: number,
  status: "new" | "cooking" | "assembling" | "done";
  type: "delivery" | "hall",
  sum: number,
  restaurantId: number,
  id: number
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Access-Control-Allow-Origin', '*');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getRestaurants: builder.query<RestaurantList[], string>({
      query: () => "/restaurants",
    }),
    addRestaurant: builder.mutation({
      query: restaurant => ({
        url: "/restaurants",
        method: "POST",
        body: restaurant
      })
    }),
    getRestaurantOrder: builder.query<Order[], number>({
      query: (id) => `/restaurants/${id}/orders`,
      transformResponse: (response: Order[]) => {
        if (localStorage.getItem("type") && localStorage.getItem("status")) {
          const filterType = localStorage.getItem("type");
          const filterStatus = localStorage.getItem("status");

          const typeResult = response.filter((item: Order) => item.type === filterType);
          const statusResult = response.filter((item: Order) => item.status === filterStatus);

          if (typeResult.length >= statusResult.length) {
            const result = typeResult.filter((item: Order) => item.status === filterStatus);
            return result;
          } else {
            const result = statusResult.filter((item: Order) => item.type === filterType);
            return result;
          }
        }
        if (localStorage.getItem("type")) {
          const filterData = localStorage.getItem("type");
          const result = response.filter((item: Order) => item.type === filterData);
          return result;
        } else if (localStorage.getItem("status")) {
          const filterData = localStorage.getItem("status");
          const result = response.filter((item: Order) => item.status === filterData);
          return result;
        } else return response;
      }
    }),
    addRestaurantOrder: builder.mutation<RestaurantList, string>({
      query: ({ id, order }: any) => ({
        url: `/restaurants/${id}/orders`,
        method: "POST",
        body: order
      })
    }),
    changeRestaurantOrder: builder.mutation({
      query: ({ id, ...status }: any) => ({
        url: `/orders/${id}`,
        method: "PATCH",
        body: status
      })
    }),
  }),
});

export const { useGetRestaurantsQuery, useAddRestaurantMutation, useGetRestaurantOrderQuery, useChangeRestaurantOrderMutation } = apiSlice;
