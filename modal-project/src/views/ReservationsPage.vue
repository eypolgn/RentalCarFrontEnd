<template>
    <div>
      <h1>REZERVASYONLAR</h1>
      
      <div>
        <button class="button-style" @click="showAddReservationForm = !showAddReservationForm">
          Rezervasyon Ekle
        </button>
        <button class="button-style" @click="removeReservation">
          Rezervasyon Kaldır
        </button>
      </div>
  
      <div v-if="showAddReservationForm" class="add-reservation-form">
        <h2>Yeni Rezervasyon Ekle</h2>
        <form @submit.prevent="addReservation">
          <input type="number" v-model="newReservation.userId" placeholder="Kullanıcı ID" required />
          <input type="number" v-model="newReservation.carId" placeholder="Araç ID" required />
          <input type="date" v-model="newReservation.startDate" placeholder="Başlangıç Tarihi" required />
          <input type="date" v-model="newReservation.endDate" placeholder="Bitiş Tarihi" required />
          <button type="submit">Rezervasyon Ekle</button>
        </form>
      </div>
  
      <div>
        <h2>Rezervasyon Listesi</h2>
        <ul class="reservation-list">
          <li v-for="reservation in reservations" :key="reservation.id" class="reservation-item">
            <strong>Rezervasyon ID:</strong> {{ reservation.id }} <br>
            <strong>Kullanıcı ID:</strong> {{ reservation.userId }} <br>
            <strong>Araç ID:</strong> {{ reservation.carId }} <br>
            <strong>Başlangıç Tarihi:</strong> {{ reservation.startDate }} <br>
            <strong>Bitiş Tarihi:</strong> {{ reservation.endDate }} <br>
          </li>
        </ul>
      </div>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
  name: "ReservationsPage",
  data() {
    return {
      reservations: [], // Rezervasyonları saklayacak dizi
      newReservation: {
        userId: '',
        carId: '',
        startDate: '',
        endDate: ''
      },
      showAddReservationForm: false, // Formun görünürlüğünü kontrol etmek için
    };
  },
  mounted() {
    this.fetchReservations(); // Sayfa yüklendiğinde rezervasyonları çek
  },
  methods: {
    fetchReservations() {
      axios.get('/api/reservations') // Tüm rezervasyonları çekmek için API isteği
        .then(response => {
          this.reservations = response.data; // Rezervasyonları güncelle
        })
        .catch(error => {
          console.error('Rezervasyonlar alınırken hata oluştu:', error);
        });
    },
    addReservation() {
      console.log("sdasdad")
      console.log(this.newReservation)
      axios.post('/api/reservations', this.newReservation) // Yeni rezervasyonu eklemek için API isteği
        .then(response => {
          console.log('Rezervasyon eklendi:', response.data);
          this.reservations.push(response.data); // Yeni rezervasyonu listeye ekle
          this.newReservation = { userId: '', carId: '', startDate: '', endDate: '' }; // Formu sıfırla
          this.showAddReservationForm = false; // Formu kapat
        })
        .catch(error => {
          console.error('Rezervasyon eklenirken hata oluştu:', error);
        });
    },
    removeReservation() {
      const reservationId = prompt("Silmek istediğiniz rezervasyonun ID'sini girin:");
      if (reservationId) {
        axios.delete(`/api/reservations/${reservationId}`) // Rezervasyonu silmek için API isteği
          .then(response => {
            console.log('Rezervasyon silindi:', response.data);
            this.reservations = this.reservations.filter(reservation => reservation.id !== parseInt(reservationId)); // Listeyi güncelle
          })
          .catch(error => {
            console.error('Rezervasyon silinirken hata oluştu:', error);
          });
      }
    }
  }
};
</script>
  
<style scoped>
/* CSS stilleri */
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
.add-reservation-form {
  margin-top: 20px;
}
.reservation-list {
  margin-top: 20px;
  list-style-type: none; /* Madde işaretlerini kaldır */
  padding: 0; /* İç boşluk kaldır */
}
.reservation-item {
  background-color: #f9f9f9;
  border: 1px solid #ddd; /* Kenarlık */
  border-radius: 5px; /* Kenarları yuvarla */
  padding: 10px; /* İç boşluk */
  margin-bottom: 10px; /* Alt boşluk */
}
</style>
