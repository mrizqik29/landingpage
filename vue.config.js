const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,

  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/assets/styles/variables.scss";
          @import "@/assets/styles/mixins.scss";
        `,
      },
    },
  },

  // Tambahkan ini supaya GitHub Pages menampilkan App.vue dengan benar
  publicPath: process.env.NODE_ENV === "production"
    ? "/landingpage/" // Ganti dengan nama repo GitHub-mu
    : "/"
});
