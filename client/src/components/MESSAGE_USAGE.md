# Message Component Usage Guide

This document explains how to use the Ant Design message component that has been integrated into the Roaming Roomies application.

## Basic Usage

The message component provides a simple way to display feedback to users. It appears at the top of the screen and automatically disappears after a few seconds.

### Import the hook

```tsx
import { useMessage } from './components/MessageProvider';
```

### Use in your component

```tsx
const YourComponent = () => {
  const message = useMessage();
  
  const handleSomeAction = () => {
    // Show a success message
    message.success('Operation completed successfully!');
  };
  
  return (
    <button onClick={handleSomeAction}>
      Do Something
    </button>
  );
};
```

## Available Methods

The message API provides several methods for different types of notifications:

- `message.success(content, [duration], [onClose])` - Show success message
- `message.error(content, [duration], [onClose])` - Show error message
- `message.warning(content, [duration], [onClose])` - Show warning message
- `message.info(content, [duration], [onClose])` - Show information message
- `message.loading(content, [duration], [onClose])` - Show loading message

Parameters:
- `content`: ReactNode - The content of the message
- `duration`: number (optional) - Time in seconds before the message closes (default: 3)
- `onClose`: function (optional) - Callback when the message is closed

## Advanced Usage

For more complex configurations, you can use the `open` method:

```tsx
message.open({
  type: 'success',
  content: 'Custom configuration message',
  duration: 5,
  icon: <CustomIcon />,
  className: 'custom-class',
  // other configuration options
});
```

## Example

See the `MessageDemo.tsx` component for a complete example of all message types.

## Global Configuration

The MessageProvider is already set up in the application's root, so you can use the message component anywhere in the application without additional setup.
