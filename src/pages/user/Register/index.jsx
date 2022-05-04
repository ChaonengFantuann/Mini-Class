import { useState } from 'react';
import { Form, Input, Popover, Tabs, Progress, Button } from 'antd';
import { Link, useRequest } from 'umi';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import Header from './compoments/Header';
import Footer from '@/components/Footer';
import { fakeRegister } from './service';
import styles from './index.less';

const Register = () => {
  const [visible, setVisible] = useState(false); //密码强度气泡框可见状态
  const [popover, setPopover] = useState(false);
  const confirmDirty = false;
  const [form] = Form.useForm();

  // 通过用户输入密码的长度来给予一个密码状态
  const getPasswordStatus = () => {
    const value = form.getFieldValue('password');

    if (value && value.length > 9) {
      return 'ok';
    }

    if (value && value.length > 5) {
      return 'pass';
    }

    return 'poor';
  };

  // 根据 getPasswordStatus() 返回的密码状态渲染UI
  const passwordStatusMap = {
    ok: (
      <div className={styles.success}>
        <span>强度：强</span>
      </div>
    ),
    pass: (
      <div className={styles.warning}>
        <span>强度：中</span>
      </div>
    ),
    poor: (
      <div className={styles.error}>
        <span>强度：弱</span>
      </div>
    ),
  };

  // 将 getPasswordStatus() 返回的密码状态转换为 <Popover /> 中 API status 的属性
  const passwordProgressMap = {
    ok: 'success',
    pass: 'normal',
    poor: 'exception',
  };

  // 用于渲染中部进度条
  const renderPasswordProgress = () => {
    const value = form.getFieldValue('password');
    const passwordStatus = getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  // 密码框自定义校验 (rule, value) => Promise
  const checkPassword = (_, value) => {
    const promise = Promise;
    // 没有值的情况
    if (!value) {
      setVisible(!!value);
      return promise.reject('请输入密码!');
    }
    // 有值的情况
    if (!visible) {
      setVisible(!!value);
    }

    setPopover(!popover);

    if (value.length < 6) {
      return promise.reject('');
    }

    if (value.length > 18) {
      return promise.reject('');
    }

    if (value && confirmDirty) {
      form.validateFields(['confirm']);
    }

    return promise.resolve();
  };

  // 确认密码框自定义校验 (rule, value) => Promise
  const checkConfirm = (_, value) => {
    const promise = Promise;

    if (value && value !== form.getFieldValue('password')) {
      return promise.reject('两次输入的密码不匹配!');
    }

    return promise.resolve();
  };

  const { loading: submitting, run: register } = useRequest(fakeRegister, {
    manual: true,
    onSuccess: (data, params) => {
      if (data.status === 'ok') {
        message.success('注册成功！');
        history.push({
          pathname: '/user/register-result',
          state: {
            account: params.email,
          },
        });
      }
    },
  });

  const onFinish = (values) => {
    register(values);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.main}>
            <div
              style={{
                marginTop: '10vh',
              }}
            />
            <Header />
            <div
              style={{
                marginTop: '35px',
              }}
            />
            <Tabs centered={true}>
              <Tabs.TabPane tab="用户账号注册" />
            </Tabs>
            <Form form={form} name="UserRegister" onFinish={onFinish}>
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: '请输入用户名!',
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="用户名"
                  allowClear
                  prefix={<UserOutlined className={styles.prefixIcon} />}
                />
              </Form.Item>
              <Form.Item
                name="mail"
                rules={[
                  {
                    required: true,
                    message: '请输入邮箱地址!',
                  },
                  {
                    type: 'email',
                    message: '邮箱地址格式错误!',
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="邮箱"
                  allowClear
                  prefix={<MailOutlined className={styles.prefixIcon} />}
                />
              </Form.Item>
              <Popover
                getPopupContainer={(node) => {
                  if (node && node.parentNode) {
                    return node.parentNode;
                  }
                  return node;
                }}
                content={
                  visible && (
                    <div>
                      {passwordStatusMap[getPasswordStatus()]} {/* 顶部文字 */}
                      {renderPasswordProgress()} {/* 中部进度条 */}
                      <div
                        style={{
                          marginTop: 10,
                        }}
                      >
                        <span>请至少输入 6 - 18 个字符。请不要使用容易被猜到的密码。</span>
                      </div>
                    </div>
                  )
                }
                overlayStyle={{
                  width: 240,
                }}
                placement="right"
                visible={visible}
              >
                <Form.Item
                  name="password"
                  className={
                    form.getFieldValue('password') &&
                    form.getFieldValue('password').length > 0 &&
                    styles.password
                  }
                  rules={[
                    {
                      validator: checkPassword,
                    },
                  ]}
                >
                  <Input.Password
                    size="large"
                    type="password"
                    placeholder="至少6位密码，区分大小写"
                    prefix={<LockOutlined className={styles.prefixIcon} />}
                  />
                </Form.Item>
              </Popover>
              <Form.Item
                name="confirm"
                rules={[
                  {
                    required: true,
                    message: '确认密码',
                  },
                  {
                    validator: checkConfirm,
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  type="password"
                  placeholder="确认密码"
                  prefix={<LockOutlined className={styles.prefixIcon} />}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  size="large"
                  // loading={submitting}
                  className={styles.submit}
                  type="primary"
                  htmlType="submit"
                >
                  <span>注册</span>
                </Button>
                <Link className={styles.login} to="/user/login">
                  <span>使用已有账户登录</span>
                </Link>
              </Form.Item>
            </Form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Register;
