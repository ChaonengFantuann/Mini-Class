import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import ProDescriptions from '@ant-design/pro-descriptions';
import UpdateForm from './components/UpdateForm';
import { updateRule, removeRule, member, addMember, removeMember } from './service';

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields) => {
  const hide = message.loading('正在添加');

  try {
    await addMember({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};
/**
 * 更新节点
 *
 * @param fields
 */

const handleUpdate = async (fields, currentRow) => {
  const hide = message.loading('正在配置');

  try {
    await updateRule({ ...currentRow, ...fields });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};
/**
 * 删除节点
 *
 * @param selectedRows
 */

const handleRemove = async (selectedRows) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeMember({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList = () => {
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState(false); // 新建表单可见状态
  /** 分布更新窗口的弹窗 */

  const [updateModalVisible, handleUpdateModalVisible] = useState(false); // 每行编辑按钮触发表单是否可见
  const [showDetail, setShowDetail] = useState(false); // 右侧抽屉是否可见
  const actionRef = useRef();
  const [currentRow, setCurrentRow] = useState(); // 当前行数据
  const [selectedRowsState, setSelectedRows] = useState([]); // 底部批量操作工具栏可见状态
  /** 国际化配置 */

  //表单列配置
  const columns = [
    {
      title: '学号',
      dataIndex: 'id_user',
      valueType: 'textarea',
    },
    {
      title: '用户名',
      dataIndex: 'name_user',
      valueType: 'textarea',
    },
    {
      title: '姓名',
      tip: '真实姓名',
      dataIndex: 'name',
      valueType: 'textarea',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      valueEnum: {
        0: {
          text: '男',
          status: 'male',
        },
        1: {
          text: '女',
          status: 'female',
        },
      },
    },
    {
      title: '班级',
      dataIndex: '_class',
      // hideInForm: true,
      valueEnum: {
        0: {
          text: '软件2101',
          status: '软件2101',
        },
        1: {
          text: '软件21012',
          status: '软件2102',
        },
        2: {
          text: '软件2103',
          status: '软件2103',
        },
        3: {
          text: '软件2104',
          status: '软件2104',
        },
        4: {
          text: '软件2105',
          status: '软件2105',
        },
        5: {
          text: '软件z2101',
          status: '软件z2101',
        },
        6: {
          text: '软件z2102',
          status: '软件z2102',
        },
      },
    },
    {
      title: '电话',
      dataIndex: 'phone',
      valueType: 'textarea',
    },
    {
      title: '邮箱',
      dataIndex: 'mailbox',
      valueType: 'textarea',
    },
    // {
    //   title: '规则名称',
    //   dataIndex: 'id_user',
    //   // tip: '规则名称是唯一的 key',
    //   render: (dom, entity) => {
    //     console.log(dom);
    //     console.log(entity);
    //     return (
    //       <a
    //         onClick={() => {
    //           setCurrentRow(entity);
    //           setShowDetail(true);
    //         }}
    //       >
    //         {dom}
    //       </a>
    //     );
    //   },
    // },
    // {
    //   title: '描述',
    //   dataIndex: 'desc',
    //   valueType: 'textarea',
    // },
    // {
    //   title: '服务调用次数',
    //   dataIndex: 'callNo',
    //   sorter: true,
    //   hideInForm: true,
    //   renderText: (val) => `${val}万`,
    // },
    // {
    //   title: '状态',
    //   dataIndex: 'status',
    //   hideInForm: true,
    //   valueEnum: {
    //     0: {
    //       text: '关闭',
    //       status: 'Default',
    //     },
    //     1: {
    //       text: '运行中',
    //       status: 'Processing',
    //     },
    //     2: {
    //       text: '已上线',
    //       status: 'Success',
    //     },
    //     3: {
    //       text: '异常',
    //       status: 'Error',
    //     },
    //   },
    // },
    // {
    //   title: '上次调度时间',
    //   sorter: true,
    //   dataIndex: 'updatedAt',
    //   valueType: 'dateTime',
    //   renderFormItem: (item, { defaultRender, ...rest }, form) => {
    //     console.log(item);
    //     const status = form.getFieldValue('status');

    //     if (`${status}` === '0') {
    //       return false;
    //     }

    //     if (`${status}` === '3') {
    //       return <Input {...rest} placeholder="请输入异常原因！" />;
    //     }

    //     return defaultRender(item);
    //   },
    // },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="delet"
          onClick={async () => {
            console.log(record);
            await handleRemove([record]);
          }}
        >
          移除成员
        </a>,
        // <a
        //   key="config"
        //   onClick={() => {
        //     handleUpdateModalVisible(true);
        //     setCurrentRow(record);
        //   }}
        // >
        //   编辑
        // </a>,
        // <a key="subscribeAlert" href="https://procomponents.ant.design/">
        //   订阅警报
        // </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> 添加成员
          </Button>,
        ]}
        request={member}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {/* 批量操作栏 */}
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
              <span>
                服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo, 0)} 万
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}
      {/* 新建窗口的弹窗 */}
      <ModalForm
        title="添加成员"
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value);

          if (success) {
            handleModalVisible(false);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: '学号为必填项',
            },
          ]}
          width="md"
          name="id_user"
          label="学号"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: '邮箱为必填项',
            },
          ]}
          width="md"
          name="mailbox"
          label="邮箱"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: '姓名为必填项',
            },
          ]}
          width="md"
          name="name"
          label="姓名"
        />
      </ModalForm>
      {/* 编辑窗口的弹窗 */}
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value, currentRow);

          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />
      {/* 右侧详情抽屉 */}
      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
