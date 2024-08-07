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
  display: flex; /* Flexbox kullanarak bağlantıları yan yana yerleştir */
  gap: 30px; /* Bağlantılar arasında boşluk bırak */
}

.nav-link {
  text-decoration: none; /* Alt çizgiyi kaldır */
  color: white; /* Metin rengi */
  background-color: #a72b2b; /* Buton arka plan rengi */
  padding: 2px 5px; /* İç boşluk ekle */
  border: none; /* Kenar boşluğu oluşturma */
  
  transition: background-color 0.3s, transform 0.2s; /* Geçiş animasyonu ekle */
}

.nav-link:hover {
  background-color: black; /* Fare üzerine geldiğinde arka plan rengi */
  transform: scale(1.05); /* Fare üzerine gelince büyütme efekti */
}
</style>

