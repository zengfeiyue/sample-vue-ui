<template>
  <template v-if="item.length <= 3"></template>
  <template v-if="item.length > 3"></template>
  <a-row>
    <a-col :flex="1"></a-col>
    <a-divider style="height: 84px" direction="vertical" />
    <a-col :flex="'86px'" style="text-align: right"></a-col>
  </a-row>

  <a-divider style="margin-top: 0" />
  <a-row style="margin-bottom: 16px"></a-row>
</template>

<script lang="ts">
  import { SearchItem } from './types';

  export default {
    name: 'SearchToolbar',
    props: {
      item: {
        type: Array<SearchItem>,
        default: null,
      },
    },
  };
</script>
