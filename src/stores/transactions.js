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
    console.log(states.currentMonth);
    states.currentMonth = month;
    console.log(states.currentMonth);
  };

  const curMonthExpenseList = computed(() => {
    const filtered = states.transactionList.filter(
      (transaction) =>
        transaction.type === 'expense' &&
        parseInt(transaction.date.month) === states.currentMonth &&
        parseInt(transaction.date.year) === states.currentYear
    );

    // const sorted = filtered.sort((trans1, trans2) => {
    //   if (trans1.date.year < trans2.date.year) return -1;
    //   else if (trans1.date.year > trans2.date.year) return 1;
    //   else {
    //     if (trans1.date.month < trans2.date.month) return -1;
    //     else if (trans1.date.month > trans2.date.month) return 1;
    //     else {
    //       if (trans1.date.day <= trans2.date.month) return -1;
    //       else return 1;
    //     }
    //   }
    // });

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
    curMonthExpenseList,
    fetchTransactionListByUserId,
    changeCurMonth,
  };
});
