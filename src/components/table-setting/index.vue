<template>
  <a-tooltip :content="$t('searchTable.actions.refresh')">
    <div class="action-icon" @click="search">
      <icon-refresh size="18" />
    </div>
  </a-tooltip>
  <a-dropdown @select="handleSelectDensity">
    <a-tooltip :content="$t('searchTable.actions.density')">
      <div class="action-icon"><icon-line-height size="18" /></div>
    </a-tooltip>
    <template #content>
      <a-doption
        v-for="item in densityList"
        :key="item.value"
        :value="item.value"
        :class="{ active: item.value === size }"
      >
        <span>{{ item.name }}</span>
      </a-doption>
    </template>
  </a-dropdown>
  <a-tooltip :content="$t('searchTable.actions.columnSetting')">
    <a-popover
      trigger="click"
      position="bl"
      @popup-visible-change="popupVisibleChange"
    >
      <div class="action-icon"><icon-settings size="18" /></div>
      <template #content>
        <div id="tableSetting">
          <div
            v-for="(item, index) in showColumns"
            :key="item.dataIndex"
            class="setting"
          >
            <div style="margin-right: 4px; cursor: move">
              <icon-drag-arrow />
            </div>
            <div>
              <a-checkbox
                v-model="item.checked"
                @change="handleChange($event, item as TableColumnData, index)"
              >
              </a-checkbox>
            </div>
            <div class="title">
              {{ item.title === '#' ? '序列号' : item.title }}
            </div>
          </div>
        </div>
      </template>
    </a-popover>
  </a-tooltip>
</template>

<script lang="ts" setup>
  import { computed, ref, reactive, watch, nextTick } from 'vue';

  import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
  import { useI18n } from 'vue-i18n';
  import Sortable from 'sortablejs';
  import cloneDeep from 'lodash/cloneDeep';

  type Column = TableColumnData & { checked?: true };

  const { t } = useI18n();
  interface Props {
    columns: TableColumnData[];
  }

  const props = defineProps<Props>();

  const cloneColumns = ref<Column[]>([]);
  const showColumns = ref<Column[]>([]);

  type SizeProps = 'mini' | 'small' | 'medium' | 'large';

  const size = ref<SizeProps>('medium');

  const emits = defineEmits(['search']);

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

  const search = () => {
    console.log(111);
    emits('search', {});
  };
  const handleSelectDensity = (
    val: string | number | Record<string, any> | undefined,
    e: Event
  ) => {
    size.value = val as SizeProps;
  };

  const exchangeArray = <T extends Array<any>>(
    array: T,
    beforeIdx: number,
    newIdx: number,
    isDeep = false
  ): T => {
    const newArray = isDeep ? cloneDeep(array) : array;
    if (beforeIdx > -1 && newIdx > -1) {
      // 先替换后面的，然后拿到替换的结果替换前面的
      newArray.splice(
        beforeIdx,
        1,
        newArray.splice(newIdx, 1, newArray[beforeIdx]).pop()
      );
    }
    return newArray;
  };

  const handleChange = (
    checked: boolean | (string | boolean | number)[],
    column: Column,
    index: number
  ) => {
    if (!checked) {
      cloneColumns.value = showColumns.value.filter(
        (item) => item.dataIndex !== column.dataIndex
      );
    } else {
      cloneColumns.value.splice(index, 0, column);
    }
  };

  const popupVisibleChange = (val: boolean) => {
    if (val) {
      nextTick(() => {
        const el = document.getElementById('tableSetting') as HTMLElement;
        const sortable = new Sortable(el, {
          onEnd(e: any) {
            const { oldIndex, newIndex } = e;
            exchangeArray(cloneColumns.value, oldIndex, newIndex);
            exchangeArray(showColumns.value, oldIndex, newIndex);
          },
        });
      });
    }
  };

  watch(
    () => props.columns,
    (val) => {
      cloneColumns.value = cloneDeep(val);
      cloneColumns.value.forEach((item, index) => {
        item.checked = true;
      });
      showColumns.value = cloneDeep(cloneColumns.value);
    },
    { deep: true, immediate: true }
  );
</script>

<style scoped lang="less">
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
