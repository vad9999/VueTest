<template>
    <h3>Создание поста</h3>
    <form @submit.prevent>
        <input placeholder="Название" v-model="title" class="input" type="text">
        <input placeholder="Описание" v-model="description" class="input" type="text">
        <button class="button" @click="createPost">Создать</button>
    </form>
    <div v-for="post in posts" class="post">
        <p>{{ post.title }}</p>
        <p>{{ post.description }}</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                posts: [],
                title: '',
                description: '',
            }
        },
        methods: {
            createPost() {
                let post = {
                    title: this.title,
                    description: this.description
                }
                this.posts.push(post)
                this.title = ''
                this.description = ''
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

    form {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .input {
        border-radius: 5px;
        border-color: teal;
        height: 25px;
        font-size: 14px;
        width: 300px;
    }

    .button {
        border-radius: 7px;
        border-color: teal;
        color: teal;
        height: 30px;
        font-size: 14px;
        background-color: white;
        width: 70px;
    }

    .post {
        border: 2px solid teal;
        border-radius: 5px;
        color: teal;
        width: 100%;
    }
</style>