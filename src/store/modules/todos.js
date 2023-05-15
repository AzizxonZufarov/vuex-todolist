export default {
    state: {
        count: 0,
        todos: []
    },
    getters: {
        allTodos(state) {
            return state.todos
        },
        todosCount(state, getters) {
            return getters.validTodos.length
        },
        validTodos(state) {
            return state.todos.filter(p => {
                return p.title
            })
        },
        thisTodo: (state) => (todoId) => {
            return state.todos.find((p) => p.id === todoId)
        },
        doneTodos: (state) => {
            return state.todos.filter((todo) => todo.completed)
        },
        doneTodosCount: (state, getters) => {
            return getters.doneTodos.length
        },
        activeTodos: (state) => {
            return state.todos.filter((todo) => !todo.completed)
        },
        activeTodosCount: (state, getters) => {
            return getters.activeTodos.length
        }
    },
    mutations: {
        increment: (state) => state.count++,
        decrement: (state) => state.count--,
        missionCompleted(state, todoId) {
            let todo = state.todos.find((p) => p.id === todoId);
            todo.completed = !todo.completed;
        },
        updateTodos(state, todos) {
            state.todos = todos
        },
        createTodos(state, newTodo) {
            state.todos.unshift(newTodo)
        },
        deleteTodo: function (state, todoId) {
            let todoIndex = state.todos.indexOf(this.getters.thisTodo(todoId))
            state.todos.splice(todoIndex, 1)
        },
        update_todo(state, todo) {
            let index = state.todos.findIndex((t) => t.id == todo.id);
            if (index != -1) {
                state.todos[index] = todo;
            }
        },
    },
    actions: {
        async fetchTodos({ commit, dispatch, getters }, limit = 5) {
            const res = await fetch(
                'https://jsonplaceholder.typicode.com/todos?_limit=' + limit
            )
            const todos = await res.json()

            commit('updateTodos', todos)
        },
        incrementAsync({ commit }) {
            setTimeout(() => {
                commit('increment')
            }, 1000)
        },
        updateTodo({ commit }, todo) {
            commit("update_todo", todo);
        },
    },
}

/*axios
      .get("/api/desks/" + this.deskId)
      .then((response) => {
        this.name = response.data.data.name;
      })
      .catch((error) => {
        console.log(error.response);
        this.errored = true;
      })
      .finally(() => {
        this.loading = false;
      });*/