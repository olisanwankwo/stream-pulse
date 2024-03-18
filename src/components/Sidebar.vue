<template>
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
</template>

<script>
export default {
    data () {
        return {
            darkMode: false,
        }
    },
    mounted() {
        const storedDarkMode = localStorage.getItem("darkMode");
                  if (storedDarkMode) {
                    this.darkMode = JSON.parse(storedDarkMode);
                    if (this.darkMode) {
                      document.body.classList.add("dark-mode");
                    } else {
                      document.body.classList.remove("dark-mode");
                    }
                  }
    },
    methods:{
        toggleDarkMode() {
                    this.darkMode = !this.darkMode;
                    if (this.darkMode) {
                      document.body.classList.add("dark-mode");
                    } else {
                      document.body.classList.remove("dark-mode");
                    }
                    localStorage.setItem("darkMode", this.darkMode);
                  },
    }
    
}
</script>


<style scoped>
.active-link {
  color: #ff2222;
}

.dark-mode .active-link {
  color: #ff2222;
  font-weight: bold; 
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

/* Hide preloader when page is loaded */
.preloader-overlay[style*="display: none"] {
  display: none;
}


p {
  text-transform: capitalize;
}

.genre {
  margin-top: 15px;
}

.genre ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
}

.genre li {
  flex: 0 0 calc(29.333% - 10px);
  font-weight: 500;
  margin-right: 10px;
  border-radius: 10px;
  padding: 1px 4px;
  background-color: #f9f9f9;
  text-align: center;
  margin-bottom: 10px;
  /* border-color: transparent; */
  border: 1px;
}

.favourite-genres {
  font-weight: bold;
  color: black;
}

.movie-details {
  margin-left: 126px;
  margin-top: -157px;
}

.movie-details h3 {
  margin-bottom: -25px;
  margin-left: 3px;
  width: 155px;
  color: black;
}

.movies-sidebar {
  margin-left: 157px;
  margin-top: -640px;
}

.top-movie {
  font-size: 19px;
  font-weight: 800;
  font-family: sans-serif;
}

.movies-item {
  margin-top: 2px;
  margin-top: 13px;
  margin-bottom: 70px;
  background-size: cover;
  object-fit: cover;
  height: 117px;
}

.movies-image {
  width: 112px;
  border-radius: 16px;
}

.see-all {
  background-color: transparent;
  padding: 9px 68px;
  border-radius: 54px;
  font-weight: bolder;
  border-color: red;
  margin-top: 36px;
  margin-left: 21px;
  text-decoration: none;
  color: #ff2222;
}

body {
  overflow-y: auto;
}

.dark-mode .bi.bi-search {
  color: white;
}

.dark-mode .movie-details h3 {
  color: white;
}

.dark-mode .bi.bi-bell {
  color: white;
}

.carousals-image {
  margin-top: 2px;
  margin-left: 17px;
  width: 109px;
}

.dark-mode .carousals-image {
  margin-top: 16px;
}

.carousalss-image {
  margin-top: 2px;
  margin-left: 17px;
  width: 109px;
}

.dark-mode .carousalss-image {
  margin-top: -20px;
  background-color: transparent;
}

.dark-mode .genre li {
  color: white;
  background-color: #171725;
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

.dark-mode .carousel h3 {
  color: #ffffff;
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

.logo {
  margin-bottom: -16px;
  margin-left: 2px;
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
  margin-left: -1626px;
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

.menu,
.library {
  margin-top: 20px;
  color: #868d94;
  margin-bottom: 15px;
}

.menu h3,
.library h3 {
  font-size: 18px;
  padding: 10px;
  margin: 0;
}

.menu ul,
.library ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.menu ul li,
.library ul li {
  padding: 10px;
}

.menu ul li a,
.library ul li a {
  color: #868d94;
  text-decoration: none;
}

.menu ul li a i,
.library ul li a i {
  margin-right: 10px;
}

.buttonss {
  cursor: pointer;
  margin-left: -2633px;
}

.navbar .menu ul li a i {
  color: black;
}

.bi.bi-search {
  color: black;
  margin-left: -857px;
}

.search{
  color: black;
  margin-left: -857px;
  cursor: pointer;
}

.bi.bi-bell {
  color: black;
}

.menu ul li .bi.bi-compass-fill:hover {
  color: #ff2222;
}

.bi.bi-person {
  margin-left: 18px;
  font-size: 19px;
  margin-bottom: 68px;
}

.navbar .buttons .button.subscribe {
  background-color: #ff2222;
  padding: 2px 18px;
  border-radius: 54px;
  margin-left: -1652px;
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


</style>


