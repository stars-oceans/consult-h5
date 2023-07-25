<script setup lang="ts">
import { ref } from 'vue'
import KnowledgeList from './components/KnowledgeCard.vue'
import FollowDoctor from './components/FollowDoctor.vue'
import type { KnowledgeType } from '@/types/consult.d.ts'
// 导入pinia 仓库里面的consult
import { useConsultStore } from '@/stores'
const useConsult = useConsultStore()
// 导入枚举
import { ConsultType } from '@/enums/index'
const active = ref<KnowledgeType>('food')

const fastEvent = () => {
  // 调用pinia 仓库里面的自定义方法

  // useConsult.setType(2)
  // TODO: 跟上述一个意,这样见知意
  useConsult.setType(ConsultType.Fast)
}
</script>

<template>
  <div class="home-page">
    <!-- 1. 头部 -->
    <div class="home-header">
      <div class="con">
        <h1>优医</h1>
        <div class="search"><cp-icon name="home-search" /> 搜一搜：疾病/症状/医生/健康知识</div>
      </div>
    </div>
    <!-- 2. 导航 -->
    <div class="home-navs">
      <van-row>
        <van-col span="8">
          <router-link to="/" class="nav">
            <cp-icon name="home-doctor"></cp-icon>
            <p class="title">问医生</p>
            <p class="desc">按科室查问医生</p>
          </router-link>
        </van-col>
        <van-col span="8" @click="fastEvent">
          <router-link to="/consult/fast" class="nav">
            <cp-icon name="home-graphic"></cp-icon>
            <p class="title">极速问诊</p>
            <p class="desc">20s 问医生</p>
          </router-link>
        </van-col>
        <van-col span="8">
          <router-link to="/" class="nav">
            <cp-icon name="home-find"></cp-icon>
            <p class="title">找医生</p>
            <p class="desc">慢慢找</p>
          </router-link>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="6" v-for="item in 4" :key="item">
          <router-link to="/" class="nav min">
            <cp-icon name="home-order"></cp-icon>
            <p class="title">药品订单</p>
          </router-link>
        </van-col>
      </van-row>
    </div>
    <!-- 3. 轮播图 -->
    <div class="home-banner">
      <van-swipe indicator-color="#fff">
        <van-swipe-item>
          <img src="@/assets/ad.png" alt="" />
        </van-swipe-item>
        <van-swipe-item>
          <img src="@/assets/ad.png" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 4. 知识列表：关注、推荐、减脂、饮食 -->
    <van-tabs v-model:active="active">
      <van-tab name="like" title="关注">
        <FollowDoctor></FollowDoctor>
        <KnowledgeList :active="active"></KnowledgeList>
      </van-tab>
      <van-tab name="recommend" title="推荐">
        <KnowledgeList :active="active"></KnowledgeList>
      </van-tab>
      <van-tab name="fatReduction" title="减脂">
        <KnowledgeList :active="active"></KnowledgeList>
      </van-tab>
      <van-tab name="food" title="饮食">
        <KnowledgeList :active="active"></KnowledgeList>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  padding-bottom: 50px;
}
.home-header {
  height: 100px;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 90px;
    background: linear-gradient(180deg, rgba(62, 206, 197, 0.85), #26bcc6);
    border-bottom-left-radius: 150px 20px;
    border-bottom-right-radius: 150px 20px;
  }
  .con {
    position: relative;
    padding: 0 15px;
    > h1 {
      font-size: 18px;
      color: #fff;
      font-weight: normal;
      padding: 20px 0;
      line-height: 1;
      padding-left: 5px;
    }
    .search {
      height: 40px;
      border-radius: 20px;
      box-shadow: 0px 15px 22px -7px rgba(224, 236, 250, 0.82);
      background-color: #fff;
      display: flex;
      align-items: center;
      padding: 0 20px;
      color: var(--cp-dark);
      font-size: 13px;
      .cp-icon {
        font-size: 16px;
        margin-right: 5px;
      }
    }
  }
}
.home-navs {
  padding: 10px 15px 0 15px;
  .nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
    .cp-icon {
      font-size: 48px;
    }
    .title {
      font-weight: 500;
      margin-top: 5px;
      color: var(--cp-text1);
    }
    .desc {
      font-size: 11px;
      color: var(--cp-tag);
      margin-top: 2px;
    }
    &.min {
      .cp-icon {
        font-size: 31px;
      }
      .title {
        font-size: 13px;
        color: var(--cp-text2);
        font-weight: normal;
      }
    }
  }
}
.home-banner {
  padding: 10px 15px;
  height: 100px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
