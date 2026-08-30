# Security Policy — Ministry of Truth Archives

## Supported Version

Ministry of Truth Archives is currently maintained as a single live release.

Security fixes are applied to the current version of the project. Older commits, forks, modified copies, and unofficial deployments are not supported by the project maintainer.

| Version | Supported |
| --- | --- |
| Current live version | Yes |
| Older versions | No |
| Unofficial forks or modified deployments | No |

## Reporting a Security Vulnerability

Please **do not publicly disclose an exploitable security vulnerability before the maintainer has had a reasonable opportunity to investigate and address it**.

If GitHub Private Vulnerability Reporting is enabled for this repository, please use the repository's private **Report a vulnerability** option.

If private vulnerability reporting is not available, contact the maintainer through an available private project contact method. A dedicated security contact may be added as the project grows.

For ordinary bugs that do not expose sensitive information or create a security risk, use the normal GitHub issue process instead.

## What to Include

A useful security report should include:

- A clear description of the issue.
- The affected feature or component.
- Steps needed to reproduce the problem.
- The potential security impact.
- Relevant error messages or logs with secrets removed.
- Any suggested mitigation, if known.

Please provide only the information necessary to reproduce and understand the issue.

## Never Post Secrets

Do **not** place any of the following in a public GitHub issue, pull request, commit, screenshot, Discord message, or support post:

- Discord bot tokens.
- API keys.
- Passwords.
- `.env` file contents.
- Authentication cookies or session tokens.
- Hosting-provider credentials.
- Private keys.
- Database credentials.
- Webhook secrets.
- Other authentication or recovery credentials.

Redact sensitive values from logs before sharing them.

## If a Discord Bot Token Is Exposed

Treat an exposed bot token as compromised.

The appropriate response is to:

1. Reset or regenerate the affected bot token through the Discord Developer Portal as soon as possible.
2. Update the secret in the production hosting environment.
3. Restart or redeploy the application if necessary.
4. Remove the exposed credential from public locations.
5. Review relevant logs and account activity for unexpected access.
6. Review repository history and other locations where the credential may also have been copied.

Simply deleting a token from the latest version of a file is not sufficient protection if the secret was already exposed.

Never continue using a credential that is known to have been publicly disclosed.

## Repository and Dependency Security

Project dependencies should be kept reasonably current, particularly when updates address security vulnerabilities.

Dependency updates should be reviewed before deployment rather than blindly merged.

The public repository should not contain production secrets. Environment-specific credentials should be supplied through environment variables or the hosting provider's secret-management system.

A `.env.example` file may document required environment-variable names, but it must never contain real credentials.

## Responsible Testing

Security research must not intentionally:

- Disrupt the public Bot for other users.
- Destroy or corrupt project data.
- Access accounts, servers, or information without authorization.
- Exfiltrate credentials or private information.
- Spam Discord's API or project infrastructure.
- Bypass Discord's platform rules.
- Use a vulnerability to cause harm after demonstrating that it exists.

Use the minimum testing necessary to demonstrate an issue.

## Scope

Security issues may include, but are not limited to:

- Exposed credentials.
- Unauthorized access.
- Permission or authorization bypasses.
- Injection vulnerabilities.
- Unsafe handling of user-controlled input.
- Dependency vulnerabilities that are actually exploitable by the Bot.
- Accidental disclosure of private information.
- Vulnerabilities that could allow abuse of the Bot or its hosting environment.

Lore inaccuracies, missing encyclopedia entries, spelling errors, and ordinary feature bugs are not security vulnerabilities.

## Disclosure

The maintainer may request additional information while investigating a report.

When practical, reporters are asked to allow reasonable time for a fix to be developed and deployed before publicly disclosing technical details that could facilitate exploitation.

Submitting a report does not guarantee a bounty, payment, public credit, or acceptance of the reported issue.

## Third-Party Services

Vulnerabilities affecting Discord, GitHub, the hosting provider, Helldivers Wiki, or another third-party service should generally be reported to that service through its own security-reporting process.

Do not attempt to exploit third-party systems in order to test Ministry of Truth Archives.

## Contact

Project repository:

https://github.com/IllSueYa/Ministry-of-Truth-Archives

When GitHub Private Vulnerability Reporting is enabled, it is the preferred method for sensitive reports.

---

**Knowledge is Managed. History is Archived. Democracy is Eternal.**
