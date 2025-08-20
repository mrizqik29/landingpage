<template>
  <header class="site-header">
    <div class="logo">
      <img src="@/assets/images/1.png" alt="Digivice Logo" />
      <span>Digimon World</span>
    </div>
    <nav>
      <ul>
        <li><a href="#section1">Home</a></li>
        <!-- <li><a href="#partners">Partners</a></li> -->
        <li><a href="#game">Game</a></li>
        <li><a href="#film">Film</a></li>
        <li><a href="#specials">Digimon Special</a></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

onMounted(() => {
  const links = document.querySelectorAll(".site-header nav a");

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetEl = document.querySelector(targetId);

      if (targetEl) {
        gsap.to(window, {
          duration: 1,            // durasi scroll
          scrollTo: {
            y: targetEl,          // scroll ke elemen target
            offsetY: 70            // offset jika header fixed
          },
          ease: "power2.inOut"    // smooth easing
        });
      }
    });
  });
});
</script>
