# Git Workflow Instructions

This document outlines the recommended process for working with two main branches in your Git repository:

- **`test`**: The development and testing branch, where all ongoing development happens.  
- **`master`**: The production branch, representing stable, release-ready code.

## Environments

| Branch   | Environment URL                    | Purpose                    |
|----------|-----------------------------------|----------------------------|
| `test`   | https://test.quicktalog.app      | Development & Testing      |
| `master` | https://quicktalog.app           | Production                 |

---

## Branch Purposes

| Branch   | Role                             |
|----------|---------------------------------|
| `test`   | Development and testing environment |
| `master` | Production-ready stable releases |

---

## Workflow Overview

### 1. Work on the `test` Branch (Development & Testing)

- Use the `test` branch for daily development.  
- Commit and push your changes regularly to `test`.  
- This branch may contain unstable or experimental code.  
- Perform all testing and QA here before considering a release.

```bash
git checkout test
# Make changes, add new features or fixes
git add .
git commit -m "Description of changes"
git push origin test
```

### 2. Merge `test` into `master` (Release to Production)

When a development milestone or stable version is ready and fully tested on `test`, merge it into `master`.

This marks the official production-ready state of the code.

```bash
git checkout master
git pull origin master          # Update local master branch
git merge test                  # Merge tested changes from 'test'
git push origin master          # Push updates to remote master
```

**Optional**: Tag the release for easier reference.

```bash
git tag -a vX.Y.Z -m "Release version X.Y.Z"
git push origin vX.Y.Z
```

### 3. Continue Development on `test`

After merging, continue your active development on the `test` branch.

Keep working on new features, bug fixes, and improvements.

```bash
git checkout test
git pull origin test
```

---

## Best Practices

- Always pull the latest changes before pushing or merging to avoid conflicts.
- Use clear, descriptive commit messages for better tracking.
- Consider creating feature branches off `test` for large or risky changes, then merge back into `test` once ready.
- Run automated tests and QA on the `test` branch before merging to `master`.
- Never commit directly to `master` unless it's a hotfix or urgent patch (and still tested).
- Communicate clearly in your team about when merges to `master` happen.

---

## Summary of Commands

| Task | Commands |
|------|----------|
| Switch to `test` branch | `git checkout test` |
| Commit and push to `test` | `git add .`<br>`git commit -m "message"`<br>`git push origin test` |
| Merge `test` into `master` | `git checkout master`<br>`git pull origin master`<br>`git merge test`<br>`git push origin master` |
| Tag a release on `master` | `git tag -a vX.Y.Z -m "Release vX.Y.Z"`<br>`git push origin vX.Y.Z` |
| Switch back to `test` | `git checkout test`<br>`git pull origin test` |

---

## Visual Workflow Summary

```
(test) — development → testing → (merge) → master — production → releases
```

---

## Additional Notes

### Feature Branches

For complex features or experimental work, consider creating feature branches:

```bash
git checkout test
git checkout -b feature/new-feature-name
# Work on your feature
git add .
git commit -m "Add new feature"
git push origin feature/new-feature-name
# When ready, merge back to test
git checkout test
git merge feature/new-feature-name
git push origin test
```

### Hotfixes

For urgent production fixes, you may need to work directly on `master`:

```bash
git checkout master
git checkout -b hotfix/urgent-fix
# Make the fix
git add .
git commit -m "Hotfix: urgent production fix"
git checkout master
git merge hotfix/urgent-fix
git push origin master
git checkout test
git merge hotfix/urgent-fix
git push origin test
```

### Branch Protection

Consider setting up branch protection rules:
- Prevent direct pushes to `master`
- Require pull requests for merging to `master`
- Require status checks to pass before merging
- Require code review before merging

---

## Troubleshooting

### Merge Conflicts

If you encounter merge conflicts:

```bash
# During merge
git status                    # See conflicted files
# Edit conflicted files manually
git add .                     # Mark conflicts as resolved
git commit -m "Resolve merge conflicts"
```

### Undoing Changes

To undo the last commit (before pushing):

```bash
git reset --soft HEAD~1       # Keep changes staged
git reset --hard HEAD~1       # Discard changes completely
```

To undo a pushed commit:

```bash
git revert HEAD               # Create a new commit that undoes the last commit
git push origin branch-name
```

---

## Version Tagging Convention

Use semantic versioning for release tags:

- **Major version** (X.0.0): Breaking changes
- **Minor version** (X.Y.0): New features, backward compatible
- **Patch version** (X.Y.Z): Bug fixes, backward compatible

Example: `v1.2.3`

---

*This workflow ensures a clean separation between development and production code while maintaining a reliable release process.*