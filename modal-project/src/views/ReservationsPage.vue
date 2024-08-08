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
      reservations: [],
      newReservation: {
        userId: '',
        carId: '',
        startDate: '',
        endDate: ''
      },
      showAddReservationForm: false,
    };
  },
  mounted() {
    this.fetchReservations();
  },
  methods: {
    fetchReservations() {
      axios.get('/api/reservations')
        .then(response => {
          this.reservations = response.data;
        })
        .catch(error => {
          console.error('Rezervasyonlar alınırken hata oluştu:', error);
        });
    },
    addReservation() {
      console.log("sdasdad")
      console.log(this.newReservation)
      axios.post('/api/reservations', this.newReservation)
        .then(response => {
          console.log('Rezervasyon eklendi:', response.data);
          this.reservations.push(response.data);
          this.newReservation = { userId: '', carId: '', startDate: '', endDate: '' };
          this.showAddReservationForm = false;
        })
        .catch(error => {
          console.error('Rezervasyon eklenirken hata oluştu:', error);
        });
    },
    removeReservation() {
      const reservationId = prompt("Silmek istediğiniz rezervasyonun ID'sini girin:");
      if (reservationId) {
        axios.delete(`/api/reservations/${reservationId}`)
          .then(response => {
            console.log('Rezervasyon silindi:', response.data);
            this.reservations = this.reservations.filter(reservation => reservation.id !== parseInt(reservationId));
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
  list-style-type: none; 
  padding: 0; 
}
.reservation-item {
  background-color: #f9f9f9;
  border: 1px solid #ddd; 
  border-radius: 5px;
  padding: 10px; 
  margin-bottom: 10px; 
}
</style>
