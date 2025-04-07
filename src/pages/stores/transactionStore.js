// stores/transactionStore.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useTransactionStore = defineStore('transactionStore', {
  state: () => ({
    transactions: [],
  }),
  actions: {
    async fetchTransactions() {
      const res = await axios.get('http://localhost:3000/transactions');
      this.transactions = res.data;
    },
  },
});
