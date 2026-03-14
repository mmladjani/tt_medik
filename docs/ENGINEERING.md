# Engineering Guidelines

These rules ensure consistent, maintainable code.

---

# Code Quality

Code should be:

- readable
- maintainable
- predictable
- consistent with project patterns

Prefer:

- small focused functions
- reusable components
- explicit logic
- clear naming

Avoid:

- overly clever code
- unnecessary abstractions
- premature optimizations

---

# Clean Code Expectations

Prefer:

- descriptive variable names
- simple control flow
- separation of concerns
- low cognitive overhead

Avoid compact but difficult-to-understand code.

---

# Refactoring

When proposing refactors:

1. explain the issue
2. explain why it matters
3. propose a minimal safe improvement

Refactors should:

- preserve behavior
- reduce complexity
- reduce duplication

Avoid large refactors unless clearly beneficial.

---

# Debugging

When debugging:

- identify root cause
- trace code paths
- confirm the issue

Avoid patching symptoms without understanding the cause.

---

# Validation

After implementing changes:

- run lint
- run type checks
- run tests if available
- verify logic manually when necessary

Clearly state any limitations of validation.
