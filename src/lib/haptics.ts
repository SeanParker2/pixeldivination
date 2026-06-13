export const triggerHaptic = (type: 'light' | 'medium' | 'heavy' | 'success') => {
  if (!navigator.vibrate) return;

  switch (type) {
    case 'light':
      navigator.vibrate(10);
      break;
    case 'medium':
      navigator.vibrate(40);
      break;
    case 'heavy':
      navigator.vibrate(80);
      break;
    case 'success':
      navigator.vibrate([10, 30, 10, 30]);
      break;
  }
};
