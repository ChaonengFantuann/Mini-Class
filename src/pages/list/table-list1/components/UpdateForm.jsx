import React from 'react';
import { Modal } from 'antd';
import {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
  ProFormRadio,
  ProFormDateTimePicker,
} from '@ant-design/pro-form';
import { getSelectItem } from '../service';

// 每行编辑表单
const UpdateForm = (props) => {
  return (
    <StepsForm
      stepsProps={{
        size: 'small',
      }}
      stepsFormRender={(dom, submitter) => {
        return (
          <Modal
            width={640}
            bodyStyle={{
              padding: '32px 40px 48px',
            }}
            destroyOnClose
            title="规则配置"
            visible={props.updateModalVisible}
            footer={submitter}
            onCancel={() => {
              props.onCancel();
            }}
          >
            {dom}
          </Modal>
        );
      }}
      onFinish={props.onSubmit}
    >
      <StepsForm.StepForm
        initialValues={{
          key: props.values.key,
          name: props.values.name,
          remarks: props.values.remarks,
        }}
        title="基本信息"
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
          label="事务编号"
          placeholder="请输入事务编号"
        />
        <ProFormText
          width="md"
          name="name"
          label="事务名称"
          placeholder="请输入事务名称"
          rules={[
            {
              required: true,
              message: '事务名称为必填项',
            },
          ]}
        />
        <ProFormTextArea
          name="remarks"
          width="md"
          label="事务详情"
          placeholder="请输入至少五个字符"
          rules={[
            {
              required: true,
              message: '请输入至少五个字符的详情描述！',
              min: 5,
            },
          ]}
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          start_tiem: props.values.start_tiem,
          end_tiem: props.values.end_tiem,
        }}
        title="配置规则属性"
      >
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
          label="开始时间"
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
          label="结束时间"
        />
        {/* <ProFormSelect
          name="target"
          width="md"
          label="监控对象"
          valueEnum={{
            0: '表一',
            1: '表二',
          }}
        />
        <ProFormSelect
          name="template"
          width="md"
          label="规则模板"
          valueEnum={{
            0: '规则模板一',
            1: '规则模板二',
          }}
        />
        <ProFormRadio.Group
          name="type"
          label="规则类型"
          options={[
            {
              value: '0',
              label: '强',
            },
            {
              value: '1',
              label: '弱',
            },
          ]}
        /> */}
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          file: props.values.file,
          user_id: props.values.user_id,
        }}
        title="设定调度周期"
      >
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
          name="user_id"
          mode="multiple"
          width="md"
          request={async () => getSelectItem()}
          placeholder="请选择发布人员"
          rules={[{ required: true, message: '发布人员为必填项' }]}
        />
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default UpdateForm;
