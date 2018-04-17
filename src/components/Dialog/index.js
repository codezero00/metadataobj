import Vue from 'vue';
//一个可以通过方法调用的组件
let IOUForm = Vue.extend(require('./InsertOrUpdateForm.vue').default);
let instance;

var iouform = function(options){
    console.log(options)
    // if( options === true){

    //     options = {
    //         dialogVisible: options
    //     }

    // }
    //生成组件
    instance = new IOUForm({
        // data: options.data,
        propsData: options.propsData,
    })
    // debugger;
    //组件需要挂载在dom元素上
    instance.vm = instance.$mount() 
    document.body.appendChild(instance.vm.$el) 
    // instance.vm.visible = true
    // instance.vm.$on('closed',()=>{
    //     instance.vm.$destroy()
    // })

    return instance.vm;
}


export default iouform;
