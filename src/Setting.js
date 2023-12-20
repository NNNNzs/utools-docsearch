
/* eslint-disable no-undef */
import { Input, Form, Button, Col, Row, Divider, Space, Tooltip, message } from 'antd';
import { useState, useEffect, } from 'react';
const text = '唤起搜索的关键词，如热键配置【v】分隔符【:】则utools输入【v:】唤起搜索';

function Setting() {

  const [config, setConfig] = useState({ configList: [], split: '' });
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const dbConfig = utools.db.get('config')

  useEffect(() => {
    form.setFieldsValue(dbConfig.data);
    setConfig(dbConfig.data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const cancalConfig = () => {
    const dbConfig = utools.db.get('config')
    form.setFieldsValue(dbConfig.data);
    setConfig(dbConfig.data)
  }

  const rules = [{ required: true, }];

  const validateMessages = {
    // eslint-disable-next-line no-template-curly-in-string
    required: '${label}必填!',
  }

  const onFinish = (values) => {
    if (!values.configList) {
      values.configList = []
    }
    const dbConfig = utools.db.get('config')
    utools.db.put({
      _id: 'config',
      data: values,
      _rev: dbConfig._rev
    })
    messageApi.info('保存成功')
    window.applyConfig();
  }

  const addConfig = () => {
    const newConfig = form.getFieldsValue();
    newConfig.configList.push({
      id: new Date().valueOf(),
      title: '',
      hotKey: '',
      appId: '',
      indexName: '',
      apiKey: '',
      disabled: false,
    });

    setConfig(newConfig)
    form.setFieldsValue(newConfig);

  }

  const removeConfig = (index) => {
    const newConfig = form.getFieldsValue();
    newConfig.configList.splice(index, 1);
    setConfig(newConfig);
    form.setFieldsValue(newConfig);
  }


  return (
    <Form
      name="basic"
      autoComplete="off"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      style={{ maxWidth: 1200 }}
      initialValues={config}
      form={form}
      validateMessages={validateMessages}

    >
      {contextHolder}
      <Row>
        <Col span={8}>
          <Tooltip placement="bottom" title={text}>
            <Form.Item label="分隔符" rules={rules} name={['split']}>
              <Input placeholder=':' />
            </Form.Item>
          </Tooltip>
        </Col>
      </Row>
      {
        config.configList.map((e, index) => {
          return (
            <div key={e.id}>
              <Row>
                <Col span={8}>
                  <Form.Item label="名称" rules={rules} name={['configList', index, 'title']}>
                    <Input placeholder='vuejs.org' />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="热键" rules={rules} name={['configList', index, 'hotKey']}>
                    <Input placeholder='v' />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label="appId" rules={rules} name={['configList', index, 'appId']}>
                    <Input placeholder='74Q4ZJS***' />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={8}>
                  <Form.Item label="apiKey" rules={rules} name={['configList', index, 'apiKey']} >
                    <Input placeholder='docsearch的apiKey' />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label="indexName" rules={rules} name={['configList', index, 'indexName']}>
                    <Input laceholder='docsearch的indexName' />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label=' ' colon={false}>
                    <Space>
                      <Button type="primary" onClick={() => { removeConfig(index) }}>
                        移除
                      </Button>
                    </Space>
                  </Form.Item>
                </Col>
              </Row>
              <Divider></Divider>
            </div >
          )
        })
      }
      <Row justify="end">
        <Space>
          <Button type="primary" onClick={addConfig}>
            添加
          </Button>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
          <Button type="primary" onClick={cancalConfig}>
            取消
          </Button>
        </Space>
      </Row>
    </Form >
  );
}
export default Setting;