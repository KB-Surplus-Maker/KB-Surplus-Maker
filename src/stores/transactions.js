import { defineStore } from 'pinia';
import { reactive, computed } from 'vue';
import TransactionMapper from '@/mapper/TransactionMapper.js';

export const useTransactionStore = defineStore('transactions', () => {
  let today = new Date();
  console.log(typeof today.getMonth());
  const states = reactive({
    transactionList: [],
    currentMonth: today.getMonth() + 1,
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
        transaction.type === 'expense'
    );

    return filtered;
  });

  const curMonthTransactionList2 = computed(() => {
    const filtered = states.transactionList.filter(
      (transaction) => parseInt(transaction.date.month) === states.currentMonth
    );

    return filtered;
  });

  return {
    ...states,
    curMonthTransactionList,
    curMonthTransactionList2,
    fetchTransactionListByUserId,
    changeCurMonth,
  };
});
