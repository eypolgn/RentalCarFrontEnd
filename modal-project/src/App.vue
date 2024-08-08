<template>
  <div id="app">
    <nav>
      <router-link to="/" class="nav-link">Araçlar</router-link> 
      <router-link to="/users" class="nav-link">Kullanıcılar</router-link>
      <router-link to="/reservations" class="nav-link">Rezervasyonlar</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
nav {
  display: flex;
  gap: 30px;
}

.nav-link {
  text-decoration: none;
  color: white;
  background-color: #a72b2b;
  padding: 2px 5px;
  border: none;
  
  transition: background-color 0.3s, transform 0.2s;
}

.nav-link:hover {
  background-color: black;
  transform: scale(1.05);
}
</style>

