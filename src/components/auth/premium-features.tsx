'use client';

import { useAuth } from '@/hooks/useAuth';
import { Badge } from '@/components/ui/badge';

export const PremiumFeatures = () => {
  const { isPremium } = useAuth();

  if (!isPremium) return null;

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-sm text-gray-600">특별한 혜택을 누려보세요</span>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">✨</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">AI 뉴스 요약</h4>
              <p className="text-sm text-gray-600">더 정확하고 상세한 AI 분석</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">📊</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">고급 차트 분석</h4>
              <p className="text-sm text-gray-600">심화된 데이터 시각화</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">🔍</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">무제한 검색</h4>
              <p className="text-sm text-gray-600">검색 제한 없이 자유롭게</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-yellow-100 rounded-lg">
          <p className="text-sm text-yellow-800 text-center">
            🎉 프리미엄 멤버십으로 더 풍부한 뉴스 경험을 즐겨보세요!
          </p>
        </div>
      </div>
    </div>
  );
}; 