# Boilerplate Features - Production-Ready General Purpose

## TL;DR

> **Quick Summary**: Add essential production features to make this a general-purpose boilerplate: Email system (Resend + simulation), 2-tier roles, Settings page, Zod validation, minimal testing, password reset, email verification, and TypeORM migrations.

> **Deliverables**:
> - Email service with Resend + terminal simulation fallback
> - User roles (user | admin) with RBAC middleware
> - Settings page (profile + password change + delete account)
> - Zod validation for all auth forms
> - 18 tests total (12 backend + 6 frontend)
> - Password reset flow with email
> - Email verification on register
> - TypeORM migration system with initial migration

> **Estimated Effort**: Large (3-4 days implementation)
> **Parallel Execution**: YES - 4 waves
> **Critical Path**: Migrations → Roles → Email → Settings → Validation → Tests

---

## Context

### Original Request
User wants to enhance current boilerplate for general-purpose use (not SaaS-specific). Features must be essential (90% of projects need these), not nice-to-have.

### Interview Summary
**Key Discussions**:
- **Payment**: Explicitly EXCLUDED - different per region, not universal need
- **Landing/Pricing**: EXCLUDED - SPA not good for SEO, separate stack for marketing
- **Email**: Resend with simulation mode (terminal visual when no API key)
- **Roles**: 2-tier only (user | admin) - simple, extensible later
- **Testing**: Minimal but meaningful (~18 tests)
- **Validation**: Zod for type-safe form validation
- **Migrations**: TypeORM migrations (not synchronize) for production safety

**Research Findings**:
- Current setup: Basic auth (login/register/jwt), user entity without roles, 6 UI components
- No email system, no roles, no settings page, no Zod, no tests, no migrations
- Decoupled architecture (frontend static + backend API) is solid

### Metis Review
**Identified Gaps** (addressed in this plan):
- JWT storage: Keep localStorage for simplicity (document security trade-off)
- State management: Use existing Context API (already in auth.context.tsx)
- Test framework: vitest (matches existing Vite setup)
- Seed strategy: Simple seed script for initial admin user
- Scope creep guardrails explicitly defined
- Edge cases documented in acceptance criteria

---

## Work Objectives

### Core Objective
Transform current boilerplate into production-ready general-purpose template with essential features that 90% of projects need.

### Concrete Deliverables
- `backend/services/email.service.ts` - Resend integration + simulation
- `backend/entities/user.entity.ts` - Add role field + email verification fields
- `backend/middleware/role.middleware.ts` - Admin route protection
- `backend/routes/auth.route.ts` - Password reset + email verification endpoints
- `backend/routes/admin.route.ts` - Admin user management
- `backend/migrations/*` - TypeORM migrations
- `backend/validators/*.ts` - Zod schemas
- `app/routes/settings/profile.tsx` - Settings page
- `app/routes/settings/security.tsx` - Change password
- `app/routes/auth/verify-email.tsx` - Email verification page
- `app/routes/auth/forgot-password.tsx` - Password reset request
- `app/routes/auth/reset-password.tsx` - Password reset form
- `app/lib/validation.ts` - Shared Zod schemas
- `backend/tests/*.test.ts` - 12 backend tests
- `app/tests/*.test.tsx` - 6 frontend tests

### Definition of Done
- [ ] `npm run dev` - Both frontend + backend start without errors
- [ ] `npm run typecheck` - Zero TypeScript errors
- [ ] `npm test` - All 18 tests pass
- [ ] `npm run migration:run` - Migrations run successfully
- [ ] Email simulation shows terminal visual when no RESEND_API_KEY
- [ ] Admin-only routes return 403 for non-admin users
- [ ] Settings page allows profile update + password change
- [ ] Password reset flow works end-to-end
- [ ] Email verification required before full account access

### Must Have
- Email simulation mode with nice terminal output
- 2-tier roles (user | admin) stored in JWT
- Settings page with profile + security tabs
- Zod validation for all auth forms
- TypeORM migrations (not synchronize)
- vitest for testing (backend + frontend)
- Password reset via email
- Email verification on register

### Must NOT Have (Guardrails)
- **NO** OAuth providers (Google, GitHub, etc.)
- **NO** Multi-factor authentication
- **NO** Profile picture upload
- **NO** Activity logging/audit trails
- **NO** Email template editor UI
- **NO** E2E tests (Playwright/Cypress)
- **NO** 100% test coverage (target 70%)
- **NO** Theme customization in settings
- **NO** Notification preferences
- **NO** File upload system
- **NO** Internationalization (i18n)
- **NO** Payment/subscription features

### Scope Boundaries
**Settings Page = ONLY**:
- Change password
- Update email (triggers verification)
- Delete account
- That's it. Nothing else.

**Zod Validation = ONLY**:
- POST /auth/register
- POST /auth/login
- POST /auth/forgot-password
- POST /auth/reset-password
- POST /auth/verify-email
- PUT /users/:id (settings)
- Skip query params, skip simple GET requests

**Email System = ONLY**:
- Resend integration
- 3 email types: verification, password reset, welcome
- Terminal fallback when no API key
- No templates UI, no history, no analytics

**Testing = ONLY**:
- Backend (12 tests): 4 auth, 3 user, 2 email, 3 middleware
- Frontend (6 tests): 2 render, 2 redirect, 2 validation
- Total: 18 tests. No E2E. No performance tests.

---

## Verification Strategy

### Test Decision
- **Infrastructure exists**: NO
- **Automated tests**: YES (Tests-after - implement features first, then tests)
- **Framework**: vitest (matches existing Vite setup, fast, modern)
- **Test isolation**: Separate test database (test.sqlite)

