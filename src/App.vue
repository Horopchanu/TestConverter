<template>
  <div id="app">
    <div id="nav">
      <router-link to="/" class="nav__item">Список Валют</router-link>
      <router-link to="/converter" class="nav__item">Конвертер</router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["getValutesApi"]),
  },
  async created() {
    await this.getValutesApi();
  },
};
</script>
<style lang="scss" scoped>
#app {
}
#nav {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #17a2b8;
  padding-top: 20px;
  padding-bottom: 20px;
}
.nav__item {
  margin-right: 30px;
  text-decoration: none;
  font-size: 20px;
  font-weight: 700;
  border-bottom: 2px solid #cef33e;
  color: white;
  &:last-child {
    margin-right: 0;
  }
}
</style>
