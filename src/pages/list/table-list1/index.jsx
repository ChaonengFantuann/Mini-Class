import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import {
  ModalForm,
  ProFormDateTimePicker,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
} from '@ant-design/pro-form';
import ProDescriptions from '@ant-design/pro-descriptions';
import UpdateForm from './components/UpdateForm';
import { updateRule, affair, removeAffair, getSelectItem, addAffair, updateAffair } from './service';

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields) => {
  const hide = message.loading('正在添加');

  try {
    await addAffair({ ...fields });
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
    await updateAffair({ ...currentRow, ...fields });
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
    await removeAffair({
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
      title: '编号',
      dataIndex: 'key',
      valueType: 'textarea',
    },
    {
      title: '名称',
      dataIndex: 'name',
      valueType: 'textarea',
    },
    {
      title: '开始时间',
      dataIndex: 'start_tiem',
      valueType: 'dateTime',
    },
    {
      title: '截至时间',
      dataIndex: 'end_tiem',
      valueType: 'dateTime',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: '进行中',
          status: '0',
        },
        1: {
          text: '已结束',
          status: '1',
        },
      },
    },
    // {
    //   title: '班级',
    //   dataIndex: '_class',
    //   // hideInForm: true,
    //   valueEnum: {
    //     0: {
    //       text: '软件2101',
    //       status: '软件2101',
    //     },
    //     1: {
    //       text: '软件21012',
    //       status: '软件2102',
    //     },
    //     2: {
    //       text: '软件2103',
    //       status: '软件2103',
    //     },
    //     3: {
    //       text: '软件2104',
    //       status: '软件2104',
    //     },
    //     4: {
    //       text: '软件2105',
    //       status: '软件2105',
    //     },
    //     5: {
    //       text: '软件z2101',
    //       status: '软件z2101',
    //     },
    //     6: {
    //       text: '软件z2102',
    //       status: '软件z2102',
    //     },
    //   },
    // },
    // {
    //   title: '电话',
    //   dataIndex: 'phone',
    //   valueType: 'textarea',
    // },
    // {
    //   title: '邮箱',
    //   dataIndex: 'mailbox',
    //   valueType: 'textarea',
    // },
    // {
    //   title: '规则名称',
    //   dataIndex: 'name',
    //   tip: '规则名称是唯一的 key',
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
          key="config"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
            console.log(record);
          }}
        >
          编辑
        </a>,
        <a key="subscribeAlert" href="https://procomponents.ant.design/">
          订阅警报
        </a>,
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
            <PlusOutlined /> 添加事务
          </Button>,
        ]}
        request={affair}
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
        title="添加事务"
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
        // style={{ textAlign: 'center' }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: '事务编号为必填项',
            },
          ]}
          width="md"
          name="key"
          placeholder="请输入事务编号"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: '事务名称为必填项',
            },
          ]}
          width="md"
          name="name"
          placeholder="请输入事务名称"
        />
        <ProFormTextArea
          rules={[
            {
              required: true,
              message: '姓名为必填项',
            },
          ]}
          width="md"
          name="remarks"
          placeholder="请输入事务描述"
        />
        <ProFormDateTimePicker
          rules={[
            {
              required: true,
              message: '开始时间为必填项',
            },
          ]}
          width="md"
          name="start_tiem"
          placeholder="请选择开始时间"
        />
        <ProFormDateTimePicker
          rules={[
            {
              required: true,
              message: '结束时间为必填项',
            },
          ]}
          width="md"
          name="end_tiem"
          placeholder="请选择结束时间"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: '链接为必填项',
            },
          ]}
          width="md"
          name="file"
          placeholder="请输入链接"
        />
        <ProFormSelect
          name="select2"
          mode="multiple"
          width="md"
          request={async () => getSelectItem()}
          placeholder="请选择发布人员"
          rules={[{ required: true, message: '发布人员为必填项' }]}
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
