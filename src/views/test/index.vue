<template>
  <div class="container">
    <Breadcrumb :items="['menu.list', '测试页面']" />

    <a-card class="general-card" :title="$t('menu.list.searchTable')">
      <SearchToolBar
        :form-item="searchItemList"
        @search="search"
        @reset="reset"
      ></SearchToolBar>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import SearchToolBar from '@/components/search-toolbar/index.vue';
  import { SearchItem } from '@/components/search-toolbar/types';

  const searchItemList: Array<SearchItem> = [
    {
      lable: '第一',
      key: 'name1',
      type: 'input',
      value: '',
    },
    {
      lable: '第二',
      key: 'name2',
      type: 'timePicker',
      value: '',
    },
    {
      lable: '第三',
      key: 'name3',
      type: 'select',
      value: '',
    },
    {
      lable: '第四',
      key: 'name4',
      value: '',
    },
    {
      lable: '第五',
      key: 'name5',
      value: '',
    },
  ];

  const search = (searchForm: any) => {
    console.log(searchForm);
  };

  const reset = () => {
    console.log('reset');
  };
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
