<template>
  <div class="preloader-overlay" v-show="!isPageLoaded">
    <div class="spinner"></div>
  </div>

  <div class="navbar" :class="{ 'dark-mode': darkMode }">
    <div class="logo">
      <a href="/home">
        <img
          class="imageheader"
          src="https://pjgwgwnefrpgeyfosnvz.supabase.co/storage/v1/object/public/images/cover.png?t=2024-02-16T08%3A59%3A01.119Z"
          alt="left banner"
        />
      </a>
    </div>
    <div class="menu">
      <ul>
        <li><a :class="{ 'dark-mode': darkMode }" href="/movie">Movies</a></li>
        <li><a :class="{ 'dark-mode': darkMode }" href="/series">Series</a></li>
        <li><a :class="{ 'dark-mode': darkMode }" href="/animation">Animation</a></li>
        <li>
          <div class="dropdown">
            <a :class="{ 'dark-mode': darkMode }" href="#">Genres</a>
            <div class="dropdown-content">
              <a :class="{ 'dark-mode': darkMode }" href="/action">Action</a>
              <a :class="{ 'dark-mode': darkMode }" href="/adventure">Adventure</a>
               <a :class="{ 'dark-mode': darkMode }" href="/comedy">Comedy</a>
              <a :class="{ 'dark-mode': darkMode }" href="/crime">Crime</a>
                 <a :class="{ 'dark-mode': darkMode }" href="/documentary">Documentary</a>
              <a :class="{ 'dark-mode': darkMode }" href="/drama">Drama</a>
              <a :class="{ 'dark-mode': darkMode }" href="/family">Family</a>
              <a :class="{ 'dark-mode': darkMode }" href="/fantasy">Fantasy</a>
           <a :class="{ 'dark-mode': darkMode }" href="/history">History</a>
           <a :class="{ 'dark-mode': darkMode }" href="/horror">Horror</a>
           <a :class="{ 'dark-mode': darkMode }" href="/music">Music</a>
           <a :class="{ 'dark-mode': darkMode }" href="/mystery">Mystery</a>
           <a :class="{ 'dark-mode': darkMode }" href="/romance">Romance</a>
        <a :class="{ 'dark-mode': darkMode }" href="/sciencefiction">Science Fiction</a>
        <a :class="{ 'dark-mode': darkMode }" href="/thriller">Thriller</a>
        <a :class="{ 'dark-mode': darkMode }" href="/war">War</a>
     <a :class="{ 'dark-mode': darkMode }" href="/western">Western</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="buttonss">
      <form class="nosubmit" @submit.prevent="search">
        <input
          v-model="searchQuery"
          @input="search"
          :class="{ 'dark-mode': darkMode }"
          class="nosubmit"
          type="search"
          placeholder="Search movies, TV shows..."
        />
        <div class="search-results-container" v-if="searchResults && searchResults.length > 0">
          <div class="search-results">
            <h3>Search Results:</h3>
            <div v-for="show in searchResults" :key="show.id" class="search-result">
              <a :href="`./details/${show.id}`"> 
                <img
                  v-if="show.poster_path"
                  :src="'https://image.tmdb.org/t/p/original/' + show.poster_path"
                  :alt="show.title ?? show.name"
                />
                <div class="result-details">
                  <p class="titles">{{ show.title ?? show.name }}</p>
                </div>
              </a> 
            </div>
          </div>
        </div>
      </form>
    </div>
      <div class="buttons">
        <a href="#" class="button subscribe">Subscribe</a>
        <a href="#" class="button logout" @click="SignOut">Logout</a>
        <div class="button">
          <i class="bi bi-bell" :class="{ 'dark-mode': darkMode }"></i>
          <i class="bi bi-person"></i>
        </div>
      </div>
    </div>
      <div class="sidebar" :class="{ 'dark-mode': darkMode }">
      <div class="menu">
        <h3>Menu</h3>
        <ul>
          <li>
            <router-link to="/home" class="click" active-class="active-link">
                <i class="bi bi-compass-fill"></i> Discovery
            </router-link>
        </li>
        <li>
            <router-link to="/rated" class="click" active-class="active-link">
                <i class="bi bi-star-fill"></i> Top Rated
            </router-link>
        </li>
        <li>
          <router-link to="/coming" class="click" active-class="active-link">
              <i class="bi bi-clock-fill"></i> Coming Soon
          </router-link>
      </li>
  </ul>
