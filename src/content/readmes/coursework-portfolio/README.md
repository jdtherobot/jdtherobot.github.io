# JD Britt — Software Engineering Coursework

**[GitHub](https://github.com/jdtherobot)** · jd@britt.gg

A set of Java / Spring projects — two of them full-stack apps with an Angular front end.
Each was built on a provided starter and extended with my own code. Each page below is
explicit about **what I built versus what the starter provided** — including where the frontend was
provided and my work was the backend and REST contract behind it.  
The full source for any project above is available upon request.

> **Why these are private:** these projects were built as graded coursework. Per the course
> policy, the full solution source isn't posted publicly, so this showcase presents the
> engineering — architecture, design decisions, and results — and links to private repos I share
> directly. If you'd like read access to any repository, see [Requesting access](#requesting-access).

---

## Engineering concepts

- **Layered architecture** — clean separation of REST/controller, service, and persistence layers;
  DTO/entity conversion instead of leaking the data model over the wire.
- **Relational data modeling** — normalized schemas with one-to-many and many-to-many relationships
  mapped through JPA/Hibernate, verified directly against the database.
- **Input validation & invariants** — custom validators and constraint annotations that reject bad
  state (inventory bounds, referential rules) with actionable error messages.
- **Concurrency & internationalization** — parallel resource-bundle loading on separate threads;
  timezone conversion with `ZonedDateTime`/`ZoneId`.
- **Reproducible delivery** — containerized builds (Docker, `eclipse-temurin`) and a documented
  cloud-deployment path.
- **Testing** — unit tests around domain invariants.

---

## Projects

| Project | Stack | What I built | Repository                                                                                                                                  |
|---|---|---|---------------------------------------------------------------------------------------------------------------------------------------------|
| [Inventory Management System](projects/inventory-management-system.md) | Java · Spring Boot · Thymeleaf · JPA | Min/max inventory invariants, cross-entity validation, purchase flow, unit tests | *[wgu-spring-boot-inventory-manager](https://github.com/jdtherobot/wgu-spring-boot-inventory-manager)*  *(private)*                         |
| [Vacation Booking Platform](projects/vacation-booking-platform.md) | Java · Spring Boot · Spring Data REST · MySQL · Angular (provided client) | Entire Spring Boot REST **backend** over a relational schema — domain model, checkout service, validation — consumed by a provided, unmodified Angular client | *[wgu-spring-boot-vacation-booking-backend](https://github.com/jdtherobot/wgu-spring-boot-vacation-booking-backend)*  *(private)* |
| [Hotel Reservation Platform](projects/hotel-reservation-platform.md) | Java · Spring Boot · JPA · Angular · Docker | i18n + **multithreaded** message loading, timezone/currency logic, Docker packaging, cloud-deploy design | *[wgu-hotel-reservation-i18n-docker](https://github.com/jdtherobot/wgu-hotel-reservation-i18n-docker)* *(private)*                          |

---

## Tech matrix

| Area | Technologies |
|---|---|
| Languages | Java 17, TypeScript |
| Backend | Spring Boot 3.x, Spring MVC, Spring Data JPA, Spring Data REST, Hibernate |
| Frontend | Angular 14, RxJS, Thymeleaf |
| Data | MySQL, H2 |
| Build & delivery | Maven, Docker (eclipse-temurin), AWS (deployment design) |
| Testing | JUnit |

---

*This repository contains only documentation, diagrams, and screenshots of my own work. It does
not reproduce course assessment materials.*
