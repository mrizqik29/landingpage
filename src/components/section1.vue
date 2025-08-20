<template>
  <section id="section1" class="hero-section fade-in hero-bg">
    <div class="hero-content">
      <h1>Welcome to Digimon World</h1>
      <p>
        Jelajahi dunia digital bersama para Digimon favoritmu, temukan kekuatan,
        persahabatan, dan petualangan tak terlupakan!
      </p>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  gsap.fromTo(
    ".fade-in",
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ".fade-in",
        start: "top 85%",
        toggleActions: "play none none none"
      }
    }
  );
});
</script>

<style scoped>
/* Kosong, styling ada di main.scss */
</style>
