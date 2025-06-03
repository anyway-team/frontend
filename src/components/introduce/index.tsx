import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Brain, MessageSquare, Scale, TrendingUp } from 'lucide-react';
import { Card } from '@radix-ui/themes';
import styles from './introduce.module.css';
import Image from 'next/image';
export function NewsCompareIntro() {
  return (
    <div className={styles.root}>
      <div className={styles.heroSection}>
        <div className={styles.heroInner}>
          <div className={styles.heroIconWrap}>
            <Image src="/newbee.png" alt="logo" width={100} height={100} />
          </div>

          <div className={styles.heroTextWrap}>
            <Badge variant="secondary" className={styles.heroBadge}>
              <Brain className={styles.heroBadgeIcon} />
              AI 기반 뉴스 분석
            </Badge>
            <h1 className={styles.heroTitle}>
              뉴스 비교의
              <br />
              <span className={styles.heroTitleGradient}>새로운 기준</span>
            </h1>
            <p className={styles.heroDesc}>
              두 개의 뉴스를 중립적으로 비교하고
              <br />
              정치색 없는 객관적 분석을 제공합니다
            </p>
            <Button className={styles.notifyButton}>알림 받기</Button>
          </div>
        </div>
      </div>

      <div className={styles.featuresSection}>
        <div className={styles.featuresInner}>
          <h2 className={styles.featuresTitle}>왜 우리 서비스일까요?</h2>

          <div className={styles.featuresGrid}>
            <Card className={styles.featureCard}>
              <div className={styles.featureCardInner}>
                <div className={styles.featureIconWrapBlue}>
                  <Scale className={styles.featureIconBlue} />
                </div>
                <div className={styles.featureTextWrap}>
                  <h3 className={styles.featureTitle}>중립적 비교 분석</h3>
                  <p className={styles.featureDesc}>
                    정치색 없이 객관적으로 두 뉴스를 비교하여 균형잡힌 시각을 제공합니다
                  </p>
                </div>
              </div>
            </Card>

            <Card className={styles.featureCard}>
              <div className={styles.featureCardInner}>
                <div className={styles.featureIconWrapGreen}>
                  <BarChart3 className={styles.featureIconGreen} />
                </div>
                <div className={styles.featureTextWrap}>
                  <h3 className={styles.featureTitle}>정치색 그래프</h3>
                  <p className={styles.featureDesc}>
                    각 뉴스의 정치적 성향을 시각적 그래프로 한눈에 파악할 수 있습니다
                  </p>
                </div>
              </div>
            </Card>

            <Card className={styles.featureCard}>
              <div className={styles.featureCardInner}>
                <div className={styles.featureIconWrapPurple}>
                  <MessageSquare className={styles.featureIconPurple} />
                </div>
                <div className={styles.featureTextWrap}>
                  <h3 className={styles.featureTitle}>여론 분석</h3>
                  <p className={styles.featureDesc}>
                    AI가 분석한 사람들의 반응과 여론 동향을 확인하세요
                  </p>
                </div>
              </div>
            </Card>

            <Card className={styles.featureCard}>
              <div className={styles.featureCardInner}>
                <div className={styles.featureIconWrapOrange}>
                  <Brain className={styles.featureIconOrange} />
                </div>
                <div className={styles.featureTextWrap}>
                  <h3 className={styles.featureTitle}>AI 기반 요약</h3>
                  <p className={styles.featureDesc}>
                    복잡한 뉴스 내용을 AI가 핵심만 간추려 쉽게 이해할 수 있게 요약합니다
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <Card className={styles.ctaCard}>
            <div className={styles.ctaCardInner}>
              <TrendingUp className={styles.ctaIcon} />
              <h3 className={styles.ctaTitle}>멀리 가서 찾지 마세요</h3>
              <p className={styles.ctaDesc}>
                여러 사이트를 돌아다니며 뉴스를 비교할 필요 없이, 한 곳에서 모든 분석을 확인하세요
              </p>
              <Button className={styles.notifyButton}>알림 받기</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
