<template>
  <nav class="navbar is-success" role="navigation" aria-label="main navigation">
    <div class="container is-max-desktop px-2">
      <div class="navbar-brand">
        <div class="navbar-item is-size-4 is-family-monospace">
          Global Notes
        </div>

        <a
          role="button"
          class="navbar-burger"
          :class="{ 'is-active': showMobileNav }"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          @click.prevent="showMobileNav = !showMobileNav"
          ref="navbarBurgerRef"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        class="navbar-menu"
        :class="{ 'is-active': showMobileNav }"
        ref="navbarMenuRef"
      >
        <div class="navbar-start">
          <button
            v-if="storeAuth.user?.id"
            class="button is-small is-info mt-3 ml-3"
            :class="{ 'is-loading': !storeAuth.authLoaded }"
            @click="logout"
          >
            Logout {{ storeAuth.user?.email }}
          </button>
        </div>
        <div class="navbar-end">
          <RouterLink
            to="/"
            class="navbar-item"
            active-class="is-active"
            @click="showMobileNav = false"
          >
            Notes
          </RouterLink>
          <RouterLink
            to="/stats"
            class="navbar-item"
            active-class="is-active"
            @click="showMobileNav = false"
          >
            Stats
          </RouterLink>
          <div class="navbar-item">
            <button
              class="button is-success is-ghost is-beta"
              @click="storeTheme.toggleMode"
            >
              <span class="icon is-small">
                <DycIcon
                  :name="storeTheme.isDarkModeEnabled ? 'SunIcon' : 'MoonIcon'"
                  type="outline"
                />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
/*
    imports
*/

import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useStoreAuth } from "@/stores/storeAuth";
import { useStoreTheme } from "@/stores/storeTheme";

/*
    store
*/

const storeAuth = useStoreAuth();
const storeTheme = useStoreTheme();

/*
    mobile nav
*/

const showMobileNav = ref(false);

/*
    click outside to close
*/

const navbarMenuRef = ref(null);
const navbarBurgerRef = ref(null);

onClickOutside(
  navbarMenuRef,
  (event) => {
    showMobileNav.value = false;
  },
  { ignore: [navbarBurgerRef] }
);

/*
  logout
*/

const logout = () => {
  showMobileNav.value = false;
  storeAuth.logoutUser();
};
</script>

<style>
@media (max-width: 1023px) {
  .navbar-menu {
    position: absolute;
    left: 0;
    width: 100%;
  }
}

.is-beta:after {
  content: "BETA";
  font-size: 9px;
  font-weight: 800;
  vertical-align: top;
  position: relative;
  top: -7px;
  left: 10px;
}
</style>
