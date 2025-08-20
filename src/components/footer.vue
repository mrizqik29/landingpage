<template>
  <footer class="site-footer fade-in">
    <div class="social-sosmed">
      <a href="https://www.instagram.com/username" target="_blank" rel="noopener noreferrer" class="social-icon">
        <Instagram />
      </a>
      <a href="https://github.com/username" target="_blank" rel="noopener noreferrer" class="social-icon">
        <Github />
      </a>
      <a href="https://www.linkedin.com/in/username" target="_blank" rel="noopener noreferrer" class="social-icon">
        <Linkedin />
      </a>
    </div>
    <p>
      &copy; 2025 Digimon World. Dibuat oleh <a href="#">Penggemar Digimon</a>.
    </p>
  </footer>
</template>

<script>
import { onMounted, nextTick } from "vue";
import { gsap } from "gsap";
import { Instagram, Github, Linkedin } from "lucide-vue-next";

export default {
  name: "FooterComponent",
  components: { Instagram, Github, Linkedin },
  setup() {
    onMounted(async () => {
      await nextTick();

      // Animasi muncul footer
      gsap.to(".site-footer.fade-in", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.3
      });

      // Animasi ikon sosial media muncul satu per satu
      gsap.from(".social-sosmed a", {
        opacity: 0,
        y: 20,
        scale: 0.8,
        duration: 0.6,
        ease: "back.out(1.7)",
        stagger: 0.2
      });

        gsap.fromTo(
          ".social-icon",
          { rotation: 40 },      // posisi awal
          {
            rotation: -40,      // posisi akhir
            duration: 1,        // durasi per gerakan
            repeat: -1,         // terus-menerus
            yoyo: true,         // bolak-balik
            ease: "sine.inOut",
            stagger: 0.2
          }
        );
      // Animasi klik ikon
      document.querySelectorAll(".social-icon").forEach(icon => {
        icon.addEventListener("click", e => {
          gsap.fromTo(
            e.currentTarget,
            { scale: 1 },
            { scale: 1.3, duration: 0.15, yoyo: true, repeat: 1, ease: "power1.out" }
          );
        });
      });
    });
  }
};
</script>

<style scoped>
.site-footer {
  text-align: center;
  padding: 1.5rem;
  background-color: #111;
  color: #fff;
}

.social-sosmed {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.social-sosmed a {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  cursor: pointer;
}

.social-sosmed svg {
  width: 32px;
  height: 32px;
  transition: color 0.2s;
}

.social-sosmed a:hover svg {
  color: #ff5733;
}
</style>
