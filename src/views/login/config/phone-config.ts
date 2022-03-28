// 编写表单规则
export const rules = {
  number: [
    {
      required: true,
      message: '手机号码不能为空~',
      trigger: 'blur'
    },
    {
      pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
      message: '手机号码输入错误~',
      trigger: 'blur'
    }
  ],
  code: [
    {
      required: true,
      message: '验证码不能为空~',
      trigger: 'blur'
    },
    {
      pattern: /^[0-9]{6}$/,
      message: '验证码输入数字~',
      trigger: 'blur'
    }
  ]
}
