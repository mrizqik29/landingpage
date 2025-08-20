<template>
  <!-- Floating Player -->
  <div
    class="floating-player"
    v-if="currentSong"
    ref="floatingPlayer"
    style=" overflow:hidden; padding:10px;"
  >
    <!-- Info (judul & artist) -->
    <div class="info" ref="songInfo" style="flex:1; overflow:hidden; white-space:nowrap;">
      <h4>{{ currentSong.title }}</h4>
      <p>{{ currentSong.artist }}</p>
    </div>

    <!-- Controls tetap -->
    <div class="controls" style="display:flex; gap:10px; flex-shrink:0;">
      <button @click="prevSong" ref="prevBtn">
        <SkipBack class="icon" />
      </button>

      <button @click="togglePlay" ref="playBtn">
        <component :is="isPlaying ? Pause : Play" class="icon" />
      </button>

      <button @click="nextSong" ref="nextBtn">
        <SkipForward class="icon" />
      </button>
    </div>
  </div>

  <!-- Hidden YouTube Player -->
  <div ref="youtubePlayer" class="youtube-player"></div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { Play, Pause, SkipBack, SkipForward } from "lucide-vue-next";
import gsap from "gsap";

// --- Songs ---
const songs = [
  { title: "Butterfly", artist: "Digimon Adventure 1", youtubeId: "akLOpGE6nbI", cover: "" },
  { title: "Brave Heart", artist: "Digimon Adventure 02", youtubeId: "bjO_MIVLQcE", cover: "" }
];

const currentIndex = ref(0);
const currentSong = ref(songs[currentIndex.value]);
const youtubePlayer = ref(null);
const floatingPlayer = ref(null);
const songInfo = ref(null);
const prevBtn = ref(null);
const playBtn = ref(null);
const nextBtn = ref(null);

let player = null;
const isPlaying = ref(false);

// --- Tombol animasi ---
const animateButton = (btn) => {
  gsap.fromTo(
    btn,
    { scale: 0.8, rotation: -10 },
    { scale: 1, rotation: 0, duration: 0.4, ease: "back.out(3)" }
  );
};

// --- Animasi floating-player menjadi lingkaran & kembali ---
const animatePlayerCircle = () => {
  if (!floatingPlayer.value) return;

  const btnWidth = floatingPlayer.value.querySelector(".controls").offsetWidth; // lebar tombol
  const tl = gsap.timeline();

  tl.to(floatingPlayer.value, {
    height: '60px',
    duration: 0.1,
    ease: "power6.in"
  });

  tl.to(floatingPlayer.value, {
    width: "200px",
    height: "auto",
    duration: 0.8,
    ease: "back.out(1.7)"
  });

  tl.to(floatingPlayer.value, {
    height: '60px',
    duration: 0.8,
    ease: "power5.in",
    delay: 5 // delay 2 detik sebelum animasi ini dijalankan
  });
};



// --- Controls ---
const togglePlay = () => {
  if (!player) return;

  if (isPlaying.value) {
    player.pauseVideo();
  } else {
    player.playVideo();
    animatePlayerCircle(); 
  }

  animateButton(playBtn.value);
};

const playSong = (index) => {
  currentIndex.value = index;
  currentSong.value = songs[index];

  animatePlayerCircle(); // animasi bulat saat ganti lagu

  if (player) {
    player.loadVideoById(currentSong.value.youtubeId);
    player.playVideo();
    isPlaying.value = true;
  }
};

const nextSong = () => {
  animateButton(nextBtn.value);
  playSong((currentIndex.value + 1) % songs.length);
};

const prevSong = () => {
  animateButton(prevBtn.value);
  playSong((currentIndex.value - 1 + songs.length) % songs.length);
};

// --- Lifecycle ---
onMounted(async () => {
  await nextTick();

  gsap.from(floatingPlayer.value, {
    y: 100,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  });

  // YouTube API
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild(tag);

  window.onYouTubeIframeAPIReady = () => {
    player = new YT.Player(youtubePlayer.value, {
      height: "0",
      width: "0",
      videoId: currentSong.value.youtubeId,
      playerVars: { autoplay: 1, rel: 0, mute: 1 },
      events: {
        onReady: (event) => {
          event.target.playVideo();
          isPlaying.value = true;
          setTimeout(() => event.target.unMute(), 500);
        },
        onStateChange: (event) => {
          if (event.data === YT.PlayerState.ENDED) nextSong();
          isPlaying.value = event.data === YT.PlayerState.PLAYING;
        }
      }
    });
  };
});
</script>
