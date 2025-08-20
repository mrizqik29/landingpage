<template>
  <div id="app">

    <Song/>
    <!-- Header -->
    <SiteHeader />

    <!-- Hero Section -->
    <Section1 />

    <!-- Digimon Partner -->
    <Section2 />
    <Section5 />

    <Section4/>
    <!-- Digimon Partner -->
    <Section6 />
    <!-- Legendary Digimon -->
    <Section3 />

    <!-- Footer -->
    <SiteFooter />
  </div>
</template>

<script setup>
// Import komponen
import SiteHeader from "@/components/header.vue";
import Section1 from "@/components/section1.vue";
import Section2 from "@/components/section2.vue";
import Section3 from "@/components/section3.vue";
import Section4 from "@/components/section4.vue";
import Section5 from "./components/section5.vue";
import Section6 from "./components/section6.vue";
import SiteFooter from "@/components/footer.vue";
import Song from "./components/song.vue";




</script>

<style lang="scss">
@import "@/assets/styles/main.scss"; // Import styling utama
</style>
