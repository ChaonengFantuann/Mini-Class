import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Upload, message } from 'antd';
import ProForm, {
  ProFormDependency,
  ProFormFieldSet,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { useRequest } from 'umi';
import { queryCurrent, setCurrentUser } from '../service';
import { queryProvince, queryCity } from '../service';
import styles from './BaseView.less';

const validatorPhone = (rule, value, callback) => {
  if (!value[0]) {
    callback('Please input your area code!');
  }

  if (!value[1]) {
    callback('Please input your phone number!');
  }

  callback();
}; // 头像组件 方便以后独立，增加裁剪之类的功能

const AvatarView = ({ avatar }) => (
  <>
    <div className={styles.avatar_title}>头像</div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload showUploadList={false}>
      <div className={styles.button_view}>
        <Button>
          <UploadOutlined />
          更换头像
        </Button>
      </div>
    </Upload>
  </>
);

const BaseView = () => {
  const { data: currentUser, loading } = useRequest(() => {
    return queryCurrent();
  });

  const getAvatarURL = () => {
    if (currentUser) {
      if (currentUser.avatar) {
        return currentUser.avatar;
      }

      const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
      return url;
    }

    return '';
  };

  const handleFinish = async (values) => {
    // console.log(values);
    await setCurrentUser(values);
    message.success('更新基本信息成功');
  };

  return (
    <div className={styles.baseView}>
      {loading ? null : (
        <>
          <div className={styles.left}>
            <ProForm
              layout="vertical"
              onFinish={handleFinish}
              submitter={{
                resetButtonProps: {
                  style: {
                    display: 'none',
                  },
                },
                submitButtonProps: {
                  children: '更新基本信息',
                },
              }}
              initialValues={{ ...currentUser }}
              hideRequiredMark
            >
               <ProFormText
                width="md"
                name="name_user"
                label="用户名"
                rules={[
                  {
                    required: true,
                    message: '请输入您的用户名!',
                  },
                ]}
              />
              <ProFormText
                width="md"
                name="mailbox"
                label="邮箱"
                rules={[
                  {
                    required: true,
                    message: '请输入您的邮箱!',
                  },
                ]}
              />
              <ProFormText
                width="md"
                name="name"
                label="真实姓名"
                rules={[
                  {
                    required: true,
                    message: '请输入您的真实姓名!',
                  },
                ]}
              />
              <ProFormText
                width="md"
                name="id_user"
                label="学号"
                rules={[
                  {
                    required: true,
                    message: '请输入您的学号!',
                  },
                ]}
              />
              <ProFormTextArea
                name="signature"
                label="个性签名"
                rules={[
                  {
                    required: true,
                    message: '请输入个性签名!',
                  },
                ]}
                placeholder="个性签名"
              />
              <ProFormSelect
                width="sm"
                name="sex"
                label="性别"
                rules={[
                  {
                    required: true,
                    message: '请输入您的性别!',
                  },
                ]}
                options={[
                  {
                    label: '男',
                    value: 'male',
                  },
                  {
                    label: '女',
                    value: 'female',
                  },
                ]}
              />
              <ProFormSelect
                width="md"
                name="_class"
                label="班级"
                rules={[
                  {
                    required: true,
                    message: '请输入您的班级!',
                  },
                ]}
                options={[
                  {
                    label: '软件2101',
                    value: '软件2101',
                  },
                  {
                    label: '软件2102',
                    value: '软件2102',
                  },
                  {
                    label: '软件2103',
                    value: '软件2103',
                  },
                  {
                    label: '软件2104',
                    value: '软件2104',
                  },
                  {
                    label: '软件2105',
                    value: '软件2105',
                  },
                  {
                    label: '软件z2101',
                    value: '软件z2101',
                  },
                  {
                    label: '软件z2102',
                    value: '软件z2102',
                  },            
                ]}
              />
              <ProFormText
                width="md"
                name="phone"
                label="手机号"
                rules={[
                  {
                    required: true,
                    message: '请输入您的手机号!',
                  },
                ]}
              />
              {/* <ProForm.Group title="所在省市" size={8}>
                <ProFormSelect
                  rules={[
                    {
                      required: true,
                      message: '请输入您的所在省!',
                    },
                  ]}
                  width="sm"
                  fieldProps={{
                    labelInValue: true,
                  }}
                  name="province"
                  className={styles.item}
                  request={async () => {
                    return queryProvince().then(({ data }) => {
                      return data.map((item) => {
                        return {
                          label: item.name,
                          value: item.id,
                        };
                      });
                    });
                  }}
                />
                <ProFormDependency name={['province']}>
                  {({ province }) => {
                    return (
                      <ProFormSelect
                        params={{
                          key: province?.value,
                        }}
                        name="city"
                        width="sm"
                        rules={[
                          {
                            required: true,
                            message: '请输入您的所在城市!',
                          },
                        ]}
                        disabled={!province}
                        className={styles.item}
                        request={async () => {
                          if (!province?.key) {
                            return [];
                          }

                          return queryCity(province.key || '').then(({ data }) => {
                            return data.map((item) => {
                              return {
                                label: item.name,
                                value: item.id,
                              };
                            });
                          });
                        }}
                      />
                    );
                  }}
                </ProFormDependency>
              </ProForm.Group> */}
              {/* <ProFormText
                width="md"
                name="address"
                label="街道地址"
                rules={[
                  {
                    required: true,
                    message: '请输入您的街道地址!',
                  },
                ]}
              /> */}
              {/* <ProFormFieldSet
                name="phone"
                label="联系电话"
                rules={[
                  {
                    required: true,
                    message: '请输入您的联系电话!',
                  },
                  {
                    validator: validatorPhone,
                  },
                ]}
              >
                <Input className={styles.area_code} />
                <Input className={styles.phone_number} />
              </ProFormFieldSet> */}
            </ProForm>
          </div>
          {/* <div className={styles.right}>
            <AvatarView avatar={getAvatarURL()} />
          </div> */}
        </>
      )}
    </div>
  );
};

export default BaseView;
