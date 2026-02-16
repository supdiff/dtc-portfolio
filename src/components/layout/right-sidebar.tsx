// src/components/layout/right-sidebar.tsx
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface TableOfContentsProps {
  activeSection: string;
}

const sectionHeadings = {
  about: [
    { id: 'introduction', title: 'Greetings' },
    { id: 'background', title: 'whoami' },
    { id: 'skills', title: 'credentials' },
    { id: 'experience', title: 'getWork()' },
    { id: 'skills-tools', title: 'dependencies' },
  ],
  projects: [
    { id: 'featured-projects', title: 'Featured Projects' },
    { id: 'other-projects', title: 'Other Projects' },
    { id: 'nav', title: 'Navigation' },
  ],
  writings: [
    { id: 'writings-intro', title: 'Introduction' },
    // { id: 'featured-articles', title: 'Featured Articles' },
    // { id: 'recent-articles', title: 'Recent Articles' },
    { id: 'topics', title: 'Navigation' },
  ],
  contact: [
    { id: 'contact-intro', title: 'Introduction' },
    { id: 'interactive-terminal', title: 'Terminal' },
    { id: 'message-form', title: 'Direct Message' },
    { id: 'navigation', title: 'Navigation' },
  ],
};

export function RightSidebar({ activeSection }: TableOfContentsProps) {
  const [activeHeading, setActiveHeading] = useState('');
  const [isDirectMessageVisible, setIsDirectMessageVisible] = useState(false);

  // Listen for the custom event dispatched from the contact terminal
  useEffect(() => {
    const handleShowLink = () => setIsDirectMessageVisible(true);
    window.addEventListener('showDirectMessageLink', handleShowLink);
    return () => {
      window.removeEventListener('showDirectMessageLink', handleShowLink);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const allHeadings =
        sectionHeadings[activeSection as keyof typeof sectionHeadings] || [];
      const headings =
        activeSection === 'contact'
          ? allHeadings.filter(
              (h) => h.id !== 'message-form' || isDirectMessageVisible,
            )
          : allHeadings;

      if (headings.length === 0) return;

      const mainElement = document.querySelector('main');
      if (!mainElement) return;

      const headingElements = headings
        .map((heading) => {
          const element = document.getElementById(heading.id);
          if (!element) return null;

          const rect = element.getBoundingClientRect();
          const mainRect = mainElement.getBoundingClientRect();
          const relativeTop = rect.top - mainRect.top + mainElement.scrollTop;

          return {
            id: heading.id,
            offsetTop: relativeTop,
          };
        })
        .filter((h): h is { id: string; offsetTop: number } => h !== null);

      if (!headingElements.length) return;

      const offset = 150;
      const scrollPosition = mainElement.scrollTop;
      const maxScroll = mainElement.scrollHeight - mainElement.clientHeight;

      let currentActiveHeading = '';

      for (let i = headingElements.length - 1; i >= 0; i--) {
        if (headingElements[i].offsetTop <= scrollPosition + offset) {
          currentActiveHeading = headingElements[i].id;
          break;
        }
      }

      if (scrollPosition >= maxScroll - 10) {
        currentActiveHeading = headingElements[headingElements.length - 1].id;
      }

      if (!currentActiveHeading && headingElements.length > 0) {
        currentActiveHeading = headingElements[0].id;
      }

      setActiveHeading(currentActiveHeading);
    };

    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.addEventListener('scroll', handleScroll, { passive: true });
      setTimeout(handleScroll, 100);
    }

    return () => {
      if (mainElement) {
        mainElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [activeSection, isDirectMessageVisible]);

  // Reset states when section changes
  useEffect(() => {
    // Hide the direct message link if we navigate away from the contact page
    if (activeSection !== 'contact') {
      setIsDirectMessageVisible(false);
    }

    const headings =
      sectionHeadings[activeSection as keyof typeof sectionHeadings] || [];
    if (headings.length > 0) {
      setActiveHeading(headings[0].id);
      setTimeout(() => {
        document.querySelector('main')?.scrollTo({ top: 0 });
      }, 0);
    }
  }, [activeSection]);

  const scrollToHeading = (headingId: string) => {
    const element = document.getElementById(headingId);
    const mainElement = document.querySelector('main');

    if (element && mainElement) {
      const rect = element.getBoundingClientRect();
      const mainRect = mainElement.getBoundingClientRect();
      const relativeTop = rect.top - mainRect.top + mainElement.scrollTop;

      mainElement.scrollTo({
        top: relativeTop - 100,
        behavior: 'smooth',
      });
    }
  };

  const allHeadingsForCurrentSection =
    sectionHeadings[activeSection as keyof typeof sectionHeadings] || [];

  // Conditionally filter the headings for the contact page
  const currentHeadings =
    activeSection === 'contact'
      ? allHeadingsForCurrentSection.filter(
          (heading) => heading.id !== 'message-form' || isDirectMessageVisible,
        )
      : allHeadingsForCurrentSection;

  return (
    <aside className="hidden lg:block w-[18vw] h-[calc(100vh-4rem)] bg-muted/30 p-6">
      <div className="sticky top-6 space-y-6">
        {currentHeadings.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">On This Page</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-border"></div>
                {currentHeadings.map((heading) => (
                  <div key={heading.id} className="relative">
                    <div
                      className={cn(
                        'absolute -left-[3px] top-3 w-1.5 h-1.5 rounded-full transition-all duration-200',
                        activeHeading === heading.id
                          ? 'bg-primary scale-125'
                          : 'bg-muted-foreground/30 scale-75',
                      )}
                    />
                    {activeHeading === heading.id && (
                      <div className="absolute left-0 top-0 bottom-0 w-px bg-primary"></div>
                    )}
                    <button
                      onClick={() => scrollToHeading(heading.id)}
                      className={cn(
                        'block w-full text-left text-sm py-2 pl-6 pr-2 rounded-r transition-all duration-200 hover:bg-muted/50',
                        activeHeading === heading.id
                          ? 'text-primary font-medium bg-primary/5'
                          : 'text-muted-foreground hover:text-foreground',
                      )}
                    >
                      <span className="block truncate">{heading.title}</span>
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Latest Posts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>No posts at the moment.</div>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
}
