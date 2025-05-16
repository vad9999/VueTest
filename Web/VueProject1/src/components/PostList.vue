<template>
    <div v-if="posts.length > 0">
        <h3>Список постов</h3>
        <post-item v-for="post in posts" :post="post" :key="post.id" @remove="$emit('remove', post)"/>
    </div>
    <div v-else>
        <h2>Список пользователей пуст</h2>
    </div>
</template>

<script>
    import PostItem from './PostItem.vue';
    export default {
        components: {
            PostItem
        },
        //пропсы должны изменяться в родителе, в компоненте пропсы не меняются
        props: {
            posts: {
                type: Array,
                required: true
            }
        },
        data() {
            return {

            }
        },
        methods: {

        }
    }
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    h3 {
        margin-bottom: 15px;
    }
</style>