<template>
  <section id="specials" class="digimon-special fade-in">
    <h2 class="section-title">Digimon Special</h2>

    <!-- Royal Knights -->
    <h3 class="category-title">Royal Knights</h3>
    <div class="special-grid">
      <div v-for="(digimon, index) in royalKnights" :key="index" class="special-card">
        <div class="image-wrapper">
          <img :src="digimon.image" :alt="digimon.name" />
          <div class="glow"></div>
        </div>
        <div class="special-info">
          <h4>{{ digimon.name }}</h4>
          <p>{{ digimon.desc }}</p>
        </div>
      </div>
    </div>

    <!-- Seven Demon Lords -->
    <h3 class="category-title">Seven Demon Lords</h3>
    <div class="special-grid">
      <div v-for="(digimon, index) in demonLords" :key="index" class="special-card">
        <div class="image-wrapper">
          <img :src="digimon.image" :alt="digimon.name" />
          <div class="glow"></div>
        </div>
        <div class="special-info">
          <h4>{{ digimon.name }}</h4>
          <p>{{ digimon.desc }}</p>
        </div>
      </div>
    </div>

    <!-- Omegamon Evolution -->
    <h3 class="category-title">Omegamon Evolution</h3>
    <div class="special-grid">
      <div v-for="(digimon, index) in omegamonEvolutions" :key="index" class="special-card">
        <div class="image-wrapper">
          <img :src="digimon.image" :alt="digimon.name" />
          <div class="glow"></div>
        </div>
        <div class="special-info">
          <h4>{{ digimon.name }}</h4>
          <p>{{ digimon.desc }}</p>
        </div>
      </div>
    </div>

    <!-- Four Holy Beast -->
    <h3 class="category-title">Four Holy Beast</h3>
    <div class="special-grid">
      <div v-for="(digimon, index) in fourHoly" :key="index" class="special-card">
        <div class="image-wrapper">
          <img :src="digimon.image" :alt="digimon.name" />
          <div class="glow"></div>
        </div>
        <div class="special-info">
          <h4>{{ digimon.name }}</h4>
          <p>{{ digimon.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, nextTick } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);



const royalKnights = [
  { name: "Alphamon", image: new URL("@/assets/images/leg1.png", import.meta.url).href, desc: "Pemimpin misterius Royal Knights. Jarang turun tangan kecuali saat dunia benar-benar terancam." },
  { name: "Craniummon", image: new URL("@/assets/images/leg2.png", import.meta.url).href, desc: "Ksatria baja dengan perisai 'Avalon' yang hampir tak bisa dihancurkan." },
  { name: "Gallantmon", image: new URL("@/assets/images/leg3.png", import.meta.url).href, desc: "Dikenal sebagai Dukemon. Menjunjung tinggi keadilan dengan tombak 'Gram' dan perisai 'Aegis'." },
  { name: "Crusadermon", image: new URL("@/assets/images/leg4.png", import.meta.url).href, desc: "Ksatria elegan namun licik. Selalu setia melindungi Royal Knights." },
  { name: "Magnamon", image: new URL("@/assets/images/leg5.png", import.meta.url).href, desc: "Digimon zirah emas hasil kekuatan Digimental of Miracles." },
  { name: "Jesmon", image: new URL("@/assets/images/leg6.png", import.meta.url).href, desc: "Anggota termuda Royal Knights, ditemani tiga naga kecil pendukungnya." },
  { name: "Omegamon", image: new URL("@/assets/images/leg7.png", import.meta.url).href, desc: "Fusion dari WarGreymon dan MetalGarurumon. Menggunakan pedang 'Grey Sword' dan meriam 'Garuru Cannon'." },
  { name: "UlforceVeedramon", image: new URL("@/assets/images/leg8.png", import.meta.url).href, desc: "Royal Knight tercepat berkat kekuatan 'Ulforce' yang juga memberi kemampuan penyembuhan." },
  { name: "Examon", image: new URL("@/assets/images/leg9.png", import.meta.url).href, desc: "Raksasa bersayap naga dengan pedang-sayap 'Caledfwlch'." },
  { name: "Duftmon", image: new URL("@/assets/images/leg10.png", import.meta.url).href, desc: "Ahli strategi Royal Knights. Setiap gerakannya penuh perhitungan." },
  { name: "Dynasmon", image: new URL("@/assets/images/leg11.png", import.meta.url).href, desc: "Ksatria bersayap naga. Serangan 'Dragon’s Roar'-nya memanggil kekuatan naga kuno." },
  { name: "Sleipmon", image: new URL("@/assets/images/leg12.png", import.meta.url).href, desc: "Ksatria berkuda legendaris dengan busur es 'Mjolnir Bow'." },
];

