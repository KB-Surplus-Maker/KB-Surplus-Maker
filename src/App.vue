<template>
  <div><router-view /></div>
</template>

<script>
import TransactionMapper from '@/mapper/TransactionMapper.js';
import UserMapper from '@/mapper/UserMapper.js';

console.log(UserMapper.getUserById('user1'));
console.log(TransactionMapper.getTransactionByUserId('user1'));
</script>

<style lang="scss" scoped></style>
