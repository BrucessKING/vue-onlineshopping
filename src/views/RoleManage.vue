<template>
    <div>
        <el-row>
            <el-button type="primary" round @click="addRole">增加角色</el-button>
        </el-row>
        <el-table :data="roles">
            <el-table-column label="id">
                <template slot-scope="scope">
                    <span>{{scope.row.id}}</span>
                </template>
            </el-table-column>
            <el-table-column label="角色名称">
                <template slot-scope="scope">
                    <span>{{scope.row.roleName}}</span>
                </template>
            </el-table-column>
            <el-table-column label="角色描述">
                <template slot-scope="scope">
                    <span>{{scope.row.roleDesc}}</span>
                </template>
            </el-table-column>
            <el-table-column label="修改">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" circle @click="editRole(scope)"/>
                </template>
            </el-table-column>
            <el-table-column label="删除">
                <template slot-scope="scope">
                    <el-button type="danger" icon="el-icon-delete" circle @click="delRole(scope)"/>
                </template>
            </el-table-column>
            <el-table-column label="分配权限">
                <template slot-scope="scope">
                    <el-button type="warning" round @click="assignPermission(scope)">分配权限</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
            <el-form :model="role">
                <el-form-item label="id" :label-width="formLabelWidth">
                    <el-input v-model="role.id" autocomplete="off" disabled="disabled"/>
                </el-form-item>
                <el-form-item label="角色名称" :label-width="formLabelWidth">
                    <el-input v-model="role.roleName" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="角色描述" :label-width="formLabelWidth">
                    <el-input v-model="role.roleDesc" autocomplete="off"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitChange(role)">确 定</el-button>
            </div>
        </el-dialog>



        <el-dialog title="添加用户" :visible.sync="dialogFormVisible2">
            <el-form :model="newRole">
                <el-form-item label="角色名称" :label-width="formLabelWidth">
                    <el-input v-model="newRole.roleName" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="角色描述" :label-width="formLabelWidth">
                    <el-input v-model="newRole.roleDesc" autocomplete="off"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="submitAddRole(newRole)">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="分配权限" :visible.sync="dialogFormVisible3">
            <el-tree
                    ref="tree"
                    :data="tree"
                    show-checkbox
                    node-key="id"
                    :default-expand-all="true"
                    :default-checked-keys="defaultCheckedKeys"
                    :props="defaultProps">
            </el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible4 = false">取 消</el-button>
                <el-button type="primary" @click="submitChangeRight(currentRoleId)">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "role",
        data() {
            return{
                roles: [
                    {
                        id: '',
                        roleName: '',
                        roleDesc: ''
                    }
                ],

                dialogFormVisible: false,
                dialogFormVisible2: false,
                dialogFormVisible3: false,
                dialogFormVisible4: false,
                formLabelWidth: '120px',
                role: {
                    id: '',
                    roleName: '',
                    roleDesc: ''
                },
                newRole: {
                    id: '',
                    roleName: '',
                    roleDesc: ''
                },
                tree: [],
                defaultProps: {
                    children: 'children',
                    label: 'authName'
                },
                defaultExpandedKeys: [],
                defaultCheckedKeys: [],
                currentRoleId: ''
            }
        },
        created() {
            axios.get('http://bigking.top:8080/OnlineShopping/roles/')
                .then(response => {
                    this.roles = response.data.data.data;
                    // console.log(response.data.data.data);
                })
        },
        methods: {
            editRole(scope){
                this.role = scope.row;//把这一行的信息赋给information
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
            submitChange(role){
                this.dialogFormVisible = false;
                axios.put('http://bigking.top:8080/OnlineShopping/roles/' + role.id, role)
                    .then(response => {
                        // console.log(role);
                        alert(response.data.meta.msg);
                        location.reload();
                    });
            },
            submitAddRole(newRole){
                console.log(newRole);
                this.dialogFormVisible2 = false;
                axios.post('http://bigking.top:8080/OnlineShopping/roles', newRole)
                    .then(response => {
                        // console.log(newRole);
                        alert(response.data.meta.msg);
                        location.reload();
                    });
            },
            assignPermission(scope){
                this.dialogFormVisible3 = true;
                axios.get('http://bigking.top:8080/OnlineShopping/rights/tree')
                .then(response => {
                    this.tree = response.data.data.data;
                });
                axios.get('http://bigking.top:8080/OnlineShopping/roles/' + scope.row.id)
                .then(response => {
                    this.defaultCheckedKeys = response.data.data.data.psIds.split(',');
                    this.currentRoleId = scope.row.id;
                    // console.log(this.defaultCheckedKeys)
                })
            },
            submitChangeRight(currentRoleId){
                const checkedKeys = this.$refs.tree.getCheckedKeys().toString();
                console.log(checkedKeys);
                let data = {"rids":checkedKeys};

                axios.post('http://bigking.top:8080/OnlineShopping/roles/' + currentRoleId + '/rights', data)
                .then(response => {
                    // console.log(response.data.meta);
                    alert(response.data.meta.msg);
                    location.reload();
                })
            }
        }
    }
</script>

<style scoped>

</style>