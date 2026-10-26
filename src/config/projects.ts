export interface ProjectPresentation {
  preferredOrder: readonly string[];
  initialVisibleCount: number;
  featuredSlugs: readonly string[];
}

export const projectPresentation: ProjectPresentation = {
  // Preserve the former Project1–Project11 order; future unlisted entries follow.
  preferredOrder: [
    'language-coach',
    'movie-api',
    'myflix-react',
    'meet-app',
    'chat-app',
    'myflix-angular',
    'pokedex-app',
    'tripcast',
    'golden-crane-restaurant',
    'bikeshare-app',
    'patagonia-2025',
    'ec-wedding',
  ],
  initialVisibleCount: 6,
  // When nonempty, these projects lead the initial group in this exact order.
  featuredSlugs: [],
};

export const projectLinks = {
  // Migrated flags preserve the approved source values (false/null). Honor future
  // explicit enables without requiring a second frontend visibility override.
  homepageFlagsReviewed: true,
  legacyHomepageSlugs: [] as readonly string[],
};
