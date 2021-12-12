
import { getAuth, isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink } from "firebase/auth";
import { Form, Input, Button, Typography } from 'antd';
import { useEffect, useState } from 'react';

type FormValues = {
  email: string;
}

enum LoginError {
  INVALID_EMAIL = 'auth/invalid-email',
  USER_NOT_FOUND = 'auth/user-not-found',
  INVALID_ACTION_CODE = 'auth/invalid-action-code',
  USER_DISABLED = 'auth/user-disabled',
}

const actionCodeSettings = {
  url: window.location.href, // this url will be used in the link generated and sent via email
  handleCodeInApp: true, // This must be true. Docs: https://firebase.google.com/docs/auth/web/email-link-auth?authuser=0
};


const LoginForm = () => {
  const { Text } = Typography;
  const auth = getAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isUsingEmailLink = isSignInWithEmailLink(auth, window.location.href);

  const onLogin = async ({ email }: FormValues) => {
    setIsLoading(true);
    try {
      if (isUsingEmailLink) {
        await processSignIn(email);
        // bunnyngemail@gmail.com
      } else {
        await sendSignInLinkToEmail(auth, email, actionCodeSettings)
        window.localStorage.setItem('emailForSignIn', email)
      }
      setSubmitError(null);
      setIsDisabled(true);
    } catch (errorInfo) {
      processLoginFailed(errorInfo)
    }
    setIsLoading(false);
  };

  const onLoginFailed = (errorInfo: any) => {
    processLoginFailed(errorInfo);
  };

  const processLoginFailed = ({ code }: any) => {
    switch (code) {
      case LoginError.INVALID_EMAIL:
        setSubmitError("Please check your credentials.");
        break;
      case LoginError.INVALID_ACTION_CODE:
        setSubmitError("Login code has been used/expired.");
        break;
      case LoginError.USER_NOT_FOUND:
      default: // we dont want to give away security info
        setSubmitError("Email is not registered, please contact admin.");
        break;
    }
  }

  const processSignIn = async (email: string) => {
    try {
      await signInWithEmailLink(auth as any, email as string, window.location.href);
    } catch (err) {
      console.error('Error: Something went wrong with signin via email link ', err);
      processLoginFailed(err)
    }
    window.localStorage.removeItem('emailForSignIn');
  }

  useEffect(() => { // auto login if link params are avaliable
    if (!isUsingEmailLink) {
      return;
    }
    const email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      window.location.href = window.location.origin; // handle with refresh to remove stale params
      return;
    }
    processSignIn(email);
  }, [isUsingEmailLink]);

  const getLoginButtonLabel = () => {
    if (isUsingEmailLink) {
      if (isLoading || isDisabled) {
        return 'Signing in...';
      }
      return 'Login';
    }
    return isDisabled  ? 'Email Link Sent!' : 'Send link via email'
  }

  return (
    <Form
      layout="inline"
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
        wrapperCol={{
          span: 14,
          offset: 4,
        }}
      >
        <div>
          <Button disabled={isDisabled} loading={isLoading} type="primary" htmlType="submit">
            <span>{getLoginButtonLabel()}</span>
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
