<template>
    <nav class="pt-20 flex align-items justify-center">
      <div>
        <h1><strong>Vue</strong> Chat App</h1>
  
        <div v-if="isLogin" class="login">
          <Avatar :src="user.photoURL" />
        </div>    
      </div>
    </nav>
  </template>
  
  <script lang="ts">
  import Avatar from './Avatar.vue'
  import { useAuth } from '../main'
  
  export default {
    components: { Avatar },
    setup() {
      const { user, isLogin, signOut, signIn } = useAuth()
      return { user, isLogin, signOut, signIn }
    }
  }
  </script>