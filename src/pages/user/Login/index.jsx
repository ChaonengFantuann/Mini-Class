import { useState } from 'react';
import { Link } from 'umi';
import { Tabs } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText, ProFormCheckbox } from '@ant-design/pro-form';
import Footer from '@/components/Footer';
import { login } from '@/services/ant-design-pro/api';
import styles from './index.less';


const Login = () => {
  const [type, setType] = useState('username'); //被选中的标签

  const handleSubmit = async (values) => {
    try {
      // 登录
      const msg = await login({ ...values, type });

      if (msg.status === 'ok') {
        message.success('登录成功！');
        // await fetchUserInfo();

        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query;
        history.push(redirect || '/');
        return;
      }

       // 如果失败去设置用户错误信息

      setUserLoginState(msg);
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div
          style={{
            marginTop: '10vh',
          }}
        />
        <LoginForm
          logo={<img src="/logo.jpg" alt="logo" />}
          title="Mini Class"
          subTitle="微班 —— 致力于管理班级人员与事务信息"
          actions={<div>其他登录方式：功能正在开发中 ... </div>}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values);
          }}
        >
          {/* 标签 */}
          <Tabs accessKey={type} onChange={setType}>
            <Tabs.TabPane key="username" tab="用户名登录" />
            <Tabs.TabPane key="mail" tab="邮箱登录" />
          </Tabs>
          {/* 用户名登录 */}
          {type === 'username' && (
            <>
              <ProFormText
                name="username"
                placeholder="请输入用户名"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.icom} />,
                }}
                rules={[
                  {
                    required: true,
                    message: '用户名为必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                placeholder="请输入密码"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.icom} />,
                }}
                rules={[
                  {
                    required: true,
                    message: '密码为必填项！',
                  },
                ]}
              />
            </>
          )}
          {/* 邮箱登录 */}
          {type === 'mail' && (
            <>
              <ProFormText
                name="mail"
                placeholder="请输入邮箱"
                fieldProps={{
                  size: 'large',
                  prefix: <MailOutlined className={styles.icom} />,
                }}
                rules={[
                  {
                    required: true,
                    message: '邮箱为必填项！',
                  },
                  {
                    type: 'email',
                    message: '邮箱格式错误！',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                placeholder="请输入密码"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.icom} />,
                }}
                rules={[
                  {
                    required: true,
                    message: '密码为必填项！',
                  },
                ]}
              />
            </>
          )}
          <ProFormCheckbox noStyle name="autoLogin">自动登录</ProFormCheckbox>
          <div style={{ float: 'right', marginBottom: '8px' }}>
            <span>没有账号？</span>
            <Link to="/user/register">点击这里！</Link>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
