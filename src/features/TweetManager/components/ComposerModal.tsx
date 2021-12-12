import { Button, Modal, Upload, Form, message as messageAlert } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import { css } from 'emotion';
import { useState } from 'react';
import { uploadToFirebaseStorage, getFirebaseStorageObjectUrl } from '../../../config/configureFirebase';
import { UploadFile } from 'antd/lib/upload/interface';
import axios from 'axios';
import useToken from '../../../common/hooks/useAuth';
import { Timestamp } from '@google-cloud/firestore';



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

  const { token } = useToken();
  const { isVisible, onConfirm, onDismiss } = props;
  const [loading, setLoading] = useState(false);
  const [tweetImage, setTweetImage] = useState<(File | null)>(null);
  const [hasBody, setHasBody] = useState(false);
  const DEFAULT_TWEET_LENGTH = 280;
  const [remainder, setRemainder] = useState<number>(DEFAULT_TWEET_LENGTH);

  const [form] = Form.useForm();

  const onCancel = () => {
    onDismiss();
  };

  const onFormSubmit = async ({ tweetBody: message }: any) => {
    setLoading(true);
    let media = null;
    if (tweetImage) {
      const uploadResult = await uploadToFirebaseStorage(tweetImage);
      const downloadURL = getFirebaseStorageObjectUrl(uploadResult.metadata.bucket, uploadResult.metadata.fullPath);
      media = [{
        name: uploadResult.metadata.name,
        downloadURL,
        lastModifiedTS: new Date(uploadResult.metadata.timeCreated).valueOf(),
        ref: uploadResult.ref.toString(),
      }]
    }
    if (!token) {
      return;
    }
    try {
      await axios({
        method: 'post',
        url: process.env.REACT_APP_ENDPOINT_ROWY_CREATE_ROW,
        data: {
          message,
          media,
          _createdBy: {
            displayName: token.displayName,
            email: token.email,
            emailVerified: token.emailVerified,
            isAnonymous: token.isAnonymous,
            photoURL: token.photoURL,
            uid: token.uid,
            timestamp: Timestamp.now().toMillis()
          }
        },
        headers: { Authorization: `Bearer ${(token as any).accessToken}` }
      });

      setRemainder(DEFAULT_TWEET_LENGTH);
      form.resetFields();
      setHasBody(false);
      setTweetImage(null);
      onConfirm();
      setLoading(false);
      messageAlert.success('Tweet has been sent for approval.');
    } catch (e) {
      console.error('Error sending tweet for approval: ', e);
      messageAlert.error('Something went wrong..please contact the admin of this app.');
    }
  }

  const onTweetChanged = (evt: any) => {
    const value = evt?.target?.value;
    if (!value) {
      setHasBody(false);
      return;
    }
    if (!hasBody) {
      setHasBody(true);
    }
    setRemainder(DEFAULT_TWEET_LENGTH - value.length);
  };

  const handleFileUpload = ({ data, file, onSuccess }: any) => {
    setTweetImage(file);
    onSuccess(null, file, null)
  };

  const handleRemoveFileUpload = (file: UploadFile) => {
    setTweetImage(null);
    return true;
  }

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <>
      <Form form={form} name="control-hooks" preserve={false} onFinish={onFormSubmit}>
        <Modal
          wrapClassName={styles.composor}
          title="Compose Tweet"
          visible={isVisible}
          onOk={form.submit}
          confirmLoading={false}
          onCancel={onCancel}
          footer={[
            <span className={styles.remainder} key="remainder">{`${remainder} characters left`}</span>,
            <div key="composer-modal-footer-button-container">
              <Button key="back" onClick={onCancel}>
                Dismiss
              </Button>
              <Button key="submit" type="primary" disabled={remainder < 0 || !hasBody} htmlType="submit" loading={loading} onClick={form.submit}>
                Tweet
              </Button></div>,
          ]}
        >
          <Form.Item
            noStyle name="tweetBody">
            <TextArea rows={4} onChange={onTweetChanged} className="form-control"></TextArea>
          </Form.Item>
          <br /> <br />
          <Form.Item noStyle name="tweetImage" valuePropName={'fileList'} getValueFromEvent={normFile}>
            <Upload
              customRequest={handleFileUpload} // Docs: https://github.com/react-component/upload#customrequest
              maxCount={1}
              accept={".gif, .png, .jpg, .jpeg"}
              listType="picture"
              className="upload-list-inline"
              onRemove={handleRemoveFileUpload}
            >
              <Button icon={<UploadOutlined />}>Add Image</Button>
            </Upload>
          </Form.Item>
        </Modal>
      </Form>
    </>
  );
};

export default ComposerModal;