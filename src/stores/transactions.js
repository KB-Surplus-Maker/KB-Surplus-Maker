import { defineStore } from 'pinia';
import { reactive, computed } from 'vue';
import TransactionMapper from '@/mapper/TransactionMapper.js';

export const useTransactionStore = defineStore('transactions', () => {
  let today = new Date();
  console.log(typeof today.getMonth());
  const states = reactive({
    transactionList: [],
    currentMonth: today.getMonth() + 1,
    currentYear: today.getFullYear(),
  });

  const fetchTransactionListByUserId = async (userId) => {
    let fetchedTransactionList =
      await TransactionMapper.getTransactionListByUserId(userId);
    if (fetchedTransactionList) {
      states.transactionList = fetchedTransactionList;
    }
  };

  const changeCurMonth = (month) => {
    states.currentMonth = month;
  };

  const curMonthTransactionList = computed(() => {
    const filtered = states.transactionList.filter(
      (transaction) =>
        parseInt(transaction.date.month) === states.currentMonth &&
        transaction.type === 'expense' &&
        parseInt(transaction.date.year) === states.currentYear
    );

    return filtered;
  });

  return {
    curMonthTransactionList,
    fetchTransactionListByUserId,
    changeCurMonth,
  };
});
