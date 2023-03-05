const showError = (error: string, toast) => {
  toast({
    title: 'Error.',
    description: error,
    status: 'error',
    position: 'bottom-right',
    duration: 3000,
    isClosable: true,
  });
};

export default showError;
