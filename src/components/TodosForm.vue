<template>
    <div>
        <form @submit.prevent="submit">
            <input type="text" v-model="title">
            <button type="submit">Create</button>
        </form>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
    export default {
        name: 'TodosForm',
        data() {
            return {
                title: "",
            }
        },
        methods: {
            ...mapMutations(['createTodos']),
            submit() {
                this.createTodos({
                    title: this.title,
                    completed: false,
                    id: Date.now(),
                })
                this.title = ""
            }
        },
    }
</script>

<style>
    input {
        display: block;
        width: 600px;
        border: 1px solid black;
        border-radius: 2px;
        padding: 10px;
        margin: 20px auto;
    }
</style>