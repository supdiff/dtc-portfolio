import { SectionHeader } from '@/components/shared/section-header';
import { ArticleCard } from '@/components/shared/article-card';
import { writings } from '@/data/writings';
import { SectionNavigator } from '../shared/section-navigator';

export function WritingsSection() {
  const featuredWritings = writings.filter((w) => w.featured);
  const recentWritings = writings.filter((w) => !w.featured);

  return (
    <div className="space-y-32">
      {/* Header */}
      <section id="writings-intro" className="scroll-mt-20 space-y-6">
        <SectionHeader
          title="My Writings"
          subtitle="Thoughts, tutorials, and insights about web development, technology trends, and software engineering"
        />
      </section>

      {/* Featured Articles */}
      <section id="featured-articles" className="scroll-mt-20 space-y-8">
        <h2 className="text-3xl font-bold">Featured Articles</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {featuredWritings.map((article, index) => (
            <ArticleCard
              key={index}
              title={article.title}
              excerpt={article.excerpt}
              date={article.date}
              readTime={article.readTime}
              tags={article.tags}
              featured={true}
              url={article.url}
            />
          ))}
        </div>
      </section>

      {/* Recent Articles */}
      <section id="recent-articles" className="scroll-mt-20 space-y-8">
        <h2 className="text-3xl font-bold">Recent Articles</h2>
        <div className="space-y-4">
          {recentWritings.map((article, index) => (
            <ArticleCard
              key={index}
              title={article.title}
              excerpt={article.excerpt}
              date={article.date}
              readTime={article.readTime}
              tags={article.tags}
              featured={false}
              url={article.url}
            />
          ))}
        </div>
      </section>

      {/* Topics */}
      <section id="topics" className="scroll-mt-20 space-y-8">
        <SectionNavigator
          id="topics"
          currentSection="writings"
        ></SectionNavigator>
      </section>
    </div>
  );
}
