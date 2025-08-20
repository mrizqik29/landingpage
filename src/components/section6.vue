<template>
  <section id="film" class="digimon-special">
    <h2 class="section-title">Film Digimon</h2>

    <!-- Grid Film Digimon -->
    <div class="film-grid" ref="gridRef">
      <div
        v-for="(film, index) in specials"
        :key="index"
        class="film-card"
        :class="{ expanded: expandedCard === index }"
      >
        <!-- Gambar -->
        <div class="film-image">
          <img :src="film.image" :alt="film.name" />
        </div>

        <!-- Info -->
        <div class="film-info">
          <h3>{{ film.name }}</h3>

          <!-- Sinopsis -->
          <p>
            <span v-if="expandedCard === index">
              {{ film.desc }}
            </span>
            <span v-else>
              {{ truncateText(film.desc, 160) }}
            </span>
          </p>

          <!-- Partner (Tamer) -->
          <div v-if="expandedCard === index && film.partners.length" class="partners">
            <h4>Partners:</h4>
            <div class="partners-grid">
              <div
                v-for="(partner, pIndex) in getFilmPartners(film.partners)"
                :key="pIndex"
                class="partner-card"
              >
                <img :src="partner.image" :alt="partner.name" />
                <span>{{ partner.name }}</span>
              </div>
            </div>
          </div>

          <!-- Digimons -->
          <div v-if="expandedCard === index && film.digimons?.length" class="digimons">
            <h4>Digimon:</h4>
            <div class="partners-grid">
              <div
                v-for="(digi, dIndex) in getFilmDigimons(film.digimons)"
                :key="dIndex"
                class="partner-card"
              >
                <img :src="digi.image" :alt="digi.name" />
                <span>{{ digi.name }}</span>
              </div>
            </div>
          </div>

          <!-- Tombol Expand -->
          <button
            v-if="film.desc.length > 10"
            @click="toggleExpand(index)"
            class="btn-expand"
          >
            {{ expandedCard === index ? "Tutup" : "Lihat Selengkapnya →" }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const expandedCard = ref(null);
const gridRef = ref(null);

const getFilmPartners = (keys) => partners.filter(p => keys.includes(p.key));
const getFilmDigimons = (keys) => digimon.filter(d => keys.includes(d.key));

const truncateText = (text, length) => text.length <= length ? text : text.substring(0, length) + "...";
const toggleExpand = (index) => expandedCard.value = expandedCard.value === index ? null : index;

onMounted(() => {
  const cards = gridRef.value.querySelectorAll(".film-card");

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
    card.addEventListener("mouseenter", () => gsap.to(card, { scale: 1.05, y: -5, duration: 0.2, ease: "power2.in" }));
    card.addEventListener("mouseleave", () => gsap.to(card, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" }));
  });
});




// Data film Digimon
const specials = [
  {
    name: "Digimon Adventure (1999)",
    image: new URL("@/assets/images/film1.png", import.meta.url).href,
    desc: "Film pendek yang menceritakan awal pertemuan Taichi dan Hikari dengan Koromon yang berevolusi menjadi Greymon untuk melawan Parrotmon. Pertarungan pertama Digimon di dunia nyata ini menjadi awal legenda Digimon Adventure.",
    partners: ["tai", "kari"],
    digimons: ["Agumon", "Gatomon"]
  },
  {
    name: "Digimon Adventure: Our War Game! (2000)",
    image: new URL("@/assets/images/film2.jpg", import.meta.url).href,
    desc: "Sebuah virus Digimon bernama Diablomon menyerang jaringan internet global. Taichi, Yamato, dan teman-teman mereka harus menghadapi ancaman tersebut di dunia digital. Pertarungan epik melahirkan kemunculan pertama Omegamon.",
    partners: ["tai", "matt", "izzy", "sora", "kari"],
    digimons: ["Agumon", "Gabumon", "Tentomon", "Biyomon", "Gatomon"]
  },
  {
    name: "Digimon Adventure 02: Digimon Hurricane Touchdown!! (2000)",
    image: new URL("@/assets/images/film3.png", import.meta.url).href,
    desc: "Wallace kehilangan Digimon kembar yang salah satunya berubah menjadi Cherubimon jahat. Tim DigiDestined dari Jepang dan Amerika bersatu dengan kekuatan Golden Digimentals.",
    partners: ["motomiya", "yolei", "cody", "ken"],
    digimons: ["Veemon", "Hawkmon", "Armadilomon", "Wormmon"]
  },
  {
    name: "Digimon: The Movie (2000)",
    image: new URL("@/assets/images/film4.jpg", import.meta.url).href,
    desc: "Versi internasional gabungan tiga film: Adventure, Our War Game, dan Hurricane Touchdown. Menyajikan kisah Taichi, Yamato, Davis, dan kawan-kawan melawan ancaman digital besar.",
    partners: ["tai", "matt", "kari", "motomiya", "yolei", "cody"],
    digimons: ["Agumon", "Gabumon", "Gatomon", "Veemon", "Hawkmon", "Armadilomon"]
  },
  {
    name: "Digimon Adventure 02: Revenge of Diaboromon (2001)",
    image: new URL("@/assets/images/film5.png", import.meta.url).href,
    desc: "Sekuel Our War Game. Diaboromon kembali dengan ribuan anak digital. Generasi pertama dan kedua DigiDestined bersatu menghentikan ancaman ini.",
    partners: ["tai","matt","sora","izzy","mimi","joe","kari","motomiya","yolei","cody","ken"],
    digimons: ["Agumon","Gabumon","Biyomon","Tentomon","Palmon","Gomamon","Gatomon","Veemon","Hawkmon","Armadilomon","Wormmon"]
  },
  {
    name: "Digimon Tamers: Battle of Adventurers (2001)",
    image: new URL("@/assets/images/film6.png", import.meta.url).href,
    desc: "Takato dan kawan-kawan berlibur ke Okinawa, tapi terganggu oleh ancaman Digimon jahat. Pertarungan seru pun dimulai.",
    partners: ["takato","rika","henry"],
    digimons: ["Guilmon","Renamon","Terriermon"]
  },
  {
    name: "Digimon Tamers: Runaway Locomon (2002)",
    image: new URL("@/assets/images/film7.jpg", import.meta.url).href,
    desc: "Saat ulang tahun Ruki, Locomon muncul dan menyebabkan kekacauan. Para Tamers harus menghentikannya.",
    partners: ["takato","rika","henry"],
    digimons: ["Guilmon","Renamon","Terriermon"]
  },
  {
    name: "Digimon Frontier: Island of Lost Digimon (2002)",
    image: new URL("@/assets/images/film8.png", import.meta.url).href,
    desc: "Para DigiDestined Frontier terjebak di pulau misterius dan menghadapi konflik antar Digimon kuno.",
    partners: ["takuya","koji","zoe","jp","tommy","kimura"],
    digimons: ["Agunimon","Lobomon","Kazemon","Blitzmon","Kumamon"]
  },
  {
    name: "Digital Monster X-Evolution (2005)",
    image: new URL("@/assets/images/film9.png", import.meta.url).href,
    desc: "Film CGI penuh tentang dunia Digital yang dilanda X-Program. Cerita berpusat pada Dorumon.",
    partners: [],
    digimons: [] // mostly Digimon original
  },
  {
    name: "Digimon Savers: Ultimate Power! (2006)",
    image: new URL("@/assets/images/film11.jpg", import.meta.url).href,
    desc: "Marcus dan Agumon menunjukkan kekuatan Burst Mode melawan musuh kuat.",
    partners: ["marcus","thomas","yoshino","keenan"],
    digimons: ["Agumon Starter","Gaomon","Lalamon","Falcomon"]
  },
  {
    name: "Digimon Adventure tri. (2015–2018)",
    image: new URL("@/assets/images/film12.png", import.meta.url).href,
    desc: "Seri film enam bagian. Taichi dan kawan-kawan remaja kembali menghadapi ancaman Digimon terinfeksi.",
    partners: ["tai","matt","sora","izzy","mimi","joe","kari"],
    digimons: ["Agumon","Gabumon","Biyomon","Tentomon","Palmon","Gomamon","Gatomon"]
  },
  {
    name: "Digimon Adventure: Last Evolution Kizuna (2020)",
    image: new URL("@/assets/images/film13.jpg", import.meta.url).href,
    desc: "Kisah terakhir Taichi dan Yamato bersama Agumon dan Gabumon menghadapi Eosmon.",
    partners: ["tai","matt","sora","izzy","mimi","joe","kari"],
    digimons: ["Agumon","Gabumon","Biyomon","Tentomon","Palmon","Gomamon","Gatomon"]
  },
  {
    name: "Digimon Adventure 02: The Beginning (2023)",
    image: new URL("@/assets/images/film14.png", import.meta.url).href,
    desc: "Daisuke dan tim generasi kedua menghadapi misteri kelahiran Digimon pertama di dunia nyata.",
    partners: ["motomiya","yolei","cody","ken"],
    digimons: ["Veemon","Hawkmon","Armadilomon","Wormmon"]
  }
];


const partners = [
  { key: "tai", name: "Tai Kamiya", image: new URL("@/assets/images/tamer3.png", import.meta.url).href },
  { key: "matt", name: "Matt Ishida", image: new URL("@/assets/images/tamer8.png", import.meta.url).href },
  { key: "sora", name: "Sora Takenouchi", image: new URL("@/assets/images/tamer4.png", import.meta.url).href },
  { key: "joe", name: "Joe Kido", image: new URL("@/assets/images/tamer6.png", import.meta.url).href },
  { key: "mimi", name: "Mimi Tachikawa", image: new URL("@/assets/images/tamer5.png", import.meta.url).href },
  { key: "kari", name: "Kari Kamiya", image: new URL("@/assets/images/tamer7.png", import.meta.url).href },
  { key: "izzy", name: "Izzy Izumi", image: new URL("@/assets/images/tamer2.png", import.meta.url).href },
  { key: "motomiya", name: "Motomiya Daisuke", image: new URL("@/assets/images/tamer1.png", import.meta.url).href },
  { key: "yolei", name: "Yolei Inoue", image: new URL("@/assets/images/tamer9.png", import.meta.url).href },
  { key: "cody", name: "Cody Hida", image: new URL("@/assets/images/tamer10.png", import.meta.url).href },
  { key: "ken", name: "Ken Ichijoji", image: new URL("@/assets/images/tamer11.png", import.meta.url).href },
  { key: "takato", name: "Takato Matsuki", image: new URL("@/assets/images/tamer12.png", import.meta.url).href },
  { key: "rika", name: "Rika Nonaka", image: new URL("@/assets/images/tamer13.png", import.meta.url).href },
  { key: "henry", name: "Henry Wong", image: new URL("@/assets/images/tamer14.png", import.meta.url).href },
  { key: "takuya", name: "Takuya Kanbara", image: new URL("@/assets/images/tamer15.png", import.meta.url).href },
  { key: "koji", name: "Koji Minamoto", image: new URL("@/assets/images/tamer16.png", import.meta.url).href },
  { key: "zoe", name: "Zoe Orimoto", image: new URL("@/assets/images/tamer17.png", import.meta.url).href },
  { key: "jp", name: "J.P. Shibayama", image: new URL("@/assets/images/tamer18.png", import.meta.url).href },
  { key: "tommy", name: "Tommy Himi", image: new URL("@/assets/images/tamer19.png", import.meta.url).href },
  { key: "kimura", name: "Koichi Kimura", image: new URL("@/assets/images/tamer20.png", import.meta.url).href },
  { key: "marcus", name: "Marcus Damon", image: new URL("@/assets/images/tamer21.png", import.meta.url).href },
  { key: "thomas", name: "Thomas H", image: new URL("@/assets/images/tamer22.png", import.meta.url).href },
  { key: "yoshino",name: "Yoshino Fujieda", image: new URL("@/assets/images/tamer23.png", import.meta.url).href },
  { key: "keenan", name: "Keenan Crier", image: new URL("@/assets/images/tamer24.png", import.meta.url).href },
  { key: "kudo", name: "Taiki Kudo", image: new URL("@/assets/images/tamer29.png", import.meta.url).href },
  { key: "akari", name: "Akari Hinomoto", image: new URL("@/assets/images/tamer26.png", import.meta.url).href },
  { key: "tsurugi", name: "Zenjirou Tsurugi", image: new URL("@/assets/images/tamer27.png", import.meta.url).href },
  { key: "nene", name: "Nene Amano", image: new URL("@/assets/images/tamer28.png", import.meta.url).href }
];

const digimon = [
  { key :"Agumon" , name: "Agumon", image: new URL("@/assets/images/1.png", import.meta.url).href },
  { key :"Gabumon" , name: "Gabumon", image: new URL("@/assets/images/2.png", import.meta.url).href },
  { key :"Biyomon" , name: "Biyomon", image: new URL("@/assets/images/3.png", import.meta.url).href },
  { key :"Tentomon" , name: "Tentomon", image: new URL("@/assets/images/4.png", import.meta.url).href },
  { key :"Palmon" , name: "Palmon", image: new URL("@/assets/images/5.png", import.meta.url).href },
  { key :"Patamon" , name: "Patamon", image: new URL("@/assets/images/6.png", import.meta.url).href },
  { key :"Gomamon" , name: "Gomamon", image: new URL("@/assets/images/7.png", import.meta.url).href },
  { key :"Gatomon" , name: "Gatomon", image: new URL("@/assets/images/8.png", import.meta.url).href },
  { key :"Veemon" , name: "Veemon", image: new URL("@/assets/images/9.png", import.meta.url).href },
  { key :"Hawkmon" , name: "Hawkmon", image: new URL("@/assets/images/10.png", import.meta.url).href },
  { key :"Guilmon" , name: "Guilmon", image: new URL("@/assets/images/guilmon.png", import.meta.url).href },
  { key :"Renamon" , name: "Renamon", image: new URL("@/assets/images/renamon.png", import.meta.url).href },
  { key :"Terriermon" , name: "Terriermon", image: new URL("@/assets/images/terriermon.png", import.meta.url).href },
  { key :"Armadilomon" , name: "Armadilomon", image: new URL("@/assets/images/11.png", import.meta.url).href },
  { key :"Wormmon" , name: "Wormmon", image: new URL("@/assets/images/12.png", import.meta.url).href },
  { key :"Agumon Starter" , name: "Agumon", image: new URL("@/assets/images/Agumon.png", import.meta.url).href },
  { key :"Gaomon" , name: "Gaomon", image: new URL("@/assets/images/Gaomon.png", import.meta.url).href },
  { key :"Lalamon" , name: "Lalamon", image: new URL("@/assets/images/Lalamon.png", import.meta.url).href },
  { key :"Falcomon" , name: "Falcomon", image: new URL("@/assets/images/Falcomon.png", import.meta.url).href },
  { key :"Shoutmon" , name: "Shoutmon", image: new URL("@/assets/images/Shoutmon.png", import.meta.url).href },
  { key :"Starmons" , name: "Starmons", image: new URL("@/assets/images/Starmons.png", import.meta.url).href },
  { key :"Ballistamon" , name: "Ballistamon", image: new URL("@/assets/images/Ballistamon.png", import.meta.url).href },
  { key :"Sparrowmon" , name: "Sparrowmon", image: new URL("@/assets/images/Sparrowmon.png", import.meta.url).href },
  { key :"Agunimon" , name: "Agunimon", image: new URL("@/assets/images/agunimon.png", import.meta.url).href },
  { key :"Lobomon" , name: "Lobomon", image: new URL("@/assets/images/lobomon.png", import.meta.url).href },
  { key :"Kazemon" , name: "Kazemon", image: new URL("@/assets/images/kazemon.png", import.meta.url).href },
  { key :"Blitzmon" , name: "Blitzmon", image: new URL("@/assets/images/blitzmon.png", import.meta.url).href },
  { key :"Kumamon" , name: "Kumamon", image: new URL("@/assets/images/kumamon.png", import.meta.url).href }
];
</script>