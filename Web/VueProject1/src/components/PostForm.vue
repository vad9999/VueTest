<template>
    <form @submit.prevent>
        <h4>Создание поста</h4>
        <my-input type="text" placeholder="Название" v-model.trim="post.title"/>
        <my-input type="text" placeholder="Описание" lass="input" v-model.trim="post.body"/>
        <my-button @click="createPost" class="btn">Создать</my-button>
    </form> 
</template>

<script>
    export default {
        data() {
            return {
                post: {
                    title: '',
                    body: ''
                }
            }
        },
        methods: {
            createPost() {
                this.post.id = Date.now()
                this.$emit('create', this.post)
                this.post = {
                    title: '',
                    body: ''
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

    form {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }

    .btn {
        align-self: flex-end;
        margin-top: 15px;
    }
</style>