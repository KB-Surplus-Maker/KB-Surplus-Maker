<!-- <script setup>
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/userStore";
import EditProfileItem from "./EditProfileItem.vue";

const props = defineProps({
  label: String,
  field: String,
});

const showModal = ref(false);
const userStore = useUserStore();

const displayValue = computed(() => {
  const value = userStore.currentUser?.[props.field];
  if (props.field === "password") return "●●●●";
  return value || "-";
});
</script>

<template>
  <div
    class="d-flex justify-content-between align-items-center py-2 border-bottom"
    @click="showModal = true"
    style="cursor: pointer"
  >
    <span>{{ label }}</span>
    <span class="text-muted">{{ displayValue }}</span>
  </div>

  <EditProfileItem
    v-if="showModal"
    :label="label"
    :field="field"
    :current-value="userStore.currentUser[field]"
    @close="showModal = false"
  />
</template> -->

<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/userStore";
import EditProfileItem from "./EditProfileItem.vue";

const props = defineProps({
  label: String,
  field: String,
});

const showModal = ref(false);
const userStore = useUserStore();

const displayValue = computed(() => {
  const value = userStore.currentUser?.[props.field];
  if (props.field === "password") return "●●●●";
  return value || "-";
});
</script>

<template>
  <!-- 카드 항목 -->
  <div
    class="d-flex align-items-center py-2 border-bottom"
    @click="showModal = true"
    style="cursor: pointer"
  >
    <!-- ✅ 왼쪽 색상 바 -->
    <div :class="['color-bar', field]"></div>

    <!-- 라벨과 값 -->
    <div class="d-flex justify-content-between flex-grow-1 px-3">
      <span>{{ label }}</span>
      <span class="text-muted">{{ displayValue }}</span>
    </div>
  </div>

  <!-- 모달은 카드 바깥에 렌더링 -->
  <EditProfileItem
    v-if="showModal"
    :label="label"
    :field="field"
    :current-value="userStore.currentUser[field]"
    @close="showModal = false"
  />
</template>

<style scoped>
.color-bar {
  width: 4px;
  height: 32px;
  border-radius: 4px;
}

/* 필드별 컬러 지정 */
.name {
  background-color: #ff5e5e;
}
.birth {
  background-color: #ff5e9e;
}
.phone {
  background-color: #8e5eff;
}
.email {
  background-color: #5ea1ff;
}
.password {
  background-color: #00c2c2;
}
</style>
