<template>
  <div class="d-flex min-vh-100">
    <!-- Sidebar -->
    <div
      class="d-flex flex-column flex-shrink-0 p-3 bg-light sidebar"
      style="width: 250px"
    >
      <SideBar />
    </div>
    <div class="flex-grow-1 p-4">
      <router-view />
    </div>
    <div>
      {{ curMonthTransactionList }}
    </div>
  </div>
</template>

<script setup></script>

<style></style>
