<template>
  <div>
    <h1>Signup</h1>
    <form @submit.prevent="handleSignup">
      <section>
        <input v-model="firstname" placeholder="Firstname" />
      </section>
      <section>
        <input v-model="lastname" placeholder="Lastname" />
      </section>
      <section>
        <input v-model="username" placeholder="Username" />
      </section>
      <section>
        <input v-model="email" placeholder="Email" />
      </section>
      <section>
        <input v-model="password" type="password" placeholder="Password" />
      </section>
      <button class="btn btn-primary" type="submit">Signup</button>
      <hr />
      <router-link to="/login">登入</router-link> <span>/</span>
      <router-link to="/">回首頁</router-link>
    </form>
    <p v-if="error">{{ error }}</p>
    <p v-if="success">{{ success }}</p>
  </div>
</template>

<script>
import axios from '../axios';
import '../assets/styles/app.css';

export default {
  data() {
    return {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      error: '',
      success: '',
    };
  },
  methods: {
    async handleSignup() {
      try {
        const response = await axios.post('/api/signup/', {
          firstname: this.firstname,
          lastname: this.lastname,
          username: this.username,
          email: this.email,
          password: this.password,
        });
        this.success = '註冊成功！請前往登入';
        this.error = '';
        this.$router.push('/login');
      } catch (err) {
        if (err.response && err.response.data) {
          this.error = JSON.stringify(err.response.data);
        } else {
          this.error = '註冊失敗';
        }
        this.success = '';
      }
    },
  },
};
</script>
