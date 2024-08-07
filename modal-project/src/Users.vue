<template>
    <div id="app">
      <h1>KULLANICILAR</h1>
      <button class="button-style" @click="showAddUserForm = !showAddUserForm">
        Yeni Bir Kullanıcı Ekle
      </button>
  
      <div v-if="showAddUserForm" class="add-user-form">
        <h2>Yeni Kullanıcı Ekle</h2>
        <form @submit.prevent="addUser">
          <input type="text" v-model="newUser.name" placeholder="İsim" required />
          <input type="email" v-model="newUser.email" placeholder="E-posta" required />
          <input type="password" v-model="newUser.password" placeholder="Şifre" required />
          <button type="submit">Kullanıcı Ekle</button>
        </form>
      </div>
  
      <div>
        <h2>Kullanıcı Listesi</h2>
        <ul class="user-list">
          <li v-for="user in users" :key="user.id" class="user-item">
            <strong>İsim:</strong> {{ user.username }} <br>
            <strong>E-posta:</strong> {{ user.email }} <br>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'App',
    data() {
      return {
        users: [],
        newUser: { 
          name: '',
          password: '',
          email: ''
        },
        showAddUserForm: false // Formun görünürlüğünü kontrol etmek için
      };
    },
    mounted() {
      this.fetchUsers(); // Uygulama ilk yüklendiğinde kullanıcıları çek
    },
    methods: {
      fetchUsers() {
        axios.get('/api/users') // Kullanıcıları çekmek için GET isteği
          .then(response => {
            this.users = response.data; // Kullanıcıları al
          })
          .catch(error => {
            console.error('Kullanıcılar alınırken hata oluştu:', error);
          });
      },
      addUser() {
        axios.post('/api/users', {
          username: this.newUser.name,
          email: this.newUser.email,
          password: this.newUser.password
        })
        .then(response => {
          console.log('Kullanıcı eklendi:', response.data);
          this.users.push(response.data); // Yeni kullanıcıyı listeye ekle
          this.newUser = { name: '', email: '', password: '' }; // Formu sıfırla
          this.showAddUserForm = false; // Formu kapat
        })
        .catch(error => {
          console.error('Kullanıcı eklenirken hata oluştu:', error);
        });
      }
    }
  };
  </script>
  
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
    margin-top: 20px;
  }
  
  .user-list {
    list-style-type: none; 
    margin-top: 20px;
    padding: 0; 
  }
  
  .user-item {
    text-align: left;
    margin-bottom: 15px; 
  }
  
  .button-style {
    margin-bottom: 15px;
  }
  
  .add-user-form {
    margin-top: 20px;
  }
  </style>
  
        
  