### QA Policy
Every task MUST include agent-executed QA scenarios:
- **Backend**: curl commands to test endpoints, assert status + response fields
- **Frontend**: Playwright to navigate, interact, assert DOM
- **Database**: Verify schema changes via sqlite3 CLI
- **Email**: Verify terminal output format (simulation mode)

Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately - Foundation):
├── Task 1: TypeORM migrations setup + initial migration [quick]
├── Task 2: Add role field to User entity [quick]
├── Task 3: Install dependencies (Resend, Zod, vitest) [quick]
└── Task 4: Create email service with simulation [unspecified-high]

Wave 2 (After Wave 1 - Auth Enhancements):
├── Task 5: Add email verification fields to entity [quick]
├── Task 6: Password reset endpoints + service [unspecified-high]
├── Task 7: Email verification endpoints + service [unspecified-high]
├── Task 8: Zod validators for auth forms [quick]
└── Task 9: Role-based middleware [quick]

Wave 3 (After Wave 2 - Frontend):
├── Task 10: Settings page (profile + security) [visual-engineering]
├── Task 11: Forgot password page [visual-engineering]
├── Task 12: Reset password page [visual-engineering]
├── Task 13: Email verification page [visual-engineering]
└── Task 14: Admin dashboard (user list + role management) [visual-engineering]

Wave 4 (After Wave 3 - Testing):
├── Task 15: Backend tests (12 tests) [unspecified-high]
└── Task 16: Frontend tests (6 tests) [unspecified-high]

Wave FINAL (After ALL tasks — 4 parallel reviews, then user okay):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Code quality review (unspecified-high)
├── Task F3: Real manual QA (unspecified-high)
└── Task F4: Scope fidelity check (deep)
-> Present results -> Get explicit user okay

Critical Path: Task 1 → Task 2 → Task 4 → Task 6 → Task 10 → Task 15 → F1-F4 → user okay
Parallel Speedup: ~60% faster than sequential
Max Concurrent: 5 (Waves 2 & 3)
```

### Dependency Matrix

| Task | Depends On | Blocks |
|------|------------|--------|
| 1 | - | 2, 5 |
| 2 | 1 | 6, 7, 9 |
| 3 | - | 4, 8 |
| 4 | 3 | 6, 7 |
| 5 | 1 | 6, 7 |
| 6 | 2, 4, 5 | 11, 12 |
| 7 | 2, 4, 5 | 13 |
| 8 | 3 | 10, 11, 12, 13, 14 |
| 9 | 2 | 14 |
| 10 | 8 | 15, 16 |
| 11 | 6, 8 | 15, 16 |
| 12 | 6, 8 | 15, 16 |
| 13 | 7, 8 | 15, 16 |
| 14 | 8, 9 | 15, 16 |
| 15 | 10, 11, 12, 13, 14 | F1-F4 |
| 16 | 10, 11, 12, 13, 14 | F1-F4 |

### Agent Dispatch Summary

- **Wave 1**: 4 tasks - T1-T3 → `quick`, T4 → `unspecified-high`
- **Wave 2**: 5 tasks - T5, T8, T9 → `quick`, T6, T7 → `unspecified-high`
- **Wave 3**: 5 tasks - T10-T14 → `visual-engineering`
- **Wave 4**: 2 tasks - T15, T16 → `unspecified-high`
- **FINAL**: 4 tasks - F1 → `oracle`, F2 → `unspecified-high`, F3 → `unspecified-high`, F4 → `deep`

---

## TODOs

- [x] 1. TypeORM Migrations Setup + Initial Migration

  **What to do**:
  - Configure TypeORM migrations in `backend/config/database.ts`
  - Add migration scripts to `package.json`:
    - `migration:generate` - Generate new migration
    - `migration:run` - Run pending migrations
    - `migration:revert` - Revert last migration
  - Create initial migration for `users` table (current schema)
  - Create `backend/migrations/` directory
  - Add migration run command to startup (development only)
  - Test: Run migration on fresh database, verify tables created

  **Must NOT do**:
  - Do NOT use `synchronize: true` in any environment
  Do NOT add seed data in this task (separate concern)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Straightforward configuration task, well-documented pattern
  - **Skills**: `[]`
    - No specialized skills needed, standard TypeORM setup

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3)
  - **Blocks**: Tasks 2, 5 (depend on migration system)
  - **Blocked By**: None (can start immediately)

  **References**:
  - `backend/config/database.ts` - Current TypeORM DataSource config
  - TypeORM docs: `https://typeorm.io/migrations` - Migration configuration
  - `backend/entities/user.entity.ts` - Current User entity schema

  **Acceptance Criteria**:
  - [ ] `npm run migration:generate -- -n InitialSchema` creates migration file
  - [ ] `npm run migration:run` creates users table successfully
  - [ ] `npm run migration:revert` rolls back migration successfully
  - [ ] `synchronize: false` in all environments

  **QA Scenarios**:

  ```
  Scenario: Fresh database migration
    Tool: Bash (sqlite3 + npm)
    Preconditions: Empty database (delete test.sqlite if exists)
    Steps:
      1. Run: rm -f backend/database.sqlite
      2. Run: npm run migration:run
      3. Run: sqlite3 backend/database.sqlite ".schema users"
    Expected Result: users table exists with columns: id, username, email, password, fullName, isActive, createdAt, updatedAt
    Failure Indicators: Table not found, missing columns, migration error
    Evidence: .sisyphus/evidence/task-1-migration-fresh.png

  Scenario: Migration rollback
    Tool: Bash (npm)
    Preconditions: Migration already ran
    Steps:
      1. Run: npm run migration:revert
      2. Run: sqlite3 backend/database.sqlite ".schema users"
    Expected Result: users table does NOT exist (rolled back)
    Failure Indicators: Table still exists, rollback error
    Evidence: .sisyphus/evidence/task-1-rollback.png
  ```

  **Commit**: YES (groups with 2, 3)
  - Message: `feat(db): setup TypeORM migrations with initial schema`
  - Files: `backend/config/database.ts`, `backend/migrations/*.ts`, `package.json`
  - Pre-commit: `npm run migration:run && npm run migration:revert`

