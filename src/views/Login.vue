<template>
    <div>
        <el-form :model="user">
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="user.username" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input v-model="user.password" type="password" autocomplete="off"/>
            </el-form-item>
            <el-button type="primary" round @click="login">登录</el-button>
            <el-button type="warning" round @click="reset">重置</el-button>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                user: {
                    username: '',
                    password: ''
                },
                formLabelWidth: '60px',
            }
        },
        methods: {
            login(){
                axios.post('http://bigking.top:8080/OnlineShopping/login', this.user)
                .then(response => {
                    // console.log(response.data);
                    if(response.data.meta.status === 200){
                        this.$store.commit("set_token", response.data.data.token);
                        this.$router.push("/home");
                    }else {
                        console.log(response.data.meta.msg);
                    }
                })
            },
            reset(){
                this.user.name = '';
                this.user.password = '';
            }
        }
    }
</script>

<style scoped>

</style>