const demonLords = [
  { name: "Beelzemon", image: new URL("@/assets/images/demon1.png", import.meta.url).href, desc: "Demon Lord Iri. Digimon biker bersenjata dua pistol 'Berenjena'." },
  { name: "Belphemon", image: new URL("@/assets/images/demon2.png", import.meta.url).href, desc: "Demon Lord Kemalasan. Dalam 'Sleep Mode' terlihat tertidur, berubah buas di 'Rage Mode'." },
  { name: "Daemon", image: new URL("@/assets/images/demon3.png", import.meta.url).href, desc: "Demon Lord Amarah. Penguasa kegelapan dengan kekuatan neraka digital." },
  { name: "Leviamon", image: new URL("@/assets/images/demon4.png", import.meta.url).href, desc: "Demon Lord Rakus. Naga laut purba yang disebut mampu menelan seluruh dunia digital." },
  { name: "Lucemon", image: new URL("@/assets/images/demon5.png", import.meta.url).href, desc: "Mantan malaikat muda yang jatuh ke kegelapan. Mewakili dosa Kesombongan." },
  { name: "Lucemon Satan Mode", image: new URL("@/assets/images/demon6.png", import.meta.url).href, desc: "Wujud sejati Lucemon setelah jatuh. Kekuatan destruktifnya ditakuti semua Digimon." },
  { name: "Lilithmon", image: new URL("@/assets/images/demon7.png", import.meta.url).href, desc: "Demon Lord Nafsu. Anggun namun mematikan, menggunakan racun dan serangan magis." },
];

const omegamonEvolutions = [
  { name: "Omegamon Alter-B", image: new URL("@/assets/images/omega1.png", import.meta.url).href, desc: "Versi alternatif Omegamon dengan pengaruh BlitzGreymon. Lebih fokus pada serangan langsung." },
  { name: "Omegamon Alter-S", image: new URL("@/assets/images/omega2.png", import.meta.url).href, desc: "Hasil gabungan berbeda dari WarGreymon dan MetalGarurumon. Spesialisasi serangan energi." },
  { name: "Omegamon-X", image: new URL("@/assets/images/omega3.png", import.meta.url).href, desc: "Versi X-Antibody. Lebih cepat, kuat, dan tahan terhadap kegelapan." },
  { name: "Omegamon Zwart-D", image: new URL("@/assets/images/omega4.png", import.meta.url).href, desc: "Omegamon kegelapan yang berorientasi pada penghancuran total." },
  { name: "Omegamon Zwart", image: new URL("@/assets/images/omega5.png", import.meta.url).href, desc: "Lahir dari keputusasaan. Memakai kekuatan kegelapan dengan brutal." },
  { name: "Omegamon Merciful Mode", image: new URL("@/assets/images/omega6.png", import.meta.url).href, desc: "Wujud cahaya murni Omegamon, muncul untuk mengakhiri pertempuran dengan damai." },
];

const fourHoly = [
  { name: "Qinglongmon", image: new URL("@/assets/images/beast1.png", import.meta.url).href, desc: "Naga biru penjaga timur. Melambangkan kekuatan langit dan keadilan." },
  { name: "Baihumon", image: new URL("@/assets/images/beast2.png", import.meta.url).href, desc: "Harimau putih penjaga barat. Tubuhnya tak dapat ditembus oleh serangan biasa." },
  { name: "Zhuqiaomon", image: new URL("@/assets/images/beast3.png", import.meta.url).href, desc: "Burung phoenix merah penjaga selatan. Digimon yang identik dengan api dan kehancuran." },
  { name: "Xuanwumon", image: new URL("@/assets/images/beast4.png", import.meta.url).href, desc: "Penjaga utara berwujud kura-kura dan ular hitam. Simbol perlindungan dan ketahanan." },
  { name: "Huanglongmon", image: new URL("@/assets/images/beast5.png", import.meta.url).href, desc: "Naga emas pusat dunia digital. Digimon legendaris yang melampaui Four Holy Beasts." },
];

onMounted(async () => {
  await nextTick();
  const cards = document.querySelectorAll(".special-card");

  cards.forEach((card, index) => {
    const imageWrapper = card.querySelector(".image-wrapper");
    const glow = imageWrapper.querySelector(".glow");
    const info = card.querySelector(".special-info");

    // Scroll-triggered entrance animation (lebih ringan)
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 95%",
        end: "bottom 5%",
        toggleActions: "play reverse play reverse",
      },
      opacity: 0,
      y: 60,             // dikurangi jaraknya
      rotationY: 180,    // dikurangi putaran
      duration: 0.5,
      ease: "power1.out",
      delay: index * 0.05 // lebih cepat
    });

    // Hover animations menggunakan satu timeline reusable
    const hoverTl = gsap.timeline({ paused: true });

    hoverTl.to(imageWrapper, { scale: 1.2, duration: 0.3, ease: "power2.out" }, 0);
    hoverTl.to(glow, { opacity: 1, duration: 0.2 }, 0);
    hoverTl.to(card, { boxShadow: "0px 15px 30px rgba(0,0,0,0.3)", duration: 0.3 }, 0);
    hoverTl.to(info, { height: 120, padding: 15, duration: 0.3, ease: "power2.out" }, 0);

    card.addEventListener("mouseenter", () => hoverTl.play());
    card.addEventListener("mouseleave", () => hoverTl.reverse());
  });
});

</script>
