<template>
  <div class="login-container">
    <el-form ref="formRef" :model="form" class="login-form" :rules="rules">
      <div class="title-container">
        <h3 class="title">{{ $t("login.title") }}</h3>
      </div>
      <el-form-item prop="username">
        <el-input v-model="form.username" class="w-50 m-2" placeholder="请输入用户名" :prefix-icon="Avatar" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" class="w-50 m-2" type="password" show-password placeholder="请输入密码"
          :prefix-icon="View" />
      </el-form-item>

      <el-button class="login-button" type="primary" @click="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script lang="ts"  setup>
import { ref, reactive } from "vue";
import { Avatar, View } from "@element-plus/icons-vue";
import type { ElForm } from "element-plus";
import router from "@/router";
import { useUserStore } from "@/stores/index"
import { Login } from '@/api/interface'
const userStore = useUserStore();


const form = ref<Login.ReqLoginForm>({
  username: "admin",
  password: "123456",
});

// 定义 formRef（校验规则）
type FormInstance = InstanceType<typeof ElForm>;
const formRef = ref<FormInstance>()
const rules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
})

const handleLogin = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      userStore.login(form.value).then(() => {
        router.replace("/");
      });
    } else {
      console.log("error");
    }
  })
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 420px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    :deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      // background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    :deep(.el-input) {
      display: inline-block;
      height: 47px;
      width: 100%;

      input {
        // background: $bg;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        // color: $light_gray;
        height: 47px;
        caret-color: $cursor;
        // width: 100%;
        box-shadow: 0 0 0 0;
      }

      .el-input__wrapper {
        width: 100%;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
    }

    .login-button {
      width: 100%;
      box-sizing: border-box;
    }
  }

  .tips {
    font-size: 16px;
    line-height: 28px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  // .svg-container {
  //   padding: 6px 5px 6px 15px;
  //   color: $dark_gray;
  //   vertical-align: middle;
  //   display: inline-block;
  // }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    :deep(.lang-select) {
      position: absolute;
      top: 4px;
      right: 0;
      background-color: white;
      font-size: 22px;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .show-pwd {
    // position: absolute;
    // right: 10px;
    // top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
