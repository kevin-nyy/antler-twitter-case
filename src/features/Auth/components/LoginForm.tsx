
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Form, Input, Button, Typography } from 'antd';
import { useState } from 'react';

type FormValues = {
  email: string;
  password: string;
}

enum LoginError {
  INVALID_EMAIL = 'auth/invalid-email',
  INVALID_PASSWORD = 'auth/wrong-password',
  USER_NOT_FOUND = 'auth/user-not-found',
}

const LoginForm = () => {
  const { Text } = Typography;
  const auth = getAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);

  // TODO - email link instead - https://firebase.google.com/docs/auth/web/email-link-auth?authuser=0#send_an_authentication_link_to_the_users_email_address
  const onLogin = async ({ email, password }: FormValues) => {
    try {
      // this function has a side effect which modifies the auth object
      await signInWithEmailAndPassword(auth, email, password);
      setSubmitError(null);
    } catch (errorInfo) {
      processLoginFailed(errorInfo)
    }
  };

  const onLoginFailed = (errorInfo: any) => {
    processLoginFailed(errorInfo);
  };

  const processLoginFailed = ({ code }: any) => {
    switch (code) {
      case LoginError.INVALID_EMAIL:
      case LoginError.INVALID_PASSWORD:
        setSubmitError("Please check your credentials.");
        break;
      case LoginError.USER_NOT_FOUND:
      default: // we dont want to give away security info
        setSubmitError("Email is not registered, please contact admin.");
        break;
    }
  }

  return (
    <Form
      name="login"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 18,
      }}
      initialValues={{
        remember: true,
        requiredMarkValue: false,
      }}
      requiredMark={false}
      onFinish={onLogin}
      onFinishFailed={onLoginFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            type: 'email',
            message: 'Enter your email address.',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Enter your password.',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          span: 14,
          offset: 4,
        }}
      >

        <div>
          <Button type="primary" htmlType="submit">
            <span>Login</span>
          </Button>
        </div>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          span: 18,
          offset: 4,
        }}
      >
        <Text type="danger">
          <span>{submitError}</span>
        </Text>
      </Form.Item>
    </Form>
  );
}
export default LoginForm;
