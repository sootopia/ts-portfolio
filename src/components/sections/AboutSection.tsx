/** @jsxImportSource @emotion/react */
import { useEffect, useRef, forwardRef } from 'react';
import { useTheme } from '@emotion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as S from './AboutSection.styles';
import MainHeader from '../header/MainHeader';
import SubHeader from '../header/SubHeader';
import AboutCard from '../AboutCard';

interface AboutCard {
  title: string;
  content: string;
  description: string;
}

const AboutSection = forwardRef<HTMLElement, unknown>((_, ref) => {
  const theme = useTheme();
  const cardItems: AboutCard[] = [
    {
      title: '경력',
      content: '10년 7개월',
      description:
        '2014년 웹디자이너로 시작하여 2025년 현재 프론트엔드 개발자로서 주어진 직무와 프로젝트에 최선을 다해 임하고 있습니다.',
    },
    {
      title: '강점',
      content: '성실함과 책임감',
      description:
        '주어진 일은 전문가로서 반드시 책임감을 가지고 마무리해야 한다는 가치관을 가지고 있습니다. 물론 성실함은 기본입니다.',
    },
    {
      title: '취미',
      content: '영화보기&운동',
      description:
        '건강이 뒷받침되어야 맡은 바를 충실히 이행할 수 있다고 생각합니다. 영화는 재미도 있지만 저에게 다양한 영감을 주기도 합니다.',
    },
    {
      title: '관심사',
      content: 'UI/UX구현 및 개선',
      description:
        '웹디자이너로 첫 발을 내디딘 만큼, 아름다우면서 효과적인 UI/UX에 관심이 많습니다. 기존의 것을 개선하는 것도 아주 좋아합니다.',
    },
    {
      title: '작업 프로젝트 수',
      content: '100+ ⬆',
      description:
        '다양한 고객을 통해 여러 가지 유형의 프로젝트를 진행했습니다. 고객의 요구사항 파악과 일정 관리라는 영역에 있어 자신 있습니다.',
    },
    {
      title: '좋아하는 것',
      content: '명확함, 협동',
      description:
        '무엇이든 해내는데 있어 명확함은 늘 필요하다고 생각합니다. 혼자보단 협동과 협업을 통해 이루어내는 과정이 더 가치있는 경험이라고 생각합니다.',
    },
    {
      title: '싫어하는 것',
      content: '모호함, 지지부진함',
      description:
        '의사결정이나 상황 판단에 있어 모호함이 생기는 것을 좋아하지 않습니다. 어떤 상황에서든 진척도에 좋지 않은 영향을 주기 때문입니다.',
    },
    {
      title: '특별한 경험',
      content: '창업 1회',
      description:
        '독립적인 성향을 가지고 있을 때 창업 후 저만의 환경에서 직무를 수행했고, 이 과정에서 소중한 귀인을 만나고 다양한 경험도 쌓게 되었습니다.',
    },
  ];

  const titleRef = useRef<HTMLDivElement | null>(null);
  const lastCardRef = useRef<HTMLDivElement | null>(null);
  const cardGridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref || !('current' in ref) || !ref.current) return;

    const section = ref.current;
    const title = titleRef.current;
    const lastCard = lastCardRef.current;
    const cardGrid = cardGridRef.current;
    const mm = gsap.matchMedia();

    let pinTrigger: ScrollTrigger | null = null;

    if (section && title && lastCard && cardGrid) {
      mm.add('(min-width: 1024px)', () => {
        try {
          pinTrigger = ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: () => `+=${cardGrid.offsetHeight - lastCard.offsetHeight}`,
            pin: title,
            pinSpacing: false,
            scrub: true,
          });
        } catch (error) {
          console.error('Error creating pin trigger:', error);
        }
      });

      mm.add('(max-width: 1023px)', () => {
        if (pinTrigger) {
          pinTrigger.kill();
          pinTrigger = null;
        }
      });
    }

    const cards = document.querySelectorAll('.about__card');

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: () => `top bottom-=${window.innerWidth < 768 ? 100 : 200}`,
            toggleActions: 'play none none reverse',
            onUpdate: (self) => {
              if (self.direction === -1) {
                gsap.to(card, { duration: 0.3 });
              }
            },
          },
          clearProps: 'transform',
        },
      );
    });

    gsap.set(cards, { opacity: 0, y: 50 });

    gsap.set(cards, {
      willChange: 'transform, opacity',
    });

    cards.forEach((card) => {
      gsap.delayedCall(1, () => {
        gsap.set(card, { willChange: 'auto' });
      });
    });

    const handleResize = () => {
      if (pinTrigger) pinTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (pinTrigger) pinTrigger.kill();
      window.removeEventListener('resize', handleResize);
      mm.revert();
    };
  }, [ref]);

  return (
    <section ref={ref} css={S.AboutContainer(theme)}>
      <div className="container">
        <div css={S.AboutGrid(theme)}>
          <div className="grid__header">
            <div ref={titleRef}>
              <SubHeader className="!text-[#e0ffff]">About Me</SubHeader>
              <MainHeader animate>저는 이런 사람이에요.</MainHeader>
            </div>
          </div>
          <div className="grid__content" ref={cardGridRef}>
            {cardItems.map((card, index) => (
              <AboutCard
                className="about__card"
                key={card.title}
                title={card.title}
                content={card.content}
                description={card.description}
                ref={index === cardItems.length - 1 ? lastCardRef : null}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default AboutSection;
