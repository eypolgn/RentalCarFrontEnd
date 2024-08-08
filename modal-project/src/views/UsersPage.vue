<template>
    <div>
      <h1>KULLANICILAR</h1>
      <button class="button-style" @click="showAddUserForm = !showAddUserForm">
        Kullanıcı Ekle
      </button>
      <button class="button-style" @click="removeUser">
        Kullanıcı Kaldır
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
            <strong>Kullanıcı ID:</strong> {{ user.id }} <br>
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
    name: 'UsersPage',
    data() {
      return {
        users: [],
        newUser: { 
          name: '',
          password: '',
          email: '',
          id: null
        },
        showAddUserForm: false
      };
    },
    mounted() {
      this.fetchUsers();
    },
    methods: {
      fetchUsers() {
        axios.get('/api/users')
          .then(response => {
            this.users = response.data;
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
          this.users.push(response.data);
          this.newUser = { name: '', email: '', password: '' };
          this.showAddUserForm = false; 
        })
        .catch(error => {
          console.error('Kullanıcı eklenirken hata oluştu:', error);
        });
      },
      removeUser() {
        const userId = prompt("Silmek istediğiniz kullanıcının id numarasını girin:");
        if (userId) {
          axios.delete(`/api/users/${userId}`)
            .then(response => {
              console.log('Kullanıcı silindi:', response.data);
              this.users = this.users.filter(user => user.id !== parseInt(userId));
            })
            .catch(error => {
              console.error('Kullanıcı silinirken hata oluştu!', error);
            });
        }
      }
    }
  };
  </script>
  
  <style scoped>
  h1 {
    color: #2c3e50;
    text-align: center;
  }
  h2 {
    color: #2c3e50;
  }
  
  .button-style {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 10px 2px;
    cursor: pointer;
    transition-duration: 0.4s;
  }
  
  .button-style:hover {
    background-color: white;
    color: black;
    border: 2px solid #4CAF50;
  }
  
  .add-user-form {
    margin-top: 20px;
  }
  
  .add-user-form input[type="text"],
  .add-user-form input[type="email"],
  .add-user-form input[type="password"] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
  }
  
  .add-user-form button {
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
  }
  
  .add-user-form button:hover {
    background-color: #45a049;
  }
  
  .user-list {
    list-style-type: none; 
    margin-top: 20px;
    padding: 0; 
  }
  
  .user-item {
    background-color: #f9f9f9;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  </style>
  