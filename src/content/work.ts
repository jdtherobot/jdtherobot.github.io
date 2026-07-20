import type { WorkFigureKind } from '../components/WorkFigure'

/* Work — a 12-year career told as a left→right scroll of accomplishments, plus
   the individual awards list. One card per year, newest first, each carrying
   the most impactful role or accomplishment of that year (sourced from the
   master résumé). The section title links to the full career résumé (/career).
   AWARDS holds individual recognition only — team awards stay off this list. */

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
    slug: '2025-deployed-comms',
    period: '2025',
    title: 'Sr Project Manager, Deployed Communications',
    oneLine:
      'Deployed to an undisclosed location directing cyber planning, cybersecurity, data management, and logistics offices.',
    figure: 'deployed-comms',
  },
  {
    slug: '2024-plans-requirements',
    period: '2024',
    title: 'Division Lead, Plans & Requirements',
    oneLine:
      'Directed cyber planning, cybersecurity, data management, and logistics at Beale AFB — while starting a full-time CS degree.',
    figure: 'plans',
  },
  {
    slug: '2023-project-management',
    period: '2023',
    title: 'Department Lead, Project Management',
    oneLine:
      'Led 6 project managers supporting a $905M weapon system — tech refreshes across 5 enclaves, 3.2K devices, 760 intel analysts.',
    figure: 'gantt',
  },
  {
    slug: '2022-it-projects',
    period: '2022',
    title: 'Manager, IT Projects',
    oneLine:
      'Ran base-wide cyber projects at Kunsan: a $35M enclave and 7.2K systems supporting 3.1K joint-force users and 7K yearly sorties.',
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
      'Owned deployment records, training, and readiness for 250 members and 1K lbs of mission cargo supporting Pacific OPLANs.',
    figure: 'globe-route',
  },
  {
    slug: '2019-acquisitions',
    period: '2019',
    title: 'Manager, IT Acquisitions & Lifecycle',
    oneLine:
      'Ran acquisitions and lifecycle management for the airlift wing at Yokota — and took NCO Technician of the Quarter doing it.',
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
    title: 'Sr IT Technician',
    oneLine:
      'Senior technician for the 374th at Yokota — closing out a Misawa tour that earned 35 CS Team of the Year.',
    figure: 'bench-trace',
  },
  {
    slug: '2016-airman-of-the-year',
    period: '2016',
    title: 'Cyber Systems Airman of the Year',
    oneLine:
      '35 CS Information Dominance Award at Misawa — earned running help desk operations and the deployment office as team lead.',
    figure: 'ticket-queue',
  },
  {
    slug: '2015-team-lead',
    period: '2015',
    title: 'IT Technician / Team Lead',
    oneLine:
      'Airman of the Quarter and Honor Guardsman of the Quarter at Osan — then on to Misawa as a team lead within the year.',
    figure: 'rack',
  },
  {
    slug: '2014-top-graduate',
    period: '2014',
    title: 'AETC “Top Graduate” — Commander’s Award',
    oneLine:
      'Graduated top of technical training at Keesler, then straight to the first assignment: IT technician at Osan AB, South Korea.',
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
