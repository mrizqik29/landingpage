<template>
  <section id="partners" class="digimon-gallery">
    <h2 class="section-title">Digimon Partner</h2>
    <div class="gallery-wrapper">
      <div class="gallery-track" ref="track">
        <div
          v-for="(digimon, index) in partners"
          :key="digimon.name"
          class="digimon-card"
        >
          <div class="image-wrapper">
            <img :src="digimon.image" :alt="digimon.name" loading="lazy" />
          </div>
          <h4>{{ optimizedName(digimon.name) }}</h4>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import gsap from "gsap";

const partners = [
  { name: "Agumon", image: new URL("@/assets/images/1.png", import.meta.url).href },
  { name: "Gabumon", image: new URL("@/assets/images/2.png", import.meta.url).href },
  { name: "Biyomon", image: new URL("@/assets/images/3.png", import.meta.url).href },
  { name: "Tentomon", image: new URL("@/assets/images/4.png", import.meta.url).href },
  { name: "Palmon", image: new URL("@/assets/images/5.png", import.meta.url).href },
  { name: "Patamon", image: new URL("@/assets/images/6.png", import.meta.url).href },
  { name: "Gomamon", image: new URL("@/assets/images/7.png", import.meta.url).href },
  { name: "Gatomon", image: new URL("@/assets/images/8.png", import.meta.url).href },
  { name: "Veemon", image: new URL("@/assets/images/9.png", import.meta.url).href },
  { name: "Hawkmon", image: new URL("@/assets/images/10.png", import.meta.url).href },
  { name: "Guilmon", image: new URL("@/assets/images/guilmon.png", import.meta.url).href },
  { name: "Renamon", image: new URL("@/assets/images/renamon.png", import.meta.url).href },
  { name: "Terriermon", image: new URL("@/assets/images/terriermon.png", import.meta.url).href },
  { name: "Armadilomon", image: new URL("@/assets/images/11.png", import.meta.url).href },
  { name: "Wormmon", image: new URL("@/assets/images/12.png", import.meta.url).href },
  { name: "Agumon", image: new URL("@/assets/images/Agumon.png", import.meta.url).href },
  { name: "Gaomon", image: new URL("@/assets/images/Gaomon.png", import.meta.url).href },
  { name: "Lalamon", image: new URL("@/assets/images/Lalamon.png", import.meta.url).href },
  { name: "Falcomon", image: new URL("@/assets/images/Falcomon.png", import.meta.url).href },
  { name: "Shoutmon", image: new URL("@/assets/images/Shoutmon.png", import.meta.url).href },
  { name: "Starmons", image: new URL("@/assets/images/Starmons.png", import.meta.url).href },
  { name: "Ballistamon", image: new URL("@/assets/images/Ballistamon.png", import.meta.url).href },
  { name: "Sparrowmon", image: new URL("@/assets/images/Sparrowmon.png", import.meta.url).href },
  { name: "Agunimon", image: new URL("@/assets/images/agunimon.png", import.meta.url).href },
  { name: "Lobomon", image: new URL("@/assets/images/lobomon.png", import.meta.url).href },
  { name: "Kazemon", image: new URL("@/assets/images/kazemon.png", import.meta.url).href },
  { name: "Blitzmon", image: new URL("@/assets/images/blitzmon.png", import.meta.url).href },
  { name: "Kumamon", image: new URL("@/assets/images/kumamon.png", import.meta.url).href }
];

function optimizedName(name) {
  if (name.includes("(")) return name.split("(")[0].trim();
  if (name.length > 12) return name.slice(0, 12) + "...";
  return name;
}

const track = ref(null);
let animation = null;
let radius = 1000;
let rotation = 0;
const angleStep = 360 / partners.length;

// 🔹 Atur radius responsif
function setRadius() {
  if (window.innerWidth <= 480) radius = 600;
  else if (window.innerWidth <= 768) radius = 800;
  else if (window.innerWidth <= 1200) radius = 1000;
  else radius = 1200;
}

// 🔹 Update posisi tiap kartu
function updatePositions() {
  const cards = track.value.children;
  for (let i = 0; i < cards.length; i++) {
    const angle = i * angleStep + rotation;
    const rad = (angle * Math.PI) / 180;

    const z = Math.cos(rad) * radius;
    const x = Math.sin(rad) * radius;

    const scale = 0.6 + ((z + radius) / (3 * radius));
    const opacity = 0.1 + ((z + radius) / (2 * radius));

    const card = cards[i];
    gsap.set(card, {
      x: x,
      z: z,
      y: -20,
      scale,
      opacity,
      zIndex: Math.round(z)
    });
  }
}

function handleResize() {
  setRadius();
  updatePositions();
}

onMounted(async () => {
  await nextTick();
  setRadius();
  updatePositions();

  animation = gsap.to({}, {
    duration: 5,
    repeat: -1,
    ease: "linear",
    onUpdate: () => {
      rotation += 0.08; // speed rotasi
      updatePositions();
    }
  });

  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  if (animation) animation.kill();
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
.digimon-gallery {
  padding-bottom: 2rem;
  text-align: center;
  overflow: hidden;
  perspective: 1200px;
}

.section-title {
  padding-bottom: 4rem;
  font-size: clamp(1.5rem, 4vw, 2.2rem);
  margin-bottom: 4rem;
  color: #ffcb05;
}

.gallery-wrapper {
  overflow: visible;
  width: 100%;
}

.gallery-track {
  position: relative;
  transform-style: preserve-3d;
  display: flex;
  justify-content: center;
  align-items: center;
}

.digimon-card {
  position: absolute;
  /* Responsive: lebar antara 80px (HP) sampai 140px (desktop) */
  width: clamp(80px, 12vw, 140px);
  height: clamp(110px, 18vw, 180px);
  border-radius: 1rem;
  padding: clamp(0.4rem, 1vw, 0.8rem);
  text-align: center;
  transition: transform 0.3s ease;
}

.image-wrapper {
  width: 100%;
  height: 70%; /* gambar isi 70% dari card */
  border-radius: 0.8rem;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

h4 {
  margin-top: 0.4rem;
  font-size: clamp(0.6rem, 1.5vw, 0.9rem);
  color: #fff;
  line-height: 1.2;
}

</style>
