import { Typography } from 'antd';
import styles from './header.less';

const Header = () => {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.img_title_container}>
          <img src="/logo.jpg" alt="logo" className={styles.logo} />
          <Typography.Title level={2} className={styles.title}>
            Mini Class
          </Typography.Title>
        </div>
        <Typography.Text type="secondary">微班 —— 致力于管理班级人员与事务信息</Typography.Text>
      </div>
    </>
  );
};

export default Header;
