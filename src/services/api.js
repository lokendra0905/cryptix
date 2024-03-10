import { ENDPOINTS, apiClient } from ".";

export const apis = {
  getDashboardApi: (payload) => apiClient.get(ENDPOINTS.GET_COINS, payload),
  getCoinDataApi: (payload, id) => apiClient.get(`${ENDPOINTS.GET_COIN_DATA}${id}`, payload),
  getCoinChartApi: (payload, id) =>
    apiClient.get(`${ENDPOINTS.GET_CHART_DATA}${id}/market_chart`, payload),
};
