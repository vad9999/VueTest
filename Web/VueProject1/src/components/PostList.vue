<template>
    <div v-if="posts.length > 0">
        <h3>Список постов</h3>
        <transition-group name="post-list">
            <post-item v-for="post in posts" :post="post" :key="post.id" @remove="$emit('remove', post)"/>
        </transition-group>
        
    </div>
    <div v-else>
        <h2>Список постов пуст</h2>
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

    .post-list-item {
        display: inline-block;
        margin-right: 10px;
    }

    .post-list-enter-active,
    .post-list-leave-active {
        transition: all 0.3s ease;
    }

    .post-list-enter-from,
    .post-list-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }

    .post-list-move {
        transition: transform 0.6s ease;
    }
</style>