- [x] 2. Add Role Field to User Entity

  **What to do**:
  - Add `role: 'user' | 'admin'` field to User entity
  - Default value: `'user'`
  - Add field to UserInterface
  - Create migration for adding role column to existing users
  - Update any user creation code to include role (default to 'user')

  **Must NOT do**:
  - Do NOT add more than 2 roles (user | admin only)
  - Do NOT add permission-level granularity yet
  - Do NOT add role management UI (comes later)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple entity modification, single field addition
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3)
  - **Blocks**: Tasks 6, 7, 9 (need role field)
  - **Blocked By**: Task 1 (migration system must exist)

  **References**:
  - `backend/entities/user.entity.ts` - Current User entity
  - `backend/migrations/` - Migration directory from Task 1
  - TypeORM docs: `https://typeorm.io/entities` - Entity column definitions

  **Acceptance Criteria**:
  - [ ] User entity has `role` field with type `'user' | 'admin'`
  - [ ] Default value is `'user'`
  - [ ] Migration created to add role column to existing users
  - [ ] Existing users get role = 'user' by default

  **QA Scenarios**:

  ```
  Scenario: New user created with default role
    Tool: Bash (curl + sqlite3)
    Preconditions: Backend running, database migrated
    Steps:
      1. POST /api/auth/register with valid data
      2. sqlite3 backend/database.sqlite "SELECT role FROM users WHERE email='test@example.com'"
    Expected Result: role = 'user'
    Failure Indicators: role is NULL or undefined
    Evidence: .sisyphus/evidence/task-2-default-role.png
  ```

  **Commit**: YES (groups with 1, 3)
  - Message: `feat(db): add role field to User entity`
  - Files: `backend/entities/user.entity.ts`, `backend/migrations/*.ts`
  - Pre-commit: `npm run migration:run`

- [x] 3. Install Dependencies

  **What to do**:
  - Install backend dependencies:
    - `resend` - Email service
    - `zod` - Validation
    - `vitest` - Test framework
    - `@vitest/coverage-v8` - Coverage (optional)
  - Install frontend dependencies:
    - `zod` - Shared validation schemas
  - Update `package.json` with test scripts:
    - `test` - Run vitest
    - `test:watch` - Watch mode
    - `test:coverage` - With coverage

  **Must NOT do**:
  - Do NOT install additional email providers (only Resend)
  - Do NOT install E2E testing tools (Playwright, Cypress)
  - Do NOT install test utilities beyond vitest ecosystem

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple npm install commands
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2)
  - **Blocks**: Tasks 4, 8 (need dependencies installed)
  - **Blocked By**: None (can start immediately)

  **References**:
  - `package.json` - Current dependencies
  - vitest docs: `https://vitest.dev/` - Setup guide
  - Zod docs: `https://zod.dev/` - Installation

  **Acceptance Criteria**:
  - [ ] `resend`, `zod`, `vitest` in package.json dependencies
  - [ ] `npm test` runs vitest without errors
  - [ ] zod can be imported in both backend and frontend

  **QA Scenarios**:

  ```
  Scenario: Test runner works
    Tool: Bash (npm)
    Preconditions: Dependencies installed
    Steps:
      1. Run: npm test
    Expected Result: vitest starts, shows "No test files found" (expected - no tests yet)
    Failure Indicators: Module not found errors, vitest not recognized
    Evidence: .sisyphus/evidence/task-3-test-runner.png
  ```

  **Commit**: YES (groups with 1, 2)
  - Message: `chore(deps): install resend, zod, vitest`
  - Files: `package.json`, `package-lock.json`
  - Pre-commit: `npm install && npm test`

- [x] 4. Email Service with Simulation Mode

  **What to do**:
  - Create `backend/services/email.service.ts`
  - Implement 3 email methods:
    - `sendVerification(email: string, token: string)`
    - `sendPasswordReset(email: string, token: string)`
    - `sendWelcome(email: string)`
  - If `RESEND_API_KEY` exists → Send real email via Resend
  - If no API key → Show terminal simulation with nice visual:
    ```
    ┌─────────────────────────────────────┐
    │ 📧 EMAIL SENT (Simulation Mode)     │
    ├─────────────────────────────────────┤
    │ To: user@example.com                │
    │ Subject: Verify Your Email          │
    │ Token: abc123xyz                    │
    │ Template: verification              │
    └─────────────────────────────────────┘
    ```
  - Use chalk or colorette for colored output

  **Must NOT do**:
  - Do NOT add email template editor
  - Do NOT add email history/logging
  - Do NOT add multiple email providers
  - Do NOT add email queue system (send synchronously)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Requires careful implementation of dual-mode logic, terminal formatting
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential (after Task 3)
  - **Blocks**: Tasks 6, 7 (need email service)
  - **Blocked By**: Task 3 (dependencies must be installed)

  **References**:
  - Resend docs: `https://resend.com/docs` - API usage
  - `backend/services/auth.service.ts` - Similar service pattern
  - `backend/.env.example` - Add RESEND_API_KEY placeholder

  **Acceptance Criteria**:
  - [ ] Email service exports 3 methods (verification, reset, welcome)
  - [ ] With RESEND_API_KEY: Sends real email
  - [ ] Without RESEND_API_KEY: Shows terminal simulation
  - [ ] Terminal output is colored and formatted nicely
  - [ ] Email includes token in body (for verification/reset links)

  **QA Scenarios**:

  ```
  Scenario: Email simulation mode (no API key)
    Tool: Bash (tmux or npm)
    Preconditions: RESEND_API_KEY not set, backend running
    Steps:
      1. Unset RESEND_API_KEY or set to empty
      2. Trigger registration (POST /api/auth/register)
      3. Observe terminal output
    Expected Result: Colored box appears with email details (to, subject, token)
    Failure Indicators: No output, error thrown, plain text output
    Evidence: .sisyphus/evidence/task-4-simulation.png

  Scenario: Email real mode (with API key)
    Tool: Bash (curl)
    Preconditions: RESEND_API_KEY set to valid key
    Steps:
      1. Set RESEND_API_KEY to valid key
      2. Trigger registration
      3. Check Resend dashboard for sent email
    Expected Result: Email appears in Resend sent logs
    Failure Indicators: API error, email not sent
    Evidence: .sisyphus/evidence/task-4-real.png
  ```

  **Commit**: YES (standalone)
  - Message: `feat(email): add email service with Resend + simulation`
  - Files: `backend/services/email.service.ts`, `backend/.env.example`
  - Pre-commit: `npm test` (if any tests exist)

