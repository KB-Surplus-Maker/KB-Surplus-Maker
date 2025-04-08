import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import TransactionMapper from "@/mapper/TransactionMapper.js";

export const useTransactionStore = defineStore("transactions", () => {
  let today = new Date();
  // console.log(typeof today.getMonth());
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
    console.log(states.currentMonth);
    states.currentMonth = month;
    console.log(states.currentMonth);
  };

  const curMonthExpenseList = computed(() => {
    const filtered = states.transactionList.filter(
      (transaction) =>
        transaction.type === "expense" &&
        parseInt(transaction.date.month) === states.currentMonth &&
        parseInt(transaction.date.year) === states.currentYear
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
    curMonthTransactionList2,
    curMonthExpenseList,
    fetchTransactionListByUserId,
    changeCurMonth,
  };
});
