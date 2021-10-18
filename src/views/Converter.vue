<template>
  <div class="converter">
    <b-container class="container">
      <b-card v-if="!changeType" class="container__card">
        <b-row>
          <b-col><h2>Конвертер Валют</h2></b-col>
          <b-card style="background:#018786">
            <b-card>
              <b-row>
                <b-col class="col-sm-12 col-md-5">
                  <h3>{{ GET_VALUTES[this.selected1].Name }}</h3>
                  <b-row
                    ><b-col class="col-lg-3 col-md-4 col-sm-4 col-sm-6"  >
                      <b-form-select
                        v-model="selected1"
                        :options="options"
                        class="h-100 w-100 select"
                      ></b-form-select>
                    </b-col>
                    <b-col class="col-lg-9 col-md-7 col-sm-6">
                      <b-form-input
                        v-model="number"
                        @keypress="isNumber($event)"
                        placeholder="Введите количество валюты для конвертации"
                      ></b-form-input></b-col
                  ></b-row>
                </b-col>

                <div class="col-lg-1 col-md-1 col-sm-12"
                  ><b-button @click="change"
                    ><b-icon icon="arrow-left-right"/></b-button
                ></div>
                <b-col class="col-sm-12 col-md-6"
                  ><h3>{{ GET_VALUTES[this.selected2].Name }}</h3>
                  <b-row>
                    <b-col class="col-lg-3 col-md-4">
                      <b-form-select
                        v-model="selected2"
                        :options="options"
                        class="h-100 w-100 select"
                      ></b-form-select> </b-col
                    ><b-col class="col-lg-9 col-md-7">
                      <b-form-input
                        v-model="result"
                        readonly
                      ></b-form-input></b-col
                  ></b-row>
                </b-col> </b-row></b-card
          ></b-card>
        </b-row>
      </b-card>
      <b-card v-if="changeType" class="container__card">
        <b-row>
          <b-col><h2>Конвертер Валют</h2></b-col>
          <b-card style="background:#018786">
            <b-card>
              <b-row>
                <b-col class="col-sm-12 col-md-5">
                  <h3>{{ GET_VALUTES[this.selected2].Name }}</h3>
                  <b-row
                    ><b-col class="col-lg-3 col-md-4 col-sm-4 col-sm-6">
                      <b-form-select
                        v-model="selected2"
                        :options="options"
                        class="h-100 w-100 select"
                      ></b-form-select>
                    </b-col>
                    <b-col class="col-lg-9 col-md-7 col-sm-6">
                      <b-form-input
                        v-model="number"
                        @keypress="isNumber($event)"
                        placeholder="Введите количество валюты для конвертации"
                      ></b-form-input></b-col
                  ></b-row>
                </b-col>

                <div class="col-lg-1 col-md-1 col-sm-12"
                  ><b-button @click="change"
                    ><b-icon icon="arrow-left-right"/></b-button
                ></div>
                <b-col class="col-sm-12 col-md-5"
                  ><h3>{{ GET_VALUTES[this.selected1].Name }}</h3>
                  <b-row>
                    <b-col class="col-lg-3 col-md-4 col-sm-4 col-sm-6">
                      <b-form-select
                        v-model="selected1"
                        :options="options"
                        class="h-100 w-100 select"
                      ></b-form-select> </b-col
                    ><b-col class="col-lg-9 col-md-7 col-sm-6">
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
    ...mapGetters(["GET_VALUTES"]),
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
<style lang="scss" scoped>
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
  border: 2px solid #018786;
  border-radius: 4px;
}
.converter {
  height: 100vh;
  background-color: #018786;
}
.container {
  padding-top: 30px;
  &__card {
    background-color: #263238;
  }
}
</style>