- [x] 5. Add Email Verification Fields

  **What to do**:
  - Add fields to User entity:
    - `emailVerified: boolean` (default: false)
    - `emailVerificationToken: string | null`
    - `emailVerificationExpires: Date | null`
  - Create migration to add these columns
  - Update UserInterface

  **Must NOT do**:
  - Do NOT add SMS verification
  - Do NOT add re-verification flow (one-time only for now)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple entity modification
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 8, 9)
  - **Blocks**: Tasks 6, 7 (need verification fields)
  - **Blocked By**: Task 1 (migration system)

  **References**:
  - `backend/entities/user.entity.ts` - Current entity
  - Task 2 migration pattern - How to add fields

  **Acceptance Criteria**:
  - [ ] User entity has emailVerified, emailVerificationToken, emailVerificationExpires
  - [ ] Migration created and tested
  - [ ] New users created with emailVerified = false

  **QA Scenarios**:

  ```
  Scenario: New user has unverified email
    Tool: Bash (curl + sqlite3)
    Preconditions: Backend running
    Steps:
      1. POST /api/auth/register
      2. SELECT emailVerified FROM users WHERE email='...'
    Expected Result: emailVerified = false (0)
    Failure Indicators: emailVerified = true or NULL
    Evidence: .sisyphus/evidence/task-5-unverified.png
  ```

  **Commit**: YES (groups with 6, 7)
  - Message: `feat(db): add email verification fields`
  - Files: `backend/entities/user.entity.ts`, `backend/migrations/*.ts`
  - Pre-commit: `npm run migration:run`

