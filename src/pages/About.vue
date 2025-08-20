<template>
  <div>
    <HeaderPart />
    <SectionOne />
    <SectionTwo />
    <SectionThree />
    <Section4/>
    <FooterPart />
  </div>
</template>

<script>
import HeaderPart from "@/components/header.vue";
import SectionOne from "@/components/section1.vue";
import SectionTwo from "@/components/section2.vue";
import SectionThree from "@/components/section3.vue";
import Section4 from "@/components/section4.vue";
import FooterPart from "@/components/footer.vue";

export default {
  name: "AboutPage",
  components: {
    HeaderPart,
    SectionOne,
    SectionTwo,
    SectionThree,
    Section4,
    FooterPart,
  },
};
</script>
