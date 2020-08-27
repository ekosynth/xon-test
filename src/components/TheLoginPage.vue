<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="4" sm="8">
        <v-card
          class="text-xs-center mt-8"
          style="padding:30px;width:380px;height:320px;margin:auto;"
        >
          <v-form ref="form" v-model="valid">
            <h1 class="text-center black--text mt-4 mb-4 display-1 text-xs-center mx-auto">X-ON Test</h1>
            <v-text-field
              label="Enter API Key"
              placeholder="live-b12-3456-7cd8-efgh-90123ef4567g"
              v-model="apiKey"
              filled
              required
              :rules="apiKeyRules"
            ></v-text-field>
            <v-btn
              :style="{left: '50%', transform:'translateX(-50%)'}"
              @click="logIn"
              color="primary"
              id="loginButton"
            >Login</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  RETRIEVE_API_KEY_FROM_LOCAL_STORAGE,
  UPDATE_API_KEY,
} from "@/store/user/mutations";
import { LOGIN } from "@/store/user/actions";

export default {
  name: "TheLoginPage",

  data: () => ({
    valid: true,
    apiKeyRules: [(v) => !!v || "API Key is required"],
  }),

  created: function () {
    this.$store.commit(RETRIEVE_API_KEY_FROM_LOCAL_STORAGE);
    this.$store.dispatch(LOGIN);
  },

  computed: {
    apiKey: {
      get() {
        return "";
      },
      set(value) {
        let data = {};
        data.key = "apiKey";
        data.value = value;
        this.$store.commit(UPDATE_API_KEY, data);
      },
    },
  },

  methods: {
    logIn() {
      this.validate();

      if (this.valid) {
        this.$store.dispatch(LOGIN);
      }
    },
    validate() {
      this.$refs.form.validate();
    },
  },
};
</script>