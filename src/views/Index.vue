<template>
    <div>
        <el-container style="height: 630px; border: 1px solid #eee">
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu router="router" v-for="item in $router.options.routes">
                <el-submenu  v-for="(item2, index2) in item.children" :index="index2 + ''">
                    <template slot="title">{{item2.name}}</template>
                    <el-menu-item v-for="item3 in item2.children" :index="item3.path">{{item3.name}}</el-menu-item>
                </el-submenu>
        </el-menu>

            </el-aside>

        <el-container>
            <el-header style="text-align: right; font-size: 12px">

            </el-header>

            <el-main>
                <router-view/>
            </el-main>
        </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Index"
    }
</script>

<style scoped>

</style>