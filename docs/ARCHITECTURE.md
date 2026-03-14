# Architecture Principles

The system should prioritize:

- modularity
- scalability
- separation of concerns
- performance
- developer experience

---

# Structural Guidelines

Before introducing new structures:

- inspect existing patterns
- reuse utilities and components
- avoid duplication

---

# Architectural Improvements

You may suggest improvements such as:

- clearer folder organization
- reusable modules
- shared utilities
- improved data flow
- simplified architecture

---

# Avoid Tight Coupling

Prefer systems where:

- components are loosely coupled
- responsibilities are clear
- modules can evolve independently

Avoid hidden dependencies between modules.

---

# State and Data Flow

Prefer the simplest state model that works.

Prefer:

1. derived state
2. local state
3. shared state only when necessary

Avoid unnecessary global state.