- [x] 6. Password Reset Flow

  **What to do**:
  - Add endpoints to `backend/routes/auth.route.ts`:
    - `POST /auth/forgot-password` - Send reset email
    - `POST /auth/reset-password` - Reset with token
  - Add service methods to `backend/services/auth.service.ts`:
    - `forgotPassword(email: string)` - Generate token, send email
    - `resetPassword(token: string, newPassword: string)` - Validate token, update password
  - Token expires in 1 hour
  - Token stored in User entity (resetToken, resetTokenExpires)

  **Must NOT do**:
  - Do NOT add rate limiting yet (out of scope)
  - Do NOT add SMS reset option
  - Do NOT add reset link click tracking

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Multi-step flow with token generation, email sending, password update
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 7, 8, 9)
  - **Blocks**: Tasks 11, 12 (frontend pages need endpoints)
  - **Blocked By**: Tasks 2, 4, 5 (need role field, email service, verification fields)

  **References**:
  - `backend/services/auth.service.ts` - Existing auth logic
  - `backend/routes/auth.route.ts` - Existing auth endpoints
  - `backend/services/email.service.ts` - Send reset email

  **Acceptance Criteria**:
  - [ ] POST /auth/forgot-password sends reset email
  - [ ] POST /auth/reset-password validates token and updates password
  - [ ] Reset token expires after 1 hour
  - [ ] Used token is invalidated (can't reuse)
  - [ ] Error if email not found (don't leak user existence)

  **QA Scenarios**:

  ```
  Scenario: Password reset success
    Tool: Bash (curl)
    Preconditions: User exists, backend running
    Steps:
      1. POST /api/auth/forgot-password with user email
      2. Extract token from terminal output (simulation mode)
      3. POST /api/auth/reset-password with token + new password
      4. POST /api/auth/login with new password
    Expected Result: Login succeeds with new password
    Failure Indicators: Invalid token error, login fails
    Evidence: .sisyphus/evidence/task-6-reset-success.png

  Scenario: Expired token
    Tool: Bash (curl)
    Preconditions: Reset token generated and expired (wait 1 hour or mock time)
    Steps:
      1. POST /api/auth/reset-password with expired token
    Expected Result: 400 error "Token expired"
    Failure Indicators: Password reset succeeds with expired token
    Evidence: .sisyphus/evidence/task-6-expired-token.png
  ```

  **Commit**: YES (groups with 7)
  - Message: `feat(auth): add password reset flow`
  - Files: `backend/routes/auth.route.ts`, `backend/services/auth.service.ts`, `backend/entities/user.entity.ts`
  - Pre-commit: `npm test`

- [x] 7. Email Verification Flow

  **What to do**:
  - Add endpoints to `backend/routes/auth.route.ts`:
    - `POST /auth/verify-email` - Verify with token
    - `POST /auth/resend-verification` - Resend verification email (rate-limited: 3 per hour)
  - Add service methods to `backend/services/auth.service.ts`:
    - `verifyEmail(token: string)` - Validate token, set emailVerified = true
    - `resendVerification(email: string)` - Send new verification email
  - Token expires in 24 hours
  - Store verification token in User entity

  **Must NOT do**:
  - Do NOT add mandatory verification before login (allow unverified login for now)
  - Do NOT add re-verification flow

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Token-based verification with rate limiting consideration
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6, 8, 9)
  - **Blocks**: Task 13 (frontend verification page)
  - **Blocked By**: Tasks 2, 4, 5

  **References**:
  - Task 6 pattern - Similar token-based flow
  - `backend/services/email.service.ts` - Send verification email

  **Acceptance Criteria**:
  - [ ] POST /auth/verify-email validates token and sets emailVerified = true
  - [ ] POST /auth/resend-verification sends new email
  - [ ] Verification token expires after 24 hours
  - [ ] Rate limit: max 3 verification emails per hour per user

  **QA Scenarios**:

  ```
  Scenario: Email verification success
    Tool: Bash (curl)
    Preconditions: User registered, not verified
    Steps:
      1. Extract verification token from terminal (simulation mode)
      2. POST /api/auth/verify-email with token
      3. SELECT emailVerified FROM users WHERE id='...'
    Expected Result: emailVerified = true (1)
    Failure Indicators: emailVerified still false, token invalid error
    Evidence: .sisyphus/evidence/task-7-verify-success.png

  Scenario: Rate limit exceeded
    Tool: Bash (curl)
    Preconditions: User already requested 3 verification emails
    Steps:
      1. POST /api/auth/resend-verification (4th time)
    Expected Result: 429 error "Too many requests" or similar
    Failure Indicators: Email sent successfully (rate limit not enforced)
    Evidence: .sisyphus/evidence/task-7-rate-limit.png
  ```

  **Commit**: YES (groups with 6)
  - Message: `feat(auth): add email verification flow`
  - Files: `backend/routes/auth.route.ts`, `backend/services/auth.service.ts`
  - Pre-commit: `npm test`

- [x] 8. Zod Validators for Auth Forms

  **What to do**:
  - Create `backend/validators/auth.validator.ts`
  - Create schemas:
    - `loginSchema` - username, password
    - `registerSchema` - username, email, password, fullName (optional)
    - `forgotPasswordSchema` - email
    - `resetPasswordSchema` - token, newPassword
    - `verifyEmailSchema` - token
  - Create `app/lib/validation.ts` with shared schemas for frontend
  - Update route handlers to use zod validation
  - Return consistent error format: `{ error: string, field?: string }`

  **Must NOT do**:
  - Do NOT validate query params (only request bodies)
  - Do NOT add custom error messages (use zod defaults)
  - Do NOT add localization

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Schema definitions are straightforward
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6, 7, 9)
  - **Blocks**: Tasks 10, 11, 12, 13, 14 (frontend needs validation)
  - **Blocked By**: Task 3 (zod installed)

  **References**:
  - Zod docs: `https://zod.dev/` - Schema definitions
  - `backend/dto/*.ts` - Existing DTOs (replace with zod)
  - `backend/routes/auth.route.ts` - Where to apply validation

  **Acceptance Criteria**:
  - [ ] All auth endpoints use zod validation
  - [ ] Invalid input returns 400 with field-specific error
  - [ ] Frontend can import shared schemas from `app/lib/validation.ts`
  - [ ] Password minimum 8 characters
  - [ ] Email format validated

  **QA Scenarios**:

  ```
  Scenario: Invalid email format
    Tool: Bash (curl)
    Preconditions: Backend running
    Steps:
      1. POST /api/auth/register with email="invalid-email"
    Expected Result: 400 error with field="email", error message about invalid format
    Failure Indicators: Request succeeds, generic error
    Evidence: .sisyphus/evidence/task-8-invalid-email.png

  Scenario: Password too short
    Tool: Bash (curl)
    Preconditions: Backend running
    Steps:
      1. POST /api/auth/register with password="123"
    Expected Result: 400 error with field="password", minimum 8 characters
    Failure Indicators: Request succeeds
    Evidence: .sisyphus/evidence/task-8-short-password.png
  ```

  **Commit**: YES (standalone)
  - Message: `feat(validation): add Zod schemas for auth forms`
  - Files: `backend/validators/auth.validator.ts`, `app/lib/validation.ts`, `backend/routes/auth.route.ts`
  - Pre-commit: `npm test`

- [x] 9. Role-Based Middleware

  **What to do**:
  - Create `backend/middleware/role.middleware.ts`
  - Export `requireRole(roles: UserRole[])` middleware factory
  - Extract user role from JWT token (add role to JWT payload)
  - Return 403 if user role not in allowed roles
  - Update auth middleware to include role in JWT payload

  **Must NOT do**:
  - Do NOT add permission-level checks (only role-based)
  - Do NOT add more than 2 roles (user | admin)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Standard middleware pattern
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6, 7, 8)
  - **Blocks**: Task 14 (admin dashboard needs role protection)
  - **Blocked By**: Task 2 (role field in entity)

  **References**:
  - `backend/middleware/auth.middleware.ts` - Existing auth middleware pattern
  - `backend/services/auth.service.ts` - JWT creation logic

  **Acceptance Criteria**:
  - [ ] `requireRole(['admin'])` middleware created
  - [ ] JWT token includes user role
  - [ ] Non-admin accessing admin route = 403
  - [ ] Admin accessing admin route = 200

  **QA Scenarios**:

  ```
  Scenario: Non-admin blocked from admin route
    Tool: Bash (curl)
    Preconditions: Regular user logged in (role='user')
    Steps:
      1. GET /api/admin/users with user JWT
    Expected Result: 403 Forbidden
    Failure Indicators: 200 OK (role not checked)
    Evidence: .sisyphus/evidence/task-9-non-admin-blocked.png

  Scenario: Admin can access admin route
    Tool: Bash (curl)
    Preconditions: Admin user logged in (role='admin')
    Steps:
      1. Manually set role='admin' in database for test user
      2. Login to get new JWT with admin role
      3. GET /api/admin/users with admin JWT
    Expected Result: 200 OK with user list
    Failure Indicators: 403 Forbidden
    Evidence: .sisyphus/evidence/task-9-admin-access.png
  ```

  **Commit**: YES (standalone)
  - Message: `feat(auth): add role-based middleware`
  - Files: `backend/middleware/role.middleware.ts`, `backend/services/auth.service.ts`
  - Pre-commit: `npm test`

