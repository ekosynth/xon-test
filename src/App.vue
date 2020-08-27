<template>
  <v-app v-if="isLoggedIn">
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">X-ON Test - Jack Jackson</div>
      <v-spacer></v-spacer>
      <div v-if="customerName !== ''">USER: {{customerName}}</div>
      <div class="ml-5" v-if="creditBalance !== false">Balance: {{creditBalance}}</div>
      <v-btn class="ml-5" @click="logout">Logout</v-btn>
    </v-app-bar>
    <v-main>
      <SendSMS />
    </v-main>
    <TheSnackbar />
  </v-app>
  <v-app id="loginContainer" v-else>
    <TheLoginPage />
  </v-app>
</template>

<script>
import SendSMS from "./components/SendSMS";
import TheLoginPage from "./components/TheLoginPage";
import TheSnackbar from "./components/TheSnackbar";
import { mapGetters } from "vuex";
import { FETCH_CREDIT } from "@/store/credit/actions";
import { LOGIN } from "@/store/user/actions";
import { LOGOUT } from "@/store/user/mutations";
import { CHECK_DELIVERY_STATUS } from "@/store/sms/actions";

export default {
  name: "App",

  components: {
    SendSMS,
    TheLoginPage,
    TheSnackbar,
  },

  mounted: function () {
    this.checkCredit();

    this.$nextTick(function () {
      window.setInterval(() => {
        this.$store.dispatch(CHECK_DELIVERY_STATUS);
      }, 13000);
    });
  },

  computed: {
    isLoggedIn() {
      let status = this.checkLoginStatus;

      if (!status) {
        this.$store.dispatch(LOGIN);
      }

      return status;
    },
    ...mapGetters(["creditBalance", "customerName", "checkLoginStatus"]),
  },

  methods: {
    checkCredit() {
      return this.$store.dispatch(FETCH_CREDIT);
    },

    logout() {
      return this.$store.commit(LOGOUT);
    },
  },
};
</script>