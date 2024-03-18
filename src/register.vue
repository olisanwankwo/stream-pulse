<template>
  <div class="banner">
    <img
      class="image"
      v-bind:src="'register.jpg'"
      alt="left banner"
    />
  </div>
<div class="form-container">
  <div class="head-img">
    <img class="imageheader" v-bind:src="'https://pjgwgwnefrpgeyfosnvz.supabase.co/storage/v1/object/public/images/cover.png?t=2024-02-16T08%3A59%3A01.119Z'" alt="left banner" />
  </div>
  <div class="container">
    <h2 class="h2">Register</h2>
    <form @submit.prevent="handleSignup">
    <div class="input field">
      <label for="username">Name</label>
      <input class="name form-control" type="text" v-model="name" id="username" name="username" placeholder="Enter your name" required>
    </div>
    <div class="input field">
      <label for="email">Email</label>
      <input class="email form-control" type="text" v-model="email" id="email" name="email" placeholder="Enter your email address" required>
    </div>
    <div class="input field">
      <label for="password">Password</label>
      <div class="input-group">
        <input class="password form-control" type="password" v-model="password" id="password" name="password" placeholder="Enter your password" required>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="togglePasswordVisibility">
            <span v-if="passwordVisible" class="bi bi-eye-slash"></span>
            <span v-else class="bi bi-eye"></span>
          </button>
        </div>
      </div>
    </div>
    <div class="input field" style="
    /* margin-bottom: -40px; */
    margin-top: 12px;
"><label for="confirmPassword" style="margin-top: 35px;">Confirm Password</label><input class="confirmpassword form-control" type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" required=""></div>
    <div class="input-field button">
      <button class="register" type="submit">Register</button>
    </div>
  </form>
    <div class="login-signup">
      <span class="text">Already have an Account?
        <router-link to="/login" class="text-signup-link">Login</router-link>
      </span>
    </div>
  </div>
</div>
</template>

<script>
import { supabase } from './supabase';
export default {
data() {
  return {
    passwordVisible: false,
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    passwordVisible: false,
  };
},
methods: {
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    const passwordInput = document.getElementById('password');
    passwordInput.type = this.passwordVisible ? 'text' : 'password';
  },
  async handleSignup() {
  try {
    let params = {
      email: this.email,
      password: this.password,
    };

    console.log("Signup Parameters:", params);

    const { error } = await supabase.auth.signUp(params);
    if (error) throw error;
    this.$router.push('/login');
  } catch (error) {
    alert(error.error_description || error.message);
  }
},

}
};
</script>

<style scoped> 
body {
  display: flex;
  overflow: auto; 
  overflow-y: hidden;
  overflow-x: hidden;
  place-items: center;
}

.image {
width: 915px;
margin-top: -1px;
height: 696px;
margin-left: -271px;
}

.imageheader {
width: 254px;
margin-left: 237px;
}

.container {
margin-left: 278px;
margin-top: 18px;
}

h2 {
margin-bottom: 44px;
margin-left: 24px;
font-size: 32px;
color: black;
font-weight: bolder;
}

.input.field {
margin-bottom: 26px;
}

label {
display: block;
margin-bottom: 5px;
font-weight: bold;
margin-left: -122px;
color: #949ca3;
}

.name,
.email,
.password,
.confirmpassword {
background-color: #f9f9f9;
border-radius: 25px;
line-height: 19px;
color: #949ca3;
padding: 9px 256px;
text-align: left;
padding-left: 10px;
margin-left: -124px;
border: groove #f9f9f9 2px;
}

.register {
background-color: #ff2222;
border-radius: 25px;
line-height: 29px;
padding: 9px 189px;
text-align: left;
padding-left: 194px;
color: #ffffff;
margin-left: -124px;
border: groove #ff2222 2px;
}

.login-signup {
margin-top: 15px;
margin-left: -1px;
}

.text-signup-link {
color: #ff2222;
font-weight: 900;
}

.text {
color: #949ca3;
}

.input-group-append {
margin-top: -33px;
}

.btn.btn-outline-secondary {
border: none;
background-color: transparent;
margin-left: 270px;
}

.form-container{
margin-left: -45px;
margin-top: -11px;
}
</style>