- [x] 10. Settings Page

  **What to do**:
  - Create `app/routes/settings/profile.tsx` with:
    - Form to update: username, email, fullName
    - Email change triggers verification email
    - Delete account button (requires password confirmation)
  - Create `app/routes/settings/security.tsx` with:
    - Change password form (current password + new password)
  - Add route config in `app/routes.ts`
  - Add navigation link in header
  - Use zod validation for forms
  - Show success/error toasts

  **Must NOT do**:
  - Do NOT add theme customization
  - Do NOT add notification preferences
  - Do NOT add profile picture upload
  - Do NOT add activity history
  - Do NOT add connected accounts

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: UI/UX implementation with forms, validation, toasts
  - **Skills**: `['/frontend-ui-ux']`
    - frontend-ui-ux: Form design, validation states, toast integration

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 11, 12, 13, 14)
  - **Blocks**: Tasks 15, 16 (tests need pages to exist)
  - **Blocked By**: Tasks 5, 6, 7, 8 (need endpoints + validation)

  **References**:
  - `app/routes/auth/login.tsx` - Existing form pattern
  - `app/components/ui/input.tsx`, `button.tsx` - UI components
  - `app/components/ui/toast.tsx` - Toast notifications
  - `app/lib/validation.ts` - Zod schemas from Task 8

  **Acceptance Criteria**:
  - [ ] Profile form updates username, email, fullName
  - [ ] Email change triggers verification email
  - [ ] Delete account requires password confirmation
  - [ ] Change password requires current password
  - [ ] All forms show validation errors inline
  - [ ] Success/error toasts appear on submit

  **QA Scenarios**:

  ```
  Scenario: Update profile success
    Tool: Playwright
    Preconditions: User logged in
    Steps:
      1. Navigate to /settings/profile
      2. Change fullName to "Updated Name"
      3. Click Save
      4. Verify toast appears with "Profile updated"
      5. Reload page, verify fullName persists
    Expected Result: Profile updates successfully, toast appears, changes persist
    Failure Indicators: Error toast, changes not saved
    Evidence: .sisyphus/evidence/task-10-profile-update.png

  Scenario: Change password with wrong current password
    Tool: Playwright
    Preconditions: User logged in
    Steps:
      1. Navigate to /settings/security
      2. Enter wrong current password
      3. Enter new password
      4. Click Save
    Expected Result: Error toast "Current password is incorrect"
    Failure Indicators: Password changed successfully
    Evidence: .sisyphus/evidence/task-10-wrong-password.png

  Scenario: Delete account
    Tool: Playwright
    Preconditions: User logged in
    Steps:
      1. Navigate to /settings/profile
      2. Click "Delete Account"
      3. Enter password in confirmation modal
      4. Confirm deletion
      5. Try to login with deleted account
    Expected Result: Account deleted, login fails
    Failure Indicators: Account still exists
    Evidence: .sisyphus/evidence/task-10-delete-account.png
  ```

  **Commit**: YES (standalone)
  - Message: `feat(ui): add settings page (profile + security)`
  - Files: `app/routes/settings/profile.tsx`, `app/routes/settings/security.tsx`, `app/routes.ts`
  - Pre-commit: `npm run typecheck`

- [x] 11. Forgot Password Page

  **What to do**:
  - Create `app/routes/auth/forgot-password.tsx`
  - Form with email input
  - On submit: POST /api/auth/forgot-password
  - Show success message (don't reveal if email exists)
  - Link back to login page
  - Use zod validation

  **Must NOT do**:
  - Do NOT add "check your email" with specific email (security)
  - Do NOT add resend button (out of scope)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Simple form page
  - **Skills**: `['/frontend-ui-ux']`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 10, 12, 13, 14)
  - **Blocks**: Tasks 15, 16
  - **Blocked By**: Tasks 6, 8

  **References**:
  - `app/routes/auth/login.tsx` - Similar form pattern
  - `app/lib/validation.ts` - forgotPasswordSchema

  **Acceptance Criteria**:
  - [ ] Email form with zod validation
  - [ ] Success message shown after submit
  - [ ] Message doesn't reveal if email exists
  - [ ] Link back to login

  **QA Scenarios**:

  ```
  Scenario: Forgot password success
    Tool: Playwright
    Preconditions: Backend running
    Steps:
      1. Navigate to /auth/forgot-password
      2. Enter any email
      3. Click Send
      4. Verify success message appears
    Expected Result: Success message shown, no error if email doesn't exist
    Failure Indicators: Error message, no success message
    Evidence: .sisyphus/evidence/task-11-forgot-success.png
  ```

  **Commit**: YES (groups with 12, 13)
  - Message: `feat(ui): add password reset pages`
  - Files: `app/routes/auth/forgot-password.tsx`, `app/routes/auth/reset-password.tsx`
  - Pre-commit: `npm run typecheck`

- [x] 12. Reset Password Page

  **What to do**:
  - Create `app/routes/auth/reset-password.tsx`
  - Form with: token (from URL query param), newPassword, confirmPassword
  - On submit: POST /api/auth/reset-password
  - Redirect to login on success
  - Use zod validation

  **Must NOT do**:
  - Do NOT add token expiry UI (handle with error message)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Form page with URL param handling
  - **Skills**: `['/frontend-ui-ux']`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 10, 11, 13, 14)
  - **Blocks**: Tasks 15, 16
  - **Blocked By**: Tasks 6, 8

  **References**:
  - Task 11 pattern - Similar form structure
  - `app/lib/validation.ts` - resetPasswordSchema

  **Acceptance Criteria**:
  - [ ] Token extracted from URL query param
  - [ ] Password confirmation validation
  - [ ] Redirect to login on success
  - [ ] Error message for expired/invalid token

  **QA Scenarios**:

  ```
  Scenario: Reset password with valid token
    Tool: Playwright
    Preconditions: Reset token generated (via forgot password)
    Steps:
      1. Navigate to /auth/reset-password?token=ABC123
      2. Enter new password + confirm
      3. Click Reset
      4. Verify redirect to /auth/login
    Expected Result: Password reset, redirected to login
    Failure Indicators: Error message, no redirect
    Evidence: .sisyphus/evidence/task-12-reset-success.png

  Scenario: Reset with expired token
    Tool: Playwright
    Preconditions: Expired token
    Steps:
      1. Navigate to /auth/reset-password?token=EXPIRED
      2. Enter passwords
      3. Click Reset
    Expected Result: Error message "Token expired or invalid"
    Failure Indicators: Success message
    Evidence: .sisyphus/evidence/task-12-expired.png
  ```

  **Commit**: YES (groups with 11)

