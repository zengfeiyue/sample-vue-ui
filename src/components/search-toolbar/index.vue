<template>
  <a-row>
    <a-col :flex="1">
      <a-form
        :model="props.formItem"
        :label-col-props="{ span: 6 }"
        :wrapper-col-props="{ span: 18 }"
        label-align="left"
      >
        <a-row :gutter="16">
          <a-col v-for="item in props.formItem" :key="item.key" :span="8">
            <a-form-item :label="item.lable">
              <a-input
                v-if="item.type == 'input'"
                :v-model="item.value"
                :placeholder="item.lable"
              />
              <a-select
                v-if="item.type == 'select'"
                :v-model="item.value"
                :placeholder="item.lable"
              />
              <a-range-picker
                v-if="item.type == 'timePicker'"
                :v-model="item.value"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-col>
    <a-divider style="height: 84px" direction="vertical" />
    <a-col :flex="'86px'" style="text-align: right">
      <a-space direction="vertical" :size="18">
        <a-button type="primary" @click="search">
          <template #icon>
            <icon-search />
          </template>
          {{ $t('searchTable.form.search') }}
        </a-button>
        <a-button @click="reset">
          <template #icon>
            <icon-refresh />
          </template>
          {{ $t('searchTable.form.reset') }}
        </a-button>
      </a-space>
    </a-col>
  </a-row>
  <a-divider style="margin-top: 0" />
</template>

<script lang="ts" setup>
  import { SearchItem } from './types';

  interface Props {
    formItem: Array<SearchItem>;
  }

  const props = defineProps<Props>();

  const emits = defineEmits(['search', 'reset']);

  const search = () => {
    console.log(props.formItem);
    const searchForm = props.formItem.reduce((list: any, item: any) => {
      if (item.value) {
        list[item.key] = item.value;
      }
      return list;
    }, {});
    emits('search', searchForm);
  };

  const reset = () => {
    props.formItem.forEach((item: SearchItem) => {
      item.value = '';
    });
    emits('reset');
  };
</script>
