<script setup lang="ts">

</script>

<template>
<nav class="navbar">
  <ul class="navbar__list">
    <li class="navbar__list-item">
      <router-link
          class="navbar__link"
          to="/"
      >
        SVG circle
      </router-link>
    </li>
    <li class="navbar__list-item">
      <router-link
          class="navbar__link"
          to="/pie-chart"
      >
        Pie chart
      </router-link>
    </li>
  </ul>
</nav>
</template>

<style scoped lang="scss">
.navbar {
  padding: spacing(2) 0;
  border-bottom: 1px solid $color-border;
  margin-bottom: spacing(4);


  &__list {
    display: flex;
    gap: spacing(4);
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 spacing(4);
  }

  &__link {
    &.router-link-active {
      color: $color-accent;
    }
  }
}
</style>
