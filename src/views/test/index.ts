import { SearchItem } from '@/components/search-toolbar/types';
import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
import { computed, watch, ref } from 'vue';
import cloneDeep from 'lodash/cloneDeep';

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

// table表格默认列
const columns = computed<TableColumnData[]>(() => [
  {
    title: '#',
    dataIndex: 'index',
    slotName: 'index',
  },
  {
    title: '2',
    dataIndex: 'number',
  },
  {
    title: '3',
    dataIndex: 'number3',
  },
  {
    title: '4',
    dataIndex: 'number4',
  },
  {
    title: '5',
    dataIndex: 'number5',
    ellipsis: true,
  },
]);

type Column = TableColumnData & { checked?: true };
const cloneColumns = ref<Column[]>([]);

watch(
  () => columns.value,
  (val) => {
    cloneColumns.value = cloneDeep(val);
    cloneColumns.value.forEach((item) => {
      item.checked = true;
    });
  },
  { deep: true, immediate: true }
);
export { searchItemList, columns, cloneColumns };
