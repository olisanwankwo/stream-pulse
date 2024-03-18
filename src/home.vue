              <template>
              <div class="preloader-overlay" v-show="!isPageLoaded">
                  <div class="spinner"></div>
                </div>
                <navbar></navbar>

              <sidebar></sidebar>


                  <div v-if="movieData">
                    <div
                      class="box-container"
                      :style="{
                        backgroundImage: `url('https://image.tmdb.org/t/p/original/${movieData.backdrop_path}')`,
                      }"
                    >
                      <div class="inner">
                        <div class="banner">
                          <div class="title">
                            <h3>{{ movieData ? (movieData.media_type === 'movie' ? 'Movie' : 'TV Show') : '' }}</h3>
                            <a :href="`./details/${movieData.id}`">
                              <h1>{{ movieData ? movieData.title || movieData.name : '' }}</h1>
                            </a>
                            <p class="para">{{ movieData ? movieData.overview : '' }}</p>
                            <span>
                              <i id="star-icon" class="bi bi-star"></i>
                              {{ movieData ? parseInt(movieData.vote_average) : '' }}/10 (IMDb)
                            </span>
                          </div>                        
                          <div class="btn">
                            <button class="trailerbtn" @click="watchTrailer(movieData.id)">
                              <i class="bi bi-play"></i> WATCH TRAILER
                            </button>
                            <button class="watchlistbtn" @click="addToWishlist">
                              <i class="bi bi-bookmarks"></i> ADD FAVOURITE
                            </button>              
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="back-color2">
                    <div class="webseries">
                      <div class="carousel-slider3">
                        <div class="carousel-list3">
                          <div class="carousel-item3">
                            <img
                              class="carousal-image"
                              :src="
                                darkMode
                                  ? 'https://pjgwgwnefrpgeyfosnvz.supabase.co/storage/v1/object/public/images/disney-white.png'
                                  : 'https://pjgwgwnefrpgeyfosnvz.supabase.co/storage/v1/object/public/images/disney.png'
                              "
                              alt="movie"
                              style="margin-top: 10px; margin-left: 17px"
                            />
                          </div>
                          <div class="carousel-item3">
                            <img
                              class="carousals-image"
                              :class="{ 'dark-mode': darkMode }"
                              :src="
                                darkMode
                                  ? 'https://pjgwgwnefrpgeyfosnvz.supabase.co/storage/v1/object/public/images/National-Geographic-white..png'
                                  : 'https://pjgwgwnefrpgeyfosnvz.supabase.co/storage/v1/object/public/images/National-Geographic.png'
                              "
                              alt="movie"
                            />
                          </div>
                          <div class="carousel-item3">
                            <img
                              class="carousalss-image"
                              :class="{ 'dark-mode': darkMode }"
                              :src="
                                darkMode
                                  ? 'https://pjgwgwnefrpgeyfosnvz.supabase.co/storage/v1/object/public/images/Star-wars-white.png'
                                  : 'https://pjgwgwnefrpgeyfosnvz.supabase.co/storage/v1/object/public/images/Star-Wars.png'
                              "
                              alt="movie"
                            />
                          </div>
                          <div class="carousel-item3">
                            <img
                              class="carousal-image"
                              :src="
                                darkMode
                                  ? 'https://pjgwgwnefrpgeyfosnvz.supabase.co/storage/v1/object/public/images/Marvel-white.png'
                                  : 'https://pjgwgwnefrpgeyfosnvz.supabase.co/storage/v1/object/public/images/Marvel-white.png'
                              "
                              alt="movie"
                              style="margin-top: -5px; margin-left: 17px"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="carousel">
                    <h3>
                      <i :class="{ 'dark-mode': darkMode }"></i>
                      Trending Movies
                    </h3>
                    <div class="carousel-slider">
                      <div class="carousel-list">
                        <div v-for="(movie, index) in filterItemsNew(trending)" :key="index">
                          <div class="carousel-item" v-if="movie">
                            <a :href="`./details/${movie.id}`">
                            <img
                              :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path"
                              alt="movie"
                            />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="movies-sidebar">
                    <h1 class="top-movie">Trending Series</h1>
                    <div v-for="(tvShow, index) in filterItems(trendingTV)" :key="index">
                      <div class="movies-item" v-if="tvShow">
                        <img
                          class="movies-image"
                          :src="'https://image.tmdb.org/t/p/w500/' + tvShow.poster_path"
                          alt="tv-show-poster"
                        />
                        <div class="movie-details">
                          <a :href="`./detail/${tvShow.id}`" class="click">
                            <h3>{{ tvShow.title ?? tvShow.name }}</h3>
                          </a>            
                          <p>
                            <i class="bi bi-tag-fill"></i>
                            {{ tvShow.media_type ? tvShow.media_type : "" }}
                          </p>
                          <p>
                            <i class="bi bi-star-fill"></i>
                            {{
                              parseInt(tvShow.vote_average)
                                ? parseInt(tvShow.vote_average)
                                : ""
                            }}/10
                          </p>
                        </div>
                      </div>
                    </div>

                    <button class="see-all">See All</button>
                    <div class="genre">
                      <h3 :class="{ 'dark-mode': darkMode }" class="favourite-genres">Favourite Genres</h3>
                      <ul>
                        <li :class="{ 'dark-mode': darkMode }">Action</li>
                        <li :class="{ 'dark-mode': darkMode }">Fantasy</li>
                        <li :class="{ 'dark-mode': darkMode }">Comedy</li>
                        <li :class="{ 'dark-mode': darkMode }">Sci-Fi</li>
                        <li :class="{ 'dark-mode': darkMode }">Drama</li>
                        <li :class="{ 'dark-mode': darkMode }">Romance</li>
                        <li class="{ 'dark-mode': darkMode }">Mystery</li>
                        <li :class="{ 'dark-mode': darkMode }">Horror</li>
                      </ul>
                    </div>
                  </div>
              </template>

             <script>
