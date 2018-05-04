<template>
  <div class="apollo-example">

    <div class="intro">
      <i>Data coming from a GraphQL Apollo server</i>
    </div>

    <div v-if="$apollo.queries.books.loading">
      Loading...
    </div>

    <div v-if="!isThereBooks">
      No book... :(
    </div>

    <div v-if="isThereBooks" class="books">
      Available book titles:
      <ul>
        <li v-for="book of books" :key="book.title">
          <strong>{{ book.title }}</strong> by {{ book.author }}
        </li>
      </ul>
    </div>

    <hr class="separator">

    <h3>Or with a "Query component" (WIP):</h3>

    <ApolloQuery
      :query="require('../graphql/Books.gql')"
    >
      <template slot-scope="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occured!</div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo books">
          Available book titles:
          <ul>
            <li v-for="book of data.books" :key="book.title">
              <strong>{{ book.title }}</strong> by {{ book.author }}
            </li>
          </ul>
        </div>

        <!-- No result -->
        <div v-else class="no-result apollo">No book... :(</div>
      </template>
    </ApolloQuery>

  </div>
</template>

<script>
  import gql from 'graphql-tag'

  export default {
    data() {
      return {
        books: null,
      }
    },
    computed: {
      isThereBooks() {
        return this.books && this.books.length > 0
      }
    },
    apollo: {
      books: gql`{ books { title, author } }`,
    },
  }
</script>

<style scoped>
  .intro {
    margin-bottom: 35px;
  }

  .books {
    max-width: 450px;
    margin: 0 auto;
    text-align: left;
  }

  .separator {
    margin: 30px 0;
  }
</style>
