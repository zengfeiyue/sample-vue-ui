<template>
  <a-row>
    <a-col :flex="1">
      <a-form
        :model="cpFormItem"
        :label-col-props="{ span: 6 }"
        :wrapper-col-props="{ span: 18 }"
        label-align="left"
      >
        <a-row :gutter="16" :style="defaultShowRow.style">
          <template v-for="(item, index) in cpFormItem" :key="index">
            <a-col :span="item.span == undefined ? 8 : item.span">
              <a-form-item :label="item.lable">
                <a-input
                  v-if="item.type == 'input'"
                  v-model:model-value="item.value"
                  :placeholder="item.lable"
                  :default-value="item.value"
                />
                <a-select
                  v-if="item.type == 'select'"
                  v-model:model-value="item.value"
                  :placeholder="item.lable"
                  :options="item.options"
                  :default-value="item.value"
                />
                <a-range-picker
                  v-if="item.type == 'timePicker'"
                  v-model:model-value="item.value"
                  :default-value="item.value"
                />
              </a-form-item>
            </a-col>
          </template>
        </a-row>
      </a-form>
    </a-col>
    <a-divider style="height: 42px" direction="vertical" />
    <a-col :flex="'86px'" style="text-align: right">
      <a-space direction="horizontal" :size="16">
        <a-button type="primary" @click="search">
          <template #icon>
            <icon-search />
          </template>
          {{ $t('searchTable.form.search') }}
        </a-button>
        <!-- <a-button @click="reset">
          <template #icon>
            <icon-refresh />
          </template>
          {{ $t('searchTable.form.reset') }}
        </a-button> -->
      </a-space>
    </a-col>
  </a-row>
  <a-divider style="margin-top: 0">
    <a-button
      v-if="defaultShowRow.develop != -1"
      shape="circle"
      size="mini"
      @click="develop"
    >
      <template v-if="defaultShowRow.develop == 0">
        <icon-down />
      </template>
      <template v-if="defaultShowRow.develop == 1">
        <icon-up />
      </template>
    </a-button>
  </a-divider>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  import { SearchItem } from './types';

  interface Props {
    formItem: Array<SearchItem>;
  }

  const props = defineProps<Props>();

  const cpFormItem = reactive(props.formItem);

  const defaultShowRow = reactive({
    style: 'height: 50px; overflow: hidden',
    develop: props.formItem.length > 3 ? 0 : -1,
  });

  const emits = defineEmits(['search', 'reset']);

  const search = () => {
    const searchForm = props.formItem.reduce((list: any, item: any) => {
      if (item.value) {
        list[item.key] = item.value;
      }
      return list;
    }, {});
    emits('search', searchForm);
  };

  const reset = () => {
    cpFormItem.forEach((item: SearchItem) => {
      item.value = '';
    });
    emits('reset');
  };
  const develop = () => {
    if (defaultShowRow.develop === 0) {
      defaultShowRow.style = 'overflow: hidden';
      defaultShowRow.develop = 1;
    } else if (defaultShowRow.develop === 1) {
      defaultShowRow.style = 'height: 50px;overflow: hidden';
      defaultShowRow.develop = 0;
    }
  };
</script>
