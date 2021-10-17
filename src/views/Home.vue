<template>
  <div class="home">
    <b-container class="container">
      <b-card bg-variant="primary">
        <h1>Список валют</h1>
        <b-form-input v-model="search" />

        <b-row class="justify-content-between mt-5">
          <b-card
            v-for="val in searchHandler"
            :key="val.id"
            class="col-lg-5 mb-3"
            bg-variant="info  "
          >
            <b-card>
              <b-row v-if="!changeType">
                <h2 class="title-valute">{{ val.Name }}</h2>
                <b-col class="col-lg-3">
                  <p>1 {{ val.CharCode }}</p>
                </b-col>
                <b-col class="col-lg-2">
                  <b-button @click="change"
                    ><b-icon icon="arrow-left-right"
                  /></b-button>
                </b-col>
                <b-col class="col-lg-4">
                  <p>{{ val.Value / val.Nominal }} RUB</p>
                </b-col>
                <b-col class="col-lg-3"
                  ><b-row>
                    <b-col class="col-lg-3"
                      ><div
                        v-if="
                          val.Value / val.Nominal > val.Previous / val.Nominal
                        "
                      >
                        <b-icon-arrow-up></b-icon-arrow-up>
                      </div>
                      <div v-else><b-icon-arrow-down></b-icon-arrow-down></div
                    ></b-col>
                    <b-col
                      class="col-lg-9"
                      :class="
                        val.Value / val.Nominal > val.Previous / val.Nominal
                          ? 'green'
                          : 'red'
                      "
                      >{{
                        (
                          val.Value / val.Nominal -
                          val.Previous / val.Nominal
                        ).toFixed(4)
                      }}</b-col
                    >
                  </b-row>
                </b-col>
              </b-row>
              <b-row v-else>
                <h2 class="title-valute">{{ val.Name }}</h2>
                <b-col class="col-lg-3">
                  <p>1 RUB</p>
                </b-col>
                <b-col class="col-lg-2">
                  <b-button @click="change"
                    ><b-icon icon="arrow-left-right"
                  /></b-button>
                </b-col>

                <b-col class="col-lg-4">
                  <p>
                    {{ (1 / (val.Value / val.Nominal)).toFixed(4) }}
                    {{ val.CharCode }}
                  </p>
                </b-col>
                <b-col class="col-lg-3"
                  ><b-row>
                    <b-col class="col-lg-3"
                      ><div
                        v-if="
                          1 / (val.Value / val.Nominal) >
                            1 / (val.Previous / val.Nominal)
                        "
                      >
                        <b-icon-arrow-up></b-icon-arrow-up>
                      </div>
                      <div v-else><b-icon-arrow-down></b-icon-arrow-down></div
                    ></b-col>
                    <b-col
                      class="col-lg-9 "
                      :class="
                        1 / (val.Value / val.Nominal) >
                        1 / (val.Previous / val.Nominal)
                          ? 'green'
                          : 'red'
                      "
                      >{{
                        (
                          1 / (val.Value / val.Nominal) -
                          1 / (val.Previous / val.Nominal)
                        ).toFixed(4)
                      }}</b-col
                    >
                  </b-row>
                </b-col>
              </b-row>
            </b-card>
          </b-card>
        </b-row>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      search: "",
      changeType: false,
    };
  },
  computed: {
    ...mapGetters(["GET_VALUTES"]),
    searchHandler() {
      return Object.values(this.GET_VALUTES).filter((el) => {
        return el.CharCode.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  methods: {
    change() {
      this.changeType = !this.changeType;
    },
  },
  components: {},
};
</script>
<style scoped>
.container {
  padding-top: 30px;
  min-height: 100vh;
}
ul {
  list-style-type: none;
}
.green {
  color: green;
}
.red {
  color: red;
}
h1 {
  text-align: center;
  color: whitesmoke;
  font-size: 32px;
}
h2 {
  font-size: 16px;
  color: #d2d2d2;
}
p {
  text-align: left;
  color: #555555;
}
.title-valute {
  text-align: left;
}
.home {
  height: 100%;
  background-color: #0dcaf0;
}
</style>
