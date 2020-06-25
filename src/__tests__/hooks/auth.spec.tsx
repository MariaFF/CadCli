import { renderHook } from '@testing-library/react-hooks';
import { useAuth, AuthProvider } from '../../hooks/auth';

describe('Auth hook', () => {
  it('should be able to setItem', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    result.current.signIn();

    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalled();
  });
});
