<template>
  <div class="converter">
    <b-container class="container">
      <b-card v-if="!changeType" bg-variant="primary">
        <b-row>
          <b-col><h2>Конвертер Валют</h2></b-col>
          <b-card bg-variant="info">
            <b-card>
              <b-row>
                <b-col>
                  <h3>{{ GET_VALUTES[this.selected1].Name }}</h3>
                  <b-row
                    ><b-col cols="2">
                      <b-form-select
                        v-model="selected1"
                        :options="options"
                        class="h-100 w-100 select"
                      ></b-form-select>
                    </b-col>
                    <b-col cols="8">
                      <b-form-input
                        v-model="number"
                        @keypress="isNumber($event)"
                        placeholder="Введите количество валюты для конвертации"
                      ></b-form-input></b-col
                  ></b-row>
                </b-col>

                <b-col cols="1"
                  ><b-button @click="change"
                    ><b-icon icon="arrow-left-right"/></b-button
                ></b-col>
                <b-col
                  ><h3>{{ GET_VALUTES[this.selected2].Name }}</h3>
                  <b-row>
                    <b-col cols="2">
                      <b-form-select
                        v-model="selected2"
                        :options="options"
                        class="h-100 w-100 select"
                      ></b-form-select> </b-col
                    ><b-col cols="8">
                      <b-form-input
                        v-model="result"
                        readonly
                      ></b-form-input></b-col
                  ></b-row>
                </b-col> </b-row></b-card
          ></b-card>
        </b-row>
      </b-card>
      <b-card v-if="changeType" bg-variant="primary">
        <b-row>
          <b-col><h2>Конвертер Валют</h2></b-col>
          <b-card bg-variant="info">
            <b-card>
              <b-row>
                <b-col>
                  <h3>{{ GET_VALUTES[this.selected2].Name }}</h3>
                  <b-row
                    ><b-col cols="2">
                      <b-form-select
                        v-model="selected2"
                        :options="options"
                        class="h-100 w-100 select"
                      ></b-form-select>
                    </b-col>
                    <b-col cols="8">
                      <b-form-input
                        v-model="number"
                        @keypress="isNumber($event)"
                        placeholder="Введите количество валюты для конвертации"
                      ></b-form-input></b-col
                  ></b-row>
                </b-col>

                <b-col cols="1"
                  ><b-button @click="change"
                    ><b-icon icon="arrow-left-right"/></b-button
                ></b-col>
                <b-col
                  ><h3>{{ GET_VALUTES[this.selected1].Name }}</h3>
                  <b-row>
                    <b-col cols="2">
                      <b-form-select
                        v-model="selected1"
                        :options="options"
                        class="h-100 w-100 select"
                      ></b-form-select> </b-col
                    ><b-col cols="8">
                      <b-form-input
                        v-model="resultChange"
                        readonly
                      ></b-form-input></b-col
                  ></b-row>
                </b-col> </b-row></b-card
          ></b-card>
        </b-row>
      </b-card>
    </b-container>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Converter",
  data() {
    return {
      selected1: "USD",
      selected2: "UAH",
      options: [],
      number: 1,
      changeType: false,
    };
  },
  components: {},
  computed: {
    ...mapGetters(["GET_VALUTES", "GET_ISSHOWED"]),
    result() {
      return (
        ((this.GET_VALUTES[this.selected1].Value /
          this.GET_VALUTES[this.selected1].Nominal) *
          this.number) /
        (this.GET_VALUTES[this.selected2].Value /
          this.GET_VALUTES[this.selected2].Nominal)
      ).toFixed(4);
    },
    resultChange() {
      return (
        ((this.GET_VALUTES[this.selected2].Value /
          this.GET_VALUTES[this.selected2].Nominal) *
          this.number) /
        (this.GET_VALUTES[this.selected1].Value /
          this.GET_VALUTES[this.selected1].Nominal)
      ).toFixed(4);
    },
  },
  methods: {
    change() {
      this.changeType = !this.changeType;
    },
    isNumber(evt) {
      evt = evt ? evt : window.event;
      let charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    setOptions() {
      for (const val in this.GET_VALUTES) {
        this.options.push({ text: val, value: val });
      }
    },
  },
  async created() {
    this.setOptions();
  },
  mounted() {},
};
</script>
<style scoped>
h2 {
  text-align: center;
  color: whitesmoke;
  font-size: 32px;
}
h3 {
  font-size: 16px;
  color: #d2d2d2;
}
p {
  text-align: left;
  color: #555555;
}
.select {
  border: 2px solid #0dcaf0;
  border-radius: 4px;
}
.converter {
  height: 100vh;
  background-color: #0dcaf0;
}
.container {
  padding-top: 30px;
}
</style>
