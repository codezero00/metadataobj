<template>
    <el-container>
        <el-row>
            <el-col :span="24">
                <flow-relation-chart height='400px' width='1000px'></flow-relation-chart>
            </el-col>
        </el-row>
    </el-container>
</template>

<script>
import FlowRelationChart from "@/components/Charts/flowRelation.vue";
export default {
  name: "home",
  components: { FlowRelationChart }
};
</script>
