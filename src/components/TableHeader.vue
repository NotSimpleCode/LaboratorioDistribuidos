<template>
    <div class="table-header">
        <div v-for="column in columns" :key="column.key" class="table-column" :style="{ width: column.width }">
            {{ column.label }}
        </div>
    </div>
</template>
  
<script setup>
props: {
    columns: Array
}
</script>
  
<style scoped>
.table-header {
    display: flex;
    background-color: #f0f0f0;
    font-weight: bold;
}

.table-column {
    padding: 8px;
    border: 1px solid #ccc;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
  