<template>
  <div flex flex-col gap-4>
    <NCard p-4>
      <div class="n-header-upper">Todos Example</div>

      <div class="flex flex-wrap gap-3 items-center">
        <NButton @click.prevent="$apollo.queries.todos.refetch()"> Load Todos </NButton>

        <NButton :disabled="!subscribe" @click.prevent="createTodo"> Create Todo </NButton>

        <NButton :disabled="subscribe" @click.prevent="todoAdded"> Subscribe </NButton>
      </div>
    </NCard>

    <NCard p-4>
      <div class="n-header-upper">Raw Output</div>

      <pre v-if="data">{{ data }}</pre>
    </NCard>
  </div>
</template>

<script lang="ts">
import { Observable, FetchResult } from "@apollo/client"

import { defineNuxtComponent } from "#app"

import { TodosT } from "~/types"

import todosQuery from "~/queries/todos.gql"

export default defineNuxtComponent({
  data(): {
    data: string
    todos: TodosT | null
    subscribe: boolean
    observable: Observable<FetchResult<any>> | null
  } {
    return {
      data: "",
      todos: null,
      subscribe: false,
      observable: null,
    }
  },
  watch: {
    todos(newValue) {
      this.data = newValue
    },
  },
  methods: {
    async createTodo() {
      const a = (
        await this.$apollo.mutate({
          client: "todos",
          mutation: gql`
            mutation createTodo($todo: TodoInput!) {
              createTodo(todo: $todo) {
                id
              }
            }
          `,
          variables: { todo: { text: "Random " + Math.floor(Math.random() * 100) } },
        })
      ).data
      console.log(a)
    },
    todoAdded() {
      this.subscribe = true
      const obs = this.$apollo.subscribe({
        client: "todos",
        query: gql`
          subscription todoAdded {
            todoAdded {
              id
              text
            }
          }
        `,
      })

      obs.subscribe({
        next: (data) => {
          this.data = data.data
        },
        error(error) {
          console.error(error)
        },
      })

      this.observable = obs
    },
  },
  apollo: {
    $client: "todos",
    todos() {
      return {
        query: todosQuery,
      }
    },
  },
})
</script>
