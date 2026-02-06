\# WhyMBA360 – System Architecture



WhyMBA360 is a modular, engine-driven product platform.

This repository is the single canonical source of truth.

All services, engines, and infrastructure evolve from here.



---



\## Repository Structure



/apps  

\- backend → Core API, data access, auth, orchestration  

\- frontend → User-facing web application  



/engines  

\- cie → College Intelligence Engine (exam logic, scoring, portfolio optimization)  



/infra  

\- ops → Internal ops dashboard, admin tooling, deployments  



---



\## Architectural Principles



1\. Engines are isolated, domain-owned systems.

2\. Apps orchestrate engines; engines do not depend on apps.

3\. No cross-engine imports.

4\. Infrastructure does not contain business logic.

5\. All production changes flow through pull requests into `main`.

6\. CI is mandatory. If CI fails, the system does not advance.



---



\## Development \& Governance



\- `main` is protected and production-grade.

\- All changes happen via feature branches.

\- Pull requests require:

&nbsp; - Passing CI checks

&nbsp; - Review (self-review minimum for solo development)

\- Direct pushes to `main` are disallowed.



---



\## Extensibility



New engines must:

\- Live under `/engines`

\- Own their domain and dependencies

\- Expose a clear interface to apps



This ensures horizontal scale without architectural refactors.



