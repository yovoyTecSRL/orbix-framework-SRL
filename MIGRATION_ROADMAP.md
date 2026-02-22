# Orbix Core Separation Migration Roadmap

## Overview
This roadmap details the structured migration to separate Orbix Core into a private repository and distribute it via GitHub Packages, enforcing open-core boundaries and professional IP protection.

---

## 1. Extraction Plan
- Identify proprietary modules: aenki, sentinel, routing, myndra, cognitive-engine, internal-logic, enterprise-only
- Move all proprietary code to orbix-core (private repo)
- Remove internal logic from orbix-framework-community
- Define and document public API surface (SDK)

## 2. Package Distribution
- Set up orbix-core as private npm package via GitHub Packages
- Use semantic versioning (e.g., @orbix/core@2.0.0)
- Community repo depends on @orbix/core in package.json
- Compatibility layer: SDK in community repo calls core APIs

## 3. Architectural Boundaries
- Community repo cannot access internal core logic
- Only interfaces and SDK exposed
- Plugin injection via documented contracts
- Automated CI checks for boundary enforcement

## 4. Community Repo Update
- Replace internal imports with SDK calls
- Add connectors, protocol, website folders
- Add landing page and extension guidelines

## 5. Licensing Model
- orbix-core: proprietary commercial license
- orbix-framework-community: MIT or dual license
- Enterprise tier: premium features, support, compliance

## 6. Branch Strategy
- main: stable, production-ready
- develop: integration branch
- feature/extraction: proprietary code removal
- feature/sdk: SDK integration
- feature/connectors: connector system
- feature/website: landing page

## 7. PR Breakdown
- PR 1: Extraction of proprietary modules to orbix-core
- PR 2: SDK integration and public API documentation
- PR 3: Connector system implementation
- PR 4: Protocol folder and interface contracts
- PR 5: Community landing website

## 8. Deployment Implications
- orbix-core distributed as private package
- Community repo as open source
- CI/CD updates for package integration

## 9. Risk Assessment
- IP protection: proprietary code fully separated
- Compatibility: SDK and API versioning
- CI/CD: boundary checks and automated tests

---

_Last updated: 2026-02-22_
