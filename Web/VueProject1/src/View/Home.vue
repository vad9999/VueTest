<template>
    <div class="app">
        <h1>Страница с постами</h1>
        <my-button @click="showDialog" style="margin: 15px 0px">Создать пост</my-button>
        <my-button @click="fetchPosts">Получить посты</my-button>
        <my-dialog v-model:show="dialogVisible">
            <post-form @create="createPost"/>
        </my-dialog>
        
        <post-list :posts="posts" @remove="removePost"/>
    </div>
</template>

<script>
    import PostForm from '../components/PostForm.vue'
    import PostList from '../components/PostList.vue'
    import axios from 'axios'
    export default {
        components: {
            PostForm, PostList
        },
        data() {
            return {
                dialogVisible: false,
                posts: []
            }
        },
        methods: {
            createPost(post) {
                this.posts.push(post)
                this.dialogVisible = false
            },
            removePost(post) {
                this.posts = this.posts.filter(p => p.id !== post.id)
            },
            showDialog() {
                this.dialogVisible = true
            },
            async fetchPosts() {
                try {
                    const res = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
                    this.posts = res.data
                } catch(e) {
                    alert('Ошибка', e)
                }
            }
        }
    }
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }     

    .app {
        padding: 20px;
    }
</style>