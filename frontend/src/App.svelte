<script lang="ts">
  import Counter from "./lib/Counter.svelte";
  import { queryAllTodo, newTodo, updateTodo, removeTodo } from "./api";
  let todos = [];
  const getTodos = async () => {
    todos = [];
    todos = await queryAllTodo();
    console.log("todos:", todos);
  };
  getTodos();

  let inputText = "";
  const addTodo = async () => {
    if (inputText) {
      const res = await newTodo(inputText);
      todos = [...todos, res];
      todos.push();
      inputText = "";
    }
  };
  const update = async (todo) => {
    await updateTodo({ id: todo.id, status: true  });
    todo.status = true;
  };
  const remove = async (id: string) => {
    await removeTodo(id)
    getTodos()
  };
</script>

<main>
  <div class="list">
    <div class="ToDo-Container">
      <input bind:value={inputText} type="text" class="input-field" />
      <button style="color:hotpink;" on:click={addTodo}> New Todo </button>
      <div class="ToDo-Content">
        {#each todos as item, i (item.id)}
          <input
            on:click={() => update(item)}
            bind:checked={item.status}
            type="checkbox"
          />
          <span class:checked={item.status} style="color:black"
            >{item.content}</span
          >
          <span on:click={() => remove(item.id)}>❌</span>
          <br />
        {/each}
      </div>
    </div>

    <!-- <input bind:checked={item.status} type="checkbox" />
      <span class:checked={item.status}>{item.content}</span>
      <span>sadkasda</span>
      <span on:click={() => removeTodo(item._id)}>❌</span>
      <br /> -->
  </div>

  <p class="read-the-docs">Click on the Vite and Svelte logos to learn more</p>
</main>

<style>
  .read-the-docs {
    color: #888;
  }
  .list {
    height: 70vh;
    width: 70vw;
    border-radius: 1.4%;
    background-color: aliceblue;
    position: relative;
  }
  .input-field {
    padding: 0.6em 1.2em;
    font-size: 1em;
    border-radius: 8px;
  }
  .checked {
    text-decoration: line-through;
  }
  .ToDo-Container {
    width: 80%;
    margin: 0 auto;
    padding-top: 10px;
  }
</style>