- [x] 13. Email Verification Page

  **What to do**:
  - Create `app/routes/auth/verify-email.tsx`
  - Extract token from URL query param
  - Auto-submit on load (POST /api/auth/verify-email)
  - Show loading state while verifying
  - Show success/error message
  - Redirect to dashboard on success
  - Link to resend verification if failed

  **Must NOT do**:
  - Do NOT add manual token input (auto from URL)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Auto-submit page with loading state
  - **Skills**: `['/frontend-ui-ux']`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 10, 11, 12, 14)
  - **Blocks**: Tasks 15, 16
  - **Blocked By**: Tasks 7, 8

  **References**:
  - `app/routes/auth/login.tsx` - Similar auth page pattern

  **Acceptance Criteria**:
  - [ ] Token extracted from URL
  - [ ] Auto-submit on load
  - [ ] Loading state shown
  - [ ] Success/error message displayed
  - [ ] Redirect to dashboard on success

  **QA Scenarios**:

  ```
  Scenario: Verify email with valid token
    Tool: Playwright
    Preconditions: Verification token generated
    Steps:
      1. Navigate to /auth/verify-email?token=ABC123
      2. Wait for auto-submit
      3. Verify redirect to /dashboard
    Expected Result: Email verified, redirected to dashboard
    Failure Indicators: Error message, no redirect
    Evidence: .sisyphus/evidence/task-13-verify-success.png
  ```

  **Commit**: YES (groups with 11, 12)

- [x] 14. Admin Dashboard

  **What to do**:
  - Create `app/routes/admin/users.tsx`
  - List all users (paginated, 20 per page)
  - Show: username, email, role, createdAt
  - Actions: Change role (user ↔ admin), Delete user
  - Protect route with role check (redirect if not admin)
  - Add navigation link in header (admin only)

  **Must NOT do**:
  - Do NOT add bulk actions
  - Do NOT add user detail page
  - Do NOT add search/filter (out of scope)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Data table with actions
  - **Skills**: `['/frontend-ui-ux']`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 10, 11, 12, 13)
  - **Blocks**: Tasks 15, 16
  - **Blocked By**: Tasks 8, 9

  **References**:
  - `app/routes/dashboard/users.tsx` - Existing user list pattern (if exists)
  - `backend/routes/admin.route.ts` - Admin endpoints (need to create)
  - `backend/middleware/role.middleware.ts` - Route protection

  **Acceptance Criteria**:
  - [ ] User list paginated (20 per page)
  - [ ] Role change dropdown (user | admin)
  - [ ] Delete user button with confirmation
  - [ ] Non-admin redirected to /dashboard
  - [ ] Admin navigation link visible only to admins

  **QA Scenarios**:

  ```
  Scenario: Non-admin blocked from admin page
    Tool: Playwright
    Preconditions: Regular user logged in
    Steps:
      1. Navigate to /admin/users
    Expected Result: Redirected to /dashboard
    Failure Indicators: Admin page loads
    Evidence: .sisyphus/evidence/task-14-non-admin-blocked.png

  Scenario: Admin views user list
    Tool: Playwright
    Preconditions: Admin user logged in
    Steps:
      1. Navigate to /admin/users
      2. Verify user list appears
      3. Verify role change dropdown exists
    Expected Result: User list visible with actions
    Failure Indicators: Empty state, error message
    Evidence: .sisyphus/evidence/task-14-admin-list.png

  Scenario: Admin changes user role
    Tool: Playwright
    Preconditions: Admin logged in, at least 2 users exist
    Steps:
      1. Navigate to /admin/users
      2. Change role for user from "user" to "admin"
      3. Verify success toast
      4. Reload page, verify role persists
    Expected Result: Role updated, toast shown, change persists
    Failure Indicators: Error, role not changed
    Evidence: .sisyphus/evidence/task-14-role-change.png
  ```

  **Commit**: YES (standalone)
  - Message: `feat(ui): add admin dashboard for user management`
  - Files: `app/routes/admin/users.tsx`, `app/routes.ts`, `app/components/layout/header.tsx`
  - Pre-commit: `npm run typecheck`

