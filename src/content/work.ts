import type { WorkFigureKind } from '../components/WorkFigure'

/* Work — a 12-year career told as a left→right scroll of accomplishments, plus
   the individual awards list. A leading "Now" card carries the current role so
   the rail never ends on a past job; after it, one card per year, newest
   first, each carrying the most impactful role or accomplishment of that year
   (sourced from the master résumé — one-liners stay base-name-free; units,
   bases, and dates live in /background/occupation and the awards list). The
   section title links to the career highlights page (/career). AWARDS holds
   individual recognition only — team awards stay off this list. */

export type Accomplishment = {
  slug: string
  period: string // e.g. "2023"
  title: string
  oneLine: string
  figure: WorkFigureKind
}

export type Award = {
  year: string
  title: string
  detail: string
}

export const ACCOMPLISHMENTS: Accomplishment[] = [
  {
    slug: 'now-training-evaluations',
    period: 'Now',
    title: 'Section Chief, Training & Evaluations',
    oneLine:
      'Leads the squadron’s training and evaluation flight — 62 programs supporting a $905M intelligence data-processing enterprise and its 760 on-site analysts.',
    figure: 'checklist',
  },
  {
    slug: '2025-deployed-comms',
    period: '2025',
    title: 'Senior Project Manager, Deployed Communications',
    oneLine:
      'Deployed to an undisclosed location directing cyber planning, cybersecurity, data management, and logistics offices.',
    figure: 'deployed-comms',
  },
  {
    slug: '2024-plans-requirements',
    period: '2024',
    title: 'Division Lead, Plans & Requirements',
    oneLine:
      'Directed the plans and requirements division: the organization’s share of a $162M classified-network migration, plus the Flight Chief role over 29 personnel in seven specialties.',
    figure: 'plans',
  },
  {
    slug: '2023-project-management',
    period: '2023',
    title: 'Department Lead, Project Management',
    oneLine:
      'Led 6 project managers supporting a $905M intelligence data-processing enterprise — tech refreshes across 5 enclaves, 3.2K devices, 760 intel analysts.',
    figure: 'gantt',
  },
  {
    slug: '2022-it-projects',
    period: '2022',
    title: 'Manager, IT Projects',
    oneLine:
      'Ran base-wide cyber projects: a $35M enclave and 7.2K systems supporting 3.1K joint-force users and 4,400 flight missions.',
    figure: 'enclave',
  },
  {
    slug: '2021-cyber-operations',
    period: '2021',
    title: 'Department Lead, Cyber Operations',
    oneLine:
      'From running Client Systems — 26 techs, 2K+ tickets a year, $2.4B infrastructure — to leading four cyber teams and 50+ technicians.',
    figure: 'org-tree',
  },
  {
    slug: '2020-deployments',
    period: '2020',
    title: 'Manager, Deployments',
    oneLine:
      'Owned deployment records, training, and readiness for 250 members supporting worldwide contingency operations — defense-readiness qualification from 49% to 91%.',
    figure: 'globe-route',
  },
  {
    slug: '2019-acquisitions',
    period: '2019',
    title: 'Manager, IT Acquisitions & Lifecycle',
    oneLine:
      'Ran acquisitions and lifecycle management for the airlift wing — 20K IT assets worth $20.6M — and earned NCO Technician of the Quarter.',
    figure: 'lifecycle',
  },
  {
    slug: '2018-supervisor-acquisitions',
    period: '2018',
    title: 'Supervisor, IT Acquisitions',
    oneLine:
      'First supervisory role, owning the wing’s asset lifecycle — and Distinguished Graduate of Airman Leadership School.',
    figure: 'checklist',
  },
  {
    slug: '2017-sr-technician',
    period: '2017',
    title: 'Senior IT Technician',
    oneLine:
      'Senior technician for the 374th — network and desktop support for 6,000 users and 20K client systems across 39 units.',
    figure: 'bench-trace',
  },
  {
    slug: '2016-airman-of-the-year',
    period: '2016',
    title: 'Cyber Systems Airman of the Year',
    oneLine:
      '35 CS Information Dominance Award — earned running the base help-desk queue as team lead, at the squadron’s best open-to-close ratio.',
    figure: 'ticket-queue',
  },
  {
    slug: '2015-team-lead',
    period: '2015',
    title: 'IT Technician / Team Lead',
    oneLine:
      'Airman of the Quarter and Honor Guardsman of the Quarter in the first assignment — then a team lead at the next station within the year.',
    figure: 'rack',
  },
  {
    slug: '2014-top-graduate',
    period: '2014',
    title: 'AETC “Top Graduate” — Commander’s Award',
    oneLine:
      'Graduated top of Air Force IT technical training, then straight into the first assignment as an IT technician.',
    figure: 'top-grad',
  },
]

export const AWARDS: Award[] = [
  { year: '2025', title: '48 ISS Senior NCO of the Quarter', detail: 'Beale AFB, California' },
  { year: '2023', title: 'AFSA Ch. 1372 Non-Commissioned Officer of the Year', detail: 'Beale AFB, California' },
  { year: '2023', title: 'AFSA Ch. 1372 Volunteer of the Year', detail: 'Beale AFB, California' },
  { year: '2023', title: '548 ISRG Volunteer of the Year', detail: 'Beale AFB, California' },
  { year: '2023', title: '548 ISRG Volunteer of the Quarter', detail: 'Beale AFB, California' },
  { year: '2023', title: 'AFSA Ch. 1372 Non-Commissioned Officer of the Quarter', detail: 'Beale AFB, California' },
  { year: '2023', title: 'NCO Academy Distinguished Graduate Award', detail: 'Lackland AFB, Texas' },
  { year: '2019', title: '374 AW Honor Guard Member of the Year', detail: 'Yokota AB, Japan' },
  { year: '2019', title: '374 AW Honor Guard Member of the Quarter', detail: 'Yokota AB, Japan' },
  { year: '2019', title: '374 CS NCO Technician of the Quarter', detail: 'Yokota AB, Japan' },
  { year: '2018', title: 'Airman Leadership School Distinguished Graduate Award', detail: 'Yokota AB, Japan' },
  { year: '2016', title: '35 CS Cyber Systems Airman of the Year — Information Dominance Award', detail: 'Misawa AB, Japan' },
  { year: '2016', title: '35 CS Airman of the Quarter', detail: 'Misawa AB, Japan' },
  { year: '2015', title: 'Team Osan Honor Guardsman of the Quarter', detail: 'Osan AB, South Korea' },
  { year: '2015', title: '51 CS Airman of the Quarter', detail: 'Osan AB, South Korea' },
  { year: '2014', title: 'AETC “Top Graduate” Commander’s Award', detail: 'Keesler AFB, Mississippi' },
]
