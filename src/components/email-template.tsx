import * as React from 'react';

interface EmailTemplateProps {
  username: string;
  verifyCode:string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  username,verifyCode
}) => (
  <div>
    <h1>Welcome, {username}!</h1>
    <h3>This is your Verification Code, {verifyCode}</h3>
  </div>
);
