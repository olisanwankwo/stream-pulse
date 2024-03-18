<template>
    <div class="preloader-overlay" v-show="!isPageLoaded">
      <div class="spinner"></div>
    </div>
  
      <div class="navbar" :class="{ 'dark-mode': darkMode }">
          <div class="logo">
            <a href="/home">
              <img class="imageheader" src="https://pjgwgwnefrpgeyfosnvz.supabase.co/storage/v1/object/public/images/cover.png?t=2024-02-16T08%3A59%3A01.119Z" alt="left banner" />
            </a>
          </div>
          <div class="menu">
            <ul>
              <li><a :class="{ 'dark-mode': darkMode }" href="/movie">Movies</a></li>
              <li><a :class="{ 'dark-mode': darkMode }" href="/series">Series</a></li>
              <li><a :class="{ 'dark-mode': darkMode }" href="/animation">Animation</a></li>
              <li><a :class="{ 'dark-mode': darkMode }" href="#">Genres</a></li>
            </ul>
          </div>
          <div class="buttonss">
            <form class="nosubmit">
              <input :class="{ 'dark-mode': darkMode }" class="nosubmit" type="search" placeholder="Search...">
            </form>
          </div>
          <div class="buttons">
            <a href="#" class="button subscribe">Subscribe</a>
            <a href="#" class="button logout" @click="signOut">Logout</a>
            <div class="button">
              <i class="bi bi-bell"></i>
              <i class="bi bi-person"></i>
            </div>
          </div>
        </div>
          <div class="sidebar" :class="{ 'dark-mode': darkMode }">
          <div class="menu">
            <h3>Menu</h3>
            <ul>
              <li>
                <a href="./home" class="click">
                  <i class="bi bi-compass-fill"></i> Discovery
                </a>
              </li>
              <li>
                <a href="./rated" class="click">
                  <i class="bi bi-star-fill"></i> Top Rated
                </a>
              </li>
              <li>
                <a href="./coming" class="click">
                  <i class="bi bi-clock-fill"></i> Coming Soon
                </a>
              </li>
            </ul>
          </div>
          <div class="library">
            <h3>Library</h3>
            <ul>
              <li>
                <a href="./wishlist" class="click">
                  <i class="bi bi-bookmarks"></i> Favourite
                </a>
              </li>
              <li>
                <a href="#" class="click">
                  <i class="bi bi-cloud-arrow-down-fill"></i> Download
                </a>
              </li>
              <li>
                  <a href="#" class="click" @click="toggleDarkMode">
                  <i class="bi bi-moon-fill"></i> Dark Mode
                </a>
              </li>
              <li>
                <a href="#" class="click">
                  <i class="bi bi-gear-fill"></i> Settings
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="carousel">
          <h3><i  :class="{ 'dark-mode': darkMode }"></i> Top Movies</h3 >
          <div class="carousel-slider">
              <div class="carousel-list">
                <div 
                v-for="(movie, index) in filterItems(trending)" :key="index" >
                  <div class="carousel-item" v-if="movie">
                      <h1 class="number" :class="{ 'dark-mode': darkMode }">{{index+1}}</h1>
                      <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" alt="movie">
                      <div class="movie-details" :class="{ 'dark-mode': darkMode }">
                        <a :href="`./details/${movie.id}`">
                          <h2>{{ movie.title}}</h2>
                          </a>
                          <p><i class="bi bi-star-fill"></i> {{ movie ? parseInt(movie.vote_average) : '' }}/10</p>
                          </div>
                          </div>
                  </div>
              </div>
          </div></div>
          <div class="carousels">
              <h3><i :class="{ 'dark-mode': darkMode }"></i> Best of Movies</h3 >
              <div class="carousels-slider">
                  <div class="carousels-list">
                    <div 
                    v-for="(movie, index) in     filterItemsNew(trending)" :key="index" >
                      <div class="carousels-item" v-if="movie">
                          <img :src="'https://image.tmdb.org/t/p/w500/' + movie.backdrop_path" alt="movie">
                          <a :href="`./details/${movie.id}`">
                            <div :class="{ 'dark-mode': darkMode }" class="image-text">{{ movie.title ?? movie.name }}</div>
                          </a>
                      </div>
                      </div>
                  </div>
              </div></div>
  </template>
  
  <script>
  import { supabase } from './supabase';
  import router from './router';
  
  export default {
    data() {
      return {
        darkMode: false,
        isPageLoaded: false,
        movieData: null,
        trending: []
      };
    },
    mounted() {
      const storedDarkMode = localStorage.getItem('darkMode');
      if (storedDarkMode) {
        this.darkMode = JSON.parse(storedDarkMode);
        if (this.darkMode) {
          document.body.classList.add('dark-mode');
        } else {
          document.body.classList.remove('dark-mode');
        }
      }
      this.fetchMovieData();
    },
    methods: {
      async fetchMovieData() {
        try {
          const response = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=843e1637e2566935058ea3d9a03a551f&with_genres=99');
          const data = await response.json();
  
          this.movieData = data.results[0];
          this.trending = data.results;
          
          this.isPageLoaded = true;
        } catch (error) {
          console.error("Error fetching movie data:", error.message);
        }
      },
  
      
      filterItems(items) {
        return items.slice(0, 3)
      },
  
      filterItemsNew(items) {
        return items.slice(0, 8);
      },
      async signOut() {
        try {
          await supabase.auth.signOut();
          router.push("./login");
        } catch (error) {
          console.error("Error logging out:", error.message);
        }
      },
      toggleDarkMode() {
        this.darkMode = !this.darkMode;
        if (this.darkMode) {
          document.body.classList.add("dark-mode");
        } else {
          document.body.classList.remove("dark-mode");
        }
        localStorage.setItem('darkMode', this.darkMode);
      }
    }
  };
  </script>
  
  
  <style scoped>
  form.nosubmit {
    border: none;
    padding: 0;
    margin-left: -64px;
  }
  
  input.nosubmit {
    width: 260px;
    border: 1px solid #555;
    display: block;
    padding: 9px 4px 9px 40px;
    background: transparent url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath fill='black' d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E") no-repeat 13px center;
  }
  
  .dark-mode input.nosubmit {
    background: transparent url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath fill='white' d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E") no-repeat 13px center;
  }
  
  .movie-details h2 {
    font-family: sans-serif;
      margin-left: 12px;
  }
  
  .preloader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1); 
    border-top: 4px solid #ff2222;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite; /* Spin animation */
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .preloader-overlay[style*="display: none"] {
    display: none;
  }
  
  p{
    text-transform: capitalize;
    margin-left: 14px;
    margin-right: -44px;
    margin-top: -26px;
  }
  .number{
      font-size: 86px;
      margin-top: -98px;
      color: black;
      margin-right: 15px;
  }
  
  a.click:hover{
      color: #ff2222;
    }
  
  .dark-mode .bi.bi-search {
      color: white;
    }
    
  .dark-mode .movie-details{
  color: white;
  }
  
    .dark-mode .bi.bi-bell {
      color: white;
    }
  
  .dark-mode {
      background-color: #0d0c0f;
      color: #fff;
    }
    
    .dark-mode .navbar {
      background-color: #0d0c0f;
      color: #fff;
    }
  
    .dark-mode .carousel h3{
      color: white;
    }
    
    .dark-mode .sidebar {
      background-color: #1a161f;
      color: #fff;
    }
    .dark-mode .navbar .menu ul li a {
      color: white;
      background: #0d0c0f;
  }
    .navbar {
      background-color: white;
      color: black;
      width: 323%;
      height: 61px;
      padding: 10px;
      margin-left: -192px;
      margin-bottom: 634px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 1;
  }
  
  .logo{
      margin-bottom: -16px;
      margin-left: -72px;
      margin-right: 597px;
  }
  
  .navbar .logo img {
      width: 205px;
      margin-left: 58px;    
  }
  
  .navbar .menu ul {
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0;
    margin-left: -828px;
  }
  
  .navbar .menu ul li {
    margin-right: 20px;
  }
  
  .navbar .menu ul li:last-child {
    margin-right: 0;
  }
  
  .navbar .menu ul li a {
    color: #000000;
    text-decoration: none;
  }
  
  .sidebar {
      background-color: #f8f8f8;
      color: white;
      width: 200px;
      height: 115%;
      position: fixed;
      top: -13px;
      left: 0;
      overflow-x: hidden;
      padding-top: 80px;
      font-family: Arial, sans-serif;
  }
  
  .menu, .library {
      margin-top: 20px;
      color: #868d94;
      margin-bottom: 15px;
  }
  
  .image-text {
    margin-top: 5px;
    color: black;
    font-family: sans-serif;
    font-size: 17px;
    font-weight: 600;
  }
  
  .dark-mode .image-text{
    color: white;
  }
  
  .menu h3, .library h3 {
    font-size: 18px;
    padding: 10px;
    margin: 0;
  }
  
  .menu ul, .library ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  .menu ul li, .library ul li {
    padding: 10px;
  }
  
  .menu ul li a, .library ul li a {
      color: #868d94;
    text-decoration: none;
  }
  
  .menu ul li a i, .library ul li a i {
    margin-right: 10px;
  }
  
  .button {
    cursor: pointer;
  }
    
  .buttonss {
    cursor: pointer;
    margin-left: -436px;
    margin-right: -125px;
  }
  
    .navbar .menu ul li a i {
      color: black;
    }
    
    .bi.bi-search {
      color: black;
      margin-left: -537px;
  }
  
  .bi.bi-bell {
      color: black;
  }
  
  .menu ul li .bi.bi-compass-fill:hover{
  color: #ff2222;
  }
  
  
  .bi.bi-person{
    margin-left: 18px;
    font-size: 19px;
    margin-bottom: 68px;
  }
  
  .navbar .buttons .button.subscribe {
    background-color: #ff2222;
    padding: 2px 18px;
    border-radius: 54px;
    margin-left: -242px;
    text-decoration: none;
    color: white;
  }
  
  .navbar .buttons .button.logout {
    background-color: #ff2222;
    padding: 2px 18px;
    border-radius: 54px;
    margin-left: -10px;
    text-decoration: none;
    color: white;
  }
  
  .buttons {
    display: flex;
    align-items: center;
    margin-left: 189px;
  }
  
  .buttons .button {
      margin-right: 20px;
  }
  
  .carousel {
    width: 93%;
    position: absolute;
    overflow: hidden;
    bottom: 0;
    margin-bottom: 321px;
    margin-left: -32px;
    border-radius: 20px;
    padding: 0 1%;
  }
  
  .carousel h3 {
      color: black;
      font-family: sans-serif;
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: -27px;
      margin-left: 109px;
  }
  
  .carousel-slider{
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      height: 300px;
      padding: 0 50px;
    }
    
    
    .carousel-list{
      position: absolute;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-top: 63px;
      margin-left: -80px;
      padding: 0 50px;
    }
    .carousel-item{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 175px;
      height: 220px;
      border-radius: 2px;
      box-sizing: border-box;
      margin: 0 124px;
      object-fit: fill;
      cursor: pointer;
      transition: 0.5s;
    }
    .carousel-item img{
      width: 112px;
      margin-top: -88px;
      border-radius: 16px;
    }
  
  
    
    .carousels {
      width: 93%;
      position: absolute;
      overflow: hidden;
      bottom: 0;
      margin-bottom: -151px;
      margin-left: -32px;
      border-radius: 20px;
      padding: 0 1%;
  }
  
  .carousels h3 {
      color: black;
      font-family: sans-serif;
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 10px;
      margin-left: 109px;
  }
  
  .dark-mode .carousels h3{
    color: white;
  }
  
  .carousels-slider {
    position: relative;
    width: 100%;
    height: auto;
    padding: 0 50px;
    margin-left: 20px;
  }
  
  .carousels-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-content: space-between;
  }
  
  .carousels-item {
      width: calc(67% - -31px);
      height: auto;
      box-sizing: border-box;
      margin-bottom: 20px;
      cursor: pointer;
      transition: 0.5s;
      text-align: center;
  }
  
  .carousels-item img {
      width: 100%;
      border-radius: 16px;
      margin-bottom: -27px;
  }
  
  .movie-details {
      margin-top: -111px;
      color: black;
      margin-left: 4px;
  }
  
  </style>