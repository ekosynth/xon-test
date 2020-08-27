<template>
  <v-container>
    <v-subheader class="text-h5">Send SMS</v-subheader>
    <v-row class="text-center">
      <v-form style="width: 100%;" ref="sms_form" v-model="valid">
        <v-col cols="12">
          <v-input :rules="phoneNumberIsValid" />
          <v-text-field
            label="Recipient Phone Number"
            placeholder="+447123 456789"
            v-model="sendSMSDestinationNumber"
            filled
            required
            :rules="sendSMSDestinationNumberRules"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            label="Message From"
            placeholder="Your Name"
            v-model="sendSMSOriginator"
            filled
            required
            :rules="sendSMSOriginatorRules"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea
            filled
            name="input-7-4"
            label="Message Body"
            v-model="sendSMSMessageBody"
            required
            :rules="sendSMSMessageBodyRules"
          ></v-textarea>
        </v-col>
        <v-col>
          <v-btn @click="sendSMS()">Send</v-btn>
        </v-col>
      </v-form>
    </v-row>
  </v-container>
</template>

<script>
import { UPDATE_SEND_SMS } from "@/store/sms/mutations";
import { SEND_SMS } from "@/store/sms/actions";

export default {
  data: () => ({
    phoneNumberValid: false,
    valid: true,
    sendSMSDestinationNumberRules: [
      (v) => !!v || "Destination number is required",
    ],
    sendSMSOriginatorRules: [(v) => !!v || "Message From is required"],
    sendSMSMessageBodyRules: [(v) => !!v || "Message Body is required"],
  }),

  computed: {
    sendSMSDestinationNumber: {
      get() {
        return this.$store.state.sms.newSms.destinations;
      },
      set(value) {
        let data = {};
        data.key = "destinations";
        data.value = value;
        this.$store.commit(UPDATE_SEND_SMS, data);
      },
    },
    sendSMSOriginator: {
      get() {
        return this.$store.state.sms.newSms.originator;
      },
      set(value) {
        let data = {};
        data.key = "originator";
        data.value = value;
        this.$store.commit(UPDATE_SEND_SMS, data);
      },
    },
    sendSMSMessageBody: {
      get() {
        return this.$store.state.sms.newSms.body;
      },
      set(value) {
        let data = {};
        data.key = "body";
        data.value = value;
        this.$store.commit(UPDATE_SEND_SMS, data);
      },
    },
  },

  methods: {
    sendSMS() {
      this.validate();

      if (this.valid) {
        this.$store.dispatch(SEND_SMS);
        this.resetValidation();
      }
    },
    validate() {
      this.$refs.sms_form.validate();
    },
    resetValidation() {
      this.$refs.sms_form.resetValidation();
    },
  },
};
</script>

<style scoped>
</style>