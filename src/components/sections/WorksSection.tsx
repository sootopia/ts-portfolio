/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react';
import MainHeader from '../header/MainHeader';
import SubHeader from '../header/SubHeader';
import WorksCard from '../WorksCard';
import SkeletonGrid from '../SkeletonGrid';
import * as S from './WorksSection.styles';
import { useCallback, useEffect, useState, forwardRef, useRef } from 'react';
import { supabase } from '../../config/supabase';
import { Project } from '../../types/project';

type SortOption = 'participation_desc' | 'participation_asc' | 'created_desc' | 'created_asc';

const CheckIcon = () => {
  return (
    <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.357 1.12518C12.5989 0.894861 12.9209 0.767529 13.2549 0.770056C13.5889 0.772584 13.9089 0.904773 14.1473 1.13873C14.3857 1.37269 14.5239 1.69011 14.5328 2.02403C14.5416 2.35794 14.4203 2.68223 14.1946 2.92845L7.3422 11.4983C7.22437 11.6252 7.08216 11.727 6.92407 11.7977C6.76598 11.8684 6.59525 11.9065 6.4221 11.9097C6.24895 11.9129 6.07694 11.8812 5.91634 11.8164C5.75574 11.7516 5.60985 11.6551 5.4874 11.5326L0.943161 6.98839C0.816611 6.87047 0.715109 6.72827 0.64471 6.57027C0.57431 6.41227 0.536455 6.24171 0.533404 6.06876C0.530352 5.89581 0.562167 5.72402 0.626949 5.56364C0.691731 5.40325 0.788154 5.25756 0.910465 5.13525C1.03278 5.01294 1.17847 4.91651 1.33885 4.85173C1.49924 4.78695 1.67103 4.75514 1.84398 4.75819C2.01692 4.76124 2.18749 4.79909 2.34549 4.86949C2.50348 4.93989 2.64569 5.0414 2.76361 5.16795L6.35985 8.76247L12.3244 1.16297L12.357 1.12518Z"
        fill="#14B8A6"
      />
    </svg>
  );
};

const PAGE_SIZE: number = 6; // 한 번에 가져올 개수

const SORT_OPTIONS = {
  PARTICIPATION_HIGH: 'participation_desc' as const,
  PARTICIPATION_LOW: 'participation_asc' as const,
  LATEST: 'created_desc' as const,
  OLDEST: 'created_asc' as const,
} as const;

const SORT_LABELS: Record<SortOption, string> = {
  participation_desc: '참여율 높은순',
  participation_asc: '참여율 낮은순',
  created_desc: '최신순',
  created_asc: '오래된순',
};

