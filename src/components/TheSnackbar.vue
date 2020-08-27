<template>
  <v-snackbar :timeout="6000" bottom error right v-model="toasterMessage.state">
    {{ toasterMessage.value }}
    <v-btn @click="dismissToasterMessage()" color="blue" text>Ok</v-btn>
  </v-snackbar>
</template>

<script>
import { DISMISS_TOASTER_MESSAGE } from "@/store/sms/mutations";

export default {
  name: "TheSnackbar",
  computed: {
    toasterMessage: {
      get() {
        return this.$store.state.sms.toasterMessage;
      },
      set() {
        this.$store.commit(DISMISS_TOASTER_MESSAGE);
      },
    },
  },
  methods: {
    dismissToasterMessage() {
      this.$store.commit(DISMISS_TOASTER_MESSAGE);
    },
  },
};
</script>