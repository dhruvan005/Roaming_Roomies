import React, { createContext, useContext } from 'react';
import { message } from 'antd';
import type { ArgsProps as MessageArgsProps } from 'antd/es/message';
import type { MessageInstance } from 'antd/es/message/interface';

// Create a context to hold the message instance
const MessageContext = createContext<MessageInstance | null>(null);

/**
 * Provider component that makes the message API available throughout the app
 */
export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <MessageContext.Provider value={messageApi}>
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
};

/**
 * Custom hook to use the message API
 */
export const useMessage = () => {
  const messageApi = useContext(MessageContext);
  
  if (!messageApi) {
    throw new Error('useMessage must be used within a MessageProvider');
  }
  
  return {
    success: (content: React.ReactNode, duration?: number, onClose?: () => void) => {
      messageApi.success({
        content,
        duration: duration || 3,
        onClose,
      });
    },
    error: (content: React.ReactNode, duration?: number, onClose?: () => void) => {
      messageApi.error({
        content,
        duration: duration || 3,
        onClose,
      });
    },
    warning: (content: React.ReactNode, duration?: number, onClose?: () => void) => {
      messageApi.warning({
        content,
        duration: duration || 3,
        onClose,
      });
    },
    info: (content: React.ReactNode, duration?: number, onClose?: () => void) => {
      messageApi.info({
        content,
        duration: duration || 3,
        onClose,
      });
    },
    loading: (content: React.ReactNode, duration?: number, onClose?: () => void) => {
      messageApi.loading({
        content,
        duration: duration || 3,
        onClose,
      });
    },
    // For more advanced usage
    open: (config: MessageArgsProps) => {
      messageApi.open(config);
    },
  };
};
