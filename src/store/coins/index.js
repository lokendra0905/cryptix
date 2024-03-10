import { STATUS } from "@/constants";
import { apis } from "@/services/api";
import { create } from "zustand";

export const useCoinStore = create((set, get) => ({
  getCoinListAction: async (payload) => {
    set({ getCoinListStatus: STATUS.FETCHING });
    const { ok, data } = await apis.getDashboardApi(payload);
    if (ok) {
      set({ getCoinListStatus: STATUS.SUCCESS, coinData: data });
    } else {
      set({ getCoinListStatus: STATUS.FAILED });
    }
  },

  getCoinDetailAction: async (payload, id) => {
    set({ getCoinDetailStatus: STATUS.FETCHING });

    const { ok, data } = await apis.getCoinDataApi(payload, id);
    if (ok) {
      set({ getCoinDetailStatus: STATUS.SUCCESS, coinDetails: data });
    } else {
      set({ getCoinDetailStatus: STATUS.FAILED });
    }
  },

  getCoinChartAction: async (payload, id) => {
    set({ getCoinChartStatus: STATUS.FETCHING });
    const { ok, data } = await apis.getCoinChartApi(payload, id);
    if (ok) {
      set({ getCoinChartStatus: STATUS.SUCCESS, chartData: data });
    } else {
      set({ getCoinChartStatus: STATUS.FAILED });
    }
  },
}));
