// 编写表单规则
export const rules = {
  username: [
    {
      required: true,
      message: '账号不能为空~',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{6,10}$/,
      message: '账号必须6-10位字母或数字~',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码不能为空~',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{6,16}$/,
      message: '密码必须6-16位字母或数字~',
      trigger: 'blur'
    }
  ]
}
