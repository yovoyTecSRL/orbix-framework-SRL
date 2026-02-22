# Orbix Security Token Policy

## Purpose
This policy defines the management, usage, and documentation standards for GitHub authentication tokens in the Orbix project.

## Token Types
- **Fine-grained Personal Access Tokens (PATs):**
  - Use for repository-specific automation and integrations.
  - Prefer over classic PATs.
- **Classic PATs:**
  - Must not be used unless absolutely necessary.
  - Revoke all unused or legacy tokens immediately.
- **GitHub Apps / OIDC:**
  - Use for enterprise-scale automation and CI/CD workflows.

## Token Creation Guidelines
- Use fine-grained tokens with minimal permissions required for the task.
- Set expiration to 30–60 days maximum.
- Never use tokens with global admin permissions.
- Document every token: purpose, scope, expiration, and location of use.

## Token Usage
- Never hardcode tokens in code, scripts, or configuration files.
- Store tokens in secure secret managers (e.g., Azure Key Vault).
- Rotate tokens regularly and revoke immediately if compromised.

## Local Credential Cleanup
- Remove unused credentials from local machines.
- On Windows: use `cmdkey /list` and `cmdkey /delete:git:https://github.com`.
- On Linux/macOS: remove from `~/.git-credentials` or credential manager.

## Documentation Template
For each token, record:
- Token type: Fine-grained / Classic / GitHub App
- Repository or scope
- Permissions granted
- Expiration date
- Responsible owner
- Usage location (script, CI/CD, etc.)

## Review and Audit
- Review token usage quarterly.
- Audit for unused, expired, or over-permissioned tokens.

---

_Last updated: 2026-02-22_