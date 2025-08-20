<template>
  <section id="game" class="digimon-special fade-in">
    <h2 class="section-title">Game Digimon</h2>

    <!-- Grid Game Digimon -->
    <div class="game-grid"  ref="gridRef">
      <a
        v-for="(game, index) in specials"
        :key="index"
        :href="game.link"
        target="_blank"
        rel="noopener noreferrer"
        class="game-card"
      >
      <div class="game-image">
        <img :src="game.image" :alt="game.name" />
      </div>
        <div class="game-info">
          <h3>{{ game.name }}</h3>
          <p>{{ game.desc }}</p>
        </div>
      </a>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const expandedCard = ref(null);
const gridRef = ref(null);

gsap.registerPlugin(ScrollTrigger);

// Data Game Digimon dengan beberapa gambar lokal
const specials = [
  {
    name: "Digimon World (PS1)",
    image: new URL("@/assets/images/game1.jpg", import.meta.url).href,
    desc: "RPG klasik di PS1 yang memperkenalkan pemain ke dunia digital dengan peliharaan Digimon yang bisa dilatih dan dikembangkan.",
    link: "https://coolrom.com.au/roms/psx/39032/Digimon_World.php"
  },
  {
    name: "Digimon World 2 (PS1)",
    image: new URL("@/assets/images/game4.png", import.meta.url).href,
    desc: "RPG dengan dungeon-crawling, strategi pertarungan, dan pengumpulan Digimon untuk menjelajahi dunia digital yang lebih kompleks.",
    link: "https://coolrom.com.au/roms/psx/38694/Digimon_World_2.php"
  },
  {
    name: "Digimon World 3 (PS1)",
    image: new URL("@/assets/images/game3.jpg", import.meta.url).href,
    desc: "RPG turn-based dengan cerita mendalam, pertarungan Digimon, dan misi yang menantang di dunia digital.",
    link: "https://coolrom.com.au/roms/psx/39278/Digimon_World_3.php"
  },
  {
    name: "Digimon World 4 (PS2)",
    image: new URL("@/assets/images/game6.jpg", import.meta.url).href,
    desc: "Action RPG dengan gameplay co-op, dungeon exploration, dan pertarungan real-time melawan musuh digital.",
    link: "https://coolrom.com.au/roms/ps2/41869/Digimon_World_4.php"
  },
  {
    name: "Digimon Rumble Arena 2 (PS2)",
    image: new URL("@/assets/images/game2.jpg", import.meta.url).href,
    desc: "Game fighting seru dengan kontrol cepat dan berbagai karakter Digimon favorit untuk bertarung di arena.",
    link: "https://coolrom.com.au/roms/ps2/42026/Digimon_Rumble_Arena_2.php"
  },
  {
    name: "Digimon World: Next Order (PC - Steam)",
    image: new URL("@/assets/images/digimon4.jpg", import.meta.url).href,
    desc: "Raising simulation dan petualangan RPG, di mana pemain melatih Digimon, membangun hubungan, dan menjelajahi dunia digital luas.",
    link: "https://store.steampowered.com/app/1530160/Digimon_World_Next_Order/"
  },
  {
    name: "Digimon Story Cyber Sleuth (PC - Steam)",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/1042550/header.jpg",
    desc: "RPG modern dengan grafis menawan, investigasi misteri digital, dan ratusan Digimon untuk ditangkap dan dilatih.",
    link: "https://store.steampowered.com/app/1042550/Digimon_Story_Cyber_Sleuth_Complete_Edition/"
  },
  {
    name: "Digimon Survive (PC - Steam)",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/871980/header.jpg",
    desc: "Visual novel bercampur strategi turn-based dengan cerita gelap dan pilihan yang memengaruhi nasib Digimon dan manusia.",
    link: "https://store.steampowered.com/app/871980/Digimon_Survive/"
  },
  {
    name: "Digimon Story Time Stranger (PC - Steam)",
    image: new URL("@/assets/images/game5.jpg", import.meta.url).href,
    desc: "Gabungan visual novel dan strategi turn-based, mengajak pemain menjelajahi misteri dunia digital sambil melatih Digimon.",
    link: "https://store.steampowered.com/app/1984270/Digimon_Story_Time_Stranger/"
  }
];


// Animasi scroll
onMounted(() => {
  const cards = gridRef.value.querySelectorAll(".game-card");

  // Set posisi awal semua card
  gsap.set(cards, { y: 80, opacity: 0, scale: 0.95, rotate: -1, skewY: 2 });

  // ScrollTrigger batch untuk performa lebih baik
  ScrollTrigger.batch(cards, {
    start: "top 95%",
    end: "bottom 5%",
    onEnter: batch => {
      gsap.to(batch, {
        y: 0,
        opacity: 1,
        scale: 1,
        rotate: 0,
        skewY: 0,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.1
      });
    },
    onLeave: batch => {
      gsap.to(batch, {
        y: 80,
        opacity: 0,
        scale: 0.95,
        rotate: -1,
        skewY: 2,
        duration: 0.5,
        ease: "power3.in",
        stagger: 0.05
      });
    },
    onEnterBack: batch => {
      gsap.to(batch, {
        y: 0,
        opacity: 1,
        scale: 1,
        rotate: 0,
        skewY: 0,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.1
      });
    },
    onLeaveBack: batch => {
      gsap.to(batch, {
        y: 80,
        opacity: 0,
        scale: 0.95,
        rotate: -1,
        skewY: 2,
        duration: 0.5,
        ease: "power3.in",
        stagger: 0.05
      });
    },
  });

  // Hover sederhana tanpa event listener berat
  cards.forEach(card => {
    card.addEventListener("mouseenter", () => gsap.to(card, { scale: 1.05, y: 10, duration: 0.2, ease: "power2.in" }));
    card.addEventListener("mouseleave", () => gsap.to(card, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" }));
  });
});
</script>
