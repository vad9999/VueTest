<template>
    <div class="post">
        <div>
            <div>
                <strong>№: </strong>
                {{ post.id }}
            </div>
            <div>
                <strong>Название: </strong>
                {{ post.title }}
            </div>
            <div>
                <strong>Описание: </strong>
                {{ post.body }}
            </div>
        </div>
        <div class="post__btns">
            <my-button class="btn" @click="$router.push(`/${post.id}`)">Открыть</my-button>
            <my-button @click="$emit('remove', post)" class="btn">Удалить</my-button>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            post: {
                type: Object,
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
    .post {
        padding: 15px;
        border: 2px solid teal;
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .post__btns {
        display: flex;
    }

    .btn {
        margin: 0px 7px;
    }
</style>