const WorksSection = forwardRef<HTMLElement, unknown>((_, ref) => {
  const [data, setData] = useState<Project[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [currentSort, setCurrentSort] = useState<SortOption>(SORT_OPTIONS.LATEST);
  const [page, setPage] = useState(1);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  const fetchList = useCallback(
    async (sortOption = currentSort) => {
      setIsLoading(true);
      setError(null);

      try {
        let query = supabase
          .from('works')
          .select(
            'id, title, summary, imageUrl, techStack, participationRate, link, client, period, created_at',
          )
          .limit(PAGE_SIZE);

        switch (sortOption) {
          case SORT_OPTIONS.PARTICIPATION_HIGH:
            query = query.order('participationRate', { ascending: false });
            break;
          case SORT_OPTIONS.PARTICIPATION_LOW:
            query = query.order('participationRate', { ascending: true });
            break;
          case SORT_OPTIONS.LATEST:
            query = query.order('created_at', { ascending: false });
            break;
          case SORT_OPTIONS.OLDEST:
            query = query.order('created_at', { ascending: true });
            break;
        }

        const { data: projects, error } = await query;

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }

        if (projects) {
          setData(projects);
          setHasMore(projects.length === PAGE_SIZE);
        }
      } catch (error) {
        console.error('데이터 로드 실패', error);
        setError('데이터를 불러오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    },
    [currentSort],
  );

  const fetchMoreList = async (sortOption = currentSort) => {
    if (!hasMore) return;

    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const from = (nextPage - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      let query = supabase
        .from('works')
        .select(
          'id, title, summary, imageUrl, techStack, participationRate, link, client, period, created_at',
        )
        .range(from, to);

      switch (sortOption) {
        case SORT_OPTIONS.PARTICIPATION_HIGH:
          query = query.order('participationRate', { ascending: false });
          break;
        case SORT_OPTIONS.PARTICIPATION_LOW:
          query = query.order('participationRate', { ascending: true });
          break;
        case SORT_OPTIONS.LATEST:
          query = query.order('created_at', { ascending: false });
          break;
        case SORT_OPTIONS.OLDEST:
          query = query.order('created_at', { ascending: true });
          break;
      }

      const { data: projects, error } = await query;

      if (error) throw error;

      if (projects) {
        setData((prevData) => [...prevData, ...projects]);
        setHasMore(projects.length === PAGE_SIZE);
        setPage(nextPage);
      }
    } catch (error) {
      console.error('데이터 로드 실패', error);
      setError('데이터를 불러오는 데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSortChange = (newSort: SortOption) => {
    setCurrentSort(newSort);
    setData([]);
    setHasMore(true);
    fetchList(newSort);
    setIsDropdownOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownButtonRef.current &&
      dropdownRef.current &&
      !dropdownButtonRef.current.contains(event.target as Node) &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  return (
    <section css={S.WorksContainer(theme)} ref={ref} className="bg-slate-50">
      <div className="container">
        <div css={S.HeaderContainer} className="mb-8 md:mb-16">
          <div>
            <SubHeader>Projects</SubHeader>
            <MainHeader dark animate>
              그동안 작업한 프로젝트입니다.
            </MainHeader>
          </div>
          <div className="mt-12 sm:mt-0 ml-auto">
            <div css={S.DropdownContainer}>
              <button
                css={S.DropdownButton(theme)}
                ref={dropdownButtonRef}
                className={isDropdownOpen ? 'active' : ''}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>{SORT_LABELS[currentSort]}</span>
                <svg
                  width="10"
                  height="7"
                  viewBox="0 0 10 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.234682 0.984438C0.269516 0.949515 0.310898 0.921808 0.356457 0.902903C0.402016 0.883998 0.450857 0.874268 0.500182 0.874268C0.549508 0.874268 0.598349 0.883998 0.643907 0.902903C0.689466 0.921808 0.730848 0.949515 0.765682 0.984438L5.00018 5.21969L9.23468 0.984438C9.26955 0.949572 9.31094 0.921914 9.35649 0.903045C9.40205 0.884176 9.45087 0.874464 9.50018 0.874464C9.54949 0.874464 9.59832 0.884176 9.64387 0.903045C9.68942 0.921914 9.73082 0.949572 9.76568 0.984438C9.80055 1.0193 9.82821 1.0607 9.84707 1.10625C9.86594 1.1518 9.87566 1.20063 9.87566 1.24994C9.87566 1.29925 9.86594 1.34807 9.84707 1.39363C9.82821 1.43918 9.80055 1.48057 9.76568 1.51544L5.26568 6.01544C5.23085 6.05036 5.18947 6.07807 5.14391 6.09697C5.09835 6.11588 5.04951 6.12561 5.00018 6.12561C4.95086 6.12561 4.90202 6.11588 4.85646 6.09697C4.8109 6.07807 4.76952 6.05036 4.73468 6.01544L0.234682 1.51544C0.19976 1.4806 0.172053 1.43922 0.153148 1.39366C0.134243 1.3481 0.124512 1.29926 0.124512 1.24994C0.124512 1.20061 0.134243 1.15177 0.153148 1.10621C0.172053 1.06065 0.19976 1.01927 0.234682 0.984438Z"
                    fill="#475569"
                  />
                </svg>
              </button>

              {isDropdownOpen && (
                <div css={S.Dropdown(theme)} ref={dropdownRef}>
                  <ul>
                    <li>
                      <a
                        href="#none"
                        role="button"
                        className={currentSort === SORT_OPTIONS.LATEST ? 'active' : ''}
                        onClick={() => handleSortChange(SORT_OPTIONS.LATEST)}
                      >
                        <span>{SORT_LABELS[SORT_OPTIONS.LATEST]}</span>
                        {currentSort === SORT_OPTIONS.LATEST && <CheckIcon />}
                      </a>
                    </li>
                    <li>
                      <a
                        href="#none"
                        role="button"
                        className={currentSort === SORT_OPTIONS.OLDEST ? 'active' : ''}
                        onClick={() => handleSortChange(SORT_OPTIONS.OLDEST)}
                      >
                        <span>{SORT_LABELS[SORT_OPTIONS.OLDEST]}</span>
                        {currentSort === SORT_OPTIONS.OLDEST && <CheckIcon />}
                      </a>
                    </li>
                    <li>
                      <a
                        href="#none"
                        role="button"
                        className={currentSort === SORT_OPTIONS.PARTICIPATION_HIGH ? 'active' : ''}
                        onClick={() => handleSortChange(SORT_OPTIONS.PARTICIPATION_HIGH)}
                      >
                        <span>{SORT_LABELS[SORT_OPTIONS.PARTICIPATION_HIGH]}</span>
                        {currentSort === SORT_OPTIONS.PARTICIPATION_HIGH && <CheckIcon />}
                      </a>
                    </li>
                    <li>
                      <a
                        href="#none"
                        role="button"
                        className={currentSort === SORT_OPTIONS.PARTICIPATION_LOW ? 'active' : ''}
                        onClick={() => handleSortChange(SORT_OPTIONS.PARTICIPATION_LOW)}
                      >
                        <span>{SORT_LABELS[SORT_OPTIONS.PARTICIPATION_LOW]}</span>
                        {currentSort === SORT_OPTIONS.PARTICIPATION_LOW && <CheckIcon />}
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {error ? (
          <div className="flex flex-col gap-y-8 items-center justify-center py-12 text-center text-gray-400 font-semibold mb-8 rounded-2xl bg-slate-100">
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                fill="currentColor"
                className="bi bi-exclamation-octagon"
                viewBox="0 0 16 16"
              >
                <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1z" />
                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
              </svg>
            </div>
            <p>{error}</p>
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 md:gap-y-12 lg:gap-x-8 lg:gap-y-16">
              {data.map((work) => (
                <WorksCard key={work.id} data={work} />
              ))}
            </div>

            {isLoading && <SkeletonGrid count={6} />}

            {hasMore && (
              <div className="text-center mt-20 md:mt-24">
                <button
                  type="button"
                  className="text-white font-bold h-14 px-12 rounded-xl bg-slate-500 hover:bg-slate-600 active:bg-slate-700 active:shadow-[0px_0px_0px_3px_rgba(51,65,85,0.24)] outline-none transition-all"
                  onClick={() => fetchMoreList()}
                >
                  더보기
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
});

export default WorksSection;
