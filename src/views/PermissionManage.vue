<template>
    <div>
        <el-table :data="rights">
            <el-table-column label="id">
                <template slot-scope="scope">
                    <span>{{scope.row.id}}</span>
                </template>
            </el-table-column>
            <el-table-column label="权限名称">
                <template slot-scope="scope">
                    <span>{{scope.row.authName}}</span>
                </template>
            </el-table-column>
            <el-table-column label="路径">
                <template slot-scope="scope">
                    <span>{{scope.row.path}}</span>
                </template>
            </el-table-column>
            <el-table-column label="权限等级">
                <template slot-scope="scope">
                    <span v-if="scope.row.level === '0'" class="el-tag el-tag--light">一级权限</span>
                    <span v-if="scope.row.level === '1'" class="el-tag el-tag--success el-tag--light">二级权限</span>
                    <span v-if="scope.row.level === '2'" class="el-tag el-tag--warning el-tag--light">三级权限</span>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
            <el-form :model="right">
                <el-form-item label="id" :label-width="formLabelWidth">
                    <el-input v-model="right.id" autocomplete="off" disabled="disabled"/>
                </el-form-item>
                <el-form-item label="权限名称" :label-width="formLabelWidth">
                    <el-input v-model="right.authName" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="路径" :label-width="formLabelWidth">
                    <el-input v-model="right.path" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="权限等级" :label-width="formLabelWidth">
                    <el-input v-model="right.level" autocomplete="off"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitChange(right)">确 定</el-button>
            </div>
        </el-dialog>



        <el-dialog title="添加用户" :visible.sync="dialogFormVisible2">
            <el-form :model="newRight">
                <el-form-item label="权限名称" :label-width="formLabelWidth">
                    <el-input v-model="right.authName" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="路径" :label-width="formLabelWidth">
                    <el-input v-model="right.path" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="权限等级" :label-width="formLabelWidth">
                    <el-input v-model="right.level" autocomplete="off"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="submitAddRole(newRight)">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "role",
        data() {
            return{
                rights: [
                    {
                        id: '',
                        authName: '',
                        path: '',
                        level: ''
                    }
                ],

                dialogFormVisible: false,
                dialogFormVisible2: false,
                formLabelWidth: '120px',
                right: {
                    id: '',
                    authName: '',
                    path: '',
                    level: ''
                },
                newRight: {
                    id: '',
                    authName: '',
                    path: '',
                    level: ''
                }
            }
        },
        created() {
            axios.get('http://bigking.top:8080/OnlineShopping/rights/list')
                .then(response => {
                    this.rights = response.data.data.data;
                    // console.log(response.data.data.data);
                })
        },
        methods: {
            editRole(scope){
                this.right = scope.row;//把这一行的信息赋给information
                this.dialogFormVisible = true;
                // console.log(scope.row);
            },
            addRole(){
                // this.newRole = scope.row;//把这一行的信息赋给information
                this.dialogFormVisible2 = true;
            },
            delRole(scope){
                axios.delete('http://bigking.top:8080/OnlineShopping/roles/' + scope.row.id)
                    .then(response => {
                        alert(response.data.meta.msg);
                        location.reload();
                    });
            },
            submitChange(right){
                this.dialogFormVisible = false;
                axios.put('http://bigking.top:8080/OnlineShopping/roles/' + right.id, right)
                    .then(response => {
                        // console.log(right);
                        alert(response.data.meta.msg);
                        location.reload();
                    });
            },
            submitAddRole(newRight){
                console.log(newRight)
                this.dialogFormVisible2 = false;
                axios.post('http://bigking.top:8080/OnlineShopping/roles', newRight)
                    .then(response => {
                        // console.log(newRight);
                        alert(response.data.meta.msg);
                        location.reload();
                    });
            }
        }
    }
</script>

<style scoped>

</style>