import React, { useState } from 'react'
import { useFormik } from 'formik'
import Alert from './Alert';
import { input, inputBox, button } from '../Style';
import axios from 'axios'

export default function SignIn() {
    const [isSignIn, setSignIn] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const formik = useFormik({
        initialValues: { email: "", password: "" },
        onSubmit: async (values) => {
            try {
                await axios.post("https://conduit.productionready.io/api/users/login", { "user": values })
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
                    name="email"
                    {...formik.getFieldProps("email")}
                    css={input}
                    placeholder="邮箱"
                />
            </div>
            <div css={inputBox}>
                <input
                    type="password"
                    name="password"
                    {...formik.getFieldProps("password")}
                    css={input}
                    placeholder="密码"
                />
            </div>
            <input type="submit" value="登录" css={button} style={{ background: '#3194d0' }} />
            {isSignIn ? <Alert isSuccess={isSuccess} message={isSuccess ? '登录成功' : '登录失败，请检查账号密码'} /> : null}
        </form>
    )
}
