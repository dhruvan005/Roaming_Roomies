import React from 'react';
import { Button, Space } from 'antd';
import { useMessage } from './MessageProvider';

/**
 * A demo component to showcase the usage of the message component
 */
const MessageDemo: React.FC = () => {
  const message = useMessage();

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Message Component Demo</h2>
      <Space>
        <Button 
          type="primary" 
          onClick={() => message.success('This is a success message')}
        >
          Success
        </Button>
        <Button 
          danger 
          onClick={() => message.error('This is an error message')}
        >
          Error
        </Button>
        <Button 
          onClick={() => message.warning('This is a warning message')}
        >
          Warning
        </Button>
        <Button 
          onClick={() => message.info('This is an information message')}
        >
          Info
        </Button>
        <Button 
          onClick={() => message.loading('Loading...', 2.5)}
        >
          Loading
        </Button>
        <Button 
          onClick={() => 
            message.open({
              type: 'success',
              content: 'Custom configuration message',
              duration: 5,
              icon: <span>🎉</span>,
            })
          }
        >
          Custom Config
        </Button>
      </Space>
    </div>
  );
};

export default MessageDemo;
