import {
  PlusOutlined,
  HomeOutlined,
  MailOutlined,
  ClusterOutlined,
  UserOutlined,
  ManOutlined,
  WomanOutlined,
  GroupOutlined,
  NumberOutlined,
  PhoneOutlined,
  TagsTwoTone,
  HomeTwoTone,
  PhoneTwoTone,
} from '@ant-design/icons';
import { Avatar, Card, Col, Divider, Input, Row, Tag } from 'antd';
import React, { useState, useRef } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Link, useRequest } from 'umi';
import Projects from './components/Projects';
import Articles from './components/Articles';
import Applications from './components/Applications';
import { queryCurrent } from './service';
import styles from './Center.less';
const operationTabList = [
  {
    key: 'articles',
    tab: (
      <span>
        文章{' '}
        <span
          style={{
            fontSize: 14,
          }}
        >
          (8)
        </span>
      </span>
    ),
  },
  {
    key: 'applications',
    tab: (
      <span>
        应用{' '}
        <span
          style={{
            fontSize: 14,
          }}
        >
          (8)
        </span>
      </span>
    ),
  },
  {
    key: 'projects',
    tab: (
      <span>
        项目{' '}
        <span
          style={{
            fontSize: 14,
          }}
        >
          (8)
        </span>
      </span>
    ),
  },
];

const TagList = ({ tags }) => {
  switch (tags) {
    case '班长':
      return <Tag color="purple">{tags}</Tag>;
    case '团支书':
      return <Tag color="geekblue">{tags}</Tag>;
    case '学习委员':
      return <Tag color="blue">{tags}</Tag>;
    default:
      return <Tag color="cyan">{tags}</Tag>;
  }
  // const ref = useRef(null);
  // const [newTags, setNewTags] = useState([]);
  // const [inputVisible, setInputVisible] = useState(false);
  // const [inputValue, setInputValue] = useState('');

  // const showInput = () => {
  //   setInputVisible(true);

  //   if (ref.current) {
  //     // eslint-disable-next-line no-unused-expressions
  //     ref.current?.focus();
  //   }
  // };

  // const handleInputChange = (e) => {
  //   setInputValue(e.target.value);
  // };

  // const handleInputConfirm = () => {
  //   let tempsTags = [...newTags];

  //   if (inputValue && tempsTags.filter((tag) => tag.label === inputValue).length === 0) {
  //     tempsTags = [
  //       ...tempsTags,
  //       {
  //         key: `new-${tempsTags.length}`,
  //         label: inputValue,
  //       },
  //     ];
  //   }

  //   setNewTags(tempsTags);
  //   setInputVisible(false);
  //   setInputValue('');
  // };

  // return (
  // <div className={styles.tags}>
  //   <div className={styles.tagsTitle}>
  //     身份
  //     <TagsTwoTone
  //     style={{ marginLeft: '5px' }} />
  //   </div>
  //     {(tags || []).map((item) => (
  //       <Tag key={item.key}>{item.label}</Tag>
  //     ))}
  //     {inputVisible && (
  //       <Input
  //         ref={ref}
  //         type="text"
  //         size="small"
  //         style={{
  //           width: 78,
  //         }}
  //         value={inputValue}
  //         onChange={handleInputChange}
  //         onBlur={handleInputConfirm}
  //         onPressEnter={handleInputConfirm}
  //       />
  //     )}
  //     {!inputVisible && (
  //       <Tag
  //         onClick={showInput}
  //         style={{
  //           borderStyle: 'dashed',
  //         }}
  //       >
  //         <PlusOutlined />
  //       </Tag>
  //     )}
  //   </div>
  // );
};

const Center = () => {
  const [tabKey, setTabKey] = useState('articles'); //  获取用户信息

  const { data: currentUser, loading } = useRequest(() => {
    return queryCurrent();
  }); //  渲染用户信息

  const renderUserInfo = ({ id_user, mailbox, name, sex, _class, phone }) => {
    return (
      <div className={styles.detail}>
        <p>
          <UserOutlined
            style={{
              marginRight: 8,
            }}
          />
          {name}
        </p>
        {sex &&
          (sex === '男' ? (
            <p>
              <ManOutlined
                style={{
                  marginRight: 8,
                }}
              />
              {sex}
            </p>
          ) : (
            <p>
              <WomanOutlined
                style={{
                  marginRight: 8,
                }}
              />
              {sex}
            </p>
          ))}
        {id_user && (
          <p>
            <NumberOutlined
              style={{
                marginRight: 8,
              }}
            />
            {id_user}
          </p>
        )}
        {phone && (
          <p>
            <PhoneOutlined
              style={{
                marginRight: 8,
              }}
            />
            {phone}
          </p>
        )}
        <p>
          <MailOutlined
            style={{
              marginRight: 8,
            }}
          />
          {mailbox}
        </p>
        {/* <p>
          <HomeOutlined
            style={{
              marginRight: 8,
            }}
          />
          {
            (
              geographic || {
                province: {
                  label: '',
                },
              }
            ).province.label
          }
          {
            (
              geographic || {
                city: {
                  label: '',
                },
              }
            ).city.label
          }
        </p> */}
      </div>
    );
  }; // 渲染tab切换

  const renderChildrenByTabKey = (tabValue) => {
    if (tabValue === 'projects') {
      return <Projects />;
    }

    if (tabValue === 'applications') {
      return <Applications />;
    }

    if (tabValue === 'articles') {
      return <Articles />;
    }

    return null;
  };

  return (
    <GridContent>
      <Row gutter={24}>
        <Col lg={7} md={24}>
          <Card
            bordered={false}
            style={{
              marginBottom: 24,
            }}
            loading={loading}
          >
            {!loading && currentUser && (
              <div>
                <div className={styles.avatarHolder}>
                  <img alt="" src={currentUser.avatar} style={{ borderRadius: '50%' }} />
                  <div className={styles.name}>{currentUser.name_user}</div>
                  <div>{currentUser?.signature}</div>
                </div>
                <Divider dashed />
                {renderUserInfo(currentUser)}
                <Divider dashed />
                <div className={styles.tags}>
                  <div className={styles.tagsTitle}>
                    身份
                    <TagsTwoTone style={{ marginLeft: '5px' }} />
                  </div>
                  <TagList tags={currentUser.label || ''} />
                </div>
                <Divider
                  style={{
                    marginTop: 16,
                  }}
                  dashed
                />
                <div className={styles.team}>
                  <div className={styles.teamTitle}>
                    班级
                    <HomeTwoTone style={{ marginLeft: '5px' }} />
                  </div>
                  <Row gutter={36}>
                    {/* {currentUser.notice &&
                      currentUser.notice.map((item) => (
                        <Col key={item.id} lg={24} xl={12}>
                          <Link to={item.href}>
                            <Avatar size="small" src={item.logo} />
                            {item.member}
                          </Link>
                        </Col>
                      ))} */}
                    <Col lg={24} xl={12}>
                      <Avatar size="small" src="/class.jpg" />
                      {currentUser._class}
                    </Col>
                  </Row>
                </div>
              </div>
            )}
          </Card>
        </Col>
        <Col lg={17} md={24}>
          <Card
            className={styles.tabsCard}
            bordered={false}
            tabList={operationTabList}
            activeTabKey={tabKey}
            onTabChange={(_tabKey) => {
              setTabKey(_tabKey);
            }}
          >
            {renderChildrenByTabKey(tabKey)}
          </Card>
        </Col>
      </Row>
    </GridContent>
  );
};

export default Center;
