import { reactive } from "vue";
import { supabase } from "./supabase";
import router from "./router";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export const store = {
  state: reactive({
    user: {},
  }),
};

