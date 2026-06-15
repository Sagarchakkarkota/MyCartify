import { createNavigationContainerRef } from '@react-navigation/native';

// RootNavigator contains `App` and `Auth` stacks; we'll navigate into nested stacks.
export const navigationRef = createNavigationContainerRef<any>();

