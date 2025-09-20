'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Badge } from '@/components/ui/badge';

export const UserProfile = () => {
  const { user, isPremium, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
            {user.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-600">멤버십</span>
          <Badge variant={isPremium ? 'default' : 'outline'}>
            {isPremium ? '프리미엄' : '일반'}
          </Badge>
        </div>

        {isPremium && (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-3 rounded-lg mb-4">
            <p className="text-sm font-medium">🎉 프리미엄 혜택을 누리고 계세요!</p>
          </div>
        )}

        <div className="space-y-2 text-sm text-gray-600">
          <p>가입일: {new Date(user.createdAt).toLocaleDateString('ko-KR')}</p>
          <p>마지막 업데이트: {new Date(user.updatedAt).toLocaleDateString('ko-KR')}</p>
        </div>

        <Button onClick={logout} variant="outline" className="w-full mt-4">
          로그아웃
        </Button>
      </div>
    </div>
  );
};
