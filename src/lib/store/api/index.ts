import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const createHeaders = (
  token?: string,
  contentType: string = "application/json"
) => {
  const headers: HeadersInit = { "Content-type": contentType };
  if (token) {
    headers["authorization"] = `Bearer ${token}`;
  }
  return headers;
};

const buildQueryParams = (
  params: Record<string, string | number | string[] | undefined>
) => {
  const queryParams = Object.entries(params)
    .filter(
      ([_, value]) =>
        value !== undefined &&
        value !== null &&
        value !== "" &&
        value !== 0 &&
        !(Array.isArray(value) && value.length === 0)
    )
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return queryParams ? `?${queryParams}` : "";
};

export const userAuthapi = createApi({
  reducerPath: "userAuthapi",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
  }),
  endpoints: (builder) => ({
    getPassKey: builder.query({
      query: ({ }) => ({
        url: `/api/auth/passkey`,
        method: "GET",
        headers: createHeaders(),
      }),
    }),
    archivePassKey: builder.mutation({
      query: ({ id }) => ({
        url: `/api/auth/passkey/${id}`,
        method: "DELETE",
        headers: createHeaders(),
      }),
    }),
  }),
});

export const { useGetPassKeyQuery, useArchivePassKeyMutation } = userAuthapi;
