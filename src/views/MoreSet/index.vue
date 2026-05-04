<template>
  <div class="set" @mouseenter="closeShow = true" @mouseleave="closeShow = false" @click.stop>
    <transition name="el-fade-in-linear">
      <close-one
        class="close"
        theme="filled"
        size="28"
        fill="#ffffff60"
        v-show="closeShow"
        @click="store.setOpenState = false"
      />
    </transition>
    <el-row :gutter="40">
      <el-col :span="12" class="left">
        <div class="logo text-hidden">
          <span class="bg">{{ siteUrl[0] }}</span>
          <span class="sm">.{{ siteUrl[1] }}</span>
        </div>
        <div class="version">
          <div class="num">v&nbsp;{{ config.version }}</div>
          <el-tooltip content="Github 源代码仓库" placement="right" :show-arrow="false">
            <github-one class="github" theme="outline" size="24" @click="jumpTo(config.github)" />
          </el-tooltip>
        </div>
        <el-card class="update">
          <template #header>
            <div class="card-header">
              <span>更新日志</span>
            </div>
          </template>
          <div class="upnote">
            <div v-if="loading">加载中...</div>
            <div v-else class="markdown-content" v-html="renderedNotes"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12" class="right">
        <div class="title">
          <setting-two theme="filled" size="28" fill="#ffffff60" />
          <span class="name">全局设置</span>
        </div>
        <Set />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { CloseOne, SettingTwo, GithubOne } from "@icon-park/vue-next";
import { mainStore } from "@/store";
import Set from "@/components/Set.vue";
import config from "@/../package.json";
import { marked } from "marked";

const store = mainStore();
const closeShow = ref(false);

// 站点链接
const siteUrl = computed(() => {
  const url = import.meta.env.VITE_SITE_URL;
  if (!url) return "nachceko.qzz.io".split(".");
  // 判断协议前缀
  if (url.startsWith("http://") || url.startsWith("https://")) {
    const urlFormat = url.replace(/^(https?:\/\/)/, "");
    return urlFormat.split(".");
  }
  return url.split(".");
});

// 更新日志
const releaseNotes = ref("");
const loading = ref(true);

// 配置 marked
marked.setOptions({
  breaks: true,
  gfm: true,
});

// 获取 GitHub Releases
const fetchReleases = async () => {
  try {
    const repo = "tb-miao/home-page";
    console.log("正在获取仓库:", repo);
    const response = await fetch(`https://api.github.com/repos/${repo}/releases?per_page=10`);
    console.log("响应状态:", response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const releases = await response.json();
    console.log("获取到的 releases:", releases.length);
    
    if (releases.length === 0) {
      releaseNotes.value = "暂无发布记录";
    } else {
      const notes = releases.map(release => {
        const date = new Date(release.published_at).toLocaleDateString("zh-CN");
        const version = release.name || release.tag_name;
        const body = release.body || "无更新说明";
        return `## ${version} (${date})\n\n${body}`;
      }).join("\n\n---\n\n");
      releaseNotes.value = notes;
      console.log("渲染内容:", releaseNotes.value.substring(0, 100) + "...");
    }
  } catch (error) {
    console.error("获取更新日志失败:", error);
    releaseNotes.value = `获取失败：${error.message}`;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  console.log("组件已挂载，开始获取更新日志");
  fetchReleases();
});

// 渲染 Markdown
const renderedNotes = computed(() => {
  console.log("渲染 Markdown 内容:", releaseNotes.value.substring(0, 50));
  return marked.parse(releaseNotes.value);
});

// 跳转源代码仓库
const jumpTo = (url) => {
  window.open(url);
};
</script>

<style lang="scss" scoped>
.set {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  background: rgb(255 255 255 / 40%);
  border-radius: 6px;
  padding: 40px;

  .close {
    position: absolute;
    top: 14px;
    right: 14px;
    width: 28px;
    height: 28px;

    &:hover {
      transform: scale(1.2);
    }

    &:active {
      transform: scale(1);
    }
  }

  .el-row {
    height: 100%;
    flex-wrap: nowrap;

    .left {
      height: 100%;
      padding-left: 40px !important;
      padding-bottom: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .logo {
        transform: translateY(-8%);
        font-family: "Pacifico-Regular";
        padding-left: 22px;
        width: 100%;
        height: 260px;
        min-height: 140px;
        .bg {
          font-size: 5rem;
        }

        .sm {
          margin-left: 6px;
          font-size: 2rem;
        }

        @media (max-width: 990px) {
          .bg {
            font-size: 4.5rem;
          }
          .sm {
            font-size: 1.7rem;
          }
        }
        @media (max-width: 825px) {
          .bg {
            font-size: 3.8rem;
          }
          .sm {
            font-size: 1.3rem;
          }
        }
      }

      .version {
        display: flex;
        flex-direction: row;
        align-items: center;

        .num {
          font-size: 2rem;
          font-family: "Pacifico-Regular";
        }

        .github {
          width: 24px;
          height: 24px;
          margin-left: 12px;
          margin-top: 6px;

          &:hover {
            transform: scale(1.2);
          }
        }
      }

      .update {
        margin-top: 30px;
        height: 100%;

        :deep(.el-card__body) {
          height: 100%;

          .upnote {
            padding: 20px;
            height: calc(100% - 56px);
            overflow-y: auto;
            color: #333;

            .markdown-content {
              & > *:first-child {
                margin-top: 0;
              }

              & > *:last-child {
                margin-bottom: 0;
              }

              h2 {
                font-size: 1.2rem;
                margin: 16px 0 8px;
                color: #333;
                border-bottom: 1px solid #eaecef;
                padding-bottom: 0.3em;
              }

              p {
                margin: 8px 0;
                line-height: 1.6;
                color: #24292e;
              }

              ul,
              ol {
                margin: 8px 0;
                padding-left: 20px;
              }

              li {
                margin: 4px 0;
              }

              li + li {
                margin-top: 4px;
              }

              a {
                color: #0366d6;
                text-decoration: none;

                &:hover {
                  text-decoration: underline;
                }
              }

              code {
                background: rgba(27, 31, 35, 0.05);
                padding: 0.2em 0.4em;
                border-radius: 3px;
                font-size: 0.9em;
                font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
              }

              pre {
                background: #f6f8fa;
                padding: 12px;
                border-radius: 6px;
                overflow-x: auto;
                margin: 8px 0;

                code {
                  background: transparent;
                  padding: 0;
                }
              }

              blockquote {
                border-left: 4px solid #dfe2e5;
                padding-left: 16px;
                margin: 8px 0;
                color: #6a737d;
              }

              hr {
                border: none;
                border-top: 1px solid #eaecef;
                margin: 16px 0;
              }

              strong {
                font-weight: 600;
                color: #24292e;
              }
            }
          }
        }
      }
    }

    .right {
      height: 100%;
      padding-right: 40px !important;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .title {
        display: flex;
        align-items: center;
        flex-direction: row;
        font-size: 18px;
        margin-bottom: 16px;

        .i-icon {
          width: 28px;
          height: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
