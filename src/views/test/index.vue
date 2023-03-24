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
          <TableSetting :columns="columns" @search="search"></TableSetting>
        </a-col>
      </a-row>
      <a-table
        row-key="id"
        :loading="loading"
        :pagination="pagination"
        :columns="columns"
        :data="renderData"
        :bordered="true"
        @page-change="onPageChange"
      >
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import SearchToolBar from '@/components/search-toolbar/index.vue';
  import TableSetting from '@/components/table-setting/index.vue';
  import { SearchItem } from '@/components/search-toolbar/types';
  import { ref, computed, reactive, nextTick } from 'vue';
  import { useI18n } from 'vue-i18n';
  import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
  import { Pagination } from '@/types/global';
  import useLoading from '@/hooks/loading';

  const { t } = useI18n();
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

  // table表格默认列
  const columns = computed<TableColumnData[]>(() => [
    {
      title: t('searchTable.columns.index'),
      dataIndex: 'index',
      slotName: 'index',
    },
    {
      title: t('searchTable.columns.number'),
      dataIndex: 'number',
    },
    {
      title: t('searchTable.columns.name'),
      dataIndex: 'name',
    },
    {
      title: t('searchTable.columns.contentType'),
      dataIndex: 'contentType',
      slotName: 'contentType',
    },
    {
      title: t('searchTable.columns.filterType'),
      dataIndex: 'filterType',
    },
    {
      title: t('searchTable.columns.count'),
      dataIndex: 'count',
    },
    {
      title: t('searchTable.columns.createdTime'),
      dataIndex: 'createdTime',
    },
    {
      title: t('searchTable.columns.status'),
      dataIndex: 'status',
      slotName: 'status',
    },
    {
      title: t('searchTable.columns.operations'),
      dataIndex: 'operations',
      slotName: 'operations',
    },
  ]);

  const densityList = computed(() => [
    {
      name: t('searchTable.size.mini'),
      value: 'mini',
    },
    {
      name: t('searchTable.size.small'),
      value: 'small',
    },
    {
      name: t('searchTable.size.medium'),
      value: 'medium',
    },
    {
      name: t('searchTable.size.large'),
      value: 'large',
    },
  ]);

  // 查询条件
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

  // 换页事件
  const onPageChange = (current: number) => {};

  const search = (searchForm: any) => {
    console.log(222);
    setLoading(true);
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
