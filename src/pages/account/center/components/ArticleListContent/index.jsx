import { Avatar } from 'antd';
import React from 'react';
import moment from 'moment';
import styles from './index.less';

const ArticleListContent = ({ data: { remarks, end_tiem, avatar, owner, href } }) => (
  <div className={styles.listContent}>
    <div className={styles.description}>{remarks}</div>
    <div className={styles.extra}>
      {/* <Avatar src={avatar} size="small" /> */}
      {/* <a href={href}>{owner}</a> 发布在 <a href={href}>{href}</a> */}
      <div>截至时间：</div>
      <em>{moment(end_tiem).format('YYYY-MM-DD HH:mm')}</em>
    </div>
  </div>
);

export default ArticleListContent;
