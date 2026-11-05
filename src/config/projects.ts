export interface ProjectPresentation {
  preferredOrder: readonly string[];
  initialVisibleCount: number;
  featuredSlugs: readonly string[];
}

export const projectPresentation: ProjectPresentation = {
  // Approved presentation order, shared by both locales; unlisted entries follow.
  preferredOrder: [
    'tripcast',
    'language-coach',
    'mark-saville-designs',
    'movie-api',
    'patagonia-2025',
    'bikeshare-app',
    'myflix-react',
    'meet-app',
    'ec-wedding',
    'myflix-angular',
    'pokedex-app',
    'chat-app',
    'golden-crane-restaurant',
  ],
  initialVisibleCount: 8,
  // When nonempty, these projects lead the initial group in this exact order.
  featuredSlugs: [],
};

export const projectLinks = {
  // Migrated flags preserve the approved source values (false/null). Honor future
  // explicit enables without requiring a second frontend visibility override.
  homepageFlagsReviewed: true,
  legacyHomepageSlugs: [] as readonly string[],
};
