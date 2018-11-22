<template>
    <div id="app">
        <div class="title">Request</div>

        <div>Method</div>
        <div class="qq">
            <el-radio v-model="radio" label="get">get</el-radio>
            <el-radio v-model="radio" label="post">post</el-radio>
        </div>
        <div class="adrss">
            <div>Url</div>
            <input @change="setStorage" v-model="url" class="url" type="text">
        </div>

        <div class="adrss">Data</div>
        <textarea v-model="dataName" class="tex1"></textarea>
        <textarea v-model="dataDetail" class="tex2"></textarea>
        <div class="d_s">
            <!-- {{list}} -->
            <div @click="addM" class="add">+</div>
            <div class="v_for" v-for="(item,index) in list" :key="index">
                <input class="myin1" v-model="item.name" type="text">
                <input class="myin2" v-model="item.n_d" type="text">
                <div @click="Num(index)" class="num" :class="item.num?'checNum':''">Num</div>
                <div @click="del(index)" class="del">Del</div>
            </div>
        </div>
        <div class="setM" @click="setMsg">SHOW</div>
    </div>
</template>

<script>
import { getmsg } from "./utils/baseUrl.js";
export default {
    name: "App",
    data() {
        return {
            radio: "post",
            url: "",
            dataName: "",
            dataDetail: "",
            name1: "",
            detail1: "",
            list: []
        };
    },
    mounted() {
        this.url = localStorage.getItem("url");
    },
    methods: {
        setMsg() {
            console.time('运行时间:')
            // console.log(typeof eval("(" + this.dataDetail + ")"))
            // if(typeof eval("(" + this.dataDetail + ")") != 'object'){
            //     console.error('参数错误')
            //     return
            // }

            let obj = {};
            if (this.dataName && this.dataDetail) {
                obj[this.dataName] = eval("(" + this.dataDetail + ")");
            }
            if (this.list.length > 0) {
                for (let i = 0; i < this.list.length; i++) {
                    if(!this.list[i].n_d || !this.list[i].name){
                        console.error('参数错误')
                        return
                    }
                    if(this.list[i].num){
                        obj[this.list[i].name] = Number(this.list[i].n_d);
                    } else{
                        obj[this.list[i].name] = this.list[i].n_d;
                    }
                    
                }
            }
            console.log(obj)
            if (JSON.stringify(obj) === "{}") {
                console.log('4448')
                getmsg(this.radio, this.url)
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err);
                    });
                return;
            }
            getmsg(this.radio, this.url, obj)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                });
                console.timeEnd('运行时间:')
        },
        setStorage() {
            localStorage.setItem("url", this.url);
        },
        addM() {
            this.list.push({num:false});
        },
        del(rm) {
            this.list.splice(rm, 1);
        },
        Num(res) {
            this.list[res].num = !this.list[res].num;
        }
    }
};
</script>

<style>
input,
textarea {
    outline: none;
}
* {
    margin: 0;
    padding: 0;
}
html,
body {
    height: 100%;
}
#app {
    height: 100%;
    padding: 0 10%;
}
.qq {
    margin-top: 15px;
}
.adrss {
    margin-bottom: 15px;
    margin-top: 50px;
}
.title {
    height: 30px;
    font-size: 20px;
    font-weight: bold;
    color: #535354;
    text-align: center;
    margin-top: 15px;
}
.setData {
    margin-top: 15px;
}
.input200 {
    width: 200px;
}
.input30 {
    width: 80px;
}
.input170 {
    width: 120px;
}
.input500 {
    width: 500px;
    margin-top: 15px;
}
.gourp {
    height: 40px;
    /* overflow: hidden; */
}
.gourp > label {
    display: inline-block;
    height: 40px;
    line-height: 40px;
}
textarea {
    resize: none;
    border: none;
}
.d_s {
    margin-top: 15px;
    position: relative;
}
.disLabel {
    height: 40px;
}
.disLabels {
    height: 40px;
}
.disLabels > input {
    height: 40px !important;
}
.tex1 {
    width: 80px;
    height: 100px;
    border: 1px dashed #535454;
    line-height: 100px;
    padding-left: 15px;
    box-sizing: border-box;
    overflow: hidden;
    border-radius: 4px;
}
.tex2 {
    width: 400px;
    height: 100px;
    border: 1px dashed #535454;
    padding: 5px 0 0 5px;
    box-sizing: border-box;
    border-radius: 4px;
}
.url {
    width: 480px;
    height: 40px;
    border: 1px dashed #535454;
    padding: 5px 0 0 5px;
    box-sizing: border-box;
    border-radius: 4px;
    margin-top: 15px;
}
.myin1 {
    width: 80px;
    height: 40px;
    border: 1px dashed #535454;
    padding: 5px 0 0 5px;
    box-sizing: border-box;
    border-radius: 4px;
    /* margin-top: 15px; */
}
.myin2 {
    width: 400px;
    height: 40px;
    border: 1px dashed #535454;
    padding: 5px 0 0 5px;
    box-sizing: border-box;
    border-radius: 4px;
    /* margin-top: 15px; */
}
a,
button,
input {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    -webkit-user-modify: read-write-plaintext-only;
}
.setM {
    height: 40px;
    width: 100px;
    line-height: 40px;
    text-align: center;
    /* border: 1px dashed #535454; */
    background-color: #535354;
    color: white;
    border-radius: 8px;
    margin-top: 20px;
    cursor: pointer;
}
.v_for {
    height: 40px;
    margin-top: 5px;
}
.add {
    height: 40px;
    width: 40px;
    text-align: center;
    line-height: 40px;
    border-radius: 8px;
    background-color: #535354;
    color: white;
    cursor: pointer;
}
.del {
    display: inline-block;
    height: 40px;
    width: 40px;
    line-height: 36px;
    font-size: 12px;
    text-align: center;
    border-radius: 8px;
    background-color: #535354;
    color: white;
    cursor: pointer;
    position: absolute;
    left: 550px;
}
.num {
    display: inline-block;
    height: 40px;
    width: 40px;
    line-height: 36px;
    font-size: 12px;
    text-align: center;
    border-radius: 8px;
    background-color: #bdbdca;
    color: white;
    cursor: pointer;
    position: absolute;
    left: 500px;
}
.checNum {
    background-color: #535354;
}
</style>
