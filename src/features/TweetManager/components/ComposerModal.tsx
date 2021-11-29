import { Button, Modal, Form } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { css } from 'emotion';
import { useState } from 'react';
import Composer from './Composer';

interface ComposerModalProps {
  isVisible: boolean;
  onConfirm: Function;
  onDismiss: Function;
};

const styles = {
  composor: css({
    '.ant-modal-footer': {
      display: 'flex',
      justifyContent: 'space-between',
    }
  }),
  remainder: css({

  }),
}

const ComposerModal = (props: ComposerModalProps) => {


  // const [visible, setVisible] = useState(false);
  const { isVisible, onConfirm, onDismiss } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const [loading, setLoading] = useState(false);

  const DEFAULT_TWEET_LENGTH = 140;
  const [remainder, setRemainder] = useState<number>(DEFAULT_TWEET_LENGTH);

  const [form] = Form.useForm();
  // TODO - change to onOkay 
  const handleOk = () => {
    // console.log(form);
    form.submit();
    // debugger;
    setModalText('The modal will be closed after two seconds');
    setLoading(true);
    setTimeout(() => {
      onConfirm();
      setLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    onDismiss();
  };

  const onFormSubmit = (values: any) => {
    console.log('test -- ', values);
  }

  const onTweetChanged = (evt: any) => {
    console.log(evt);
    // form.setFieldsValue({
    //   msg: evt?.target?.value || '',
    // });
    //   return 140 - 23 - (this.state.text.length);
    // } else {
    //     return 140 - (this.state.text.length);
    //   }
    const value = evt?.target?.value;
    if (!value) {
      return;
    }
    setRemainder(DEFAULT_TWEET_LENGTH - value.length);
  };

  return (
    <>
    <Form form={form} name="control-hooks" preserve={false} onFinish={onFormSubmit}>
        <Modal
          wrapClassName={styles.composor}
          title="Compose Tweet"
          visible={isVisible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          footer={[
            <span className={styles.remainder} key="remainder">{`${remainder} characters left`}</span>,
            <div>
            <Button key="back" onClick={handleCancel}>
              Dismiss
            </Button>
            <Button key="submit" type="primary" disabled={remainder < 0} htmlType="submit" loading={loading} onClick={handleOk}>
              Tweet
            </Button></div>,
          ]}
        >
          
          {/* <p>{modalText}</p> */}
          {/* <Composer form={form}></Composer>
           */}



  <Form.Item
  noStyle name="msg">
<TextArea rows={4} onChange={onTweetChanged} className="form-control"></TextArea>
</Form.Item>
          
        </Modal>
        </Form>
    </>
  );
};

export default ComposerModal;