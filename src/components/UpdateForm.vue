<template>
    <div>
        <form >
            <input type="text" v-model="todo.title">
            <button type="submit" @click.prevent="updateTodo(todo)">Save</button>
        </form>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
    export default {
        name: 'UpdateForm',
        props: ['todo'],
        emits: ['update'],
        data() {
            return {
            }
        },
        methods: {
            updateTodo(todo) {
                this.$emit('update', todo)
            }
        },
    }
</script>

<style>
    input {
        display: block;
        width: 400px;
        border: 1px solid black;
        border-radius: 2px;
        padding: 10px;
        margin: 20px auto;
    }
</style>