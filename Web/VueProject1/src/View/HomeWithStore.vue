<template>
    <div class="app">
        <h1>Страница с постами</h1>
        <my-input v-model="searchQuery" placeholder="Поиск" v-focus/>
        <div class="app__btns">
            <my-button @click="showDialog" class="btn">Создать пост</my-button>
            <!--<my-button @click="fetchPosts" class="btn">Получить посты</my-button>-->
            <my-select v-model="selectedSort" :options="sortOptions"/>
        </div>
        
        <my-dialog v-model:show="dialogVisible">
            <post-form @create="createPost"/>
        </my-dialog>
        
        <post-list :posts="sortedAndSearchedPosts" @remove="removePost" v-if="!isPostLoading"/>
        <load-circle v-else class="loader"/>

        <!-- для функционала переключения между страницами -->
        <!-- <div class="page__wrapper">
            <div v-if="!isPostLoading" v-for="page in totalPages" :key="page" class="page" :class="{'current-page': pageNumber === page}" @click="changePage(page)"> {{ page }}</div>
        </div> -->

        <!-- для функционала бесконечной ленты -->
        <!-- <div ref="observer" class="observer"></div> -->
         <div v-intersection="loadMorePosts" class="observer"></div>
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
                posts: [],
                isPostLoading: false,
                selectedSort: '',
                sortOptions: [
                    {
                        value: 'title',
                        name: 'По названию'
                    },
                    {
                        value: 'body',
                        name: 'По описанию'
                    }
                ],
                searchQuery: '',
                pageNumber: 0,
                postLimit: 10,
                totalPages: 0
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
                    this.isPostLoading = true
                    setTimeout(async () => {
                        const res = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                            params: {
                                _page: this.pageNumber,
                                _limit: this.postLimit
                            }
                        })
                        this.totalPages = Math.ceil(res.headers['x-total-count'] / this.postLimit)
                        this.posts = res.data
                        this.isPostLoading = false
                    }, 1000)
                } catch(e) {
                    alert('Ошибка', e)
                }
            },
            async loadMorePosts() {
                try {
                    this.pageNumber += 1
                    const res = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                        params: {
                            _page: this.pageNumber,
                            _limit: this.postLimit
                        }
                    })
                    this.totalPages = Math.ceil(res.headers['x-total-count'] / this.postLimit)
                    this.posts = [...this.posts, ...res.data]
                } catch(e) {
                    alert('Ошибка', e)
                }
            },
            // changePage(page) {
            //     this.pageNumber = page
            //     // this.fetchPosts()
            // }
        },
        mounted() {
            this.fetchPosts()

            // код для бесконечной ленты внутри компонента
            // const options = {
            //     rootMargin: '0px',
            //     threshold: 1.0
            // }

            // const callback = (entries, observer) => {
            //     if(entries[0].isIntersecting && this.pageNumber < this.totalPages) {
            //         this.loadMorePosts()
            //     }
            // }

            // const observer = new IntersectionObserver(callback, options)
            // observer.observe(this.$refs.observer)
        },
        computed: {
            sortedPosts() {
                return [...this.posts].sort((post1, post2) => {
                    return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
                })
            },
            sortedAndSearchedPosts() {
                return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
            }
        },
        watch: {
            // //создается такая же функция как и модель
            // selectedSort(newValue) {
            //     this.posts.sort((post1, post2) => {
            //         return post1[newValue]?.localeCompare(post2[this.selectedSort])
            //     })
            // },
            // pageNumber() {
            //     this.fetchPosts()
            // }
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

    .loader {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
    }

    .app__btns {
        margin: 15px 0px;
        display: flex;
        justify-content: space-between;
    }

    .page__wrapper {
        display: flex;
        margin-top: 15px;
        justify-content: center;
    }

    .page {
        border: 1px solid teal;
        padding: 10px;
        margin: 0px 7px;
        background-color: white;
        color: black;
    }

    .current-page {
        background-color: teal;
        color: white;
    }

    .observer {
        height: 30px;
        background: teal;
    }
</style>