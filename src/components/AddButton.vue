<template>
  <button class="add-btn" @click="$emit('click')">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 5v14M5 12h14"
        stroke="white"
        stroke-width="3"
        stroke-linecap="round"
      />
    </svg>
  </button>
</template>

<script setup>
// emit만 설정
</script>

<style scoped>
.add-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #003366;
  color: white;
  border: none;
  display: flex; /* ✅ 아이콘 가운데 정렬 */
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
  z-index: 1000;
}

.add-btn:hover {
  background-color: #002855;
  transform: scale(1.05);
}
</style>
