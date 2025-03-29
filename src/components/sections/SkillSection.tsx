/** @jsxImportSource @emotion/react */
import { forwardRef, useState } from 'react';
import { useTheme } from '@emotion/react';
import * as S from './SkillSection.styles';
import SubHeader from '../header/SubHeader';
import MainHeader from '../header/MainHeader';
import SkillCard from '../SkillCard';

interface SkillCard {
  title: string;
  description: string;
  icon: string;
}

const SkillSection = forwardRef<HTMLElement, unknown>((_, ref) => {
  const theme = useTheme();
  const skillTags: string[] = [
    'React',
    'Vue.js',
    'Storybook',
    'Styled components',
    'Tailwind CSS',
    'Bootstrap',
    'SCSS',
    'MySQL',
    'AWS EC2',
    'AWS Lightsail',
    'Photoshop',
    'Illustrator',
    'Zeplin',
    'XD',
    'Figma',
    'Github&Gitlab',
    'Jenkins',
    'Firebase',
    'Supabase',
  ];
  const skills: SkillCard[] = [
    {
      title: 'React',
      description:
        'Redux, Recoil, Zustand 등의 라이브러리를 통해 상태 관리를 구현한 경험이 있습니다. Styled components와 emotion같은 CSS-in-JS 라이브러리를 선호합니다.',
      icon: '/images/skills_react.svg',
    },
    {
      title: 'Vue.js',
      description:
        'Vuex, Pinia와 같은 라이브러리를 통해 상태 관리를 구현한 경험이 있습니다. Options API, Composition API 두 가지 방식 모두 능숙하게 사용할 수 있습니다.',
      icon: '/images/skills_vue.svg',
    },
    {
      title: 'Javascript',
      description:
        'ES6+ 문법에 친숙합니다. Typescript를 사용할 수 있으며, 이외에 jQuery 및 기타 다양한 라이브러리 사용 경험이 있어 가장 능숙하게 다룰 수 있는 주력 언어입니다.',
      icon: '/images/skills_js.svg',
    },
    {
      title: 'CSS',
      description:
        'LESS, SASS, SCSS, PostCSS 등 다양한 포맷의 스타일시트 작성이 가능합니다. BEM 방법론에 익숙하고, Bootstrap과 Tailwind CSS를 통한 빠른 프로젝트 빌드 또한 가능합니다.',
      icon: '/images/skills_css.svg',
    },
    {
      title: 'HTML',
      description:
        '웹 표준과 웹 접근성에 대한 높은 이해도를 바탕으로 다양한 형태의 페이지 구조를 설계하고 구현할 수 있습니다. 시맨틱한 태그 구조를 매우 좋아하며, 크로스 브라우징 대응 또한 가능합니다.',
      icon: '/images/skills_html.svg',
    },
    {
      title: 'DBMS',
      description:
        'MySQL, Oracle DBMS에 익숙합니다. 다양한 프로젝트에서 RestFul API 를 직접 구현하기도 하면서 DBMS 및 백엔드에 대한 이해도를 높였으며, 백엔드 개발자와 원활한 소통이 가능합니다.',
      icon: '/images/skills_dbms.svg',
    },
    {
      title: 'Git, CI&CD',
      description:
        'Github, Gitlab 등의 형상관리도구에 익숙합니다. 그리고 Jenkins, Github Actions, Vercel 등의 지속적 제공/배포 경험이 있습니다.',
      icon: '/images/skills_git.svg',
    },
    {
      title: 'AWS&Firebase',
      description:
        'AWS EC2, S3, Firebase에 익숙하여 다양한 유형과 목적에 따른 프로젝트를 수행할 수 있습니다.',
      icon: '/images/skills_aws.svg',
    },
  ];
  const [isShowAll, setIsShowAll] = useState(false);

  return (
    <section css={S.SkillContainer(theme)} ref={ref} className="skills__section">
      <div className="container">
        <SubHeader>Tech Stack</SubHeader>
        <MainHeader dark animate className="mb-12 md:mb-16">
          제가 경험해 보았고, 다룰 수 있는 것들이에요.
        </MainHeader>

        <div css={S.Tags(theme)} className={isShowAll ? 'active' : ''}>
          {skillTags.map((skill) => (
            <div className="tag__item" key={skill}>
              {skill}
            </div>
          ))}
          <button css={S.ToggleButton(theme)} onClick={() => setIsShowAll(!isShowAll)}>
            {!isShowAll ? (
              <>
                <span>전체보기</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  fill="currentColor"
                  className="bi bi-chevron-down"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                  />
                </svg>
              </>
            ) : (
              <>
                <span>접기</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  fill="currentColor"
                  className="bi bi-chevron-up"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"
                  />
                </svg>
              </>
            )}
          </button>
        </div>

        <div css={S.GridWrapper}>
          {skills.map((skill: SkillCard, idx: number) => (
            <SkillCard
              key={skill.title}
              index={idx}
              icon={skill.icon}
              title={skill.title}
              description={skill.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

export default SkillSection;
