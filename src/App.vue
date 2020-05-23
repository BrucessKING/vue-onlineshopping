<template>
    <router-view/>
</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    data() {
      const item = {
        date: '',
        name: '',
        address: ''
      };
      return {
        tableData: Array(20).fill(item)
      }
    }
  };
</script>
