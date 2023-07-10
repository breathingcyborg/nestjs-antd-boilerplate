import { MailOutlined } from '@ant-design/icons';
import { LoginFormPage, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';
import { LoginRequest } from "../types";
import logoImage from '../../shared/images/logo.svg';
import { login } from '../helper-methods';
import './login-page.scss';

export const LoginPage = () => {

    const onFinish = async (data: LoginRequest) => {
        try {

            await login(data);
            messageApi.success("Login Successfull");

        } catch (e) {

            messageApi.error((e as Error).toString());
        }
    }

    const [messageApi, coontextHolder] = message.useMessage();

    return <LoginFormPage<LoginRequest>
        onFinish={onFinish}
        style={{
            height: '100vh',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            color: '#fff',
        }}
        logo={logoImage}
        title="Login"
        subTitle="Login to continue to your account"
        backgroundImageUrl='https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    >
        {coontextHolder}
        <ProFormText
            name='email'
            label='Email'
            placeholder='Email'
            required
            rules={[
                { required: true, message: 'Email is required' },
            ]}
            fieldProps={{
                addonBefore: <MailOutlined />,
                type: 'email',
            }}
        />
        <ProFormText.Password
            name='password'
            label='Password'
            required
            rules={[
                { required: true, message: 'Password is required' },
            ]}
        />
    </LoginFormPage>
}