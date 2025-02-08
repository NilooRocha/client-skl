import { useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';

import { useAuth } from '~/hooks/useAuth';

// Navigation guard component
export default function NavigationGuard({ children }: { children: JSX.Element }) {
  const router = useRouter();

  return children;
}