- [x] 15. Backend Tests (12 tests)

  **What to do**:
  - Create test files:
    - `backend/tests/auth.test.ts` (4 tests)
    - `backend/tests/users.test.ts` (3 tests)
    - `backend/tests/email.test.ts` (2 tests)
    - `backend/tests/middleware.test.ts` (3 tests)
  - Configure vitest for backend
  - Use test database (test.sqlite)
  - Mock email service (don't send real emails in tests)

  **Test Coverage**:
  - Auth: register, login, forgot-password, reset-password
  - Users: get all (admin), update self, delete self
  - Email: send verification (simulation), send reset (simulation)
  - Middleware: auth required, role required (admin), role required (non-admin)

  **Must NOT do**:
  - Do NOT aim for 100% coverage (target 70%)
  - Do NOT add E2E tests
  - Do NOT test every edge case (happy path + 1-2 errors per endpoint)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Test setup, mocking, assertions
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Task 16)
  - **Blocks**: Final verification wave
  - **Blocked By**: Tasks 10, 11, 12, 13, 14 (need features to test)

  **References**:
  - vitest docs: `https://vitest.dev/` - Setup guide
  - `backend/services/*.ts` - Services to test
  - `backend/routes/*.ts` - Routes to test

  **Acceptance Criteria**:
  - [ ] 12 tests total (4 auth, 3 users, 2 email, 3 middleware)
  - [ ] All tests pass with `npm test`
  - [ ] Tests use isolated test database
  - [ ] Tests clean up after themselves
  - [ ] Email tests use simulation mode (no real emails)

  **QA Scenarios**:

  ```
  Scenario: Run all backend tests
    Tool: Bash (npm)
    Preconditions: Backend code complete
    Steps:
      1. Run: npm test -- --dir backend/tests
    Expected Result: 12 tests pass, 0 failures
    Failure Indicators: Test failures, module not found errors
    Evidence: .sisyphus/evidence/task-15-all-tests.png

  Scenario: Test isolation
    Tool: Bash (npm)
    Preconditions: Tests already ran once
    Steps:
      1. Run: npm test -- --dir backend/tests (second time)
    Expected Result: Same 12 tests pass (no state leakage)
    Failure Indicators: Tests fail due to previous run state
    Evidence: .sisyphus/evidence/task-15-isolation.png
  ```

  **Commit**: YES (groups with 16)
  - Message: `test(backend): add 12 backend tests`
  - Files: `backend/tests/*.test.ts`, `vitest.config.ts`
  - Pre-commit: `npm test`

- [x] 16. Frontend Tests (6 tests)

  **What to do**:
  - Create test files:
    - `app/tests/auth.test.tsx` (2 tests)
    - `app/tests/settings.test.tsx` (2 tests)
    - `app/tests/routing.test.tsx` (2 tests)
  - Configure vitest for frontend
  - Use React Testing Library
  - Mock API calls (don't hit real backend)

  **Test Coverage**:
  - Auth: Login page renders, Register page renders
  - Settings: Profile page renders, Security page renders
  - Routing: Protected route redirects unauthenticated, Admin route redirects non-admin

  **Must NOT do**:
  - Do NOT test every component (only pages)
  - Do NOT test styling (only functionality)
  - Do NOT add visual regression tests

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: React Testing Library setup, mocking
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Task 15)
  - **Blocks**: Final verification wave
  - **Blocked By**: Tasks 10, 11, 12, 13, 14

  **References**:
  - React Testing Library docs: `https://testing-library.com/react`
  - `app/routes/auth/login.tsx` - Pages to test
  - vitest config from Task 15

  **Acceptance Criteria**:
  - [ ] 6 tests total (2 auth, 2 settings, 2 routing)
  - [ ] All tests pass with `npm test`
  - [ ] API calls are mocked
  - [ ] No real backend required for frontend tests

  **QA Scenarios**:

  ```
  Scenario: Run all frontend tests
    Tool: Bash (npm)
    Preconditions: Frontend code complete
    Steps:
      1. Run: npm test -- --dir app/tests
    Expected Result: 6 tests pass, 0 failures
    Failure Indicators: Test failures, render errors
    Evidence: .sisyphus/evidence/task-16-all-tests.png
  ```

  **Commit**: YES (groups with 15)
  - Message: `test(frontend): add 6 frontend tests`
  - Files: `app/tests/*.test.tsx`
  - Pre-commit: `npm test`

---

## Final Verification Wave

- [x] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, curl endpoint, run command). For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Check evidence files exist in .sisyphus/evidence/. Compare deliverables against plan.
  Output: `Must Have [8/8] | Must NOT Have [14/14] | Tasks [16/16] | VERDICT: APPROVE/REJECT`

- [x] F2. **Code Quality Review** — `unspecified-high`
  Run `tsc --noEmit` + linter + `npm test`. Review all changed files for: `as any`/`@ts-ignore`, empty catches, console.log in prod, commented-out code, unused imports. Check AI slop: excessive comments, over-abstraction, generic names (data/result/item/temp).
  Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Tests [18 pass/0 fail] | Files [N clean/N issues] | VERDICT`

- [x] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill if UI)
  Start from clean state. Execute EVERY QA scenario from EVERY task — follow exact steps, capture evidence. Test cross-task integration (features working together, not isolation). Test edge cases: empty state, invalid input, rapid actions. Save to `.sisyphus/evidence/final-qa/`.
  Output: `Scenarios [18/18 pass] | Integration [5/5] | Edge Cases [8 tested] | VERDICT`

- [x] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual diff (git log/diff). Verify 1:1 — everything in spec was built (no missing), nothing beyond spec was built (no creep). Check "Must NOT do" compliance. Detect cross-task contamination: Task N touching Task M's files. Flag unaccounted changes.
  Output: `Tasks [16/16 compliant] | Contamination [CLEAN/0 issues] | Unaccounted [CLEAN/0 files] | VERDICT`

---

## Commit Strategy

- **Wave 1**: `feat(db): setup TypeORM migrations + add role field + install dependencies`
- **Wave 2**: `feat(auth): email service + password reset + email verification + zod validation + role middleware`
- **Wave 3**: `feat(ui): settings page + password reset pages + email verification + admin dashboard`
- **Wave 4**: `test: add backend (12) + frontend (6) tests`
- **Final**: `chore: final verification and cleanup`

---

## Success Criteria

### Verification Commands
```bash
npm run dev              # Expected: Both frontend + backend start
npm run typecheck        # Expected: Zero TypeScript errors
npm test                 # Expected: 18 tests pass
npm run migration:run    # Expected: Migrations run successfully
curl http://localhost:3001/health  # Expected: 200 OK
```

### Final Checklist
- [ ] All "Must Have" features implemented
- [ ] All "Must NOT Have" features absent
- [ ] All 18 tests pass
- [ ] Email simulation shows nice terminal visual
- [ ] Admin routes protected (403 for non-admin)
- [ ] Settings page allows profile + password changes
- [ ] Password reset flow works end-to-end
- [ ] Email verification works with token
