<template>
    <div>
        <el-row>
            <el-button type="primary" round @click="addUser">增加用户</el-button>
        </el-row>
        <el-table :data="users">
            <el-table-column label="id">
                <template slot-scope="scope">
                    <span>{{scope.row.id}}</span>
                </template>
            </el-table-column>
            <el-table-column label="姓名">
                <template slot-scope="scope">
                    <span>{{scope.row.username}}</span>
                </template>
            </el-table-column>
            <el-table-column label="电话">
                <template slot-scope="scope">
                    <span>{{scope.row.mobile}}</span>
                </template>
            </el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.type"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        @change="changeType(scope.row.id, scope.row.type)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="邮箱">
                <template slot-scope="scope">
                    <span>{{scope.row.email}}</span>
                </template>
            </el-table-column>
            <el-table-column label="修改">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" circle @click="editUser(scope)"/>
                </template>
            </el-table-column>
            <el-table-column label="删除">
                <template slot-scope="scope">
                    <el-button type="danger" icon="el-icon-delete" circle @click="delUser(scope)"/>
                </template>
            </el-table-column>
        </el-table>
        <div style="text-align: center">
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :page-size=pageSize
                    :total=totalElements
                    @current-change="page">
            </el-pagination>
        </div>

        <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
            <el-form :model="user">
                <el-form-item label="id" :label-width="formLabelWidth">
                    <el-input v-model="user.id" autocomplete="off" disabled="disabled"/>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth">
                    <el-input v-model="user.mobile" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <el-input v-model="user.email" autocomplete="off"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitChange(user)">确 定</el-button>
            </div>
        </el-dialog>



        <el-dialog title="添加用户" :visible.sync="dialogFormVisible2">
            <el-form :model="newUser">
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="newUser.username" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="newUser.password" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth">
                    <el-input v-model="newUser.mobile" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <el-input v-model="newUser.email" autocomplete="off"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="submitAddUser(newUser)">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "user",
        data() {
            return{
                users: [
                    {
                        id: '',
                        username: '',
                        mobile: '',
                        type: '',
                        email: ''
                    }
                ],

                currentPage: 0,
                pageSize: 4,
                totalElements: 40,

                dialogFormVisible: false,
                dialogFormVisible2: false,
                formLabelWidth: '120px',
                user: {
                    id: '',
                    username: '',
                    mobile: '',
                    type: '',
                    email: '',
                },
                newUser: {
                    id: '',
                    username: '',
                    mobile: '',
                    type: '',
                    email: '',
                    password: ''
                },
                value: true
            }
        },
        created() {
            axios.get('http://bigking.top:8080/OnlineShopping/user/users/0/4')
                .then(response => {
                    this.totalElements = this.pageSize * response.data.data.totalpage;
                    this.users = response.data.data.users;
                    // console.log(response.data.data.users);
                })
        },
        methods: {
            editUser(scope){
                this.user = scope.row;//把这一行的信息赋给information
                this.dialogFormVisible = true;
                // console.log(scope.row);
            },
            addUser(){
                this.dialogFormVisible2 = true;
            },
            delUser(scope){
                axios.delete('http://bigking.top:8080/OnlineShopping/user/users/' + scope.row.id)
                    .then(response => {
                        alert(response.data.meta.msg);
                        location.reload();
                    });
            },
            submitChange(user){
                this.dialogFormVisible = false;
                axios.put('http://bigking.top:8080/OnlineShopping/user/users/' + user.id, user)
                    .then(response => {
                        // console.log(user);
                        alert(response.data.meta.msg);
                        location.reload();
                    });
            },
            submitAddUser(newUser){
                this.dialogFormVisible2 = false;
                console.log(newUser);
                axios.post('http://bigking.top:8080/OnlineShopping/user/users/', newUser)
                    .then(response => {
                        console.log(newUser);
                        alert(response.data.meta.msg);
                        location.reload();
                    });
            },
            page(currentPage){
                axios.get('http://bigking.top:8080/OnlineShopping/user/users/' + (currentPage) + '/' + this.pageSize)
                    .then(response => {
                        // console.log(response)
                        this.users = response.data.data.users;
                    })
            },
            changeType(id, type){
                axios.put('http://bigking.top:8080/OnlineShopping/user/users/' + id + '/state/' + type)
                .then(response => {
                    // console.log(response.data.meta.msg);
                    alert(response.data.meta.msg);
                })
            }
        }
    }
</script>

<style scoped>

</style>