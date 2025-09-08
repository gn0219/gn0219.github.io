import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { profileData } from '@/data/profile';
import { researchData } from '@/data/research';
import { projectsData } from '@/data/projects';
import { publicationsData } from '@/data/publications';
import { newsData } from '@/data/news';
import { honorsData } from '@/data/honors';
import { servicesData } from '@/data/services';
import { experienceData } from '@/data/experience';
import { photosData } from '@/data/photos';
import { useState, useEffect, useRef, TouchEvent } from 'react';
import { theme } from '@/styles/theme';

type ValidLinkColor = keyof typeof theme.links;

const Home: NextPage = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [showEmailTooltip, setShowEmailTooltip] = useState(false);
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(photosData.length - 1);
  const sections = useRef<{ [key: string]: IntersectionObserverEntry }>({});
  const headerHeight = parseInt(theme.spacing.headerHeight);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isAutoPlayPaused, setIsAutoPlayPaused] = useState(false);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          sections.current[entry.target.id] = entry;
        });

        let mostVisibleSection = '';
        let highestRatio = 0;

        Object.entries(sections.current).forEach(([id, entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio > highestRatio) {
            highestRatio = entry.intersectionRatio;
            mostVisibleSection = id;
          }
        });

        if (mostVisibleSection) {
          setActiveSection(mostVisibleSection);
        }
      },
      {
        root: null,
        rootMargin: `-${headerHeight}px 0px -50% 0px`,
        threshold: 0.1,
      }
    );

    const sectionElements = document.querySelectorAll('section[id]');
    sectionElements.forEach((section) => observer.observe(section));

    return () => {
      sectionElements.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Auto-sliding photos
  useEffect(() => {
    if (isAutoPlayPaused) return;
    
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prevIndex) => 
        prevIndex === 0 ? photosData.length - 1 : prevIndex - 1
      );
    }, 5000); // Change photo every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlayPaused]);

  const scrollToSection = (sectionId: string) => {
    const start = window.pageYOffset;
    const duration = 500;
    let startTime: number | null = null;

    const easeOutCubic = (t: number): number => {
      return 1 - Math.pow(1 - t, 3);
    };

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      const target = sectionId === 'aboutme' ? 0 : 
        (document.getElementById(sectionId)?.offsetTop ?? 0) - headerHeight - 32;
      const distance = target - start;
      
      window.scrollTo(0, start + (distance * easeOutCubic(progress)));

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText('gyuna.kim@kaist.ac.kr');
      setShowCopySuccess(true);
      setTimeout(() => setShowCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setCurrentPhotoIndex(prev => prev === 0 ? photosData.length - 1 : prev - 1);
    }
    if (isRightSwipe) {
      setCurrentPhotoIndex(prev => prev === photosData.length - 1 ? 0 : prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-[Pretendard]">
      <Head>
        {/* <title>{profileData.name} - Personal Homepage</title> */}
        <title>{`${profileData.name} - Personal Homepage`}</title>
        <meta name="description" content={`${profileData.name}'s personal homepage`} />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      {/* Header with Lora font for name */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 relative rounded-full overflow-hidden">
                <Image
                  src={profileData.image}
                  alt={profileData.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
              <span className="text-xl font-semibold">{profileData.name}</span>
            </div>
            <nav className="flex items-center">
              {/* Navigation buttons - only visible on md and larger screens */}
              <div className="hidden md:flex items-center space-x-8 mr-4">
                {['about me', 'projects'].map((section) => ( /*, 'etc', 'photos' */
                  <button
                    key={section}
                    onClick={() => scrollToSection(section.replace(' ', ''))}
                    className={`text-gray-600 hover:text-blue-600 text-base font-medium ${
                      activeSection === section.replace(' ', '') ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : ''
                    }`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                ))}
              </div>
              {/* CV button - always visible */}
              {/* <a
                href={profileData.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium text-sm md:text-base"
              >
                CV
              </a> */}
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div style={{ paddingTop: theme.spacing.headerHeight }}></div>

        {/* Profile Section */}
        <section id="aboutme" className="mb-12">
          <div className="flex flex-col md:flex-row items-start gap-16">
            {/* Left Column: Profile Image + Simple Info */}
            <div className="flex flex-col items-center md:items-start space-y-5 flex-shrink-0 w-full md:w-auto">
              <div className="w-64 h-64 relative rounded-full overflow-hidden">
                <Image
                  src={profileData.image}
                  alt={profileData.name}
                  width={256}
                  height={256}
                  className="rounded-full"
                />
              </div>
              <div className="text-center md:text-left space-y-2">
                <div className="space-y-2">
                  <h1 className="text-xl font-bold font-lora text-gray-900">{profileData.name} {profileData.koreanName && `(${profileData.koreanName})`}</h1>
                  <p className="text-base text-gray-700 leading-snug">{profileData.title}</p>
                  <p className="text-sm text-gray-500 leading-snug">{profileData.location}</p>
                </div>
                <div className="flex gap-4 justify-center md:justify-start pt-2.5">
                  
                  {/* <a 
                    href={profileData.socialLinks.scholar}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/>
                    </svg>
                  </a> */}
                  
                  {profileData.socialLinks.github && (
                    <a 
                      href={profileData.socialLinks.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-500 hover:text-gray-800 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                  )}
                  <div className="relative">
                    <button
                      onClick={copyEmailToClipboard}
                      onMouseEnter={() => setShowEmailTooltip(true)}
                      onMouseLeave={() => setShowEmailTooltip(false)}
                      className="text-gray-500 hover:text-gray-800 transition-colors"
                      aria-label="Copy email address"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
                      </svg>
                    </button>
                    {/* Email Tooltip */}
                    {showEmailTooltip && (
                      <div className="absolute top-full left-0 transform -translate-x-1/4 mt-1 px-2 py-0.5 bg-gray-800 text-white text-xs rounded whitespace-nowrap">
                        Copy - {profileData.email}
                      </div>
                    )}
                    {/* Copy Success Message */}
                    {showCopySuccess && (
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-7 px-2 py-0.5 bg-green-600 text-white text-xs rounded whitespace-nowrap">
                        Email Copied!
                      </div>
                    )}
                  </div>
                  {profileData.socialLinks.linkedin && (
                    <a 
                      href={profileData.socialLinks.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-500 hover:text-blue-700 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Description */}
            <div className="flex-grow">
              <h2 className="text-5xl font-bold mb-6 font-lora">Hi everyone! 👋</h2>
              <div className="prose max-w-none text-gray-700">
                <p>
                  {profileData.about.split(/\[(.*?)\]\((.*?)(?:,\s*color=(\w+))?\)/).map((part, i) => {
                    if (i % 4 === 0) return part;
                    if (i % 4 === 1) {
                      const url = profileData.about.split(/\[(.*?)\]\((.*?)(?:,\s*color=(\w+))?\)/)[i + 1];
                      const color = profileData.about.split(/\[(.*?)\]\((.*?)(?:,\s*color=(\w+))?\)/)[i + 2] as keyof typeof theme.links;
                      const linkColor = color && theme.links[color] ? color : 'social';
                      return (
                        <a
                          key={i}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors duration-200 font-semibold"
                          style={{
                            color: theme.links[linkColor].default,
                            textDecoration: 'underline',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = theme.links[linkColor].hover;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = theme.links[linkColor].default;
                          }}
                        >
                          {part}
                        </a>
                      );
                    }
                    return null;
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Education and Skills */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 font-lora">Education</h3>
              <div className="space-y-3">
                {profileData.education.map((edu, index) => (
                  <div key={index}>
                    <p className="font-semibold">
                      {edu.degree} in{' '}
                      <a 
                        href={edu.departmentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors duration-200 font-semibold"
                        style={{
                          color: theme.links.department.default,
                          textDecoration: 'underline',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = theme.links.department.hover;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = theme.links.department.default;
                        }}
                      >
                        {edu.department}
                      </a>
                    </p>
                    <p className="text-gray-600">
                      <a 
                        href={edu.institutionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors duration-200"
                        style={{
                          color: theme.links.university.default,
                          textDecoration: 'underline',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = theme.links.university.hover;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = theme.links.university.default;
                        }}
                      >
                        {edu.institution}
                      </a>
                    </p>
                    <p className="text-gray-500">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 font-lora">Interests</h3>
              {/* AI/ML */}
              <div className="mb-3">
                <span className="text-base font-semibold text-blue-950 mr-2">AI/ML</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {profileData.interests["AI/ML"].map((interest, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-full text-sm bg-blue-100 text-blue-800 border border-blue-200">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              {/* HCI */}
              <div>
                <span className="text-base font-semibold text-purple-950 mr-2">HCI</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {profileData.interests["HCI"].map((interest, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-full text-sm bg-purple-100 text-purple-800 border border-purple-200">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* News Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">News ✨</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="space-y-4">
              {newsData.map((news, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-24 flex-shrink-0">
                    <p className="font-bold text-gray-800">{news.date}</p>
                  </div>
                  <div className="flex-grow">
                    <p className="text-gray-700">
                      {news.description.split(/\[(.*?)\]\((.*?)(?:,\s*color=(\w+))?\)/).map((part, i) => {
                        if (i % 4 === 0) return part;
                        if (i % 4 === 1) {
                          const url = news.description.split(/\[(.*?)\]\((.*?)(?:,\s*color=(\w+))?\)/)[i + 1];
                          const color = news.description.split(/\[(.*?)\]\((.*?)(?:,\s*color=(\w+))?\)/)[i + 2] as keyof typeof theme.links;
                          const linkColor = color && theme.links[color] ? color : 'social';
                          return (
                            <a
                              key={i}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="transition-colors duration-200"
                              style={{
                                color: theme.links[linkColor].default,
                                textDecoration: 'underline',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = theme.links[linkColor].hover;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = theme.links[linkColor].default;
                              }}
                            >
                              {part}
                            </a>
                          );
                        }
                        return null;
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Research Interests Section */}
        {/* <section id="research" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-bold mb-4">Research Interests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {researchData.interests.map((interest, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">{interest.title}</h3>
                <p className="text-gray-600 mb-4">{interest.description}</p>
                <div className="flex flex-wrap gap-2">
                  {interest.keywords.map((keyword, idx) => (
                    <span key={idx} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section> */}

        {/* Honors and Awards Section */}
        <section id="etc" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-bold mb-4">Honors and Awards 🏆</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="space-y-4">
              {honorsData.map((honor, index) => (
                <div key={index} className="flex items-start gap-4">
                  <span className="text-gray-500 min-w-[4rem]">{honor.year}</span>
                  <div>
                    <span className="font-semibold">{honor.title}</span>
                    {honor.organization && (
                      <span className="text-gray-600"> - {honor.organization}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Publications Section - Hidden if empty */}
        {publicationsData.publications.length > 0 && (
          <section id="publications" className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Publications</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="space-y-6">
                {publicationsData.publications.map((publication, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="text-lg font-semibold leading-tight">{publication.title}</h3>
                    <p className="text-sm text-gray-600 leading-tight">
                      {publication.authors.map((author, i) => (
                        <span key={i}>
                          {author === profileData.name ? (
                            <span className="text-black underline">{author}</span>
                          ) : (
                            author
                          )}
                          {i < publication.authors.length - 2 ? ', ' : ''}
                          {i === publication.authors.length - 2 ? ' and ' : ''}
                        </span>
                      ))}
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="text-sm text-gray-600 leading-tight mb-0">
                        {publication.venue} {publication.year}
                      </p>
                      <div className="flex flex-wrap gap-2 w-full mt-0 -mt-1">
                        {publication.doi && (
                          <a
                            href={`https://doi.org/${publication.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-violet-700 bg-violet-100 rounded-md hover:bg-violet-200 transition-colors duration-200"
                          >
                            <svg className="w-3 h-3 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Paper
                          </a>
                        )}
                        {publication.slides && (
                          <a
                            href={publication.slides}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-yellow-700 bg-yellow-100 rounded-md hover:bg-yellow-200 transition-colors duration-200"
                          >
                            <svg className="w-3 h-3 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                            </svg>
                            Slides
                          </a>
                        )}
                        {publication.poster && (
                          <a
                            href={publication.poster}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-green-700 bg-green-100 rounded-md hover:bg-green-200 transition-colors duration-200"
                          >
                            <svg className="w-3 h-3 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Poster
                          </a>
                        )}
                        {publication.video && (
                          <a
                            href={publication.video}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-pink-700 bg-pink-100 rounded-md hover:bg-pink-200 transition-colors duration-200"
                          >
                            <svg className="w-3 h-3 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Video
                          </a>
                        )}
                        {publication.github && (
                          <a
                            href={publication.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors duration-200"
                          >
                            <svg className="w-3 h-3 mr-0.5" fill="currentColor" viewBox="0 0 24 24">
                              <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Projects Section */}
        <section id="projects" className="mb-12">
          <h2 className="text-2xl font-bold mb-6 font-lora">Projects</h2>
          <div className="grid grid-cols-1 gap-8">
            {projectsData.current.map((project, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden"> 
                <div className="flex flex-col md:flex-row">
                  {project.image ? (
                    // Left column with image
                    <div className="md:w-2/5 lg:w-3/7 h-72 md:h-auto relative bg-white flex items-center justify-center p-4">
                      <div className="relative w-full h-full">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          style={{ objectFit: 'contain' }}
                          // layout="fill"
                          // objectFit="contain"
                          className="rounded-lg"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    </div>
                  ) : null}
                  {/* Right column with content - adjusts width based on image presence */}
                  <div className={`flex-1 p-6 ${!project.image ? 'md:p-8' : ''}`}>
                    <h3 className="text-xl font-semibold mb-4 font-lora">{project.title}</h3>
                    <p className="text-gray-600 mb-4">
                      {project.description.split(/\[(.*?)\]\((.*?)(?:,\s*color=(\w+))?\)/).map((part, i) => {
                        if (i % 4 === 0) return part;
                        if (i % 4 === 1) {
                          const url = project.description.split(/\[(.*?)\]\((.*?)(?:,\s*color=(\w+))?\)/)[i + 1];
                          const color = project.description.split(/\[(.*?)\]\((.*?)(?:,\s*color=(\w+))?\)/)[i + 2] as keyof typeof theme.links;
                          const linkColor = color && theme.links[color] ? color : 'green';
                          return (
                            <a
                              key={i}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="transition-colors duration-200"
                              style={{
                                color: theme.links[linkColor].default,
                                textDecoration: 'underline',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = theme.links[linkColor].hover;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = theme.links[linkColor].default;
                              }}
                            >
                              {part}
                            </a>
                          );
                        }
                        return null;
                      })}
                      {project.links && (project.links.github || project.links.demo) && (
                        <span className="block mt-2 text-sm text-gray-500">
                          <span className="inline-flex items-center gap-2">
                            {project.links.github && (
                              <a
                                href={project.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors align-middle"
                              >
                                💻 GitHub repository
                              </a>
                            )}
                            {project.links.github && project.links.demo && <span> | </span>}
                            {project.links.demo && (
                              <a
                                href={project.links.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors align-middle"
                              >
                                📄 Paper
                              </a>
                            )}
                          </span>
                        </span>
                      )}
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <span className="w-20 text-gray-500">Period:</span>
                        <span>{project.startDate} - {project.endDate || 'Present'}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-20 text-gray-500">Role:</span>
                        <span>{project.role}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="w-20 text-gray-500 mt-1">Skills:</span>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, idx) => (
                            <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-bold mb-4">Experience</h2>
          <div className="space-y-8">
            {experienceData.map((experience, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">{experience.role}</h3>
                <div className="space-y-4">
                  {experience.experiences.map((experience, idx) => (
                    <div key={idx} className="flex justify-between items-start">
                      <div className="flex-1 pr-4">
                        <h4 className="font-semibold">{experience.title}</h4>
                        <p className="text-gray-600">
                          {experience.institution.split(/\[(.*?)\]\((.*?)(?:,\s*color=(\w+))?\)/).map((part, i) => {
                            if (i % 4 === 0) return part;
                            if (i % 4 === 1) {
                              const url = experience.institution.split(/\[(.*?)\]\((.*?)(?:,\s*color=(\w+))?\)/)[i + 1];
                              const colorParam = experience.institution.split(/\[(.*?)\]\((.*?)(?:,\s*color=(\w+))?\)/)[i + 2];
                              const color = (colorParam && Object.keys(theme.links).includes(colorParam) ? colorParam : 'university') as ValidLinkColor;
                              return (
                                <a
                                  key={i}
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="transition-colors duration-200"
                                  style={{
                                    color: theme.links[color].default,
                                    textDecoration: 'underline',
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.color = theme.links[color].hover;
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.color = theme.links[color].default;
                                  }}
                                >
                                  {part}
                                </a>
                              );
                            }
                            return null;
                          })}
                        </p>
                      </div>
                      <span className="whitespace-nowrap text-gray-500 text-right">{experience.year}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Services Section - Hidden if empty */}
        {servicesData.length > 0 && (
          <section id="services" className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Services</h2>
            <div className="space-y-8">
              {servicesData.map((service, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">{service.category}</h3>
                  <div className="space-y-4">
                    {service.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{item.title}</h4>
                          {item.role && <p className="text-gray-600">{item.role}</p>}
                        </div>
                        <span className="text-gray-500">{item.year}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Photos Section */}
        <section id="photos" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-bold mb-4 font-lora">Photos 📸</h2>
          <div className="flex flex-col md:flex-row gap-3">
            {/* Main Photo */}
            <div 
              className="w-full md:flex-1 h-[280px] md:h-[360px] relative overflow-hidden rounded-lg shadow-sm order-1 md:order-2"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div className="absolute inset-0 flex items-center justify-center group">
                <div className="relative w-full h-full">
                  <Image
                    src={photosData[currentPhotoIndex].src}
                    alt={`Photo ${photosData.length - currentPhotoIndex}`}
                    fill
                    className="object-cover transition-opacity duration-500"
                    priority
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3">
                    <p className="text-white text-base font-medium">
                      {photosData[currentPhotoIndex].comment}
                    </p>
                  </div>
                  {/* Controls - visible on hover */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPhotoIndex(prev => prev === photosData.length - 1 ? 0 : prev + 1)}
                      className="bg-black/50 hover:bg-black/60 text-white rounded-md px-2 py-1.5 transition-all duration-200 hover:scale-105"
                      aria-label="Previous photo"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setIsAutoPlayPaused(!isAutoPlayPaused)}
                      className="bg-black/50 hover:bg-black/60 text-white rounded-md px-2 py-1.5 transition-all duration-200 hover:scale-105"
                      aria-label={isAutoPlayPaused ? "Play slideshow" : "Pause slideshow"}
                    >
                      {isAutoPlayPaused ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                        </svg>
                      )}
                    </button>
                    <button
                      onClick={() => setCurrentPhotoIndex(prev => prev === 0 ? photosData.length - 1 : prev - 1)}
                      className="bg-black/50 hover:bg-black/60 text-white rounded-md px-2 py-1.5 transition-all duration-200 hover:scale-105"
                      aria-label="Next photo"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnails - Vertical on desktop, Horizontal on mobile */}
            <div className="w-full md:w-16 flex-shrink-0 order-2 md:order-1">
              <div className="h-16 md:h-[360px] overflow-x-auto md:overflow-y-auto flex flex-row md:flex-col gap-2 p-1 md:pb-0 md:pr-1.5 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
                {[...photosData].reverse().map((photo, index) => (
                  <button
                    key={photosData.length - 1 - index}
                    onClick={() => setCurrentPhotoIndex(photosData.length - 1 - index)}
                    className={`w-16 md:w-full aspect-square relative rounded-md overflow-hidden transition-transform duration-200 hover:scale-105 flex-shrink-0 ${
                      currentPhotoIndex === (photosData.length - 1 - index) ? 'ring-2 ring-blue-500 p-[1px]' : ''
                    }`}
                  >
                    <Image
                      src={photo.src}
                      alt={`Thumbnail ${photosData.length - index}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 64px, 64px"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 pb-8 text-center text-gray-500">
          <p>Copyright © 2025 Gyuna Kim. All rights reserved. | Last updated on September 8, 2025.</p>
        </footer>
      </main>
    </div>
  );
};

export default Home; 