<template>
    <el-form ref="form" :model="form" label-width="80px">
    <!-- <el-form-item label="前置库名称">
        <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="活动区域">
        <el-select v-model="form.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="活动时间">
        <el-col :span="11">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
        <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
        </el-col>
    </el-form-item>
    <el-form-item label="即时配送">
        <el-switch v-model="form.delivery"></el-switch>
    </el-form-item>
    <el-form-item label="活动性质">
        <el-checkbox-group v-model="form.type">
        <el-checkbox label="地推活动" name="type"></el-checkbox>
        <el-checkbox label="线下主题活动" name="type"></el-checkbox>
        <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
    </el-form-item>
    <el-form-item label="特殊资源">
        <el-radio-group v-model="form.resource">
        <el-radio label="线上品牌商赞助"></el-radio>
        <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
    </el-form-item>
    <el-form-item label="活动形式">
        <el-input type="textarea" v-model="form.desc"></el-input>
    </el-form-item> -->
    <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="前置库IP">
        <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="使用软件">
        <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="位置">
        <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="所属部门">
        <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="状态">
        <el-select v-model="form.region" placeholder="请选状态">
        <el-option label="可用" value="可用"></el-option>
        <el-option label="不可用" value="不可用"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="作用">
        <el-input type="textarea" v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="备注">
        <el-input type="textarea" v-model="form.name"></el-input>
    </el-form-item>


    <div class="formfooter">
        <el-button>取消</el-button>
        <el-button type="primary" @click="onSubmit">保存</el-button>
    </div>
    </el-form>
</template>


<script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>


<style scoped>
.formfooter{
    margin-top: 10px;
    height: 80px;
    padding-top: 20px;
    margin: auto;
    width: 100%;
    text-align:center
}
</style>
