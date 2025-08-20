<template>
  <section id="partners" class="digimon-gallery">
    <h2 class="section-title">Tamer Partner</h2>
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
  { name: "Izzy Izumi", image: new URL("@/assets/images/tamer2.png", import.meta.url).href },
  { name: "Tai Kamiya", image: new URL("@/assets/images/tamer3.png", import.meta.url).href },
  { name: "Sora Takenouchi", image: new URL("@/assets/images/tamer4.png", import.meta.url).href },
  { name: "Mimi Tachikawa", image: new URL("@/assets/images/tamer5.png", import.meta.url).href },
  { name: "Joe Kido", image: new URL("@/assets/images/tamer6.png", import.meta.url).href },
  { name: "Kari Kamiya", image: new URL("@/assets/images/tamer7.png", import.meta.url).href },
  { name: "Matt Ishida", image: new URL("@/assets/images/tamer8.png", import.meta.url).href },
  { name: "Motomiya Daisuke", image: new URL("@/assets/images/tamer1.png", import.meta.url).href },
  { name: "Yolei Inoue", image: new URL("@/assets/images/tamer9.png", import.meta.url).href },
  { name: "Cody Hida", image: new URL("@/assets/images/tamer10.png", import.meta.url).href },
  { name: "Ken Ichijoji", image: new URL("@/assets/images/tamer11.png", import.meta.url).href },
  { name: "Takato Matsuki", image: new URL("@/assets/images/tamer12.png", import.meta.url).href },
  { name: "Rika Nonaka", image: new URL("@/assets/images/tamer13.png", import.meta.url).href },
  { name: "Henry Wong", image: new URL("@/assets/images/tamer14.png", import.meta.url).href },
  { name: "Takuya Kanbara", image: new URL("@/assets/images/tamer15.png", import.meta.url).href },
  { name: "Koji Minamoto", image: new URL("@/assets/images/tamer16.png", import.meta.url).href },
  { name: "Zoe Orimoto", image: new URL("@/assets/images/tamer17.png", import.meta.url).href },
  { name: "J.P. Shibayama", image: new URL("@/assets/images/tamer18.png", import.meta.url).href },
  { name: "Tommy Himi", image: new URL("@/assets/images/tamer19.png", import.meta.url).href },
  { name: "Koichi Kimura", image: new URL("@/assets/images/tamer20.png", import.meta.url).href },
  { name: "Marcus Damon", image: new URL("@/assets/images/tamer21.png", import.meta.url).href },
  { name: "Thomas H", image: new URL("@/assets/images/tamer22.png", import.meta.url).href },
  { name: "Yoshino Fujieda", image: new URL("@/assets/images/tamer23.png", import.meta.url).href },
  { name: "Keenan Crier", image: new URL("@/assets/images/tamer24.png", import.meta.url).href },
  { name: "Taiki Kudo", image: new URL("@/assets/images/tamer29.png", import.meta.url).href },
  { name: "Akari Hinomoto", image: new URL("@/assets/images/tamer26.png", import.meta.url).href },
  { name: "Zenjirou Tsurugi", image: new URL("@/assets/images/tamer27.png", import.meta.url).href },
  { name: "Nene Amano", image: new URL("@/assets/images/tamer28.png", import.meta.url).href }
];

function optimizedName(name) {
  if (name.includes("(")) return name.split("(")[0].trim();
  if (name.length > 20) return name.slice(0, 12) + "...";
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
      rotation -= 0.08; // speed rotasi
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
  /* background: rgba(0, 0, 0, 0.85); */
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