</div>
<div class="library">
  <h3>Library</h3>
  <ul>
      <li>
          <router-link to="/wishlist" class="click" active-class="active-link">
              <i class="bi bi-bookmarks"></i> Favourite
          </router-link>
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
    <div v-if="movieData">
      <div class="box-container" :style="{ backgroundImage: `url('https://image.tmdb.org/t/p/original/${movieData.backdrop_path}')` }">
        <div class="inner">
            <div class="banner">
                <div class="title">
                    <h3>Coming Soon</h3>
                    <a :href="`./details/${movieData.id}`">
                      <h1>{{ movieData ? movieData.title : '' }}</h1>
                    </a> 
                    <p class="para">{{ formatDate(movieData ? movieData.release_date : '') }}</p>
                </div>
                <div class="btn">
                  <button class="trailerbtn" @click="watchTrailer(movieData.id)"><i class="bi bi-play"></i> WATCH TRAILER</button>
                    <button class="watchlistbtn" @click="addToWishlist">
                      <i class="bi bi-bookmarks"></i> ADD FAVOURITE
                    </button> 
                </div>
            </div>
            </div>
        </div>
    </div>
    <div class="carousels">
        <h3 :class="{ 'dark-mode': darkMode }"> On 2024</h3 >
        <div class="carousels-slider">
            <div class="carousels-list">
              <div 
              v-for="(movie, index) in filterItems(trending)" :key="index" >
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
    import { toast } from 'vue3-toastify';
    import 'vue3-toastify/dist/index.css';
    
    export default {
      data() {
        return {
          darkMode: false,
          isPageLoaded: false,
          movieData: null,
          searchQuery: '',
          searchResults: null,
          genres: ['Action', 'Adventure', 'Comedy', 'Drama', 'Horror', 'Romance', 'Science Fiction', 'Thriller'],
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
            const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=843e1637e2566935058ea3d9a03a551f');
            const data = await response.json();
    
            this.movieData = data.results[0];
            this.trending = data.results;
    
            
            this.isPageLoaded = true;
          } catch (error) {
            console.error("Error fetching movie data:", error.message);
          }
        },
        
        formatDate(dateString) {
          if (!dateString) return '';
    
          const date = new Date(dateString);
          const options = { month: 'long', day: 'numeric', year: 'numeric' };
          return 'On ' + date.toLocaleDateString('en-US', options);
        },
    
        filterItems(items) {
          return items.slice(0, 4);
        },
    
        async addToWishlist() {
          try {
            await supabase.from("wishlist").insert(
              {
                user_id: 'ada41a6b-0138-414a-90ec-31fd0d77be33',
                data:this.movieData,
              },
            );
            toast.success('Added to Favourite!');
          } catch (error) {
            console.error("Error adding to wishlist:", error.message);
            toast.error('Failed to add to Favourite');
          }
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
        },
    
        async watchTrailer(movieId) {
          try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=843e1637e2566935058ea3d9a03a551f`);
            const data = await response.json();
            
            if (data.results && data.results.length > 0) {
              const trailerKey = data.results[0].key;
              window.open(`https://www.youtube.com/watch?v=${trailerKey}`, '_blank');
            } else {
              toast.error('No trailer available');
            }
          } catch (error) {
            console.error("Error fetching trailer:", error.message);
            toast.error('Failed to fetch trailer');
          }
        },
    
        async search() {
          if (this.searchQuery.length < 4) {
            this.searchResults = null;
            return;
          }
    
          try {
            const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=843e1637e2566935058ea3d9a03a551f&query=${this.searchQuery}`);
            const data = await response.json();
    
            if (data.results && data.results.length > 0) {
              this.searchResults = data.results.filter(result => {
                return result.media_type === 'movie';
              });
            } else {
              this.searchResults = null;
            }
          } catch (error) {
            console.error("Error searching:", error.message);
            this.searchResults = null;
          }
        }
      }
    };
    </script>
    

    


<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  z-index: 1;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #ddd;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.search-container {
  position: relative;
}

.search-form {
  display: flex;
  align-items: center;
}

.search-input {
  padding: 8px 12px;
  border: none;
  border-radius: 15px;
  background-color: #333;
  color: #fff;
  font-size: 14px;
  width: 200px;
}

.search-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.search-results-container {
  position: absolute;
  top: 40px;
  width: 17%;
  background-color: #111;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
}

.search-results {
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
}

.search-result {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #222;
  border-radius: 8px;
}

.search-result img {
  width: 80px;
  height: 120px;
  border-radius: 8px;
  margin-right: 20px;
}

.show-details {
  flex-grow: 1;
}

.show-title {
  font-weight: bold;
  font-size: 16px;
  color: #fff;
  margin-bottom: 6px;
}

.show-overview {
  font-size: 14px;
  color: #ccc;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.title{
  background-color: transparent;
  padding: 20px;
  margin-left: 83px;
  margin-bottom: 36px;
  margin-top: -102px;
  border-radius: 10px;
}

form.nosubmit {
  border: none;
  padding: 0;
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

.titles{
  background-color: transparent;
  padding: 20px;
  border-radius: 10px;
  margin-left: 77px;
  margin-top: -102px;
  margin-bottom: 33px;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1); 
  border-top: 4px solid #ff2222;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite; 
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.preloader-overlay[style*="display: none"] {
  display: none;
}

.dark-mode .bi.bi-search{
  color: white;
}

.dark-mode .bi.bi-bell{
    color: white;
}

.dark-mode .carousels h3{
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
  
  .dark-mode .sidebar {
    background-color: #1a161f;
    color: #fff;
  }

  .dark-mode .navbar .menu ul li a{
    color: white;
    background: #0d0c0f;
  }

  a.click:hover{
    color: #ff2222;
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
  margin-left: 5px;
}

.navbar .logo img {
  width: 205px;
  margin-left: -19px;
}

.navbar .menu ul {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
  margin-left: -240px;
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
  
  .navbar .menu ul li a i {
    color: black;
  }
  
  .bi.bi-search {
    color: black;
    margin-left: 237px;
}

.bi.bi-bell {
    color: black;
}

.menu ul li .bi.bi-compass-fill:hover{
color: #ff2222;
}


.dark-mode .image-text{
  color: white;
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
  margin-left: -196px;
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
}

.buttons .button {
    margin-right: 20px;
}

.box-container {
  background-size: cover;
  background-position: center;
  padding: 20px;
  margin-left: -403px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 530px;
  margin-top: 65px;
  width: 892px;
  border-radius: 10px;
  }
  
  .btn{
    margin-bottom: 104px;
    margin-left: -124px;
  }
  
  .title{
    background-color: transparent;
    padding: 20px;
    margin-left: -127px;
    margin-top: 84px;
    border-radius: 10px;
  }
  
  .inner {
    background-color: transparent;
    padding: 20px;
    border-radius: 10px;
  }
  
  .banner{
    height: auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    color: #fff;
    padding-top:100px;
  
  
  }
  .banner h1{
    font-family: sans-serif;
    margin-left: -18px;
    margin-right: 8px;
    font-size: 5.5rem;
    color: rgb(255, 255, 255);
  }
  .banner h3{
    margin-top: 26px;
    width: 121px;
    font-size: 14px;
    font-family: sans-serif;
    background-color: #28252b;
    padding: 2px 16px;
    border-radius: 54px;
    font-weight: 300;
    height: 28px;
    margin-left: -15px;
    text-transform: capitalize;
    color: #ffffff;
  }
  
  .trailerbtn{
    background-color: red;
    padding: 6px 12px;
   
    color:white;
    font-family: 'Poppins',sans-serif;
    font-size: 15px;
    font-weight: 500;
    border: 2px solid red;
    border-radius: 20px;
    box-shadow: 0px 3px 10px red;
  }
  
  .watchlistbtn{
    background-color: red;
    padding: 6px 12px;
    color:white;
    margin-left: 4px;
    font-family: 'Poppins',sans-serif;
    font-size: 15px;
    font-weight: 500;
    border: 2px solid red;
    border-radius: 20px;
    box-shadow: 0px 3px 10px red;
  }
  
  .para{
    text-align: justify;
    margin-bottom: 15px;
    font-family: sans-serif;
    color: white;
    font-size: 15px;
  }

  .carousels {
    width: 93%;
    position: absolute;
    overflow: hidden;
    bottom: 0;
    margin-bottom: -252px;
    margin-left: -19px;
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

.carousels-slider {
    position: relative;
    width: 100%;
    height: auto; 
    padding: 0 50px;
}

.carousels-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-content: space-between; 
    padding: 0 20px; 
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
  margin-bottom: -24px;
}

.movie-details {
    margin-top: 10px;
    color: black;
}

.image-text{
    margin-top: 5px;
    color: black;
    font-family: sans-serif;
    font-size: 17px;
    font-weight: 600;
}

.active-link {
  color: #ff2222;
}

.dark-mode .active-link {
  color: #ff2222;
  font-weight: bold; 
}

</style>
