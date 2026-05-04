<template>
  <div id="loader-wrapper" :class="store.imgLoadStatus ? 'loaded' : null">
    <div class="loader">
      <div class="loader-container">
        <div class="heart-circle">
          <div class="heart" />
        </div>
        <div class="sparkles">
          <span class="sparkle" />
          <span class="sparkle" />
          <span class="sparkle" />
          <span class="sparkle" />
        </div>
      </div>
      <div class="loader-text">
        <span class="name">
          {{ siteName }}
        </span>
        <span class="tip">
          <span class="dot">.</span>
          <span class="dot">.</span>
          <span class="dot">.</span>
          加载中
          <span class="dot">.</span>
          <span class="dot">.</span>
          <span class="dot">.</span>
        </span>
      </div>
    </div>
    <div class="loader-section section-left" />
    <div class="loader-section section-right" />
  </div>
</template>

<script setup>
import { mainStore } from "@/store";

const store = mainStore();

// 配置
const siteName = import.meta.env.VITE_SITE_NAME;
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;700&display=swap');

#loader-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  overflow: hidden;

  .loader {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #ffeef8 0%, #ffe0f0 25%, #ffd6e8 50%, #f0e6ff 75%, #e8f4ff 100%);

    .loader-container {
      position: relative;
      width: 180px;
      height: 180px;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;

      .heart-circle {
        width: 120px;
        height: 120px;
        background: linear-gradient(135deg, #ff9ecd 0%, #ff7eb8 50%, #ff9ecd 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow:
          0 0 30px rgba(255, 126, 184, 0.4),
          0 0 60px rgba(255, 158, 205, 0.3),
          inset 0 -5px 20px rgba(255, 255, 255, 0.5);
        animation: pulse-heart 1.5s ease-in-out infinite;

        .heart {
          width: 50px;
          height: 45px;
          background: linear-gradient(135deg, #fff 0%, #fff5f8 100%);
          position: relative;
          transform: rotate(-45deg);
          animation: heartbeat 1.5s ease-in-out infinite;

          &:before,
          &:after {
            content: '';
            width: 50px;
            height: 45px;
            background: linear-gradient(135deg, #fff 0%, #fff5f8 100%);
            border-radius: 50%;
            position: absolute;
          }

          &:before {
            top: -25px;
            left: 0;
          }

          &:after {
            left: 25px;
            top: 0;
          }
        }
      }

      .sparkles {
        position: absolute;
        width: 100%;
        height: 100%;

        .sparkle {
          position: absolute;
          width: 12px;
          height: 12px;
          background: linear-gradient(135deg, #ffd700 0%, #ffec8b 100%);
          clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
          animation: sparkle-twinkle 1.2s ease-in-out infinite;

          &:nth-child(1) {
            top: 10%;
            left: 10%;
            animation-delay: 0s;
          }

          &:nth-child(2) {
            top: 15%;
            right: 15%;
            animation-delay: 0.3s;
          }

          &:nth-child(3) {
            bottom: 20%;
            left: 5%;
            animation-delay: 0.6s;
          }

          &:nth-child(4) {
            bottom: 15%;
            right: 10%;
            animation-delay: 0.9s;
          }
        }
      }
    }

    .loader-text {
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 2;
      margin-top: 30px;
      font-family: 'M PLUS Rounded 1c', 'Microsoft YaHei', sans-serif;

      .name {
        font-size: 28px;
        font-weight: 700;
        background: linear-gradient(135deg, #ff7eb8 0%, #ff6b9d 50%, #c44569 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-shadow: 0 2px 10px rgba(255, 126, 184, 0.3);
        letter-spacing: 2px;
        animation: float-text 2s ease-in-out infinite;
      }

      .tip {
        margin-top: 15px;
        font-size: 16px;
        color: #9b6b8e;
        display: flex;
        align-items: center;
        gap: 4px;
        font-weight: 500;

        .dot {
          color: #ff7eb8;
          animation: dot-bounce 1.2s ease-in-out infinite;

          &:nth-child(1) { animation-delay: 0s; }
          &:nth-child(2) { animation-delay: 0.2s; }
          &:nth-child(3) { animation-delay: 0.4s; }
          &:nth-child(5) { animation-delay: 0.6s; }
          &:nth-child(6) { animation-delay: 0.8s; }
          &:nth-child(7) { animation-delay: 1s; }
        }
      }
    }
  }

  .loader-section {
    position: fixed;
    top: 0;
    width: 51%;
    height: 100%;
    background: linear-gradient(180deg, #ffeef8 0%, #ffd6e8 100%);
    z-index: 1;

    &.section-left {
      left: 0;
      border-right: 2px solid rgba(255, 126, 184, 0.2);
    }

    &.section-right {
      right: 0;
      border-left: 2px solid rgba(255, 126, 184, 0.2);
    }
  }

  &.loaded {
    visibility: hidden;
    transform: translateY(-100%);
    transition:
      transform 0.4s 1s ease-out,
      visibility 0.4s 1s ease-out;

    .loader {
      .loader-container,
      .loader-text {
        opacity: 0;
        transform: scale(0.8);
        transition: all 0.3s ease-out;
      }
    }

    .loader-section {
      &.section-left {
        transform: translateX(-100%);
        transition: transform 0.6s 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }

      &.section-right {
        transform: translateX(100%);
        transition: transform 0.6s 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }
    }
  }
}

@keyframes pulse-heart {
  0%, 100% {
    transform: scale(1);
    box-shadow:
      0 0 30px rgba(255, 126, 184, 0.4),
      0 0 60px rgba(255, 158, 205, 0.3),
      inset 0 -5px 20px rgba(255, 255, 255, 0.5);
  }
  50% {
    transform: scale(1.05);
    box-shadow:
      0 0 40px rgba(255, 126, 184, 0.6),
      0 0 80px rgba(255, 158, 205, 0.4),
      inset 0 -5px 20px rgba(255, 255, 255, 0.5);
  }
}

@keyframes heartbeat {
  0%, 100% { transform: rotate(-45deg) scale(1); }
  50% { transform: rotate(-45deg) scale(1.1); }
}

@keyframes sparkle-twinkle {
  0%, 100% {
    opacity: 0.4;
    transform: scale(0.8) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: scale(1.2) rotate(180deg);
  }
}

@keyframes float-text {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@keyframes dot-bounce {
  0%, 100% {
    transform: translateY(0);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-8px);
    opacity: 1;
  }
}
</style>
