<template>
    <v-data-table :headers="headers" :items="desserts" sort-by="calories" class="elevation-1">
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>我的代辦事項</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" v-on="on">新代辦事項</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="0"
                                            transition="scale-transition" offset-y min-width="290px">
                                            <template v-slot:activator="{ on }">
                                                <v-text-field v-model="date" label="預計日期"
                                                     readonly v-on="on"></v-text-field>
                                            </template>
                                            <v-date-picker locale="zh-tw" v-model="date" @input="menu = false"></v-date-picker>
                                        </v-menu>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="4">
                                        <v-menu ref="menu" v-model="menu2" :close-on-content-click="false"
                                            :nudge-right="0" :return-value.sync="time" transition="scale-transition"
                                            offset-y max-width="290px" min-width="290px">
                                            <template v-slot:activator="{ on }">
                                                <v-text-field v-model="time" label="預計時間" readonly v-on="on">
                                                </v-text-field>
                                            </template>
                                            <v-time-picker v-if="menu2" v-model="time" full-width
                                                @click:minute="$refs.menu.save(time)"></v-time-picker>
                                        </v-menu>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.title" label="項目"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.ctx" label="內容"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.scheduled_time" label="預計時間"></v-text-field>

                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.state" label="狀態"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
                fas fa-edit
            </v-icon>
            <v-icon small @click="deleteItem(item)">
                far fa-trash-alt
            </v-icon>
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
    </v-data-table>
</template>

<script>
    export default {
        data: () => ({
            dialog: false,
            headers: [{
                    text: 'ID',
                    align: 'left',
                    value: 'id',
                },
                {
                    text: '項目',
                    value: 'title'
                },
                {
                    text: '預計時間',
                    value: 'scheduled_time'
                },
                {
                    text: '狀態',
                    value: 'state'
                },
                {
                    text: '建立時間',
                    value: 'created_at'
                },
                {
                    text: '最後修改時間',
                    value: 'updated_at',
                },
                {
                    text: '操作',
                    value: 'action',
                    sortable: false,
                }
            ],
            desserts: [],
            editedIndex: -1,
            editedItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0,
            },
            defaultItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0,
            },
            date: new Date().toISOString().substr(0, 10),
            menu: false,
            time: null,
            menu2: false,
        }),

        computed: {
            formTitle() {
                return this.editedIndex === -1 ? '新增代辦事項' : '修改代辦事項'
            },
        },

        watch: {
            dialog(val) {
                val || this.close()
            },
        },

        created() {
            this.initialize();
            this.Gettime();
        },

        methods: {
            initialize() {
                var that = this;
                axios.get('/todo')
                    .then(function (response) {
                        /* 成功拿到資料，然後... */
                        console.log(response.data.data);
                        that.desserts = response.data.data;
                    })
                    .catch(function (e) {
                        /* 失敗，發生錯誤，然後...*/
                        console.log(e);
                    });
            },
            Gettime() {
                this.time = new Date().getHours() + ':' + new Date().getMinutes();
            },
            editItem(item) {
                this.editedIndex = this.desserts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem(item) {
                const index = this.desserts.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
            },

            close() {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },

            save() {
                if (this.editedIndex > -1) {
                    var that = this;
                    Object.assign(this.desserts[this.editedIndex], this.editedItem)
                    //修改更新
                    axios.put('/todo/' + this.editedItem.id, this.editedItem, {
                            headers: {
                                "X-CSRF-TOKEN": document.querySelectorAll('[name="csrf-token"]')[0].content
                            }
                        })
                        .then(function (response) {
                            /* 成功拿到資料，然後... */
                            that.close()
                        })
                        .catch(function (e) {
                            /* 失敗，發生錯誤，然後...*/
                            console.log(e);
                        });
                } else {
                    //新增資料
                    this.desserts.push(this.editedItem)
                    that.close()
                }
                // this.close()
            },
        },
    }

</script>
