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
      lable: '集合编号',
      key: 'name1',
      type: 'input',
      value: '第一',
    },
    {
      lable: '集合选项',
      key: 'name3',
      type: 'select',
      options: [
        {
          label: '1',
          value: 'img',
        },
        {
          label: '2',
          value: 'horizontalVideo',
        },
        {
          label: '3',
          value: 'verticalVideo',
        },
      ],
      value: 'img',
    },
    {
      lable: '第四',
      key: 'name4',
      type: 'input',
      value: '',
    },
    {
      lable: '第五',
      key: 'name5',
      type: 'input',
      value: '',
    },
    {
      lable: '创建时间',
      key: 'name2',
      type: 'timePicker',
      value: ['2023-01-01', '2023-02-01'],
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
