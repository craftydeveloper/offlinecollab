# Architecture

## Boundaries

The domain layer owns validation and project-specific deterministic logic. The repository interface isolates persistence. HTTP handlers translate requests into service calls and map known domain errors to safe responses.

## Project-specific core

OfflineCollab contains a deterministic last-writer-wins merge core with Lamport clocks, actor tie-breaking, and tombstones. The next layer can add transport and encrypted local persistence without changing conflict semantics.

## Deliberate limitations

The included server uses an in-memory repository and has no authentication. It is suitable for local exploration and tests only. A production deployment needs durable transactional storage, access control, request limits, observability, and a documented threat model.
