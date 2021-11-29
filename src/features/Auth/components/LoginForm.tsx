
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Form, Input, Button, Typography } from 'antd';
import { useState } from 'react';

import { css } from 'emotion';

type FormValues = {
  email: string;
  password: string;
}

enum LoginError {
  INVALID_EMAIL = 'auth/invalid-email',
  INVALID_PASSWORD = 'auth/wrong-password',
  USER_NOT_FOUND = 'auth/user-not-found',
}

const styles = {
  // submitError: css({
  //   marginTop: -24, // accomodate ant form item margin
  // })
}

const LoginForm = (props: any) => {
  const { Text } = Typography;
  const auth = getAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);

  // docs: https://firebase.google.com/docs/auth/web/password-auth
  // TODO - email link instead - https://firebase.google.com/docs/auth/web/email-link-auth?authuser=0#send_an_authentication_link_to_the_users_email_address
  // TODO - implement auth context
  // In your apps, the recommended way to know the auth status of your user is to set an observer on the Auth object. You can then get the user's basic profile information from the User object. See Manage Users.
  // TODO - sign out
  const onLogin = async ({ email, password }: FormValues) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setSubmitError(null);
      // TODO - set auth context
      console.log('success', userCredential.user);
      const user = userCredential.user;

    } catch (errorInfo) {
      processLoginFailed(errorInfo)
    }
  };

  const onLoginFailed = (errorInfo: any) => {
    processLoginFailed(errorInfo);
  };

  const processLoginFailed = ({ code }: any) => {
    console.log('Failed:', code);
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
