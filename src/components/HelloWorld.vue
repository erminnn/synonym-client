<template>
  <div class="home" style="background-color: red">
    <div class="p-col-8" style="background-color: green">
      <Dropdown
        v-model="selectedCity"
        :options="cities"
        optionLabel="name"
        placeholder="Select a City"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      selectedCity: null,
      cities: [
        { name: "New York", code: "NY" },
        { name: "Rome", code: "RM" },
        { name: "London", code: "LDN" },
        { name: "Istanbul", code: "IST" },
        { name: "Paris", code: "PRS" },
      ],
    };
  },
};
</script>
