<template>
    <div>
      <h1>ARAÇLAR</h1>
      <div>
        <button class="button-style" @click="showAddCarForm = !showAddCarForm">
          Araç Ekle
        </button>
        <button class="button-style" @click="removeCar">
          Araç Kaldır
        </button>
      </div>
  
      <div v-if="showAddCarForm" class="add-car-form">
        <h2>Yeni Araç Ekle</h2>
        <form @submit.prevent="addCar">
          <input type="text" v-model="newCar.brand" placeholder="Marka" required />
          <input type="text" v-model="newCar.model" placeholder="Model" required />
          <input type="text" v-model="newCar.licensePlate" placeholder="Plaka" required />
          <input type="number" v-model="newCar.pricePerDay" placeholder="Günlük Fiyat (₺)" required />
          <button type="submit">Araç Ekle</button>
        </form>
      </div>
  
      <div>
        <h2>Araç Listesi</h2>
        <ul class="car-list">
          <li v-for="car in cars" :key="car.id" class="car-item">
            <strong>Araç ID:</strong> {{ car.id }} <br>
            <strong>Marka:</strong> {{ car.brand }} <br>
            <strong>Model:</strong> {{ car.model }} <br>
            <strong>Plaka:</strong> {{ car.licensePlate }} <br>
            <strong>Günlük Fiyati:</strong> {{ car.pricePerDay }} ₺/gün <br><br>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'; 
  
  export default {
    name: 'CarsPage',
    data() {
      return {
        cars: [], // Araçları saklayacak dizi
        newCar: { // Yeni araç bilgilerini tutacak nesne
          brand: '',
          model: '',
          licensePlate: '',
          pricePerDay: null
        },
        showAddCarForm: false // Formun görünürlüğünü kontrol etmek için
      };
    },
    mounted() {
      this.fetchCars(); // Uygulama ilk yüklendiğinde araçları çek
    },
    methods: {
      fetchCars() {
        axios.get('/api/cars')
          .then(response => {
            console.log(response.data);
            this.cars = response.data; // Veriyi cars dizisine atayın
          })
          .catch(error => {
            console.error('There was an error!', error);
          });
      },
      addCar() {
        axios.post('/api/cars', this.newCar)
          .then(response => {
            console.log('Araç eklendi:', response.data);
            this.cars.push(response.data); // Yeni aracı listeye ekle
            this.newCar = { brand: '', model: '', licensePlate: '', pricePerDay: null }; // Formu sıfırla
            this.showAddCarForm = false; // Formu kapat
          })
          .catch(error => {
            console.error('Araç eklenirken hata oluştu!', error);
          });
      },
      removeCar() {
        const licensePlateToRemove = prompt("Silmek istediğiniz aracın plakasını girin:");
        if (licensePlateToRemove) {
          axios.delete(`/api/cars/${licensePlateToRemove}`)
            .then(response => {
              console.log('Araç silindi:', response.data);
              this.cars = this.cars.filter(car => car.licensePlate !== licensePlateToRemove); // Listeyi güncelle
            })
            .catch(error => {
              console.error('Araç silinirken hata oluştu!', error);
            });
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Genel stiller */
  h1 {
    color: #2c3e50;
    text-align: center;
  }
  
  h2 {
    color: #2c3e50;
  }
  
  /* Buton stilleri */
  .button-style {
    background-color: #4CAF50; /* Buton rengi yeşil */
    color: white; /* Metin rengi beyaz */
    border: none; /* Kenar yok */
    padding: 10px 20px; /* İç boşluk */
    text-align: center; /* Metni ortala */
    text-decoration: none; /* Alt çizgi yok */
    display: inline-block; /* Blok içinde satır içi */
    font-size: 16px; /* Yazı boyutu */
    margin: 10px 5px; /* Dış boşluk */
    cursor: pointer; /* İmleç işareti */
    transition: background-color 0.3s, transform 0.3s; /* Geçiş efektleri */
  }
  
  .button-style:hover {
    background-color: #ffffff; /* Üzerine gelindiğinde arka plan beyaz */
    color: #4CAF50; /* Metin rengi yeşil */
    transform: scale(1.05); /* Hafif büyütme efekti */
    border: 2px solid #4CAF50;
  }
  
  /* Form stilleri */
  .add-car-form {
    margin: 20px 0;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  .add-car-form input[type="text"],
  .add-car-form input[type="number"] {
    width: calc(100% - 22px);
    padding: 12px;
    margin: 8px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .add-car-form button {
    background-color: #4CAF50;
    color: white;
    padding: 14px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
  }
  
  .add-car-form button:hover {
    background-color: #45a049; /* Üzerine gelindiğinde yeşil tonunda değişim */
  }
  
  /* Araç listesi stilleri */
  .car-list {
    list-style-type: none; 
    margin-top: 20px;
    padding: 0; 
  }
  
  .car-item {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 10px;
  }
  </style>
  