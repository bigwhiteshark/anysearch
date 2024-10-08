<template>
  <h1 class="title">Any Search</h1>
  <div class="search">
    <a-input-search
      v-model:value="value"
      placeholder="输入任何东西，搜索你想要的"
      enter-button
      size="large"
      @search="onSearch"
    />
  </div>
  <div class="example">
    <RouterLink class="example-item" to="/search">人类第一次登上月球是什么时候？</RouterLink>
    <RouterLink class="example-item" to="/search">人类第一次登上月球是什么时候？</RouterLink>
  </div>
</template>
<script setup>
///
</script>
<style scoped>
.search{
  padding: 8px;
  background-color: #f5f5f5;
  border-radius: 10px;
}
.example {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .example-item {
    display: inline-block;
    margin: 10px;
    background-color: #f5f5f5;
    padding: 10px;
    border-radius: 4px;
    text-decoration: none;
    color: #333;
  }
}
</style>