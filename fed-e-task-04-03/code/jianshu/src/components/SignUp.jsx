import React, { useState }  from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Tooltip from './Tooltip';
import Alert from './Alert';
import { input, inputBox, button, signUpMsg } from '../Style';
import axios from 'axios'

export default function SignUp() {
    const [isSignIn, setSignIn] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const formik = useFormik({
        initialValues: { username: "", email: "", password: "" },
        validationSchema: Yup.object({
            username:
                Yup.string()
                    .max(15, "用户名的长度不能大于15")
                    .required("请填写用户名"),
            email:
                Yup.string()
                    .matches(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, "邮箱格式不正确"),
            password:
                Yup.string()
                    .min(6, "密码长度不能小于6")
                    .max(15, "密码的长度不能大于15")
                    .required("请填写密码")
                    .matches(/([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*/, "密码必须包含英文和数字")
        }),
        onSubmit: async(values) => {
            try {
                await axios.post("https://conduit.productionready.io/api/users", { "user": values })
                setIsSuccess(true)
                setSignIn(true)
                setTimeout(() => {
                    setSignIn(false)
                }, 3000)
            } catch (e) {
                setIsSuccess(false)
                setSignIn(true)
                setTimeout(() => {
                    setSignIn(false)
                }, 3000)
            }
        }
    })
    return (
        <form onSubmit={formik.handleSubmit}>
            <div css={inputBox}>
                <input
                    type="text"
                    name="username"
                    {...formik.getFieldProps("username")}
                    css={input}
                    placeholder="你的昵称"
                />
                {formik.touched.username && formik.errors.username
                    ? <Tooltip message={formik.errors.username} />
                    : null}
            </div>
            <div css={inputBox}>
                <input
                    type="text"
                    name="email"
                    {...formik.getFieldProps("email")}
                    css={input}
                    placeholder="邮箱"
                />
                {formik.touched.email && formik.errors.email
                    ? <Tooltip message={formik.errors.email} />
                    : null}
            </div>
            <div css={inputBox}>
                <input
                    type="password"
                    name="password"
                    {...formik.getFieldProps("password")}
                    css={input}
                    placeholder="密码"
                />
                {formik.touched.password && formik.errors.password
                    ? <Tooltip message={formik.errors.password} />
                    : null}
            </div>
            <input type="submit" value="注册" css={button} />
            <p css={signUpMsg}>点击 “注册” 即表示您同意并愿意遵守简书用户协议 和 隐私政策 。</p>
            {isSignIn ? <Alert isSuccess={isSuccess} message={isSuccess ? '注册成功' : '注册失败，请稍后再试'} /> : null}
        </form>
    )
}
