<template>
  <div class="container">
    <Breadcrumb :items="['menu.list', '测试页面']" />

    <a-card class="general-card" :title="$t('menu.list.searchTable')">
      <SearchToolBar :item="searchItemList"></SearchToolBar>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import SearchToolBar from '@/components/search-toolbar/index.vue';
  import { SearchItem } from '@/components/search-toolbar/types';

  const searchItemList: Array<SearchItem> = [
    {
      lable: 'name1',
      key: 'name1',
      type: 'input',
    },
    {
      lable: 'name2',
      key: 'name2',
    },
  ];
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px;
  }

  :deep(.arco-table-th) {
    &:last-child {
      .arco-table-th-item-title {
        margin-left: 16px;
      }
    }
  }

  .action-icon {
    margin-left: 12px;
    cursor: pointer;
  }

  .active {
    color: #0960bd;
    background-color: #e3f4fc;
  }

  .setting {
    display: flex;
    align-items: center;
    width: 200px;

    .title {
      margin-left: 12px;
      cursor: pointer;
    }
  }
</style>
