import { create } from "apisauce";

export const ENDPOINTS = {
  GET_COINS: "/coins/markets",
  GET_COIN_DATA: "/coins/",
  GET_CHART_DATA: "/coins/"
};

export const apiClient = create({
  baseURL: "https://api.coingecko.com/api/v3/",
  headers: {
    Accept: "application/json",
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": '*',
    "x-cg-api-key":"CG-wvU2tJmrjjr6e1BH23VMpJFF"
  },
  timeout: 30000,
});
