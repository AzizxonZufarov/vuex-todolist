<template>
  <div id="app">
    <TodosForm />
    <Status />
    <h1>Кол-во постов: {{ todosCount }}</h1>
    <div class="todo" v-for="todo in validTodos" :key="todo.id">
      <UpdateForm
        v-if="show_update_form_id == todo.id"
        :todo="todo"
        @update="updateThisTodo(todo)"
      />
      <div v-else>
        <h2
          class="done-title"
          :class="{ done: todo.completed }"
          @click="markItDone(todo.id)"
        >
          {{ todo.title }}
        </h2>
        <div
          class="del-todo"
          style="cursor: pointer"
          @click="deleteTodoById(todo.id)"
        >
          Delete
        </div>
        <button
          @click="show_update_form_id = todo.id"
          v-if="show_update_form_id != todo.id"
          
          type="submit"
        >
          Edit
        </button>
      </div>
        

      
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import TodosForm from "./components/TodosForm.vue";
import UpdateForm from "./components/UpdateForm.vue";
import Status from "./components/Status.vue";

export default {
  name: "App",
  data() {
    return {
      showUpdateForm: false,
      currentTodo: null,
      show_update_form_id: null,
    };
  },
  components: { TodosForm, Status, UpdateForm },
  computed: {
    ...mapGetters(["validTodos", "todosCount"]),
    ...mapGetters(["doneTodos", "activeTodos"]),
  },

  mounted() {
    //this.$store.dispatch("fetchPosts");
    this.fetchTodos(10);
  },
  methods: {
    ...mapActions(["fetchTodos", "updateTodo"]),
    ...mapMutations(["deleteTodo", "missionCompleted" ]),
    deleteTodoById(id) {
      this.deleteTodo(id);
      this.$forceUpdate();
    },
    markItDone(id) {
      this.missionCompleted(id);
    },
    updateThisTodo(todo) {
      this.updateTodo(todo);
      this.show_update_form_id = null
      //this.$store.dispatch('updateTodo', todo)
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.todo {
  width: 600px;
  border: 1px solid black;
  margin: 20px auto;
}
.done-title {
  cursor: pointer;
}
.done {
  text-decoration: line-through;
  color: #dadadc;
}
</style>
