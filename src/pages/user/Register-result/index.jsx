import { Button, Result } from 'antd';
import { Link } from 'umi';
import React from 'react';
import styles from './style.less';
const actions = (
  <div className={styles.actions}>
    <Link to="/user/Login">
      <Button size="large" type="primary">返回登录</Button>
    </Link>
  </div>
);

const RegisterResult = ({ location }) => {
  const email = location.state ? location.state.account : 'AntDesign@example.com';
  console.log(location);
  return (
    <Result
      className={styles.registerResult}
      status="success"
      title={
        <div className={styles.title}>
          <span>你的账户：{email} 注册成功</span>
        </div>
      }
      subTitle="激活邮件已发送到你的邮箱中，邮件有效期为24小时。请及时登录邮箱，点击邮件中的链接激活帐户。"
      extra={actions}
    />
  );
};

export default RegisterResult;