import { supabase } from "./supabase";
import router from "./router";
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  data() {
    return {
      darkMode: false,
      movieData: null,
      trending: [],
      trendingTV: [],
      trendingMovie: [],
      isPageLoaded: false,
      searchQuery: '',
      searchResults: null
    };
  },
  components: {
    Navbar,
    Sidebar
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
    this.fetchMovieData();
  },
  methods: {
    async fetchMovieData() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    console.log(user.id);

    const trendingMoviesRequest = fetch(
      `https://api.themoviedb.org/3/trending/all/week?api_key=843e1637e2566935058ea3d9a03a551f`
    );
    const trendingTVRequest = fetch(
      `https://api.themoviedb.org/3/trending/tv/week?api_key=843e1637e2566935058ea3d9a03a551f`
    );
    const trendingMovieRequest = fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=843e1637e2566935058ea3d9a03a551f`
    );

    const [
      trendingMoviesResponse,
      trendingTVResponse,
      trendingMovieResponse,
    ] = await Promise.all([
      trendingMoviesRequest,
      trendingTVRequest,
      trendingMovieRequest,
    ]);

    if (!trendingMoviesResponse.ok || !trendingTVResponse.ok || !trendingMovieResponse.ok) {
      throw new Error("Failed to fetch trending data");
    }

    const trendingMoviesData = await trendingMoviesResponse.json();
    const trendingTVData = await trendingTVResponse.json();
    const trendingMovieData = await trendingMovieResponse.json();

    console.log([trendingMoviesData, trendingTVData, trendingMovieData]);

    this.movieData = trendingMoviesData.results[0];
    this.trending = trendingMoviesData.results;
    this.trendingTV = trendingTVData.results;
    this.trending = trendingMovieData.results;
    this.isPageLoaded = true;
  } catch (error) {
    console.error("Error fetching movie data:", error.message);
  }
},
    filterItems(items) {
      return items.slice(0, 3);
    },
    filterItemsNew(items) {
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
        toast.success('Added to wishlist!');
      } catch (error) {
        console.error("Error adding to wishlist:", error.message);
        toast.error('Failed to add to wishlist');
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
      localStorage.setItem("darkMode", this.darkMode);
    },
    async watchTrailer(movieId) {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=843e1637e2566935058ea3d9a03a551f`);
        const data = await response.json();
        const trailerKey = data.results[0]?.key;
        if (trailerKey) {
          window.open(`https://www.youtube.com/watch?v=${trailerKey}`, "_blank");
        } else {
          console.error("No trailer found for this movie.");
        }
      } catch (error) {
        console.error("Error fetching trailer:", error.message);
      }
    },
    async search() {
      if (!this.searchQuery) {
        this.searchResults = null;
        return;
      }

      try {
        const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=843e1637e2566935058ea3d9a03a551f&query=${this.searchQuery}`);
        const data = await response.json();
        this.searchResults = data.results;
      } catch (error) {
        console.error("Error searching TV shows:", error.message);
      }
    }
  },
};
</script>




<style scoped>
.search-results-container {
  position: fixed;
  top: 60px; 
  right: 20px; 
  z-index: 999; 
  background-color: #fff; 
  border: 1px solid #ccc; 
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); 
}

.search-results {
  padding: 10px;
}

.search-results-container {
  transition: opacity 0.3s ease-in-out;
}

.search-results-container.hidden {
  opacity: 0;
}

.detail{
  margin-top: 274px;
    margin-left: -115px;
}

.image-text{
  width: 155px;
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
  margin-top: 8px;
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

.carousel {
  width: 93%;
  position: absolute;
  overflow: hidden;
  bottom: 0;
  margin-bottom: -349px;
  margin-left: -54px;
  border-radius: 20px;
  padding: 0 1%;
}

.carousel h3 {
  color: black;
  font-family: sans-serif;
  font-size: 19px;
  font-weight: 800;
  margin-bottom: -24px;
  margin-left: 120px;
}

.carousel-slider {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 300px;
  padding: 0 50px;
}

.carousel-list {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 50px;
}

.carousel-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 175px;
  height: 220px;
  border-radius: 2px;
  box-sizing: border-box;
  margin: 0 22px;
  object-fit: fill;
  cursor: pointer;
  transition: 0.5s;
}

.carousel-item img {
  width: 100%;
  height: 240px;
  border-radius: 10px;
}

.carousel-item:hover {
  transform: scale(1.2);
  z-index: 2;
}

a.click:hover {
  color: #ff2222;
}

.carousal-image {
  width: 109px;
  margin-top: 11px;
  margin-left: 12px;
}

.carousel-item3 {
  border: 1px solid #ccc;
  padding: 10px;
  width: 167px;
  border-radius: 11px;
  height: 84px;
}

.back-color2 {
  display: flex;
  margin-top: -73px;
  flex-direction: column;
}

.carousel-slider3 {
  margin-left: 68px;
  white-space: nowrap;
}

.carousel-list3 {
  display: flex;
  flex-direction: row;
  gap: 52px;
}

.box-container {
  background-size: cover;
  background-position: center;
  padding: 20px;
  margin-left: -823px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 530px;
  margin-top: 65px;
  width: 892px;
  border-radius: 10px;
}

.btn {
  margin-bottom: 49px;
  margin-left: -8px;
}

.title {
  background-color: transparent;
  padding: 20px;
  margin-left: -21px;
  margin-top: 1px;
  border-radius: 10px;
}

.inner {
  background-color: transparent;
  padding: 20px;
  border-radius: 10px;
}

.banner {
  height: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: #fff;
  padding-top: 100px;
}

.banner h1 {
  font-family: sans-serif;
  margin-left: -18px;
  margin-right: 8px;
  font-size: 5.5rem;
  color: rgb(255, 255, 255);
}

.banner h3 {
  margin-top: 40px;
  width: 84px;
  font-family: sans-serif;
  background-color: #28252b;
  padding: 2px 16px;
  border-radius: 54px;
  font-weight: 300;
  margin-left: -15px;
  text-transform: capitalize;
  color: #ffffff;
}

.trailerbtn {
  background-color: red;
  padding: 6px 12px;

  color: white;
  font-family: "Poppins", sans-serif;
  font-size: 15px;
  font-weight: 500;
  border: 2px solid red;
  border-radius: 20px;
  box-shadow: 0px 3px 10px red;
}

.watchlistbtn {
  background-color: red;
  padding: 6px 12px;
  color: white;
  margin-left: 4px;
  font-family: "Poppins", sans-serif;
  font-size: 15px;
  font-weight: 500;
  border: 2px solid red;
  border-radius: 20px;
  box-shadow: 0px 3px 10px red;
}

.para {
  text-align: justify;
  margin-bottom: 15px;
  font-family: sans-serif;
  color: white;
  font-size: 15px;
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





if (this.searchQuery.length<4) {
  this.searchResults = null;
  return;
}


