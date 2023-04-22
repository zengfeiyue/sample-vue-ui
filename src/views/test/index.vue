<template>
  <div class="container">
    <Breadcrumb :items="['menu.list', '测试页面']" />

    <a-card class="general-card" :title="$t('menu.list.searchTable')">
      <SearchToolBar
        :form-item="searchItemList"
        @search="search"
        @reset="reset"
      ></SearchToolBar>
      <a-row style="margin-bottom: 16px">
        <a-col :span="12">
          <a-space>
            <a-button type="primary">
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('searchTable.operation.create') }}
            </a-button>
            <a-upload action="/">
              <template #upload-button>
                <a-button>
                  {{ $t('searchTable.operation.import') }}
                </a-button>
              </template>
            </a-upload>
          </a-space>
        </a-col>
        <a-col
          :span="12"
          style="display: flex; align-items: center; justify-content: end"
        >
          <TableSetting
            :columns="columns"
            @reload="search"
            @column-setting="columnSetting"
          ></TableSetting>
        </a-col>
      </a-row>
      <a-table
        row-key="id"
        :loading="loading"
        :pagination="pagination"
        :columns="(cloneColumns as TableColumnData[])"
        :data="renderData"
        :bordered="true"
        @page-change="onPageChange"
      >
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import SearchToolBar from '@/components/search-toolbar/index.vue';
  import TableSetting from '@/components/table-setting/index.vue';
  import { ref, reactive } from 'vue';
  import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
  import { Pagination } from '@/types/global';
  import useLoading from '@/hooks/loading';
  import { searchItemList, columns, cloneColumns } from './index';

  const { loading, setLoading } = useLoading(false);
  const renderData = ref<any>([]);

  const basePagination: Pagination = {
    current: 1,
    pageSize: 20,
  };

  // 分页配置
  const pagination = reactive({
    ...basePagination,
  });

  // 换页事件
  const onPageChange = (current: number) => {};

  const search = (searchForm: any) => {
    setLoading(true);
  };

  const reset = () => {
    console.log('reset');
  };

  const columnSetting = (col: any) => {
    cloneColumns.value = col.value;
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
