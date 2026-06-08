export type GoSchoolListing = {
  id: string;
  name: string;
  city: string;
  country: string;
  type: string;
  rating: number;
  reviews: number;
  programs: string[];
  levels: string[];
};

export const goschoolListings: GoSchoolListing[] = [
  {
    id: 'lycee-technique-plateau',
    name: 'Lycee Technique du Plateau',
    city: 'Brazzaville',
    country: 'Congo',
    type: 'Lycee technique',
    rating: 4.7,
    reviews: 42,
    programs: ['Series C', 'Series D', 'G2', 'Preparation bac'],
    levels: ['Seconde', 'Premiere', 'Terminale'],
  },
  {
    id: 'institut-horizon-pro',
    name: 'Institut Horizon Pro',
    city: 'Douala',
    country: 'Cameroun',
    type: 'Institut prive',
    rating: 4.8,
    reviews: 67,
    programs: ['Informatique', 'Comptabilite', 'Commerce', 'Entrepreneuriat'],
    levels: ['Terminale', 'Etudiant', 'Formation pro'],
  },
  {
    id: 'academie-teranga',
    name: 'Academie Teranga',
    city: 'Dakar',
    country: 'Senegal',
    type: 'Centre de formation',
    rating: 4.6,
    reviews: 35,
    programs: ['Langues', 'Soutien scolaire', 'Orientation', 'Concours'],
    levels: ['Collegien', 'Lyceen', 'Etudiant'],
  },
];

export function searchListings(query = '', city = '') {
  const normalizedQuery = query.trim().toLowerCase();
  const normalizedCity = city.trim().toLowerCase();

  return goschoolListings.filter((listing) => {
    const matchesQuery =
      !normalizedQuery ||
      listing.name.toLowerCase().includes(normalizedQuery) ||
      listing.type.toLowerCase().includes(normalizedQuery) ||
      listing.programs.some((program) => program.toLowerCase().includes(normalizedQuery)) ||
      listing.levels.some((level) => level.toLowerCase().includes(normalizedQuery));

    const matchesCity = !normalizedCity || listing.city.toLowerCase() === normalizedCity;

    return matchesQuery && matchesCity;
  });
}
