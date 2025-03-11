<template>
  <div id="Loadig" class="top">
    <div class="popup_loader_animation">Loading...</div>
  </div>
</template>

<style lang="scss" scoped>
.top {
  background: black !important;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 100001;
  opacity: 0.6;
}

.popup_loader_animation {
  font-size: 10px;
  margin: 50px auto;
  text-indent: -9999em;
  width: 11em;
  height: 11em;
  border-radius: 50%;
  background: linear-gradient(to right, white 10%, rgba(255, 255, 255, 0) 42%);
  top: 0;
  left: 0;
  animation: load 1.4s infinite linear;
}

.popup_loader_animation:before {
  width: 50%;
  height: 50%;
  background: white;
  border-radius: 100% 0 0 0;
  position: absolute;
  top: 0;
  left: 0;
  content: '';
}

.popup_loader_animation:after {
  background: black;
  width: 75%;
  height: 75%;
  border-radius: 50%;
  content: '';
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

@-webkit-keyframes load {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}

@keyframes load {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
</style>
