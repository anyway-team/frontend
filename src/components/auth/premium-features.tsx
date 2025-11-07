'use client';

import { useState } from 'react';
import { ChevronDown, Sparkles, Zap, TrendingUp, BarChart3 } from 'lucide-react';
import styles from './premium-features.module.css';

export function PremiumFeatures() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const features = [
    {
      icon: Sparkles,
      title: '더 상세한 AI 분석 제공',
      description: '고급 AI 엔진이 다각도에서 뉴스를 심층 분석합니다.',
    },
    {
      icon: TrendingUp,
      title: '무제한 뉴스 비교',
      description: '한 개가 아닌 무제한의 뉴스를 자유롭게 비교 분석합니다.',
    },
    {
      icon: BarChart3,
      title: '시각화 서비스',
      description: '찜한 뉴스를 모아 한눈에 보는 분석 시각화 제공.',
    },
  ];

  const faqs = [
    {
      question: '프리미엄은 어떻게 구독하나요?',
      answer:
        '준비중인 프리미엄 서비스 출시 시 뉴비 모바일 앱 내에서 간편하게 구독할 수 있습니다. 첫 이용시 특별 할인이 제공될 예정입니다.',
    },
    {
      question: '환불이 가능한가요?',
      answer:
        '네, 구독 시작 후 7일 이내 전액 환불이 가능합니다. 문의사항은 고객센터로 연락 주세요.',
    },
    {
      question: '어떤 디바이스에서 사용 가능한가요?',
      answer:
        'iOS, Android 모든 디바이스에서 이용 가능합니다. 한 계정으로 여러 기기에서 동시 사용할 수 있습니다.',
    },
  ];

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroBackground}></div>

        <div className={styles.heroContent}>
          {/* Badge */}
          <div className={styles.badge}>
            <div className={styles.badgeInner}>
              <Zap className={styles.badgeIcon} />
              <span className={styles.badgeText}>프리미엄 준비중</span>
            </div>
          </div>

          {/* Title */}
          <h1 className={styles.title}>
            월 3천원으로
            <br />
            <span className={styles.titleGradient}>뉴스 분석의 모든 것</span>
          </h1>

          {/* Subtitle */}
          <p className={styles.subtitle}>
            더 깊이 있는 분석, 더 많은 뉴스 비교, 더 나은 인사이트.
            <br />
            프리미엄과 함께 뉴스 분석을 한 단계 업그레이드할 수 있게 서비스를 준비중이에요.
          </p>

          <div className={styles.heroImage}>
            <div className={styles.heroImageContent}>
              <div className={styles.heroImageText}>
                <BarChart3 className={styles.heroImageIcon} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>프리미엄 기능</h2>
            <p className={styles.sectionDescription}>기본 기능을 넘어 진정한 가치를 경험하세요</p>
          </div>

          <div className={styles.featuresGrid}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className={styles.featureCard}>
                  <div className={styles.featureIcon}>
                    <Icon className={styles.featureIconSvg} />
                  </div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className={styles.sectionPlain}>
        <div className={styles.pricingSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>단 하나의 선택지</h2>
            <p className={styles.sectionDescription}>복잡한 선택지 없이 하나의 프리미엄 플랜</p>
          </div>

          {/* Pricing Card */}
          <div className={styles.pricingCard}>
            <div className={styles.pricingBackground}></div>
            <div className={styles.pricingContent}>
              <div className={styles.pricingHeader}>
                <p className={styles.pricingLabel}>월간 구독</p>
                <div className={styles.pricingPrice}>
                  <span className={styles.priceAmount}>₩3,000</span>
                  <span className={styles.priceUnit}>/월</span>
                </div>
              </div>

              <ul className={styles.pricingFeatures}>
                <li className={styles.pricingFeature}>
                  <div className={styles.featureDot}></div>
                  <span>무제한 뉴스 비교 분석</span>
                </li>
                <li className={styles.pricingFeature}>
                  <div className={styles.featureDot}></div>
                  <span>고급 AI 심층 분석</span>
                </li>
                <li className={styles.pricingFeature}>
                  <div className={styles.featureDot}></div>
                  <span>뉴스 저장 및 시각화</span>
                </li>
                <li className={styles.pricingFeature}>
                  <div className={styles.featureDot}></div>
                  <span>광고 제거</span>
                </li>
                <li className={styles.pricingFeature}>
                  <div className={styles.featureDot}></div>
                  <span>우선 고객 지원</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.section}>
        <div className={styles.faqContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>자주 묻는 질문</h2>
            <p className={styles.sectionDescription}>궁금한 점을 확인해보세요</p>
          </div>

          <div>
            {faqs.map((faq, index) => (
              <div key={index} className={styles.faq}>
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className={styles.faqButton}
                >
                  <div className={styles.faqHeader}>
                    <h3 className={styles.faqQuestion}>{faq.question}</h3>
                    <ChevronDown
                      className={`${styles.faqIcon} ${
                        expandedFaq === index ? styles.faqIconRotated : ''
                      }`}
                    />
                  </div>
                  {expandedFaq === index && <p className={styles.faqAnswer}>{faq.answer}</p>}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.sectionPlain}>
        <div className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>
            프리미엄회원이 누리는 <br />
            뉴스 분석의
            <span className={styles.titleGradient}>새로운 경험</span>
          </h2>

          <p className={styles.ctaSubtitle}>
            월 3천원으로 시작하는 스마트한 뉴스 분석. 빠르게 준비 하고 찾아올게요.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>© 2025 뉴스 비교 분석. 모든 권리 보유.</p>
        </div>
      </footer>
    </div>
  );
}
