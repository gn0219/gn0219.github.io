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
import { teachingData } from '@/data/teaching';
import { useState, useEffect, useRef } from 'react';
import { theme } from '@/styles/theme';

const Home: NextPage = () => {
  const [activeSection, setActiveSection] = useState('about');
  const sections = useRef<{ [key: string]: IntersectionObserverEntry }>({});
  const headerHeight = parseInt(theme.spacing.headerHeight);

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Head>
        <title>{profileData.name} - Personal Homepage</title>
        <meta name="description" content={`${profileData.name}'s personal homepage`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header with Lora font for name */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
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
              <span className="text-xl font-bold">{profileData.name}</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              {['about me', 'research'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section.replace(' ', ''))}
                  className={`text-gray-600 hover:text-blue-600 transition-colors duration-200 text-base font-medium ${
                    activeSection === section.replace(' ', '') ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : ''
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
              <a
                href="/cv.pdf" // You'll need to add your CV file to the public folder
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                CV
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div style={{ paddingTop: theme.spacing.headerHeight }}></div>

        {/* Profile Section */}
        <section id="aboutme" className="mb-12">
          <div className="flex flex-col md:flex-row items-start gap-16">
            {/* Left Column: Profile Image + Simple Info */}
            <div className="flex flex-col items-center md:items-start space-y-6 flex-shrink-0 w-full md:w-auto">
              <div className="w-64 h-64 relative rounded-full overflow-hidden">
                <Image
                  src={profileData.image}
                  alt={profileData.name}
                  width={256}
                  height={256}
                  className="rounded-full"
                />
              </div>
              <div className="text-center md:text-left space-y-3">
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold font-lora">{profileData.name}</h1>
                  <p className="text-lg text-gray-600">{profileData.title}</p>
                  <p className="text-gray-600">{profileData.location}</p>
                </div>
                <div className="flex gap-4 justify-center md:justify-start pt-4">
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
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                  )}
                  {profileData.socialLinks.linkedin && (
                    <a 
                      href={profileData.socialLinks.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
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
                <p>I am a master's student at {' '}
                  <a 
                    href={profileData.lab.url}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-semibold"
                    style={{
                      color: theme.links.lab.default,
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = theme.links.lab.hover;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = theme.links.lab.default;
                    }}
                  >
                    {profileData.lab.name}
                  </a>
                  , advised by {profileData.lab.advisor}. {profileData.about}</p>
              </div>
            </div>
          </div>

          {/* Education and Skills */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 font-lora">Education</h3>
              <div className="space-y-4">
                {profileData.education.map((edu, index) => (
                  <div key={index}>
                    <p className="font-semibold">{edu.degree}</p>
                    <p className="text-gray-600">{edu.institution}</p>
                    <p className="text-gray-500">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 font-lora">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {profileData.skills.map((skill, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* News Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">News ✨</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="space-y-4">
              {newsData.map((news, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-24 flex-shrink-0">
                    <p className="font-bold text-gray-800">{news.date}</p>
                  </div>
                  <div className="flex-grow">
                    <p className="text-gray-700">{news.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Research Interests Section */}
        <section id="research" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Research Interests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {researchData.interests.map((interest, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
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
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-12">
          <h2 className="text-2xl font-bold mb-6 font-lora">Projects</h2>
          <div className="grid grid-cols-1 gap-8">
            {projectsData.current.map((project, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {project.image && (
                    <div className="md:w-1/3">
                      <div className="relative h-64 md:h-full">
                        <Image
                          src={project.image}
                          alt={project.title}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex-1 p-6">
                    <h3 className="text-xl font-bold mb-4 font-lora">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
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
                        <span className="w-20 text-gray-500 mt-1">Tools:</span>
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

        {/* Publications Section - Hidden if empty */}
        {publicationsData.publications.length > 0 && (
          <section id="publications" className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Publications</h2>
            <div className="space-y-6">
              {publicationsData.publications.map((publication, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2">{publication.title}</h3>
                  <p className="text-gray-600 mb-2">
                    {publication.authors.join(', ')} - {publication.venue} ({publication.year})
                  </p>
                  {publication.doi && (
                    <a
                      href={`https://doi.org/${publication.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Publication →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Honors and Awards Section */}
        <section id="honors" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Honors and Awards</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
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

        {/* Services Section - Hidden if empty */}
        {servicesData.length > 0 && (
          <section id="services" className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Services</h2>
            <div className="space-y-8">
              {servicesData.map((service, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
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

        {/* Teaching Experience Section */}
        <section id="teaching" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Teaching Experience</h2>
          <div className="space-y-8">
            {teachingData.map((experience, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">{experience.role}</h3>
                <div className="space-y-4">
                  {experience.courses.map((course, idx) => (
                    <div key={idx} className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{course.title}</h4>
                        <p className="text-gray-600">{course.institution}</p>
                      </div>
                      <span className="text-gray-500">{course.year}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 pb-8 text-center text-gray-500">
          <p>© Gyuna Kim. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
};

export default Home; 